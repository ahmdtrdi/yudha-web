import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  if (["name", "email", "message"].some((key) => typeof fields[key] !== "string") ||
      ["company", "represent"].some((key) => fields[key] != null && typeof fields[key] !== "string")) {
    return NextResponse.json({ success: false, error: "Invalid contact details." }, { status: 400 });
  }

  const name = (fields.name as string).trim();
  const email = (fields.email as string).trim();
  const message = (fields.message as string).trim();
  const company = typeof fields.company === "string" ? fields.company.trim() : "";
  const represent = typeof fields.represent === "string" ? fields.represent : "";

  if (!name || name.length > 120 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !message || message.length > 5000 || company.length > 200 ||
      !["", "student", "company", "school", "media", "other"].includes(represent)) {
    return NextResponse.json({ success: false, error: "Please check your contact details." }, { status: 400 });
  }

  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({ success: false, error: "Contact form is temporarily unavailable." }, { status: 503 });
  }

  try {
    const record = {
      name,
      email,
      company: company || null,
      represent: represent || null,
      message,
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("contact_submissions")
      .insert([record]);

    if (error) {
      console.error("[API /api/contact] Contact storage failed.");
      return NextResponse.json(
        { success: false, error: "Unable to send your message. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("[API /api/contact] Contact storage failed.");
    return NextResponse.json(
      { success: false, error: "Unable to send your message. Please try again." },
      { status: 500 }
    );
  }
}
