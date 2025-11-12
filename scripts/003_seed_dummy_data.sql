-- This script seeds dummy data for testing
-- Note: Replace the parent_id UUIDs with actual user IDs after signup

-- Insert dummy child profiles (you'll need to replace parent_id after creating a user)
-- insert into public.child_profiles (parent_id, name, age, device_id, is_active)
-- values 
--   ('YOUR_USER_ID_HERE', 'Emma', 12, 'device-001', true),
--   ('YOUR_USER_ID_HERE', 'Noah', 9, 'device-002', false);

-- Insert dummy activity logs
-- insert into public.activity_logs (child_profile_id, parent_id, url, domain, title, category, threat_level, is_blocked, visited_at)
-- values 
--   ('CHILD_PROFILE_ID', 'YOUR_USER_ID_HERE', 'https://www.youtube.com/watch?v=example', 'youtube.com', 'Educational Video', 'Education', 'safe', false, now() - interval '2 hours'),
--   ('CHILD_PROFILE_ID', 'YOUR_USER_ID_HERE', 'https://www.reddit.com/r/gaming', 'reddit.com', 'Gaming Discussion', 'Social Media', 'low', false, now() - interval '3 hours'),
--   ('CHILD_PROFILE_ID', 'YOUR_USER_ID_HERE', 'https://blocked-site.com', 'blocked-site.com', 'Inappropriate Content', 'Adult', 'critical', true, now() - interval '1 hour');

-- Insert dummy blocked sites
-- insert into public.blocked_sites (parent_id, domain, reason, is_active)
-- values 
--   ('YOUR_USER_ID_HERE', 'blocked-site.com', 'Inappropriate content', true),
--   ('YOUR_USER_ID_HERE', 'gambling-site.com', 'Gambling website', true);

-- Insert dummy allowed sites
-- insert into public.allowed_sites (parent_id, domain, reason, is_active)
-- values 
--   ('YOUR_USER_ID_HERE', 'khanacademy.org', 'Educational resource', true),
--   ('YOUR_USER_ID_HERE', 'wikipedia.org', 'Reference and learning', true);

-- Insert default content categories
-- insert into public.content_categories (parent_id, category_name, is_blocked)
-- values 
--   ('YOUR_USER_ID_HERE', 'Adult Content', true),
--   ('YOUR_USER_ID_HERE', 'Gambling', true),
--   ('YOUR_USER_ID_HERE', 'Violence', true),
--   ('YOUR_USER_ID_HERE', 'Social Media', false),
--   ('YOUR_USER_ID_HERE', 'Gaming', false),
--   ('YOUR_USER_ID_HERE', 'Education', false);
