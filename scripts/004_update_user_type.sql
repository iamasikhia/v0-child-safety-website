-- Add user_type column to parent_profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='parent_profiles' AND column_name='user_type') THEN
    ALTER TABLE parent_profiles ADD COLUMN user_type TEXT DEFAULT 'parent' CHECK (user_type IN ('parent', 'child'));
  END IF;
END $$;

-- Update trigger to include user_type from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.parent_profiles (user_id, full_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'parent')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
