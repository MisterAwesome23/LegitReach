import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  ArrowRight, 
  Zap,
  Shield,
  Users,
  BarChart3,
  MessageCircle,
  Crown,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/stripe/product-card';
import { stripeProducts } from '@/stripe-config';

const creatorPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Create unlimited affiliate links',
      'Basic analytics dashboard',
      'Email support',
      'Community access',
      'Standard payout (3-5 days)'
    ],
    limitations: [
      'Limited to 5 active campaigns',
      'Basic creator profile',
      'No priority matching'
    ],
    cta: 'Get Started Free',
    popular: false,
    color: 'gray'
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For serious content creators',
    features: [
      'Everything in Free',
      'Unlimited active campaigns',
      'Advanced analytics & insights',
      'Priority brand matching',
      'Instant payouts (same day)',
      'Custom creator profile',
      'Priority support',
      'Exclusive brand partnerships'
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    popular: true,
    color: 'primary'
  },
  {
    name: 'Elite',
    price: '$99',
    period: 'per month',
    description: 'For top-tier influencers',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom contract terms',
      'White-label options',
      'Advanced reporting suite',
      'API access',
      'Custom integrations',
      'VIP event invitations'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
    color: 'secondary'
  }
];

const brandPlans = [
  {
    name: 'Starter',
    price: '$99',
    period: 'per month',
    description: 'Perfect for small businesses',
    features: [
      '5 active campaigns',
      'Up to 20 creator matches',
      'Basic analytics dashboard',
      'Email support',
      'Standard campaign tools',
      'Escrow protection'
    ],
    limitations: [
      'Limited targeting options',
      'Basic reporting',
      'No API access'
    ],
    cta: 'Start Free Trial',
    popular: false,
    color: 'gray'
  },
  {
    name: 'Growth',
    price: '$299',
    period: 'per month',
    description: 'For growing brands',
    features: [
      'Unlimited campaigns',
      'Up to 100 creator matches',
      'Advanced analytics & ROI tracking',
      'Priority support',
      'Advanced targeting & filters',
      'Custom campaign briefs',
      'Performance optimization',
      'Bulk campaign management'
    ],
    limitations: [],
    cta: 'Start Growth Trial',
    popular: true,
    color: 'primary'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For large organizations',
    features: [
      'Everything in Growth',
      'Unlimited creator matches',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'White-label solutions',
      'Advanced reporting suite',
      'SLA guarantees',
      'Custom contract terms'
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
    color: 'secondary'
  }
];

const agencyFeatures = [
  'Manage multiple brand accounts',
  'Consolidated billing & reporting',
  'Team collaboration tools',
  'Client management dashboard',
  'White-label options',
  'Volume discounts',
  'Dedicated support',
  'Custom integrations'
];

const faqs = [
  {
    question: 'How does pricing work for creators?',
    answer: 'Creators can join for free and upgrade to Pro or Elite for additional features. We never take a commission from your earnings - you keep 100% of what you earn from campaigns and affiliate sales.'
  },
  {
    question: 'What fees do brands pay?',
    answer: 'Brands pay a monthly subscription fee plus campaign costs. There are no hidden fees or commissions. You only pay for approved content and successful campaign outcomes.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! Brands get a 14-day free trial of any paid plan. Creators can use the free plan indefinitely or try Pro free for 7 days.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. All plans are month-to-month with no long-term contracts. You can upgrade, downgrade, or cancel anytime from your dashboard.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also pay by invoice.'
  },
  {
    question: 'Do you offer volume discounts?',
    answer: 'Yes! Agencies and enterprise customers can get volume discounts based on their usage. Contact our sales team for custom pricing.'
  }
];

export function PricingPage() {
  const [userType, setUserType] = useState<'creator' | 'brand' | 'products'>('creator');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const currentPlans = userType === 'creator' ? creatorPlans : brandPlans;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-primary-600">LegitReach</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/for-creators" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                For Creators
              </Link>
              <Link to="/for-brands" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                For Brands
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-primary-600">
                Pricing
              </Link>
              <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Log in
              </Link>
              <Button as={Link} to="/signup/creator">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"> Pricing</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no commissions, no surprises.
            </p>
            
            {/* User Type Toggle */}
            <div className="inline-flex items-center p-1 bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <button
                onClick={() => setUserType('creator')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  userType === 'creator' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Creators
              </button>
              <button
                onClick={() => setUserType('brand')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  userType === 'brand' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Brands
              </button>
              <button
                onClick={() => setUserType('products')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  userType === 'products' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Products
              </button>
            </div>

            {/* Billing Period Toggle (for brands only) */}
            {userType === 'brand' && (
              <div className="inline-flex items-center p-1 bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingPeriod === 'monthly' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    billingPeriod === 'yearly' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-success-500 text-white text-xs px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      {userType === 'products' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Available Products
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  LegitReach Products
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Explore our available products and services. Secure payments powered by Stripe.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {stripeProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  className={`${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Plans (for creators and brands) */}
      {userType !== 'products' && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {currentPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-2xl border-2 p-8 ${
                    plan.popular 
                      ? 'border-primary-500 shadow-xl scale-105' 
                      : 'border-gray-200 shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="text-gray-600 ml-2">/{plan.period}</span>}
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${plan.popular ? '' : 'variant-outline'}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    as={plan.cta.includes('Contact') ? 'a' : Link}
                    to={plan.name === 'Free' ? '/signup/creator' : 
                        plan.cta.includes('Contact') ? undefined : 
                        userType === 'creator' ? '/signup/creator' : '/signup/brand'}
                    href={plan.cta.includes('Contact') ? 'mailto:admanemanthan23@gmail.com?subject=Contact Sales - Pricing Inquiry' : undefined}
                    target={plan.cta.includes('Contact') ? '_blank' : undefined}
                  >
                    {plan.cta}
                    {!plan.cta.includes('Contact') && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agency Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-6">
                <Crown className="w-4 h-4 mr-2" />
                For Agencies
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Agency Solutions
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Manage multiple brands with our comprehensive agency platform
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {agencyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-left">
                    <Check className="w-5 h-5 text-success-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button as={Link} to="/signup/agency" size="lg">
                  Start Agency Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  as="a" 
                  href="mailto:admanemanthan23@gmail.com?subject=Schedule Demo - Agency Interest" 
                  target="_blank"
                  variant="outline" 
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Schedule Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our pricing
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators and brands already using LegitReach
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as={Link} to="/signup/creator" size="xl" variant="secondary" className="shadow-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Start as Creator
              </Button>
              <Button as={Link} to="/signup/brand" size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                <Zap className="w-5 h-5 mr-2" />
                Start as Brand
              </Button>
            </div>
            <p className="text-white/80 text-sm mt-4">
              Free to start • No setup fees • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">LegitReach</h3>
              <p className="text-gray-400">
                The creator-first marketing platform connecting micro-influencers with brands.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">For Creators</Link></li>
                <li><Link to="/for-brands" className="text-gray-400 hover:text-white transition-colors">For Brands</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Help Center Support" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Contact Us" target="_blank" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Status Page" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Blog Inquiry" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Careers Inquiry" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LegitReach. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="mailto:admanemanthan23@gmail.com?subject=Privacy Policy" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="mailto:admanemanthan23@gmail.com?subject=Terms of Service" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="mailto:admanemanthan23@gmail.com?subject=Cookie Policy" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}