-- Supabase Database Schema for YUDHA Web Forms
-- Safe & Idempotent: Can be executed multiple times without errors.
-- Execute this SQL script in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

--------------------------------------------------------------------------------
-- 1. Table: open_beta_registrations
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.open_beta_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT,
    goal TEXT NOT NULL
);

-- Ensure columns exist if table was already created
ALTER TABLE public.open_beta_registrations ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.open_beta_registrations ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.open_beta_registrations ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE public.open_beta_registrations ADD COLUMN IF NOT EXISTS goal TEXT;

-- Enable RLS
ALTER TABLE public.open_beta_registrations ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can register for Open Beta)
DROP POLICY IF EXISTS "Allow public insert to open_beta_registrations" ON public.open_beta_registrations;
CREATE POLICY "Allow public insert to open_beta_registrations" 
ON public.open_beta_registrations
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users (Admins) to view registrations
DROP POLICY IF EXISTS "Allow authenticated select open_beta_registrations" ON public.open_beta_registrations;
CREATE POLICY "Allow authenticated select open_beta_registrations" 
ON public.open_beta_registrations
FOR SELECT 
TO authenticated 
USING (true);


--------------------------------------------------------------------------------
-- 2. Table: contact_submissions
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    represent TEXT,
    message TEXT NOT NULL
);

-- Ensure columns exist if table was already created
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS represent TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS message TEXT;

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can send contact us messages)
DROP POLICY IF EXISTS "Allow public insert to contact_submissions" ON public.contact_submissions;
CREATE POLICY "Allow public insert to contact_submissions" 
ON public.contact_submissions
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users (Admins) to view contact messages
DROP POLICY IF EXISTS "Allow authenticated select contact_submissions" ON public.contact_submissions;
CREATE POLICY "Allow authenticated select contact_submissions" 
ON public.contact_submissions
FOR SELECT 
TO authenticated 
USING (true);


--------------------------------------------------------------------------------
-- 3. Table: feedback_responses
--------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.feedback_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Identity Info
    name TEXT,
    email TEXT,
    
    -- Section 1: Kesan Pertama & Onboarding
    q1_source TEXT,
    q2_reason TEXT,
    q3_tutorial_clarity INT,
    q4_confusing_onboarding TEXT,
    
    -- Section 2: Pengalaman & Keaktifan
    q5_daily_battles TEXT,
    q6_favorite_features TEXT[],
    q7_pmf_score TEXT,
    q8_pmf_followup TEXT,
    q9_hook_reason TEXT,
    
    -- Section 3: Evaluasi Nilai & Harga
    q10_price_too_cheap NUMERIC,
    q11_price_good_deal NUMERIC,
    q12_price_expensive NUMERIC,
    q13_price_too_expensive NUMERIC,
    
    -- Section 4: Dampak Belajar & Follow-up
    q14_weakness_improvement INT,
    q15_pressure_readiness INT,
    q15_pressure_reason TEXT,
    q16_status_segmentation TEXT,
    q17_contact_consent BOOLEAN DEFAULT FALSE,
    q17_contact_info TEXT,
    
    -- Full Raw Payload
    answers JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Ensure identity columns exist if table was already created in earlier migrations
ALTER TABLE public.feedback_responses ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.feedback_responses ADD COLUMN IF NOT EXISTS email TEXT;

-- Enable RLS
ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can submit feedback)
DROP POLICY IF EXISTS "Allow public insert to feedback_responses" ON public.feedback_responses;
CREATE POLICY "Allow public insert to feedback_responses" 
ON public.feedback_responses
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users (Admins) to view feedback responses
DROP POLICY IF EXISTS "Allow authenticated select feedback_responses" ON public.feedback_responses;
CREATE POLICY "Allow authenticated select feedback_responses" 
ON public.feedback_responses
FOR SELECT 
TO authenticated 
USING (true);
