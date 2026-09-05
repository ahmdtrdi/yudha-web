import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { buildFeedbackRecord } from "@/lib/feedback-record";

export async function POST(request: Request) {
  try {
    let input: unknown;
    try {
      input = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: "Format JSON tidak valid." }, { status: 400 });
    }
    const { record, errors } = buildFeedbackRecord(input);
    if (!record) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({ success: false, error: "Penyimpanan feedback belum tersedia." }, { status: 503 });
    }

    const { error } = await supabase.from("feedback_responses").insert([record]);
    if (error) {
      return NextResponse.json({ success: false, error: "Feedback belum tersimpan. Silakan coba lagi." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Feedback belum tersimpan. Silakan coba lagi." }, { status: 500 });
  }
}
