/*
  # Create deals table
  
  1. New Tables
    - `deals` - Stores deal information between creators and brands
      - `id` (uuid, primary key)
      - `campaign_match_id` (uuid, references campaign_matches.id)
      - Deal details like contract status, payment status, etc.
  
  2. Security
    - Enable RLS on deals
    - Add policies for creators to read/update deals for their matches
    - Add policies for brands to read/update deals for their campaigns
*/

CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_match_id UUID NOT NULL REFERENCES campaign_matches(id),
  contract_url TEXT,
  signed_by_brand BOOLEAN DEFAULT false,
  signed_by_creator BOOLEAN DEFAULT false,
  status TEXT NOT NULL CHECK(status IN ('pending', 'signed', 'in_progress', 'completed', 'dispute')),
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Creators can read deals for their matches
CREATE POLICY "Creators can read their deals"
  ON deals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaign_matches
      WHERE campaign_matches.id = campaign_match_id AND campaign_matches.creator_id = auth.uid()
    )
  );

-- Creators can update deals for their matches
CREATE POLICY "Creators can update their deals"
  ON deals
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaign_matches
      WHERE campaign_matches.id = campaign_match_id AND campaign_matches.creator_id = auth.uid()
    )
  );

-- Brands can read deals for their campaigns
CREATE POLICY "Brands can read deals for their campaigns"
  ON deals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaign_matches
      JOIN campaigns ON campaign_matches.campaign_id = campaigns.id
      WHERE campaign_matches.id = campaign_match_id AND campaigns.brand_id = auth.uid()
    )
  );

-- Brands can insert deals for their campaigns
CREATE POLICY "Brands can insert deals for their campaigns"
  ON deals
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaign_matches
      JOIN campaigns ON campaign_matches.campaign_id = campaigns.id
      WHERE campaign_matches.id = campaign_match_id AND campaigns.brand_id = auth.uid()
    )
  );

-- Brands can update deals for their campaigns
CREATE POLICY "Brands can update deals for their campaigns"
  ON deals
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaign_matches
      JOIN campaigns ON campaign_matches.campaign_id = campaigns.id
      WHERE campaign_matches.id = campaign_match_id AND campaigns.brand_id = auth.uid()
    )
  );

-- Admins can read all deals
CREATE POLICY "Admins can read all deals"
  ON deals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );