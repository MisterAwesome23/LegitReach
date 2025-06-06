/*
  # Create remaining tables for the application
  
  1. New Tables
    - `deliverables` - Stores content deliverables for deals
    - `aff_links` - Stores affiliate links
    - `transactions` - Stores payment transactions
    - `ratings` - Stores ratings between creators and brands
  
  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Deliverables Table
CREATE TABLE IF NOT EXISTS deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES deals(id),
  content_url TEXT,
  content_screenshot_url TEXT,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  revision_requested BOOLEAN DEFAULT false,
  revision_notes TEXT,
  verified_by_admin BOOLEAN
);

-- Enable RLS on deliverables
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

-- Policies for deliverables
CREATE POLICY "Creators can read/update their deliverables"
  ON deliverables
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM deals
      JOIN campaign_matches ON deals.campaign_match_id = campaign_matches.id
      WHERE deliverables.deal_id = deals.id AND campaign_matches.creator_id = auth.uid()
    )
  );

CREATE POLICY "Brands can read deliverables for their campaigns"
  ON deliverables
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM deals
      JOIN campaign_matches ON deals.campaign_match_id = campaign_matches.id
      JOIN campaigns ON campaign_matches.campaign_id = campaigns.id
      WHERE deliverables.deal_id = deals.id AND campaigns.brand_id = auth.uid()
    )
  );

CREATE POLICY "Brands can update deliverables for their campaigns"
  ON deliverables
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM deals
      JOIN campaign_matches ON deals.campaign_match_id = campaign_matches.id
      JOIN campaigns ON campaign_matches.campaign_id = campaigns.id
      WHERE deliverables.deal_id = deals.id AND campaigns.brand_id = auth.uid()
    )
  );

-- Affiliate Links Table
CREATE TABLE IF NOT EXISTS aff_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES user_profiles(id),
  creator_id UUID NOT NULL REFERENCES user_profiles(id),
  original_url TEXT NOT NULL,
  legit_url TEXT NOT NULL,
  clicks INT DEFAULT 0,
  sales INT DEFAULT 0,
  payout_per_sale NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on aff_links
ALTER TABLE aff_links ENABLE ROW LEVEL SECURITY;

-- Policies for aff_links
CREATE POLICY "Creators can read their affiliate links"
  ON aff_links
  FOR SELECT
  TO authenticated
  USING (creator_id = auth.uid());

CREATE POLICY "Brands can read affiliate links for their brand"
  ON aff_links
  FOR SELECT
  TO authenticated
  USING (brand_id = auth.uid());

CREATE POLICY "Creators can insert affiliate links"
  ON aff_links
  FOR INSERT
  TO authenticated
  WITH CHECK (creator_id = auth.uid());

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id),
  aff_link_id UUID REFERENCES aff_links(id),
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('escrow_hold', 'escrow_capture', 'creator_payout', 'affiliate_payout')),
  stripe_charge_id TEXT,
  stripe_transfer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for transactions
CREATE POLICY "Creators can read their transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (
    (deal_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM deals
      JOIN campaign_matches ON deals.campaign_match_id = campaign_matches.id
      WHERE transactions.deal_id = deals.id AND campaign_matches.creator_id = auth.uid()
    )) OR
    (aff_link_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM aff_links
      WHERE transactions.aff_link_id = aff_links.id AND aff_links.creator_id = auth.uid()
    ))
  );

CREATE POLICY "Brands can read transactions for their deals"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (
    (deal_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM deals
      JOIN campaign_matches ON deals.campaign_match_id = campaign_matches.id
      JOIN campaigns ON campaign_matches.campaign_id = campaigns.id
      WHERE transactions.deal_id = deals.id AND campaigns.brand_id = auth.uid()
    )) OR
    (aff_link_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM aff_links
      WHERE transactions.aff_link_id = aff_links.id AND aff_links.brand_id = auth.uid()
    ))
  );

-- Ratings Table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rater_id UUID NOT NULL REFERENCES user_profiles(id),
  ratee_id UUID NOT NULL REFERENCES user_profiles(id),
  deal_id UUID NOT NULL REFERENCES deals(id),
  rating INT NOT NULL CHECK(rating BETWEEN 1 AND 5),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on ratings
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Policies for ratings
CREATE POLICY "Users can read ratings"
  ON ratings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own ratings"
  ON ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (rater_id = auth.uid());

CREATE POLICY "Users can update their own ratings"
  ON ratings
  FOR UPDATE
  TO authenticated
  USING (rater_id = auth.uid());