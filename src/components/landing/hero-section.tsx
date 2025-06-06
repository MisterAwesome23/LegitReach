import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 pointer-events-none" />
      
      {/* Background circles */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full -mt-20 -mr-20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-500/10 rounded-full -mb-20 -ml-20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="tracking-widest text-gray-500 uppercase text-sm font-medium">LEGIT REACH</span>
          </motion.div>
          
          <motion.h1
            className="mt-4 text-5xl font-extrabold text-gray-900 leading-tight tracking-tight md:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
              Creator-First
            </span>{' '}
            Marketing Platform
          </motion.h1>
          
          <motion.p
            className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            From micro-influencers, for micro-influencers. Monetize the audience you built –
            brands get real reach at half the cost of ads.
          </motion.p>
          
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              as={Link}
              to="/signup/creator"
              size="xl"
              className="shadow-lg"
            >
              I'm a Creator
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-6 text-gray-500"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-sm">Sign up free – limited time only</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}