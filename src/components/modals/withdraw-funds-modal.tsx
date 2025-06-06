import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WithdrawFundsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (withdrawData: any) => void;
  availableBalance: number;
}

export function WithdrawFundsModal({ isOpen, onClose, onSubmit, availableBalance }: WithdrawFundsModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    method: 'bank_transfer',
    accountNumber: '',
    routingNumber: '',
    accountName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawData = {
      ...formData,
      amount: parseFloat(formData.amount),
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    onSubmit(withdrawData);
    setFormData({
      amount: '',
      method: 'bank_transfer',
      accountNumber: '',
      routingNumber: '',
      accountName: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl w-full max-w-md"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Withdraw Funds</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Available Balance */}
          <div className="bg-success-50 border border-success-200 rounded-lg p-3">
            <p className="text-sm text-success-800">
              <strong>Available Balance:</strong> ${availableBalance.toFixed(2)}
            </p>
          </div>

          {/* Withdrawal Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Withdrawal Amount ($) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                min="10"
                max={availableBalance}
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="100.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Minimum withdrawal: $10.00</p>
          </div>

          {/* Withdrawal Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Withdrawal Method
            </label>
            <select
              value={formData.method}
              onChange={(e) => handleInputChange('method', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
              <option value="stripe">Stripe Express</option>
            </select>
          </div>

          {/* Bank Details (if bank transfer selected) */}
          {formData.method === 'bank_transfer' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => handleInputChange('accountName', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number *
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Routing Number *
                </label>
                <input
                  type="text"
                  value={formData.routingNumber}
                  onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123456789"
                />
              </div>
            </>
          )}

          {/* Processing Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>Processing Time:</strong> Bank transfers typically take 1-3 business days. 
              PayPal and Stripe transfers are usually instant.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Request Withdrawal
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}