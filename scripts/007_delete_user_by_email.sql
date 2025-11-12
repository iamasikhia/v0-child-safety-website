-- Remove user with email: iasikhia@nd.edu
-- This script deletes the user from all related tables

DO $$
DECLARE
  user_uuid uuid;
BEGIN
  -- Find the user_id from profiles table
  SELECT id INTO user_uuid FROM profiles WHERE email = 'iasikhia@nd.edu';
  
  IF user_uuid IS NOT NULL THEN
    -- Delete from child-related tables first (due to foreign keys)
    DELETE FROM website_scans WHERE child_user_id IN (SELECT id FROM child_users WHERE user_id = user_uuid);
    DELETE FROM child_users WHERE user_id = user_uuid OR parent_id = user_uuid;
    
    -- Delete from parent-related tables
    DELETE FROM activity_logs WHERE parent_id = user_uuid;
    DELETE FROM allowed_sites WHERE parent_id = user_uuid;
    DELETE FROM blocked_sites WHERE parent_id = user_uuid;
    DELETE FROM child_profiles WHERE parent_id = user_uuid;
    DELETE FROM content_categories WHERE parent_id = user_uuid;
    
    -- Delete from profile tables
    DELETE FROM parent_profiles WHERE email = 'iasikhia@nd.edu';
    DELETE FROM profiles WHERE email = 'iasikhia@nd.edu';
    
    -- Delete from auth.users (requires service role key)
    DELETE FROM auth.users WHERE email = 'iasikhia@nd.edu';
    
    RAISE NOTICE 'Successfully deleted user: iasikhia@nd.edu';
  ELSE
    RAISE NOTICE 'User with email iasikhia@nd.edu not found in profiles table';
  END IF;
END $$;
