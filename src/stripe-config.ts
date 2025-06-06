export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SRpglrecfzU9Ip',
    priceId: 'price_1RWw1PPF6gBAKthyeMA2RoHI',
    name: 'LegitReach Demo Product',
    description: 'This is to test LegitReach Stripe Connectivity',
    mode: 'payment',
    price: 23.00,
    currency: 'usd'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};