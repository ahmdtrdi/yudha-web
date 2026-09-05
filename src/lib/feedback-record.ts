import { FEATURES, GOALS, PMF, SOURCES, STATUSES, parseFeedback } from "./feedback";

type Answers = Record<string, unknown>;

function legacyErrors(data: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  const text = (field: string, required = true) => {
    const value = data[field];
    if (!required && value === undefined) return;
    if (typeof value !== "string" || (required && !value.trim()) || value.length > 2000) errors[field] = "Jawaban teks tidak valid.";
  };
  const choice = (field: string, options: string[], allowOther = false) => {
    const value = data[field];
    if (typeof value !== "string" || value.length > 2000 || (!options.filter(x => x !== "Lainnya").includes(value)
      && !(allowOther && value.startsWith("Lainnya: ") && value.slice(8).trim()))) errors[field] = "Pilihan tidak valid.";
  };
  for (const field of ["name", "email", "q8_pmf_followup", "q9_hook_reason"]) text(field);
  if (typeof data.email === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Email tidak valid.";
  choice("q1_source", SOURCES, true);
  choice("q2_reason", GOALS, true);
  choice("q5_daily_battles", ["Belum pernah / Kurang dari 1x per hari", "1 hingga 3x latihan per hari", "4 hingga 10x latihan per hari", "Lebih dari 10x per hari (Sangat aktif)"]);
  choice("q7_pmf_score", PMF);
  choice("q16_status_segmentation", STATUSES);
  for (const field of ["q3_tutorial_clarity", "q14_weakness_improvement", "q15_pressure_readiness"]) {
    if (typeof data[field] !== "number" || !Number.isInteger(data[field]) || (data[field] as number) < 1 || (data[field] as number) > 5) errors[field] = "Nilai harus 1–5.";
  }
  const features = data.q6_favorite_features;
  if (!Array.isArray(features) || !features.length || features.some(value => !FEATURES.includes(value)) || new Set(features).size !== features.length) errors.q6_favorite_features = "Fitur tidak valid.";
  for (const field of ["q10_price_too_cheap", "q11_price_good_deal", "q12_price_expensive", "q13_price_too_expensive"]) {
    const value = data[field];
    if (typeof value !== "string" || !/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) errors[field] = "Harga tidak valid.";
  }
  for (const field of ["q4_confusing_onboarding", "q15_pressure_reason", "q1_source_other", "q2_reason_other"]) text(field, false);
  if (typeof data.q17_contact_consent !== "boolean") errors.q17_contact_consent = "Persetujuan harus dipilih.";
  if (data.q17_contact_consent === true) text("q17_contact_info");
  return errors;
}

export function buildFeedbackRecord(input: unknown): { record?: Answers; errors: Record<string, string> } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { errors: { form: "Format jawaban tidak valid." } };
  const raw = input as Answers;
  let data: Answers;
  let answers: Answers;
  if (raw.survey_version !== undefined) {
    const parsed = parseFeedback(raw);
    if (!parsed.data) return { errors: parsed.errors };
    const v2 = parsed.data;
    answers = { ...v2 };
    data = {
      name: v2.name, email: v2.email,
      q1_source: v2.source === "Lainnya" ? `Lainnya: ${v2.source_other}` : v2.source,
      q2_reason: v2.goal === "Lainnya" ? `Lainnya: ${v2.goal_other}` : v2.goal,
      q3_tutorial_clarity: typeof v2.tutorial_clarity === "number" ? v2.tutorial_clarity : null,
      q4_confusing_onboarding: v2.onboarding_obstacles,
      q7_pmf_score: v2.pmf_score, q8_pmf_followup: v2.pmf_followup, q9_hook_reason: v2.return_reason,
      q16_status_segmentation: v2.preparation_status, q17_contact_consent: v2.contact_consent, q17_contact_info: v2.contact_info,
    };
  } else {
    const errors = legacyErrors(raw);
    if (Object.keys(errors).length) return { errors };
    const fields = ["name", "email", "q1_source", "q1_source_other", "q2_reason", "q2_reason_other", "q3_tutorial_clarity", "q4_confusing_onboarding", "q5_daily_battles", "q6_favorite_features", "q7_pmf_score", "q8_pmf_followup", "q9_hook_reason", "q10_price_too_cheap", "q11_price_good_deal", "q12_price_expensive", "q13_price_too_expensive", "q14_weakness_improvement", "q15_pressure_readiness", "q15_pressure_reason", "q16_status_segmentation", "q17_contact_consent", "q17_contact_info"];
    data = Object.fromEntries(fields.filter(field => Object.hasOwn(raw, field)).map(field => [field, typeof raw[field] === "string" ? raw[field].trim() : raw[field]]));
    if (data.q17_contact_consent !== true) data.q17_contact_info = "";
    answers = { ...data };
  }
  const record: Answers = { answers };
  for (const field of ["name", "email", "q1_source", "q2_reason", "q4_confusing_onboarding", "q5_daily_battles", "q7_pmf_score", "q8_pmf_followup", "q9_hook_reason", "q15_pressure_reason", "q16_status_segmentation", "q17_contact_info"]) record[field] = data[field] || null;
  for (const field of ["q3_tutorial_clarity", "q10_price_too_cheap", "q11_price_good_deal", "q12_price_expensive", "q13_price_too_expensive", "q14_weakness_improvement", "q15_pressure_readiness"]) record[field] = data[field] == null ? null : Number(data[field]);
  record.q6_favorite_features = data.q6_favorite_features ?? [];
  record.q17_contact_consent = data.q17_contact_consent;
  return { record, errors: {} };
}
