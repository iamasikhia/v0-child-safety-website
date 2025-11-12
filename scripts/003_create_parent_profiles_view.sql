-- Create a view for parent_profiles that maps to profiles table
-- This allows code to reference parent_profiles while using the existing profiles table

CREATE OR REPLACE VIEW parent_profiles AS
SELECT 
  id,
  email,
  full_name,
  subscription_tier,
  created_at,
  updated_at
FROM profiles;

-- Grant access to the view
GRANT SELECT, INSERT, UPDATE, DELETE ON parent_profiles TO authenticated;

-- Add RLS policies for the view
ALTER VIEW parent_profiles SET (security_invoker = true);
