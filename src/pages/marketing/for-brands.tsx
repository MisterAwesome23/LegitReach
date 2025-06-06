import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  Shield, 
  Users, 
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  Zap,
  Award,
  Clock,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Precise Targeting',
    description: 'AI-powered matching connects you with creators whose audience perfectly aligns with your brand.'
  },
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: 'Cost Effective',
    description: 'Get 3x better ROI compared to traditional ads. Pay only for approved content.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Escrow Protection',
    description: 'Your budget is protected in escrow. Only pay when content meets your standards.'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Real-Time Analytics',
    description: 'Track campaign performance, engagement rates, and ROI with detailed analytics.'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Fast Turnaround',
    description: 'Launch campaigns in 24 hours. Get content delivered within days, not weeks.'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Quality Creators',
    description: 'Work with vetted micro-influencers who create authentic, engaging content.'
  }
];

const stats = [
  { number: '3.2x', label: 'Average ROAS', description: 'vs traditional advertising' },
  { number: '500+', label: 'Active Creators', description: 'across all niches' },
  { number: '24hrs', label: 'Campaign Launch', description: 'from brief to live' },
  { number: '95%', label: 'Satisfaction Rate', description: 'brand approval rating' }
];

const caseStudies = [
  {
    brand: 'Nike',
    industry: 'Sports & Fitness',
    campaign: 'Summer Collection Launch',
    results: {
      reach: '2.3M',
      engagement: '8.5%',
      roas: '4.2x',
      cost: '60% less than ads'
    },
    quote: 'LegitReach helped us reach our target audience authentically. The ROI was incredible.',
    logo: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
  },
  {
    brand: 'Spotify',
    industry: 'Music & Entertainment',
    campaign: 'Premium Subscription Drive',
    results: {
      reach: '1.8M',
      engagement: '12.3%',
      roas: '5.1x',
      cost: '70% less than ads'
    },
    quote: 'The quality of creators and their authentic content exceeded our expectations.',
    logo: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg'
  }
];

const steps = [
  {
    number: '01',
    title: 'Set Your Goals',
    description: 'Define your campaign objectives, target audience, and budget. Our AI will optimize for your specific goals.'
  },
  {
    number: '02',
    title: 'Get Matched',
    description: 'Our algorithm finds creators whose audience demographics and interests align with your brand.'
  },
  {
    number: '03',
    title: 'Launch & Track',
    description: 'Approve content, track performance in real-time, and measure ROI with detailed analytics.'
  }
];

export function ForBrandsPage() {
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
              <Link to="/for-brands" className="text-sm font-medium text-primary-600">
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
              <Button as={Link} to="/signup/brand">
                Start Campaign
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-50 to-primary-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4 mr-2" />
                Performance Marketing
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Reach Real Audiences at
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary-600 to-primary-600"> Half the Cost</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Connect with authentic micro-influencers who drive real results. 
                Get 3x better ROI than traditional ads with transparent pricing and guaranteed performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button as={Link} to="/signup/brand" size="xl" className="shadow-lg">
                  Launch Your Campaign
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="xl" className="shadow-sm">
                  View Case Studies
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  No setup fees
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  Pay on approval
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  24hr launch
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
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg" 
                  alt="Brand dashboard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating ROI card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-success-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Campaign ROI</p>
                    <p className="text-xl font-bold text-gray-900">4.2x</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Brands Choose LegitReach
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Performance-driven influencer marketing that actually delivers results
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
                <div className="p-3 bg-secondary-100 rounded-lg w-fit mb-4">
                  <div className="text-secondary-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
              Launch Your Campaign in 3 Steps
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              From campaign brief to live content in 24 hours
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
                  <div className="text-6xl font-bold text-secondary-100 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600">{step.description}</p>
                </div>
                <div className="flex-1">
                  <div className="w-full h-64 bg-gradient-to-br from-secondary-100 to-primary-100 rounded-xl flex items-center justify-center">
                    <div className="text-secondary-600 opacity-50">
                      {step.number === '01' && <Target className="w-24 h-24" />}
                      {step.number === '02' && <Users className="w-24 h-24" />}
                      {step.number === '03' && <BarChart3 className="w-24 h-24" />}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
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
              Success Stories
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              See how brands are achieving exceptional results
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={study.logo} 
                    alt={study.brand}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{study.brand}</h3>
                    <p className="text-gray-600">{study.industry}</p>
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">{study.campaign}</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-primary-600">{study.results.reach}</div>
                    <div className="text-sm text-gray-600">Reach</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-secondary-600">{study.results.engagement}</div>
                    <div className="text-sm text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-success-600">{study.results.roas}</div>
                    <div className="text-sm text-gray-600">ROAS</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-warning-600">{study.results.cost}</div>
                    <div className="text-sm text-gray-600">Cost Savings</div>
                  </div>
                </div>
                
                <blockquote className="text-gray-700 italic">
                  "{study.quote}"
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-secondary-600 to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Scale Your Marketing?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 100+ brands getting better results at half the cost of traditional advertising
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as={Link} to="/signup/brand" size="xl" variant="secondary" className="shadow-lg">
                Start Your Campaign
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                as="a" 
                href="mailto:admanemanthan23@gmail.com?subject=Book a Demo - Brand Interest" 
                target="_blank"
                variant="outline" 
                size="xl" 
                className="border-white text-white hover:bg-white hover:text-secondary-600"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Book a Demo
              </Button>
            </div>
            <p className="text-white/80 text-sm mt-4">
              No setup fees • Pay only for approved content • 24hr campaign launch
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
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">For Brands</h4>
              <ul className="space-y-2">
                <li><Link to="/signup/brand" className="text-gray-400 hover:text-white transition-colors">Start Campaign</Link></li>
                <li><Link to="/for-brands" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">ROI Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Help Center Support" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=API Documentation" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Contact Sales" target="_blank" className="text-gray-400 hover:text-white transition-colors">Contact Sales</a></li>
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