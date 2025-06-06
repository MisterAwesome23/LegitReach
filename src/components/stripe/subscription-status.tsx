import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSubscriptionStatus } from '@/lib/stripe-client';
import { getProductByPriceId } from '@/stripe-config';

interface SubscriptionData {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export function SubscriptionStatus() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const data = await getSubscriptionStatus();
        setSubscription(data);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-gray-500" />
            No Active Subscription
          </CardTitle>
          <CardDescription>
            You don't have an active subscription yet.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const product = subscription.price_id ? getProductByPriceId(subscription.price_id) : null;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'trialing':
        return 'bg-primary-100 text-primary-700';
      case 'past_due':
        return 'bg-warning-100 text-warning-700';
      case 'canceled':
      case 'unpaid':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary-600" />
            Subscription Status
          </CardTitle>
          <CardDescription>
            Your current subscription details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Status</span>
            <Badge className={getStatusColor(subscription.subscription_status)}>
              {subscription.subscription_status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>

          {product && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Plan</span>
              <span className="text-sm font-semibold">{product.name}</span>
            </div>
          )}

          {subscription.current_period_end && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {subscription.cancel_at_period_end ? 'Expires' : 'Renews'}
              </span>
              <span className="text-sm">
                {formatDate(subscription.current_period_end)}
              </span>
            </div>
          )}

          {subscription.payment_method_brand && subscription.payment_method_last4 && (
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <CreditCard className="w-4 h-4" />
                Payment Method
              </span>
              <span className="text-sm">
                {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
              </span>
            </div>
          )}

          {subscription.cancel_at_period_end && (
            <div className="mt-4 p-3 bg-warning-50 border border-warning-200 rounded-lg">
              <p className="text-sm text-warning-800">
                Your subscription will not renew and will end on{' '}
                {subscription.current_period_end && formatDate(subscription.current_period_end)}.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}