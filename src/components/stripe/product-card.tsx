import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createCheckoutSession } from '@/lib/stripe-client';
import { useToast } from '@/hooks/use-toast';
import type { StripeProduct } from '@/stripe-config';

interface ProductCardProps {
  product: StripeProduct;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      await createCheckoutSession({
        priceId: product.priceId,
        mode: product.mode,
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to start checkout process',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="mb-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {formatPrice(product.price, product.currency)}
            </div>
            <div className="text-sm text-gray-600">
              {product.mode === 'subscription' ? 'per month' : 'one-time payment'}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-success-500" />
              <span>Secure payment processing</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-success-500" />
              <span>Instant access</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Check className="w-4 h-4 text-success-500" />
              <span>24/7 support</span>
            </div>
          </div>

          <Button 
            onClick={handlePurchase}
            disabled={loading}
            className="w-full mt-6"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.mode === 'subscription' ? 'Subscribe Now' : 'Buy Now'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}