-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. Create the notes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    user_id UUID NOT NULL REFERENCES auth.users(id) DEFAULT auth.uid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for data isolation
-- Policy: Users can only see their own notes
CREATE POLICY "Users can only access their own notes" 
ON public.notes 
FOR ALL 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. (Optional) Disable email confirmation for testing
-- This lets you log in immediately after signing up without checking email
-- Note: Go to Supabase Dashboard > Authentication > Providers > Email
-- Toggle "Confirm email" to OFF.
