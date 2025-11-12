-- Create child_users table for children who log in independently
-- This is separate from child_profiles which are created by parents

CREATE TABLE IF NOT EXISTS child_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  age integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE child_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for child_users
CREATE POLICY "Children can view their own account"
  ON child_users FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Children can update their own account"
  ON child_users FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Parents can view their children's accounts"
  ON child_users FOR SELECT
  USING (auth.uid() = parent_id);

-- Create website_scans table for child URL scanning
CREATE TABLE IF NOT EXISTS website_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_user_id uuid REFERENCES child_users(id) ON DELETE CASCADE,
  url text NOT NULL,
  domain text NOT NULL,
  website_type text,
  safety_score integer CHECK (safety_score >= 0 AND safety_score <= 100),
  description text,
  concerns text[],
  is_safe boolean,
  scanned_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_scans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for website_scans
CREATE POLICY "Children can view their own scans"
  ON website_scans FOR SELECT
  USING (auth.uid() IN (SELECT user_id FROM child_users WHERE id = child_user_id));

CREATE POLICY "Children can insert their own scans"
  ON website_scans FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT user_id FROM child_users WHERE id = child_user_id));

CREATE POLICY "Parents can view their children's scans"
  ON website_scans FOR SELECT
  USING (auth.uid() IN (SELECT parent_id FROM child_users WHERE id = child_user_id));

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_child_users_user_id ON child_users(user_id);
CREATE INDEX IF NOT EXISTS idx_child_users_parent_id ON child_users(parent_id);
CREATE INDEX IF NOT EXISTS idx_website_scans_child_user_id ON website_scans(child_user_id);
CREATE INDEX IF NOT EXISTS idx_website_scans_created_at ON website_scans(created_at DESC);
