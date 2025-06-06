import { motion } from 'framer-motion';
import { HeroSection } from '@/components/landing/hero-section';
import { HowItWorks } from '@/components/landing/how-it-works';
import { TrustIndicators } from '@/components/landing/trust-indicators';
import { Button } from '@/components/ui/button';
import { Instagram, Twitter, Youtube, Facebook, Linkedin, Github, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function LandingPage() {
  const [isSignupDropdownOpen, setIsSignupDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-primary-600">LegitReach</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/for-creators" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
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
              
              {/* Signup Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSignupDropdownOpen(!isSignupDropdownOpen)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                >
                  Sign up
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                
                {isSignupDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <Link
                      to="/signup/creator"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsSignupDropdownOpen(false)}
                    >
                      Sign up as Creator
                    </Link>
                    <Link
                      to="/signup/brand"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsSignupDropdownOpen(false)}
                    >
                      Sign up as Brand
                    </Link>
                    <Link
                      to="/signup/agency"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsSignupDropdownOpen(false)}
                    >
                      Sign up as Agency
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* How It Works */}
        <HowItWorks />

        {/* For Brands & Agencies */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">For Brands & Agencies</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Access authentic creators with genuine engaged audiences. Launch campaigns with clear ROAS targets, and only pay when content is approved.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-3">✓</span>
                    <span>Cost-effective reach vs traditional ads</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-3">✓</span>
                    <span>Transparent campaign performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-3">✓</span>
                    <span>Escrow protection - pay only on approval</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button as={Link} to="/signup/brand">Create Campaign</Button>
                  <Button variant="outline" as={Link} to="/pricing">See Pricing</Button>
                </div>
              </motion.div>
              <motion.div 
                className="rounded-xl overflow-hidden shadow-xl"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg" 
                  alt="Brand dashboard" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* For Creators */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="rounded-xl overflow-hidden shadow-xl order-2 md:order-1"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" 
                  alt="Creator dashboard" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="order-1 md:order-2"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">For Creators</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Turn your organic reach into income. Get matched with relevant brands, negotiate fair rates, and get paid instantly upon content approval.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <span className="text-secondary-500 mr-3">✓</span>
                    <span>Earn from your first campaign</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-500 mr-3">✓</span>
                    <span>Instant payouts after approval</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary-500 mr-3">✓</span>
                    <span>Creator resources & community</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button as={Link} to="/signup/creator">Browse Open Gigs</Button>
                  <Button variant="outline" as={Link} to="/for-creators">Join the Community</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <TrustIndicators />
      </main>

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
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">Browse Campaigns</Link></li>
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">Creator Resources</Link></li>
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">Affiliate Program</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">For Brands</h4>
              <ul className="space-y-2">
                <li><Link to="/for-brands" className="text-gray-400 hover:text-white transition-colors">Create Campaign</Link></li>
                <li><Link to="/for-brands" className="text-gray-400 hover:text-white transition-colors">Find Creators</Link></li>
                <li><Link to="/for-brands" className="text-gray-400 hover:text-white transition-colors">Success Stories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Contact" target="_blank" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} LegitReach. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="mailto:admanemanthan23@gmail.com?subject=Instagram" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="mailto:admanemanthan23@gmail.com?subject=Twitter" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="mailto:admanemanthan23@gmail.com?subject=YouTube" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="mailto:admanemanthan23@gmail.com?subject=LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}