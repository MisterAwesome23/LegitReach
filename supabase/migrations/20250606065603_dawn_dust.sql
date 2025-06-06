/*
  # Create campaigns table
  
  1. New Tables
    - `campaigns` - Stores campaign information
      - `id` (uuid, primary key)
      - `brand_id` (uuid, references user_profiles.id)
      - Campaign details like title, objective, budget, etc.
  
  2. Security
    - Enable RLS on campaigns
    - Add policies for brands to CRUD their own campaigns
    - Add policy for reading live campaign information
*/

CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES user_profiles(id),
  title TEXT NOT NULL,
  objective TEXT NOT NULL CHECK(objective IN ('impressions', 'conversions', 'affiliate')),
  niche_tags TEXT[] NOT NULL,
  brief_text TEXT,
  total_budget NUMERIC NOT NULL,
  roas_target NUMERIC,
  min_price_per_creator NUMERIC NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('draft', 'live', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Brands can CRUD their own campaigns
CREATE POLICY "Brands can CRUD own campaigns"
  ON campaigns
  FOR ALL
  TO authenticated
  USING (auth.uid() = brand_id);

-- Anyone can read live campaigns
CREATE POLICY "Anyone can read live campaigns"
  ON campaigns
  FOR SELECT
  USING (status = 'live');

-- Admins can read all campaigns
CREATE POLICY "Admins can read all campaigns"
  ON campaigns
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );