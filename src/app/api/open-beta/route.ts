import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, goal } = body;

    if (!name || !email || !goal) {
      return NextResponse.json(
        { success: false, error: "Name, email, and your goal are required." },
        { status: 400 }
      );
    }

    const record = {
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp ? whatsapp.trim() : null,
      goal: goal.trim(),
      created_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured || !supabase) {
      console.warn(
        "[API /api/open-beta] Supabase not configured yet. Saving open beta registration locally:",
        record
      );
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Saved locally (Supabase env variables not configured yet).",
      });
    }

    // Try inserting into open_beta_registrations or fallback table
    const { data, error } = await supabase
      .from("open_beta_registrations")
      .insert([record])
      .select();

    if (error) {
      console.error("[API /api/open-beta] Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("[API /api/open-beta] Internal Server Error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
