/*
  # Create campaign matches table
  
  1. New Tables
    - `campaign_matches` - Stores matches between campaigns and creators
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, references campaigns.id)
      - `creator_id` (uuid, references user_profiles.id)
      - Match details like score, status, etc.
  
  2. Security
    - Enable RLS on campaign_matches
    - Add policies for creators to read/update matches for their profile
    - Add policies for brands to read/update matches for their campaigns
*/

CREATE TABLE IF NOT EXISTS campaign_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  creator_id UUID NOT NULL REFERENCES user_profiles(id),
  match_score NUMERIC,
  invited_by TEXT NOT NULL CHECK(invited_by IN ('AI', 'brand')),
  status TEXT NOT NULL CHECK(status IN ('invited', 'accepted', 'declined')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE campaign_matches ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Creators can read matches for their profile
CREATE POLICY "Creators can read their matches"
  ON campaign_matches
  FOR SELECT
  TO authenticated
  USING (auth.uid() = creator_id);

-- Creators can update matches for their profile
CREATE POLICY "Creators can update their matches"
  ON campaign_matches
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id);

-- Brands can read matches for their campaigns
CREATE POLICY "Brands can read matches for their campaigns"
  ON campaign_matches
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_id AND campaigns.brand_id = auth.uid()
    )
  );

-- Brands can insert matches for their campaigns
CREATE POLICY "Brands can insert matches for their campaigns"
  ON campaign_matches
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_id AND campaigns.brand_id = auth.uid()
    )
  );

-- Brands can update matches for their campaigns
CREATE POLICY "Brands can update matches for their campaigns"
  ON campaign_matches
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM campaigns
      WHERE campaigns.id = campaign_id AND campaigns.brand_id = auth.uid()
    )
  );

-- Admins can read all matches
CREATE POLICY "Admins can read all matches"
  ON campaign_matches
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );