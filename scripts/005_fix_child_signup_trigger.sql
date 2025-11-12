-- Drop the old trigger and function
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();

-- Create updated function to handle both parent and child signups correctly
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Check user type from metadata
  if new.raw_user_meta_data->>'user_type' = 'child' then
    -- Insert into child_users table with correct columns
    insert into public.child_users (user_id, username, age)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
      coalesce((new.raw_user_meta_data->>'age')::integer, 10)
    );
  else
    -- Create parent profile (default)
    insert into public.profiles (id, full_name, email)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'full_name', ''),
      new.email
    );
  end if;
  
  return new;
end;
$$;

-- Recreate trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
