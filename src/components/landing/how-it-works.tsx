import { motion } from 'framer-motion';
import { DollarSign, UserCheck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <DollarSign size={32} className="text-primary-500" />,
    title: 'Brands Set Budget & Goals',
    description: 'Input campaign details, budget $≥300, ROAS target'
  },
  {
    icon: <UserCheck size={32} className="text-secondary-500" />,
    title: 'Creators Accept & Deliver',
    description: 'AI match + invite, contract signing, content creation'
  },
  {
    icon: <CheckCircle size={32} className="text-accent-500" />,
    title: 'Approve & Instant Payout',
    description: 'Brand approves, escrow captures, creator receives funds'
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold text-gray-900"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.div 
            className="h-1 w-24 bg-primary-500 mx-auto mt-4"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative flex flex-col items-center text-center p-6 rounded-xl bg-white border border-gray-100 shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                {index + 1}
              </div>
              
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-5 w-10 h-0.5 bg-gray-200">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}