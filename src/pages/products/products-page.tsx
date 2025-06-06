import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/stripe/product-card';
import { stripeProducts } from '@/stripe-config';

export function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <ShoppingBag className="w-4 h-4 mr-2" />
              LegitReach Products
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect product for your needs. All purchases are secure and come with our satisfaction guarantee.
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stripeProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={`${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Why Choose LegitReach?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div>
                <div className="font-semibold text-gray-900 mb-2">Secure Payments</div>
                <p>All transactions are processed securely through Stripe with industry-standard encryption.</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">Instant Access</div>
                <p>Get immediate access to your purchase with no waiting time or manual approval process.</p>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">24/7 Support</div>
                <p>Our support team is available around the clock to help with any questions or issues.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}