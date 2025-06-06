import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  Eye,
  Edit,
  Target,
  Calendar,
  Award,
  ExternalLink,
  Search,
  Filter,
  Download,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateCampaignModal } from '@/components/modals/create-campaign-modal';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Campaign {
  id: string;
  title: string;
  status: string;
  total_budget: number;
  budget_used: number;
  matched_creators: number;
  roas: number;
  start_date: string;
  end_date: string;
  objective: string;
}

interface Creator {
  id: string;
  display_name: string;
  engagement_rate: number;
  completed_deals: number;
  total_sales: number;
  profile_img_url?: string;
  niche_tags: string[];
}

interface AffiliateData {
  total_links: number;
  total_clicks: number;
  total_sales: number;
  total_payouts: number;
}

export function BrandDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      title: 'Summer Fashion Collection',
      status: 'live',
      total_budget: 5000,
      budget_used: 2500,
      matched_creators: 8,
      roas: 3.2,
      start_date: '2024-12-01',
      end_date: '2024-12-31',
      objective: 'conversions'
    },
    {
      id: '2',
      title: 'Holiday Campaign',
      status: 'completed',
      total_budget: 3000,
      budget_used: 3000,
      matched_creators: 5,
      roas: 4.1,
      start_date: '2024-11-01',
      end_date: '2024-11-30',
      objective: 'impressions'
    },
    {
      id: '3',
      title: 'New Product Launch',
      status: 'draft',
      total_budget: 8000,
      budget_used: 0,
      matched_creators: 0,
      roas: 0,
      start_date: '2025-01-01',
      end_date: '2025-01-31',
      objective: 'affiliate'
    }
  ]);

  const [topCreators, setTopCreators] = useState<Creator[]>([
    {
      id: '1',
      display_name: 'Sarah Johnson',
      engagement_rate: 8.5,
      completed_deals: 12,
      total_sales: 15000,
      profile_img_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      niche_tags: ['Fashion', 'Lifestyle']
    },
    {
      id: '2',
      display_name: 'Mike Chen',
      engagement_rate: 7.2,
      completed_deals: 8,
      total_sales: 12000,
      profile_img_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      niche_tags: ['Tech', 'Gaming']
    },
    {
      id: '3',
      display_name: 'Emma Davis',
      engagement_rate: 9.1,
      completed_deals: 15,
      total_sales: 18000,
      profile_img_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      niche_tags: ['Beauty', 'Health']
    }
  ]);

  const [affiliateData, setAffiliateData] = useState<AffiliateData>({
    total_links: 12,
    total_clicks: 1250,
    total_sales: 45,
    total_payouts: 675
  });

  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [showCampaignDetails, setShowCampaignDetails] = useState(false);

  const handleCreateCampaign = (campaignData: any) => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      title: campaignData.title,
      status: 'draft',
      total_budget: parseFloat(campaignData.totalBudget),
      budget_used: 0,
      matched_creators: 0,
      roas: 0,
      start_date: campaignData.startDate,
      end_date: campaignData.endDate,
      objective: campaignData.objective
    };
    
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  const handleCampaignAction = (campaignId: string, action: string) => {
    setCampaigns(prev => prev.map(campaign => {
      if (campaign.id === campaignId) {
        switch (action) {
          case 'launch':
            return { ...campaign, status: 'live' };
          case 'pause':
            return { ...campaign, status: 'draft' };
          case 'complete':
            return { ...campaign, status: 'completed' };
          default:
            return campaign;
        }
      }
      return campaign;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-success-100 text-success-700';
      case 'draft': return 'bg-warning-100 text-warning-700';
      case 'completed': return 'bg-primary-100 text-primary-700';
      case 'cancelled': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your campaigns and track performance</p>
        </div>
        <Button onClick={() => setShowCampaignModal(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
              <p className="text-2xl font-bold text-primary-600">
                {campaigns.filter(c => c.status === 'live').length}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spend</p>
              <p className="text-2xl font-bold text-secondary-600">
                {formatCurrency(campaigns.reduce((sum, c) => sum + c.budget_used, 0))}
              </p>
            </div>
            <div className="p-3 bg-secondary-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-secondary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Matched Creators</p>
              <p className="text-2xl font-bold text-accent-600">
                {campaigns.reduce((sum, c) => sum + c.matched_creators, 0)}
              </p>
            </div>
            <div className="p-3 bg-accent-100 rounded-lg">
              <Users className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg ROAS</p>
              <p className="text-2xl font-bold text-success-600">
                {campaigns.length > 0 
                  ? (campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length).toFixed(1) + 'x'
                  : '0x'
                }
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Campaigns</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setShowCampaignModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>

        {campaigns.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Budget Used</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Creators</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">ROAS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{campaign.title}</h3>
                        <p className="text-sm text-gray-600">{campaign.objective}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{formatCurrency(campaign.budget_used)}</p>
                        <p className="text-sm text-gray-600">of {formatCurrency(campaign.total_budget)}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{campaign.matched_creators}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-success-600">{campaign.roas.toFixed(1)}x</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {campaign.status === 'draft' && (
                          <>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCampaignAction(campaign.id, 'launch')}
                            >
                              Launch
                            </Button>
                          </>
                        )}
                        {campaign.status === 'live' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleCampaignAction(campaign.id, 'pause')}
                          >
                            Pause
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-600 mb-4">Create your first campaign to start reaching creators</p>
            <Button onClick={() => setShowCampaignModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Creators */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-600" />
              Top Creators
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topCreators.map((creator, index) => (
              <div key={creator.id} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                  <img
                    src={creator.profile_img_url}
                    alt={creator.display_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{creator.display_name}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">{creator.engagement_rate}% engagement</p>
                      <div className="flex gap-1">
                        {creator.niche_tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-medium text-gray-900">{creator.completed_deals} deals</p>
                  <p className="text-sm text-success-600">{formatCurrency(creator.total_sales)} sales</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Browse All Creators
            </Button>
          </div>
        </div>

        {/* Affiliate Summary */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-secondary-600" />
              Affiliate Performance
            </h2>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Total Links</p>
              <p className="text-2xl font-bold text-gray-900">{affiliateData.total_links}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">{affiliateData.total_clicks}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{affiliateData.total_sales}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Total Payouts</p>
              <p className="text-2xl font-bold text-success-600">{formatCurrency(affiliateData.total_payouts)}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              View All Affiliate Links
            </Button>
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create New Affiliate Program
            </Button>
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      <CreateCampaignModal
        isOpen={showCampaignModal}
        onClose={() => setShowCampaignModal(false)}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
}