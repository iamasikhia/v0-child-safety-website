-- Update metadata for existing child users who don't have user_type set
-- This script fixes accounts that were created before the trigger was working properly

DO $$
DECLARE
  child_record RECORD;
BEGIN
  -- Loop through all child users
  FOR child_record IN 
    SELECT user_id FROM child_users
  LOOP
    -- Update the user's metadata in auth.users
    UPDATE auth.users
    SET raw_user_meta_data = 
      CASE 
        WHEN raw_user_meta_data IS NULL THEN '{"user_type": "child"}'::jsonb
        ELSE raw_user_meta_data || '{"user_type": "child"}'::jsonb
      END
    WHERE id = child_record.user_id
    AND (raw_user_meta_data->>'user_type' IS NULL OR raw_user_meta_data->>'user_type' != 'child');
  END LOOP;
  
  RAISE NOTICE 'Updated metadata for all child users';
END $$;

-- Verify the update
SELECT 
  u.id,
  u.email,
  u.raw_user_meta_data->>'user_type' as user_type,
  cu.username
FROM auth.users u
JOIN child_users cu ON u.id = cu.user_id;
