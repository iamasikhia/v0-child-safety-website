-- This script seeds dummy data for testing
-- Note: You'll need to replace the user_id values with actual auth.users IDs after signup

-- Insert a dummy parent profile (you'll need to signup first and get the user_id)
-- INSERT INTO parent_profiles (user_id, full_name, email, subscription_tier)
-- VALUES ('YOUR_USER_ID_HERE', 'John Doe', 'john@example.com', 'premium');

-- Example child profile
-- INSERT INTO child_profiles (parent_id, full_name, age, email)
-- VALUES ('PARENT_PROFILE_ID_HERE', 'Emma Doe', 12, 'emma@example.com');

-- Example activity logs
-- INSERT INTO activity_logs (child_id, url, domain, category, risk_level, blocked, device_name, duration_seconds)
-- VALUES 
--   ('CHILD_PROFILE_ID_HERE', 'https://www.youtube.com/watch?v=abc', 'youtube.com', 'entertainment', 'safe', false, 'Emma''s Laptop', 1800),
--   ('CHILD_PROFILE_ID_HERE', 'https://www.wikipedia.org/wiki/Science', 'wikipedia.org', 'education', 'safe', false, 'Emma''s Laptop', 900);

-- Example blocked sites
-- INSERT INTO blocked_sites (parent_id, domain, reason)
-- VALUES 
--   ('PARENT_PROFILE_ID_HERE', 'example-bad-site.com', 'Inappropriate content'),
--   ('PARENT_PROFILE_ID_HERE', 'another-blocked.com', 'Adult content');

-- Example allowed sites
-- INSERT INTO allowed_sites (parent_id, domain, reason)
-- VALUES 
--   ('PARENT_PROFILE_ID_HERE', 'khanacademy.org', 'Educational resource'),
--   ('PARENT_PROFILE_ID_HERE', 'nasa.gov', 'Science learning');

-- Note: After creating your first parent account through signup, 
-- you can manually insert test data using the Supabase dashboard SQL editor
-- or run queries with the actual IDs generated.
