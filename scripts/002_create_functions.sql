-- Function to automatically create parent profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user has metadata indicating they're a parent
  IF NEW.raw_user_meta_data->>'user_type' = 'parent' OR NEW.raw_user_meta_data->>'user_type' IS NULL THEN
    INSERT INTO public.parent_profiles (user_id, full_name, email)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      NEW.email
    );
  END IF;
  
  -- Check if user has metadata indicating they're a child
  IF NEW.raw_user_meta_data->>'user_type' = 'child' THEN
    INSERT INTO public.child_profiles (user_id, full_name, email, age)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      NEW.email,
      COALESCE((NEW.raw_user_meta_data->>'age')::INTEGER, 0)
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function after user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_parent_profiles
  BEFORE UPDATE ON parent_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_child_profiles
  BEFORE UPDATE ON child_profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
