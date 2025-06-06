import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function CheckoutCanceledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-error-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-4"
              >
                <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-error-600" />
                </div>
              </motion.div>
              
              <CardTitle className="text-2xl text-gray-900">
                Payment Canceled
              </CardTitle>
              <CardDescription className="text-lg">
                Your payment was not processed
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  No charges were made to your account. You can try again or contact support if you're experiencing issues.
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link to="/pricing">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link to="/dashboard">
                    <Home className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </Button>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">
                  Having trouble with payment?
                </p>
                <Button asChild variant="link" size="sm">
                  <a href="mailto:admanemanthan23@gmail.com?subject=Payment Issue">
                    Contact Support
                    <ArrowLeft className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}