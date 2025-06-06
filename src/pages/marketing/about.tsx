import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Users, 
  Target, 
  Award,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    bio: 'Former creator with 500K+ followers. Built LegitReach after experiencing the pain points of creator monetization firsthand.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    bio: 'Ex-Google engineer with 10+ years building scalable platforms. Passionate about creator economy technology.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: 'Emily Watson',
    role: 'Head of Creator Success',
    bio: 'Former talent manager who worked with 100+ influencers. Dedicated to creator empowerment and fair partnerships.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  },
  {
    name: 'David Kim',
    role: 'Head of Brand Partnerships',
    bio: 'Ex-marketing director at Fortune 500 companies. Expert in performance marketing and brand-creator collaborations.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    social: {
      linkedin: '#',
      twitter: '#'
    }
  }
];

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Creator-First',
    description: 'Every decision we make prioritizes creator success and fair compensation. We believe creators deserve better.'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Transparency',
    description: 'No hidden fees, no surprise deductions. Clear pricing and honest communication in everything we do.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community',
    description: 'Building a supportive ecosystem where creators and brands can form authentic, long-term partnerships.'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Innovation',
    description: 'Constantly improving our platform with cutting-edge technology to serve our users better.'
  }
];

const milestones = [
  {
    year: '2023',
    title: 'Company Founded',
    description: 'Started with a simple mission: make creator monetization fair and transparent'
  },
  {
    year: '2023',
    title: 'First 100 Creators',
    description: 'Onboarded our first cohort of creators and launched beta platform'
  },
  {
    year: '2024',
    title: 'Series A Funding',
    description: 'Raised $5M to expand platform and grow our creator community'
  },
  {
    year: '2024',
    title: '500+ Creators',
    description: 'Reached 500+ active creators and 100+ brand partnerships'
  },
  {
    year: '2024',
    title: '$1M+ Paid Out',
    description: 'Crossed $1M in total creator earnings with 99.9% payment success rate'
  }
];

const stats = [
  { number: '500+', label: 'Active Creators' },
  { number: '100+', label: 'Brand Partners' },
  { number: '$1M+', label: 'Creator Earnings' },
  { number: '99.9%', label: 'Payment Success' }
];

export function AboutPage() {
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
              <Link to="/pricing" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">
                Pricing
              </Link>
              <Link to="/about" className="text-sm font-medium text-primary-600">
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
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Built by Creators,
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600"> for Creators</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                We're on a mission to make creator monetization fair, transparent, and profitable. 
                Every creator deserves to be paid fairly for their work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button as={Link} to="/signup/creator" size="xl">
                  Join Our Mission
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  as="a" 
                  href="mailto:admanemanthan23@gmail.com?subject=Contact Us - About Page" 
                  target="_blank"
                  variant="outline" 
                  size="xl"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </div>
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
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-xl text-gray-600">
                From frustration to solution
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" 
                  alt="Our story" 
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  LegitReach was born from personal experience. Our founder, Sarah, was a successful creator 
                  with over 500K followers, but she struggled with the same problems every creator faces: 
                  unfair payment terms, long payment delays, and platforms taking huge cuts.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  After one too many campaigns where she waited 90 days to get paid (and then had 30% 
                  taken in fees), she decided enough was enough. She teamed up with Marcus, a former 
                  Google engineer, to build the platform creators actually deserve.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Today, LegitReach is the fastest-growing creator platform, with over 500 creators 
                  earning fair compensation and getting paid instantly. We're just getting started.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The principles that guide everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-xl mb-4">
                  <div className="text-primary-600">{value.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Key milestones in building the creator-first platform
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-6 pb-12"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="text-sm font-medium text-primary-600 mb-1">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Team
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              The people building the future of creator monetization
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-primary-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-400 hover:text-primary-600 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-400 hover:text-primary-600 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
              <p className="text-xl text-gray-600">
                We'd love to hear from you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-3">Get in touch with our team</p>
                <a href="mailto:admanemanthan23@gmail.com" target="_blank" className="text-primary-600 hover:text-primary-700 font-medium">
                  admanemanthan23@gmail.com
                </a>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 rounded-lg mb-4">
                  <MapPin className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-3">Come say hi at our office</p>
                <p className="text-gray-700">
                  San Francisco, CA<br />
                  United States
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-lg mb-4">
                  <Users className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Join Community</h3>
                <p className="text-gray-600 mb-3">Connect with other creators</p>
                <a href="mailto:admanemanthan23@gmail.com?subject=Discord Community" className="text-accent-600 hover:text-accent-700 font-medium">
                  Discord Community
                </a>
              </motion.div>
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
              Ready to Join Our Mission?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Be part of the movement to make creator monetization fair and transparent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button as={Link} to="/signup/creator" size="xl" variant="secondary" className="shadow-lg">
                <Heart className="w-5 h-5 mr-2" />
                Join as Creator
              </Button>
              <Button as={Link} to="/signup/brand" size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                <Target className="w-5 h-5 mr-2" />
                Partner as Brand
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">LegitReach</h3>
              <p className="text-gray-400 mb-4">
                The creator-first marketing platform connecting micro-influencers with brands.
              </p>
              <div className="flex space-x-4">
                <a href="mailto:admanemanthan23@gmail.com?subject=Twitter" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="mailto:admanemanthan23@gmail.com?subject=LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:admanemanthan23@gmail.com?subject=GitHub" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
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
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Press" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Help Center" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><Link to="/for-creators" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Contact" target="_blank" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="mailto:admanemanthan23@gmail.com?subject=Status" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LegitReach. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="mailto:admanemanthan23@gmail.com?subject=Privacy Policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="mailto:admanemanthan23@gmail.com?subject=Terms of Service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="mailto:admanemanthan23@gmail.com?subject=Cookie Policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}