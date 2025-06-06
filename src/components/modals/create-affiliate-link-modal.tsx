import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Link, DollarSign, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateAffiliateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (linkData: any) => void;
}

export function CreateAffiliateLinkModal({ isOpen, onClose, onSubmit }: CreateAffiliateLinkModalProps) {
  const [formData, setFormData] = useState({
    brandName: '',
    originalUrl: '',
    payoutPerSale: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique short code for the affiliate link
    const shortCode = Math.random().toString(36).substring(2, 10);
    const legitUrl = `https://legitreach.app/r/${shortCode}`;
    
    const linkData = {
      ...formData,
      legitUrl,
      clicks: 0,
      sales: 0,
      createdAt: new Date().toISOString()
    };
    
    onSubmit(linkData);
    setFormData({
      brandName: '',
      originalUrl: '',
      payoutPerSale: '',
      description: ''
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
            <h2 className="text-xl font-semibold">Create Affiliate Link</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Brand Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Nike, Spotify, etc."
              />
            </div>
          </div>

          {/* Original URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product/Page URL *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={formData.originalUrl}
                onChange={(e) => handleInputChange('originalUrl', e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://example.com/product"
              />
            </div>
          </div>

          {/* Payout per Sale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout per Sale ($) *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.payoutPerSale}
                onChange={(e) => handleInputChange('payoutPerSale', e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="5.00"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Brief description of the product or campaign..."
            />
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>How it works:</strong> We'll generate a unique tracking link that you can share. 
              When someone makes a purchase through your link, you'll earn the specified commission.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Link
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}