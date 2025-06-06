import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Link as LinkIcon, 
  Plus,
  ExternalLink,
  Calendar,
  BookOpen,
  MessageCircle,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WithdrawFundsModal } from '@/components/modals/withdraw-funds-modal';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Gig {
  id: string;
  campaign_title: string;
  brand_name: string;
  price: number;
  status: 'invited' | 'signed' | 'in_progress' | 'completed';
  deadline: string;
  campaign_id: string;
}

interface AffiliateLink {
  id: string;
  brandName: string;
  legitUrl: string;
  originalUrl: string;
  clicks: number;
  sales: number;
  payoutPerSale: number;
  description?: string;
  createdAt: string;
  status: 'active' | 'paused' | 'expired';
  totalEarnings: number;
}

interface EarningsData {
  inEscrow: number;
  available: number;
  lifetime: number;
}

export function CreatorDashboard() {
  const [gigs, setGigs] = useState<Gig[]>([
    {
      id: '1',
      campaign_title: 'Summer Fashion Collection',
      brand_name: 'Nike',
      price: 250,
      status: 'invited',
      deadline: '2024-12-20',
      campaign_id: 'camp-1'
    },
    {
      id: '2',
      campaign_title: 'Tech Product Review',
      brand_name: 'Apple',
      price: 500,
      status: 'signed',
      deadline: '2024-12-25',
      campaign_id: 'camp-2'
    },
    {
      id: '3',
      campaign_title: 'Fitness Challenge',
      brand_name: 'Adidas',
      price: 300,
      status: 'in_progress',
      deadline: '2024-12-15',
      campaign_id: 'camp-3'
    },
    {
      id: '4',
      campaign_title: 'Holiday Campaign',
      brand_name: 'Spotify',
      price: 200,
      status: 'completed',
      deadline: '2024-12-10',
      campaign_id: 'camp-4'
    }
  ]);

  // These are affiliate links created by brands and assigned to this creator
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>([
    {
      id: '1',
      brandName: 'Nike',
      legitUrl: 'https://legitreach.app/r/nike-sarah-abc123',
      originalUrl: 'https://nike.com/shoes',
      clicks: 45,
      sales: 3,
      payoutPerSale: 15,
      description: 'Nike Air Max Collection - Exclusive for Sarah',
      createdAt: '2024-12-01',
      status: 'active',
      totalEarnings: 45
    },
    {
      id: '2',
      brandName: 'Spotify',
      legitUrl: 'https://legitreach.app/r/spotify-sarah-xyz789',
      originalUrl: 'https://spotify.com/premium',
      clicks: 23,
      sales: 1,
      payoutPerSale: 5,
      description: 'Spotify Premium Subscription - Creator Program',
      createdAt: '2024-12-05',
      status: 'active',
      totalEarnings: 5
    },
    {
      id: '3',
      brandName: 'TechCorp',
      legitUrl: 'https://legitreach.app/r/tech-sarah-def456',
      originalUrl: 'https://techcorp.com/gadgets',
      clicks: 12,
      sales: 0,
      payoutPerSale: 25,
      description: 'Latest Tech Gadgets - Holiday Special',
      createdAt: '2024-11-28',
      status: 'paused',
      totalEarnings: 0
    }
  ]);

  const [earnings, setEarnings] = useState<EarningsData>({ 
    inEscrow: 750, 
    available: 1250, 
    lifetime: 3500 
  });

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);
  const [showGigDetails, setShowGigDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleWithdrawFunds = (withdrawData: any) => {
    // Simulate withdrawal processing
    setEarnings(prev => ({
      ...prev,
      available: prev.available - withdrawData.amount
    }));
    
    // Show success message (in real app, this would be handled by a toast system)
    alert(`Withdrawal request for $${withdrawData.amount} submitted successfully!`);
  };

  const handleGigAction = (gigId: string, action: string) => {
    setGigs(prev => prev.map(gig => {
      if (gig.id === gigId) {
        switch (action) {
          case 'accept':
            return { ...gig, status: 'signed' as const };
          case 'decline':
            return { ...gig, status: 'invited' as const }; // Keep as invited for demo
          case 'submit':
            return { ...gig, status: 'in_progress' as const };
          default:
            return gig;
        }
      }
      return gig;
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'invited': return <Clock className="w-4 h-4 text-warning-500" />;
      case 'signed': return <AlertCircle className="w-4 h-4 text-primary-500" />;
      case 'in_progress': return <TrendingUp className="w-4 h-4 text-secondary-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-success-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'invited': return 'bg-warning-100 text-warning-700';
      case 'signed': return 'bg-primary-100 text-primary-700';
      case 'in_progress': return 'bg-secondary-100 text-secondary-700';
      case 'completed': return 'bg-success-100 text-success-700';
      case 'active': return 'bg-success-100 text-success-700';
      case 'paused': return 'bg-warning-100 text-warning-700';
      case 'expired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const gigsByStatus = {
    invited: gigs.filter(g => g.status === 'invited'),
    signed: gigs.filter(g => g.status === 'signed'),
    in_progress: gigs.filter(g => g.status === 'in_progress'),
    completed: gigs.filter(g => g.status === 'completed')
  };

  // Filter affiliate links based on search and status
  const filteredAffiliateLinks = affiliateLinks.filter(link => {
    const matchesSearch = link.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || link.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Creator Hub</h1>
          <p className="text-gray-600 mt-1">Manage your gigs and grow your earnings</p>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Escrow</p>
              <p className="text-2xl font-bold text-warning-600">{formatCurrency(earnings.inEscrow)}</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <Clock className="w-6 h-6 text-warning-600" />
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
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-success-600">{formatCurrency(earnings.available)}</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-success-600" />
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 w-full"
            onClick={() => setShowWithdrawModal(true)}
          >
            Withdraw to Bank
          </Button>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lifetime Earned</p>
              <p className="text-2xl font-bold text-primary-600">{formatCurrency(earnings.lifetime)}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* My Gigs Kanban */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-xl font-semibold mb-6">My Gigs</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Invited Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-warning-500" />
              <h3 className="font-medium text-gray-900">Invited ({gigsByStatus.invited.length})</h3>
            </div>
            <div className="space-y-3">
              {gigsByStatus.invited.map(gig => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedGig(gig);
                    setShowGigDetails(true);
                  }}
                >
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{gig.campaign_title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{gig.brand_name}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-success-600">{formatCurrency(gig.price)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                      Invited
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGigAction(gig.id, 'accept');
                      }}
                    >
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGigAction(gig.id, 'decline');
                      }}
                    >
                      Decline
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* In Progress Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-primary-500" />
              <h3 className="font-medium text-gray-900">In Progress ({gigsByStatus.signed.length})</h3>
            </div>
            <div className="space-y-3">
              {gigsByStatus.signed.map(gig => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedGig(gig);
                    setShowGigDetails(true);
                  }}
                >
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{gig.campaign_title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{gig.brand_name}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-success-600">{formatCurrency(gig.price)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                      Active
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGigAction(gig.id, 'submit');
                    }}
                  >
                    Submit Content
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awaiting Approval Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-secondary-500" />
              <h3 className="font-medium text-gray-900">Awaiting Approval ({gigsByStatus.in_progress.length})</h3>
            </div>
            <div className="space-y-3">
              {gigsByStatus.in_progress.map(gig => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedGig(gig);
                    setShowGigDetails(true);
                  }}
                >
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{gig.campaign_title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{gig.brand_name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-success-600">{formatCurrency(gig.price)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                      Review
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Paid Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success-500" />
              <h3 className="font-medium text-gray-900">Paid ({gigsByStatus.completed.length})</h3>
            </div>
            <div className="space-y-3">
              {gigsByStatus.completed.map(gig => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedGig(gig);
                    setShowGigDetails(true);
                  }}
                >
                  <h4 className="font-medium text-sm text-gray-900 mb-1">{gig.campaign_title}</h4>
                  <p className="text-xs text-gray-600 mb-2">{gig.brand_name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-success-600">{formatCurrency(gig.price)}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(gig.status)}`}>
                      Paid
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Affiliate Hub */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">My Affiliate Links</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
        
        {filteredAffiliateLinks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Brand</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Link</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sales</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Payout</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Earned</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAffiliateLinks.map(link => (
                  <tr key={link.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{link.brandName}</div>
                        {link.description && (
                          <div className="text-sm text-gray-600 truncate max-w-xs">{link.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-primary-600 truncate max-w-xs">{link.legitUrl}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(link.legitUrl)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(link.status)}`}>
                        {link.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{link.clicks}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{link.sales}</td>
                    <td className="py-3 px-4 text-sm font-medium text-success-600">{formatCurrency(link.payoutPerSale)}</td>
                    <td className="py-3 px-4 text-sm font-medium text-success-600">{formatCurrency(link.totalEarnings)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => window.open(link.originalUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No affiliate links yet</h3>
            <p className="text-gray-600 mb-4">
              Brands will create affiliate links specifically for you. Check back soon or reach out to brands you're working with.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                <strong>How it works:</strong> Brands create personalized affiliate links for you to share. 
                When someone purchases through your link, you earn a commission automatically.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Resources & Community */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-600" />
            Creator Resources
          </h2>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium text-sm text-gray-900">Boost Your Engagement</h3>
              <p className="text-xs text-gray-600">Learn proven strategies to increase your engagement rate</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium text-sm text-gray-900">Brand Negotiation Tips</h3>
              <p className="text-xs text-gray-600">Master the art of negotiating fair rates with brands</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium text-sm text-gray-900">Legal Basics for Creators</h3>
              <p className="text-xs text-gray-600">Understand contracts and protect your rights</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary-600" />
            Community
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-secondary-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-secondary-600" />
                <h3 className="font-medium text-gray-900">Join Discord</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">Connect with 500+ creators, share tips, and get support</p>
              <Button variant="outline" size="sm" className="w-full">
                Join Community
              </Button>
            </div>
            
            <div className="p-4 bg-primary-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-primary-600" />
                <h3 className="font-medium text-gray-900">Upcoming Events</h3>
              </div>
              <p className="text-sm text-gray-600">Creator Meetup - Dec 15, 2024</p>
              <p className="text-xs text-gray-500">Virtual networking event</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <WithdrawFundsModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onSubmit={handleWithdrawFunds}
        availableBalance={earnings.available}
      />
    </div>
  );
}