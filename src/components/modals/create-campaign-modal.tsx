import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, DollarSign, Target, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaignData: any) => void;
}

export function CreateCampaignModal({ isOpen, onClose, onSubmit }: CreateCampaignModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    objective: 'impressions',
    nicheTags: [] as string[],
    briefText: '',
    totalBudget: '',
    roasTarget: '',
    minPricePerCreator: '',
    startDate: '',
    endDate: ''
  });

  const nicheOptions = [
    'Fashion', 'Beauty', 'Fitness', 'Food', 'Travel', 'Tech', 'Gaming', 
    'Lifestyle', 'Business', 'Education', 'Art', 'Music', 'Sports', 'Health'
  ];

  const objectives = [
    { value: 'impressions', label: 'Brand Awareness', description: 'Maximize reach and impressions' },
    { value: 'conversions', label: 'Conversions', description: 'Drive sales and conversions' },
    { value: 'affiliate', label: 'Affiliate Sales', description: 'Commission-based sales' }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleNicheTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      nicheTags: prev.nicheTags.includes(tag)
        ? prev.nicheTags.filter(t => t !== tag)
        : [...prev.nicheTags, tag]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create New Campaign</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campaign Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Summer Collection Launch"
            />
          </div>

          {/* Objective */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Objective *
            </label>
            <div className="grid grid-cols-1 gap-3">
              {objectives.map((obj) => (
                <label key={obj.value} className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="objective"
                    value={obj.value}
                    checked={formData.objective === obj.value}
                    onChange={(e) => handleInputChange('objective', e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{obj.label}</div>
                    <div className="text-sm text-gray-600">{obj.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Niche Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Industries *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {nicheOptions.map((niche) => (
                <button
                  key={niche}
                  type="button"
                  onClick={() => toggleNicheTag(niche)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    formData.nicheTags.includes(niche)
                      ? 'bg-primary-100 border-primary-300 text-primary-700'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Budget ($) *
              </label>
              <input
                type="number"
                min="300"
                value={formData.totalBudget}
                onChange={(e) => handleInputChange('totalBudget', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price per Creator ($) *
              </label>
              <input
                type="number"
                min="50"
                value={formData.minPricePerCreator}
                onChange={(e) => handleInputChange('minPricePerCreator', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="100"
              />
            </div>
          </div>

          {/* ROAS Target */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ROAS Target (optional)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              value={formData.roasTarget}
              onChange={(e) => handleInputChange('roasTarget', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="3.0"
            />
          </div>

          {/* Campaign Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Brief */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Brief
            </label>
            <textarea
              value={formData.briefText}
              onChange={(e) => handleInputChange('briefText', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe your campaign goals, target audience, content requirements, and any specific guidelines..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Campaign
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}