import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  DollarSign, 
  BarChart3,
  Building,
  UserPlus,
  ChevronDown,
  Target,
  Award,
  Calendar,
  Settings,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InviteBrandModal } from '@/components/modals/invite-brand-modal';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Brand {
  id: string;
  company_name: string;
  website_url?: string;
  created_at: string;
  campaigns_count: number;
  total_spend: number;
  total_roas: number;
  status: 'active' | 'pending' | 'inactive';
}

interface ConsolidatedStats {
  total_campaigns: number;
  total_spend: number;
  total_creators: number;
  avg_roas: number;
  total_affiliate_revenue: number;
}

interface TeamMember {
  id: string;
  email: string;
  display_name?: string;
  role: string;
  brand_id: string;
  created_at: string;
  status: 'active' | 'pending';
}

interface Invite {
  id: string;
  email: string;
  companyName: string;
  websiteUrl?: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  invitedAt: string;
}

export function AgencyDashboard() {
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: '1',
      company_name: 'Nike',
      website_url: 'https://nike.com',
      created_at: '2024-11-01',
      campaigns_count: 5,
      total_spend: 15000,
      total_roas: 3.8,
      status: 'active'
    },
    {
      id: '2',
      company_name: 'Spotify',
      website_url: 'https://spotify.com',
      created_at: '2024-11-15',
      campaigns_count: 3,
      total_spend: 8000,
      total_roas: 4.2,
      status: 'active'
    },
    {
      id: '3',
      company_name: 'TechCorp',
      website_url: 'https://techcorp.com',
      created_at: '2024-12-01',
      campaigns_count: 0,
      total_spend: 0,
      total_roas: 0,
      status: 'pending'
    }
  ]);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(brands[0] || null);
  const [consolidatedStats, setConsolidatedStats] = useState<ConsolidatedStats>({
    total_campaigns: 8,
    total_spend: 23000,
    total_creators: 24,
    avg_roas: 4.0,
    total_affiliate_revenue: 3450
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      email: 'john@nike.com',
      display_name: 'John Smith',
      role: 'Marketing Manager',
      brand_id: '1',
      created_at: '2024-11-01',
      status: 'active'
    },
    {
      id: '2',
      email: 'sarah@nike.com',
      display_name: 'Sarah Wilson',
      role: 'Campaign Specialist',
      brand_id: '1',
      created_at: '2024-11-05',
      status: 'active'
    }
  ]);

  const [invites, setInvites] = useState<Invite[]>([
    {
      id: '1',
      email: 'marketing@newbrand.com',
      companyName: 'NewBrand Inc',
      websiteUrl: 'https://newbrand.com',
      status: 'pending',
      invitedAt: '2024-12-01'
    }
  ]);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const handleInviteBrand = (inviteData: any) => {
    const newInvite: Invite = {
      id: Date.now().toString(),
      ...inviteData
    };
    setInvites(prev => [newInvite, ...prev]);
  };

  const handleInviteAction = (inviteId: string, action: 'resend' | 'cancel') => {
    if (action === 'cancel') {
      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
    } else if (action === 'resend') {
      // Simulate resending invite
      alert('Invite resent successfully!');
    }
  };

  const handleBrandAction = (brandId: string, action: 'activate' | 'deactivate' | 'remove') => {
    setBrands(prev => prev.map(brand => {
      if (brand.id === brandId) {
        switch (action) {
          case 'activate':
            return { ...brand, status: 'active' as const };
          case 'deactivate':
            return { ...brand, status: 'inactive' as const };
          default:
            return brand;
        }
      }
      return brand;
    }));

    if (action === 'remove') {
      setBrands(prev => prev.filter(brand => brand.id !== brandId));
      if (selectedBrand?.id === brandId) {
        setSelectedBrand(brands[0] || null);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-700';
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'inactive': return 'bg-gray-100 text-gray-700';
      case 'declined': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Brand Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agency Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage multiple brands and track consolidated performance</p>
          </div>
          
          {brands.length > 0 && (
            <div className="relative">
              <select
                value={selectedBrand?.id || ''}
                onChange={(e) => {
                  const brand = brands.find(b => b.id === e.target.value);
                  setSelectedBrand(brand || null);
                }}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.company_name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>
        
        <Button onClick={() => setShowInviteModal(true)} className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          Invite Brand
        </Button>
      </div>

      {/* Consolidated Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-primary-600">{consolidatedStats.total_campaigns}</p>
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
              <p className="text-2xl font-bold text-secondary-600">{formatCurrency(consolidatedStats.total_spend)}</p>
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
              <p className="text-sm font-medium text-gray-600">Total Creators</p>
              <p className="text-2xl font-bold text-accent-600">{consolidatedStats.total_creators}</p>
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
              <p className="text-2xl font-bold text-success-600">{consolidatedStats.avg_roas.toFixed(1)}x</p>
            </div>
            <div className="p-3 bg-success-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Affiliate Revenue</p>
              <p className="text-2xl font-bold text-warning-600">{formatCurrency(consolidatedStats.total_affiliate_revenue)}</p>
            </div>
            <div className="p-3 bg-warning-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Brands Overview */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Managed Brands</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search brands..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button onClick={() => setShowInviteModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Brand
            </Button>
          </div>
        </div>

        {brands.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Brand</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Campaigns</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Total Spend</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">ROAS</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map(brand => (
                  <tr key={brand.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-100 rounded-lg">
                          <Building className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{brand.company_name}</h3>
                          <p className="text-sm text-gray-600">
                            {brand.website_url ? new URL(brand.website_url).hostname : 'No website'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(brand.status)}`}>
                        {brand.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{brand.campaigns_count}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(brand.total_spend)}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-success-600">{brand.total_roas.toFixed(1)}x</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(brand.created_at)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        {brand.status === 'inactive' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleBrandAction(brand.id, 'activate')}
                          >
                            Activate
                          </Button>
                        )}
                        {brand.status === 'active' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleBrandAction(brand.id, 'deactivate')}
                          >
                            Deactivate
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
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No brands yet</h3>
            <p className="text-gray-600 mb-4">Invite your first brand to get started</p>
            <Button onClick={() => setShowInviteModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Brand
            </Button>
          </div>
        )}
      </div>

      {/* Pending Invites */}
      {invites.length > 0 && (
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Pending Invites</h2>
            <Button variant="outline" onClick={() => setShowInviteModal(true)}>
              <UserPlus className="w-4 h-4 mr-2" />
              Send Another Invite
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Invited</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invites.map(invite => (
                  <tr key={invite.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{invite.companyName}</h3>
                        {invite.websiteUrl && (
                          <p className="text-sm text-gray-600">{new URL(invite.websiteUrl).hostname}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{invite.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invite.status)}`}>
                        {invite.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(invite.invitedAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleInviteAction(invite.id, 'resend')}
                        >
                          Resend
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleInviteAction(invite.id, 'cancel')}
                        >
                          <Trash2 className="w-4 h-4 text-error-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Team Management for Selected Brand */}
      {selectedBrand && (
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Team Management - {selectedBrand.company_name}</h2>
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Team Member
            </Button>
          </div>

          {teamMembers.filter(member => member.brand_id === selectedBrand.id).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.filter(member => member.brand_id === selectedBrand.id).map(member => (
                    <tr key={member.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{member.display_name || 'No name'}</td>
                      <td className="py-3 px-4 text-gray-900">{member.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {member.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{formatDate(member.created_at)}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
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
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No team members</h3>
              <p className="text-gray-600 mb-4">Invite team members to collaborate on campaigns</p>
              <Button variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Team Member
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Invite Brand Modal */}
      <InviteBrandModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onSubmit={handleInviteBrand}
      />
    </div>
  );
}