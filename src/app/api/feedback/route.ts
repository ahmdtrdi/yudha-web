import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getErrorMessage } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      email,
      q1_source,
      q2_reason,
      q3_tutorial_clarity,
      q4_confusing_onboarding,
      q5_daily_battles,
      q6_favorite_features,
      q7_pmf_score,
      q8_pmf_followup,
      q9_hook_reason,
      q10_price_too_cheap,
      q11_price_good_deal,
      q12_price_expensive,
      q13_price_too_expensive,
      q14_weakness_improvement,
      q15_pressure_readiness,
      q15_pressure_reason,
      q16_status_segmentation,
      q17_contact_consent,
      q17_contact_info,
    } = data;

    const record = {
      name: name ? name.trim() : null,
      email: email ? email.trim() : null,
      q1_source: q1_source || null,
      q2_reason: q2_reason || null,
      q3_tutorial_clarity: q3_tutorial_clarity ? Number(q3_tutorial_clarity) : null,
      q4_confusing_onboarding: q4_confusing_onboarding || null,
      q5_daily_battles: q5_daily_battles || null,
      q6_favorite_features: Array.isArray(q6_favorite_features) ? q6_favorite_features : [],
      q7_pmf_score: q7_pmf_score || null,
      q8_pmf_followup: q8_pmf_followup || null,
      q9_hook_reason: q9_hook_reason || null,
      q10_price_too_cheap: q10_price_too_cheap ? Number(q10_price_too_cheap) : null,
      q11_price_good_deal: q11_price_good_deal ? Number(q11_price_good_deal) : null,
      q12_price_expensive: q12_price_expensive ? Number(q12_price_expensive) : null,
      q13_price_too_expensive: q13_price_too_expensive ? Number(q13_price_too_expensive) : null,
      q14_weakness_improvement: q14_weakness_improvement ? Number(q14_weakness_improvement) : null,
      q15_pressure_readiness: q15_pressure_readiness ? Number(q15_pressure_readiness) : null,
      q15_pressure_reason: q15_pressure_reason || null,
      q16_status_segmentation: q16_status_segmentation || null,
      q17_contact_consent: Boolean(q17_contact_consent),
      q17_contact_info: q17_contact_info || null,
      answers: data,
    };

    if (!isSupabaseConfigured || !supabase) {
      console.warn(
        "[API /api/feedback] Supabase is not configured yet. Saving response locally in logs:",
        record
      );
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Saved locally (Supabase env variables not configured yet).",
      });
    }

    const { data: insertedData, error } = await supabase
      .from("feedback_responses")
      .insert([record])
      .select();

    if (error) {
      console.error("[API /api/feedback] Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: insertedData,
    });
  } catch (error: unknown) {
    console.error("[API /api/feedback] Internal Server Error:", error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
