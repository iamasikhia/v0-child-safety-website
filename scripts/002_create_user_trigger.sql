-- Function to create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Check user type from metadata
  if new.raw_user_meta_data->>'user_type' = 'child' then
    -- Create child profile
    insert into public.child_profiles (user_id, full_name, email, age)
    values (
      new.id,
      coalesce(new.raw_user_meta_data->>'full_name', ''),
      new.email,
      coalesce((new.raw_user_meta_data->>'age')::integer, 0)
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

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
