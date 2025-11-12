-- Create profiles table for parent users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text not null,
  subscription_tier text default 'free' check (subscription_tier in ('free', 'basic', 'premium')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create child_profiles table
create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.profiles(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  age integer,
  device_id text,
  full_name text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Make parent_id nullable to support independent child accounts
alter table public.child_profiles 
  alter column parent_id drop not null;

-- Create activity_logs table for browsing history
create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  child_profile_id uuid references public.child_profiles(id) on delete cascade not null,
  parent_id uuid references public.profiles(id) on delete cascade not null,
  url text not null,
  domain text not null,
  title text,
  category text,
  threat_level text check (threat_level in ('safe', 'low', 'medium', 'high', 'critical')),
  is_blocked boolean default false,
  visited_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create blocked_sites table for custom blacklist
create table if not exists public.blocked_sites (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.profiles(id) on delete cascade not null,
  domain text not null,
  reason text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(parent_id, domain)
);

-- Create allowed_sites table for whitelist
create table if not exists public.allowed_sites (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.profiles(id) on delete cascade not null,
  domain text not null,
  reason text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(parent_id, domain)
);

-- Create content_categories table for filtering settings
create table if not exists public.content_categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.profiles(id) on delete cascade not null,
  category_name text not null,
  is_blocked boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(parent_id, category_name)
);

-- Create website_scans table for child dashboard URL scanning
create table if not exists public.website_scans (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.child_profiles(id) on delete cascade,
  url text not null,
  website_type text,
  safety_score integer check (safety_score >= 0 and safety_score <= 100),
  description text,
  concerns text[],
  scanned_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security on all tables
alter table public.profiles enable row level security;
alter table public.child_profiles enable row level security;
alter table public.activity_logs enable row level security;
alter table public.blocked_sites enable row level security;
alter table public.allowed_sites enable row level security;
alter table public.content_categories enable row level security;
alter table public.website_scans enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Child profiles policies
create policy "Parents can view their own child profiles"
  on public.child_profiles for select
  using (auth.uid() = parent_id);

create policy "Parents can insert child profiles"
  on public.child_profiles for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update their child profiles"
  on public.child_profiles for update
  using (auth.uid() = parent_id);

create policy "Parents can delete their child profiles"
  on public.child_profiles for delete
  using (auth.uid() = parent_id);

create policy "Children can view their own profile by user_id"
  on public.child_profiles for select
  using (auth.uid() = user_id);

create policy "Children can update their own profile"
  on public.child_profiles for update
  using (auth.uid() = user_id);

-- Activity logs policies
create policy "Parents can view activity logs for their children"
  on public.activity_logs for select
  using (auth.uid() = parent_id);

create policy "System can insert activity logs"
  on public.activity_logs for insert
  with check (auth.uid() = parent_id);

-- Blocked sites policies
create policy "Parents can view their blocked sites"
  on public.blocked_sites for select
  using (auth.uid() = parent_id);

create policy "Parents can insert blocked sites"
  on public.blocked_sites for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update their blocked sites"
  on public.blocked_sites for update
  using (auth.uid() = parent_id);

create policy "Parents can delete their blocked sites"
  on public.blocked_sites for delete
  using (auth.uid() = parent_id);

-- Allowed sites policies
create policy "Parents can view their allowed sites"
  on public.allowed_sites for select
  using (auth.uid() = parent_id);

create policy "Parents can insert allowed sites"
  on public.allowed_sites for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update their allowed sites"
  on public.allowed_sites for update
  using (auth.uid() = parent_id);

create policy "Parents can delete their allowed sites"
  on public.allowed_sites for delete
  using (auth.uid() = parent_id);

-- Content categories policies
create policy "Parents can view their content categories"
  on public.content_categories for select
  using (auth.uid() = parent_id);

create policy "Parents can insert content categories"
  on public.content_categories for insert
  with check (auth.uid() = parent_id);

create policy "Parents can update their content categories"
  on public.content_categories for update
  using (auth.uid() = parent_id);

create policy "Parents can delete their content categories"
  on public.content_categories for delete
  using (auth.uid() = parent_id);

-- Website scans policies
create policy "Children can view their own website scans"
  on public.website_scans for select
  using (
    child_id in (
      select id from public.child_profiles where user_id = auth.uid()
    )
  );

create policy "System can insert website scans"
  on public.website_scans for insert
  with check (true);

-- Create indexes for better query performance
create index if not exists activity_logs_parent_id_idx on public.activity_logs(parent_id);
create index if not exists activity_logs_child_profile_id_idx on public.activity_logs(child_profile_id);
create index if not exists activity_logs_visited_at_idx on public.activity_logs(visited_at desc);
create index if not exists child_profiles_parent_id_idx on public.child_profiles(parent_id);
create index if not exists website_scans_child_id_idx on public.website_scans(child_id);
create index if not exists website_scans_scanned_at_idx on public.website_scans(scanned_at desc);

-- Add parent_profiles as a view/alias for backward compatibility with the code
create view if not exists public.parent_profiles as
select 
  id,
  id as user_id,
  full_name,
  email,
  subscription_tier,
  1 as devices_limit,
  'active' as subscription_status,
  created_at,
  updated_at
from public.profiles;
