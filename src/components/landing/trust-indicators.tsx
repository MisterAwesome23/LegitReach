import { motion } from 'framer-motion';
import { Shield, Users, DollarSign, Star } from 'lucide-react';

const indicators = [
  {
    icon: <Users className="w-8 h-8 text-primary-500" />,
    value: '500+',
    label: 'Active Creators'
  },
  {
    icon: <DollarSign className="w-8 h-8 text-secondary-500" />,
    value: '100+',
    label: 'Brands'
  },
  {
    icon: <Shield className="w-8 h-8 text-accent-500" />,
    value: '100%',
    label: 'Escrow Secured'
  },
  {
    icon: <Star className="w-8 h-8 text-success-500" />,
    value: '4.9/5',
    label: 'CSAT'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function TrustIndicators() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {indicators.map((indicator, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center p-6"
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-4">
                {indicator.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{indicator.value}</div>
              <div className="text-gray-600">{indicator.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}