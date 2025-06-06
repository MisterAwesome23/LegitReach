export interface User {
  id: string;
  email: string;
  profile?: UserProfile;
}

export interface UserProfile {
  id: string;
  role: 'creator' | 'brand' | 'agency' | 'admin';
  display_name?: string;
  bio?: string;
  social_handles?: Record<string, string>;
  niche_tags?: string[];
  engagement_rate?: number;
  price_per_gig?: number;
  profile_img_url?: string;
  company_name?: string;
  website_url?: string;
  ad_budget_range?: [number, number];
  organization_name?: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  brand_id: string;
  title: string;
  objective: 'impressions' | 'conversions' | 'affiliate';
  niche_tags: string[];
  brief_text?: string;
  total_budget: number;
  roas_target?: number;
  min_price_per_creator: number;
  start_date: string;
  end_date: string;
  status: 'draft' | 'live' | 'completed' | 'cancelled';
  created_at: string;
}

export interface CampaignMatch {
  id: string;
  campaign_id: string;
  creator_id: string;
  match_score?: number;
  invited_by: 'AI' | 'brand';
  status: 'invited' | 'accepted' | 'declined';
  created_at: string;
  campaign?: Campaign;
  creator?: UserProfile;
}

export interface Deal {
  id: string;
  campaign_match_id: string;
  contract_url?: string;
  signed_by_brand: boolean;
  signed_by_creator: boolean;
  status: 'pending' | 'signed' | 'in_progress' | 'completed' | 'dispute';
  stripe_payment_intent_id?: string;
  created_at: string;
  campaign_match?: CampaignMatch;
}

export interface Deliverable {
  id: string;
  deal_id: string;
  content_url?: string;
  content_screenshot_url?: string;
  submitted_at?: string;
  approved_at?: string;
  revision_requested: boolean;
  revision_notes?: string;
  verified_by_admin?: boolean;
  deal?: Deal;
}

export interface AffiliateLink {
  id: string;
  brand_id: string;
  creator_id: string;
  original_url: string;
  legit_url: string;
  clicks: number;
  sales: number;
  payout_per_sale: number;
  created_at: string;
  brand?: UserProfile;
  creator?: UserProfile;
}

export interface Transaction {
  id: string;
  deal_id?: string;
  aff_link_id?: string;
  amount: number;
  currency: string;
  type: 'escrow_hold' | 'escrow_capture' | 'creator_payout' | 'affiliate_payout';
  stripe_charge_id?: string;
  stripe_transfer_id?: string;
  created_at: string;
  deal?: Deal;
  aff_link?: AffiliateLink;
}