import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getErrorMessage } from "@/lib/errors";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, represent, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const record = {
      name: name.trim(),
      email: email.trim(),
      company: company ? company.trim() : null,
      represent: represent || null,
      message: message.trim(),
      created_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured || !supabase) {
      console.warn(
        "[API /api/contact] Supabase not configured yet. Saving contact submission locally:",
        record
      );
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Saved locally (Supabase env variables not configured yet).",
      });
    }

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([record])
      .select();

    if (error) {
      console.error("[API /api/contact] Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    console.error("[API /api/contact] Internal Server Error:", error);
    return NextResponse.json(
      { success: false, error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}
