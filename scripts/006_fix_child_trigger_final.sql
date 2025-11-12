-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created_child ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_child_user();

-- Create function to handle new child user creation
CREATE OR REPLACE FUNCTION public.handle_new_child_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create child_users record if user_type is 'child'
  IF NEW.raw_user_meta_data->>'user_type' = 'child' THEN
    INSERT INTO public.child_users (
      user_id,
      username,
      age,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      COALESCE((NEW.raw_user_meta_data->>'age')::integer, 10),
      NOW(),
      NOW()
    );
  ELSIF NEW.raw_user_meta_data->>'user_type' = 'parent' OR NEW.raw_user_meta_data->>'user_type' IS NULL THEN
    -- Create parent profile for parent users
    INSERT INTO public.profiles (
      id,
      email,
      full_name,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signups
CREATE TRIGGER on_auth_user_created_child
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_child_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;
