-- Supabase Schema for YUDHA Feedback Form Responses
-- Execute this SQL script in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

CREATE TABLE IF NOT EXISTS public.feedback_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Section 1: Worth to Try (First Impression)
    q1_source TEXT,
    q2_reason TEXT,
    q3_tutorial_clarity INT,
    q4_confusing_onboarding TEXT,
    
    -- Section 2: Worth to Play (Engagement / Retensi)
    q5_daily_battles TEXT,
    q6_favorite_features TEXT[],
    q7_pmf_score TEXT,
    q8_pmf_followup TEXT,
    q9_hook_reason TEXT,
    
    -- Section 3: Worth to Buy (Price Sensitivity)
    q10_price_too_cheap NUMERIC,
    q11_price_good_deal NUMERIC,
    q12_price_expensive NUMERIC,
    q13_price_too_expensive NUMERIC,
    
    -- Section 4: Impactful (Outcome & Consent)
    q14_weakness_improvement INT,
    q15_pressure_readiness INT,
    q15_pressure_reason TEXT,
    q16_status_segmentation TEXT,
    q17_contact_consent BOOLEAN DEFAULT FALSE,
    q17_contact_info TEXT,
    
    -- Full Raw Payload
    answers JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to submit feedback responses
CREATE POLICY "Allow public insert to feedback_responses" 
ON public.feedback_responses
FOR INSERT 
WITH CHECK (true);

-- Allow admins/authenticated users to view feedback responses
CREATE POLICY "Allow authenticated select feedback_responses" 
ON public.feedback_responses
FOR SELECT 
TO authenticated 
USING (true);
