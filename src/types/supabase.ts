export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          role: string
          display_name: string | null
          bio: string | null
          social_handles: Json | null
          niche_tags: string[] | null
          engagement_rate: number | null
          price_per_gig: number | null
          profile_img_url: string | null
          company_name: string | null
          website_url: string | null
          ad_budget_range: number[] | null
          organization_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          role: string
          display_name?: string | null
          bio?: string | null
          social_handles?: Json | null
          niche_tags?: string[] | null
          engagement_rate?: number | null
          price_per_gig?: number | null
          profile_img_url?: string | null
          company_name?: string | null
          website_url?: string | null
          ad_budget_range?: number[] | null
          organization_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: string
          display_name?: string | null
          bio?: string | null
          social_handles?: Json | null
          niche_tags?: string[] | null
          engagement_rate?: number | null
          price_per_gig?: number | null
          profile_img_url?: string | null
          company_name?: string | null
          website_url?: string | null
          ad_budget_range?: number[] | null
          organization_name?: string | null
          created_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          brand_id: string
          title: string
          objective: string
          niche_tags: string[]
          brief_text: string | null
          total_budget: number
          roas_target: number | null
          min_price_per_creator: number
          start_date: string
          end_date: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          title: string
          objective: string
          niche_tags: string[]
          brief_text?: string | null
          total_budget: number
          roas_target?: number | null
          min_price_per_creator: number
          start_date: string
          end_date: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          title?: string
          objective?: string
          niche_tags?: string[]
          brief_text?: string | null
          total_budget?: number
          roas_target?: number | null
          min_price_per_creator?: number
          start_date?: string
          end_date?: string
          status?: string
          created_at?: string
        }
      }
      campaign_matches: {
        Row: {
          id: string
          campaign_id: string
          creator_id: string
          match_score: number | null
          invited_by: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          creator_id: string
          match_score?: number | null
          invited_by: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          creator_id?: string
          match_score?: number | null
          invited_by?: string
          status?: string
          created_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          campaign_match_id: string
          contract_url: string | null
          signed_by_brand: boolean
          signed_by_creator: boolean
          status: string
          stripe_payment_intent_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          campaign_match_id: string
          contract_url?: string | null
          signed_by_brand?: boolean
          signed_by_creator?: boolean
          status: string
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          campaign_match_id?: string
          contract_url?: string | null
          signed_by_brand?: boolean
          signed_by_creator?: boolean
          status?: string
          stripe_payment_intent_id?: string | null
          created_at?: string
        }
      }
      deliverables: {
        Row: {
          id: string
          deal_id: string
          content_url: string | null
          content_screenshot_url: string | null
          submitted_at: string | null
          approved_at: string | null
          revision_requested: boolean
          revision_notes: string | null
          verified_by_admin: boolean | null
        }
        Insert: {
          id?: string
          deal_id: string
          content_url?: string | null
          content_screenshot_url?: string | null
          submitted_at?: string | null
          approved_at?: string | null
          revision_requested?: boolean
          revision_notes?: string | null
          verified_by_admin?: boolean | null
        }
        Update: {
          id?: string
          deal_id?: string
          content_url?: string | null
          content_screenshot_url?: string | null
          submitted_at?: string | null
          approved_at?: string | null
          revision_requested?: boolean
          revision_notes?: string | null
          verified_by_admin?: boolean | null
        }
      }
      aff_links: {
        Row: {
          id: string
          brand_id: string
          creator_id: string
          original_url: string
          legit_url: string
          clicks: number
          sales: number
          payout_per_sale: number
          created_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          creator_id: string
          original_url: string
          legit_url: string
          clicks?: number
          sales?: number
          payout_per_sale: number
          created_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          creator_id?: string
          original_url?: string
          legit_url?: string
          clicks?: number
          sales?: number
          payout_per_sale?: number
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          deal_id: string | null
          aff_link_id: string | null
          amount: number
          currency: string
          type: string
          stripe_charge_id: string | null
          stripe_transfer_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          deal_id?: string | null
          aff_link_id?: string | null
          amount: number
          currency: string
          type: string
          stripe_charge_id?: string | null
          stripe_transfer_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          deal_id?: string | null
          aff_link_id?: string | null
          amount?: number
          currency?: string
          type?: string
          stripe_charge_id?: string | null
          stripe_transfer_id?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      creator_profiles: {
        Row: {
          id: string
          role: string
          display_name: string | null
          bio: string | null
          social_handles: Json | null
          niche_tags: string[] | null
          engagement_rate: number | null
          price_per_gig: number | null
          profile_img_url: string | null
          created_at: string
        }
      }
      brand_profiles: {
        Row: {
          id: string
          role: string
          company_name: string | null
          website_url: string | null
          niche_tags: string[] | null
          ad_budget_range: number[] | null
          created_at: string
        }
      }
    }
  }
}