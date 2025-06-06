import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  MessageCircle,
  BookOpen,
  Zap,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Instant Payouts',
    description: 'Get paid immediately when your content is approved. No waiting 30-60 days like other platforms.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Escrow Protection',
    description: 'Your payment is secured in escrow before you start work. Never worry about getting paid again.'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Fair Pricing',
    description: 'Set your own rates and negotiate directly with brands. No platform taking huge cuts.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Quality Brands',
    description: 'Work with vetted brands that value authentic content and long-term partnerships.'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Flexible Schedule',
    description: 'Choose campaigns that fit your schedule and content style. Work on your terms.'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Creator Resources',
    description: 'Access exclusive guides, templates, and community support to grow your influence.'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    handle: '@sarahstyle',
    followers: '45K',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    quote: 'LegitReach changed my creator journey. I went from struggling to monetize to earning $3K+ monthly in just 3 months.',
    earnings: '$3,200'
  },
  {
    name: 'Mike Chen',
    handle: '@techreviewmike',
    followers: '28K',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    quote: 'The instant payouts are a game-changer. No more waiting months to get paid for my work.',
    earnings: '$2,800'
  },
  {
    name: 'Emma Davis',
    handle: '@emmafitness',
    followers: '62K',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    quote: 'Finally, a platform that treats creators fairly. The brands here actually value authentic partnerships.',
    earnings: '$4,500'
  }
];

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Showcase your niche, engagement rate, and content style to attract the right brands.'
  },
  {
    number: '02',
    title: 'Get Matched',
    description: 'Our AI matches you with relevant campaigns based on your audience and interests.'
  },
  {
    number: '03',
    title: 'Create & Earn',
    description: 'Accept campaigns, create authentic content, and get paid instantly upon approval.'
  }
];

export function ForCreatorsPage() {
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
              <Link to="/for-creators" className="text-sm font-medium text-primary-600">
                For Creators
              </Link>
              <Link to="/for-brands" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                For Brands
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Creator-First Platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Turn Your Influence Into
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"> Income</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Join 500+ creators earning consistent income through authentic brand partnerships. 
                Get paid instantly, work with quality brands, and grow your influence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button as={Link} to="/signup/creator" size="xl" className="shadow-lg">
                  Start Earning Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="xl" className="shadow-sm">
                  Watch Demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  Free to join
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  Instant payouts
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  No hidden fees
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" 
                  alt="Creator dashboard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating earnings card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">This Month</p>
                    <p className="text-xl font-bold text-gray-900">$3,247</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Creators Choose LegitReach
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We built the platform we wished existed when we were creators ourselves
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-3 bg-primary-100 rounded-lg w-fit mb-4">
                  <div className="text-primary-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Start Earning in 3 Simple Steps
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              From signup to first payout in under 24 hours
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="text-6xl font-bold text-primary-100 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600">{step.description}</p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl flex items-center justify-center">
                    <div className="text-primary-600 opacity-50">
                      {step.number === '01' && <User className="w-24 h-24" />}
                      {step.number === '02' && <Users className="w-24 h-24" />}
                      {step.number === '03' && <DollarSign className="w-24 h-24" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Success Stories
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Real creators, real results
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.handle} • {testimonial.followers} followers</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning-400 text-warning-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Earnings</span>
                  <span className="font-bold text-success-600">{testimonial.earnings}</span>
                </div>
              </motion.div>
            ))}
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
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who've already transformed their passion into profit
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as={Link} to="/signup/creator" size="xl" variant="secondary" className="shadow-lg">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                as="a" 
                href="mailto:admanemanthan23@gmail.com?subject=Talk to Our Team - Creator Interest" 
                target="_blank"
                variant="outline" 
                size="xl" 
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Talk to Our Team
              </Button>
            </div>
            <p className="text-white/80 text-sm mt-4">
              No setup fees • No monthly costs • Get paid instantly
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
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">For Creators</h4>
              <ul className="space-y-2">
                <li><Link to="/signup/creator" className="text-gray-400 hover:text-white transition-colors">Get Started</Link></li>
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">Creator Resources</Link></li>
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Help Center Support" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Contact Us" target="_blank" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Careers Inquiry" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Press Inquiry" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
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