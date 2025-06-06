/*
  # Create user profiles table

  1. New Tables
    - `user_profiles` - Stores profile information for all users
      - `id` (uuid, primary key) - References auth.users.id
      - `role` (text) - User role (creator, brand, agency, admin)
      - Various profile fields depending on role
  
  2. Security
    - Enable RLS on user_profiles
    - Add policies for authenticated users to read/update their own data
    - Add policy for reading creator/brand public information
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT NOT NULL CHECK(role IN ('creator', 'brand', 'agency', 'admin')),
  display_name TEXT,
  bio TEXT,
  social_handles JSONB,
  niche_tags TEXT[],
  engagement_rate NUMERIC,
  price_per_gig NUMERIC,
  profile_img_url TEXT,
  company_name TEXT,
  website_url TEXT,
  ad_budget_range NUMRANGE,
  organization_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create views for different user types
CREATE OR REPLACE VIEW creator_profiles AS
  SELECT * FROM user_profiles WHERE role = 'creator';

CREATE OR REPLACE VIEW brand_profiles AS
  SELECT * FROM user_profiles WHERE role = 'brand';

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can read and update their own profiles
CREATE POLICY "Users can read own profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profiles"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Anyone can read creator profiles (public data)
CREATE POLICY "Anyone can read creator profiles"
  ON user_profiles
  FOR SELECT
  USING (role = 'creator');

-- Anyone can read brand profiles (public data)
CREATE POLICY "Anyone can read brand profiles"
  ON user_profiles
  FOR SELECT
  USING (role = 'brand');

-- Only authenticated users can insert their own profile
CREATE POLICY "Users can insert own profiles"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);