import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compileFunction } from "node:vm";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Compile the real TypeScript modules and replace only the database boundary.
// These tests never load credentials or write survey responses to Supabase.
function loadModule(relativePath, mocks = {}, cache = new Map()) {
  const filename = path.resolve(root, relativePath);
  if (cache.has(filename)) return cache.get(filename);
  const targetModule = { exports: {} };
  cache.set(filename, targetModule.exports);
  const source = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const nativeRequire = createRequire(filename);
  const require = name => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name.startsWith("@/")) return loadModule(`src/${name.slice(2)}.ts`, mocks, cache);
    if (name.startsWith(".")) return loadModule(path.resolve(path.dirname(filename), `${name}.ts`), mocks, cache);
    return nativeRequire(name);
  };
  compileFunction(source, ["exports", "require", "module"], { filename })(targetModule.exports, require, targetModule);
  return targetModule.exports;
}

const survey = loadModule("src/lib/feedback.ts");
const { buildFeedbackRecord } = loadModule("src/lib/feedback-record.ts");

function validFeedback() {
  return {
    ...survey.createFeedback(), name: "Peserta Uji", email: "test@example.com",
    source: "TikTok / Instagram", goal: "Persiapan SKD", tutorial_clarity: "Belum mencoba tutorial",
    usage_duration: "Baru mencoba hari ini", previous_preparation: ["Belum rutin belajar"],
    active_days_last_week: 0, features_used: ["Belum mencoba fitur"], pmf_score: "Tidak masalah",
    pmf_followup: "Baru mencoba", return_reason: "Belum tahu", practice_frequency_change: "Belum bisa menilai",
    weak_topic_clarity_change: "Belum bisa menilai", time_pressure_readiness_change: "Belum bisa menilai",
    learning_actions: ["Belum menggunakan fitur tersebut"], preparation_status: "Bersiap untuk tahun depan",
    contact_consent: false,
  };
}

function legacyFeedback() {
  return {
    name: "Peserta Uji", email: "test@example.com", q1_source: "TikTok / Instagram", q2_reason: "Persiapan SKD",
    q3_tutorial_clarity: 4, q4_confusing_onboarding: "", q5_daily_battles: "1 hingga 3x latihan per hari",
    q6_favorite_features: ["Practice Mode"], q7_pmf_score: "Sangat kecewa", q8_pmf_followup: "Membantu latihan",
    q9_hook_reason: "Latihan", q10_price_too_cheap: "0", q11_price_good_deal: "50000",
    q12_price_expensive: "100000", q13_price_too_expensive: "200000", q14_weakness_improvement: 4,
    q15_pressure_readiness: 3, q15_pressure_reason: "", q16_status_segmentation: "Bersiap untuk tahun depan",
    q17_contact_consent: false, q17_contact_info: "",
  };
}

test("new users can report zero days, no tutorial, no change, and decline follow-up", () => {
  const { data, errors } = survey.parseFeedback(validFeedback());
  assert.deepEqual(errors, {});
  assert.equal(data.active_days_last_week, 0);
  assert.equal(survey.visibleFeedbackSteps(data).length, 10);
  assert.equal(survey.visibleQuestions(survey.FEEDBACK_STEPS.at(-1), data).some(q => q.field === "contact_info"), false);
});

test("v2 records preserve survey meaning and never reuse old impact, price, or daily frequency columns", () => {
  const { record } = buildFeedbackRecord({ ...validFeedback(), injected: "discard me" });
  assert.equal(record.answers.survey_version, 2);
  assert.equal(record.answers.injected, undefined);
  for (const key of ["q5_daily_battles", "q14_weakness_improvement", "q15_pressure_readiness", "q10_price_too_cheap", "q3_tutorial_clarity"]) assert.equal(record[key], null);
  assert.deepEqual(record.q6_favorite_features, []);
  assert.equal(record.q7_pmf_score, "Tidak masalah");
});

test("routine users can report adverse outcomes and numeric tutorial ratings", () => {
  const input = { ...validFeedback(), active_days_last_week: 7, tutorial_clarity: 1, usage_duration: "Lebih dari 28 hari",
    features_used: ["Practice Mode", "Analytics & Stats"], previous_preparation: ["Buku", "Bimbel"],
    practice_frequency_change: "Jauh lebih jarang", weak_topic_clarity_change: "Jauh lebih sulit",
    time_pressure_readiness_change: "Jauh kurang siap", learning_actions: ["Belum mengubah apa pun"] };
  assert.ok(survey.parseFeedback(input).data);
  assert.equal(buildFeedbackRecord(input).record.q3_tutorial_clarity, 1);
});

test("server rejects invalid ranges, types, choices, email, duplicates, and exclusivity conflicts", () => {
  for (const [field, value] of [
    ["active_days_last_week", -1], ["active_days_last_week", 8], ["active_days_last_week", 1.5], ["active_days_last_week", "0"],
    ["tutorial_clarity", 6], ["contact_consent", "false"], ["email", "invalid"], ["usage_duration", "invented"],
    ["previous_preparation", ["Belum rutin belajar", "Buku"]], ["features_used", ["Practice Mode", "Practice Mode"]],
    ["learning_actions", ["Belum mengubah apa pun", "Mempelajari topik yang lemah"]], ["concrete_change", {}],
  ]) {
    const parsed = survey.parseFeedback({ ...validFeedback(), [field]: value });
    assert.equal(parsed.data, undefined, field);
    assert.ok(parsed.errors[field], field);
  }
  assert.equal(survey.parseFeedback({ ...validFeedback(), survey_version: 3 }).data, undefined);
  assert.equal(buildFeedbackRecord([]).record, undefined);
});

test("other responses and consent require details; hidden personal contact is discarded", () => {
  for (const [field, value, other] of [
    ["source", "Lainnya", "source_other"], ["goal", "Lainnya", "goal_other"],
    ["previous_preparation", ["Lainnya"], "previous_preparation_other"],
    ["learning_actions", ["Lainnya"], "learning_actions_other"],
    ["contact_consent", true, "contact_info"],
  ]) {
    const input = { ...validFeedback(), [field]: value };
    assert.ok(survey.parseFeedback(input).errors[other]);
    assert.ok(survey.parseFeedback({ ...input, [other]: " Detail " }).data);
  }
  assert.equal(survey.parseFeedback({ ...validFeedback(), contact_info: "remove me" }).data.contact_info, "");
  assert.equal(survey.parseFeedback({ ...validFeedback(), name: "  Peserta  " }).data.name, "Peserta");
});

test("AI interview has an extra step and required changes, cleared when feature is deselected", () => {
  let data = { ...validFeedback(), features_used: [survey.AI_INTERVIEW] };
  assert.equal(survey.visibleFeedbackSteps(data).length, 11);
  assert.ok(survey.parseFeedback(data).errors.interview_changes);
  data = { ...data, interview_changes: ["Lainnya"] };
  assert.ok(survey.parseFeedback(data).errors.interview_changes_other);
  data.interview_changes_other = "Contoh lebih konkret";
  assert.ok(survey.parseFeedback(data).data);
  const updated = survey.updateFeedback(data, "features_used", ["Practice Mode"]);
  assert.deepEqual(updated.interview_changes, []);
  assert.equal(updated.interview_changes_other, "");
  assert.equal(survey.visibleFeedbackSteps(updated).length, 10);
  assert.deepEqual(survey.parseFeedback({ ...data, features_used: ["Practice Mode"] }).data.interview_changes, []);
});

test("multi-choice toggles exclude conflicting responses and clear stale other fields", () => {
  assert.deepEqual(survey.toggleFeedbackChoice(["Buku"], "Belum rutin belajar", ["Belum rutin belajar"]), ["Belum rutin belajar"]);
  assert.deepEqual(survey.toggleFeedbackChoice(["Belum rutin belajar"], "Buku", ["Belum rutin belajar"]), ["Buku"]);
  assert.deepEqual(survey.toggleFeedbackChoice(["Buku"], "Buku"), []);
  const data = survey.updateFeedback({ ...validFeedback(), source: "Lainnya", source_other: "Tempat lain" }, "source", "TikTok / Instagram");
  assert.equal(data.source_other, "");
  assert.equal(survey.updateFeedback(validFeedback(), "pmf_score", "Sangat kecewa").pmf_followup, "");
});

test("old unversioned form remains accepted and maintains historical columns", () => {
  const { record, errors } = buildFeedbackRecord(legacyFeedback());
  assert.deepEqual(errors, {});
  assert.equal(record.answers.survey_version, undefined);
  assert.equal(record.q14_weakness_improvement, 4);
  assert.equal(record.q10_price_too_cheap, 0);
  assert.equal(record.q11_price_good_deal, 50000);
  assert.ok(buildFeedbackRecord({ ...legacyFeedback(), q1_source: "Lainnya: Komunitas belajar" }).record);
  for (const patch of [{ q17_contact_consent: "false" }, { q14_weakness_improvement: 6 }, { q10_price_too_cheap: "abc" }, { name: {} }]) {
    assert.equal(buildFeedbackRecord({ ...legacyFeedback(), ...patch }).record, undefined);
  }
});

function routeWithDatabase({ configured = true, error = null, throws = false } = {}) {
  const inserted = [];
  const supabase = { from(table) {
    assert.equal(table, "feedback_responses");
    return { async insert(records) {
      inserted.push(...records);
      if (throws) throw new Error("Private database details");
      return { error };
    } };
  } };
  const { POST } = loadModule("src/app/api/feedback/route.ts", {
    "@/lib/supabase": { supabase: configured ? supabase : null, isSupabaseConfigured: configured },
  });
  return { POST, inserted };
}

const request = input => new Request("http://localhost/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });

test("API inserts new and old payloads without requiring SELECT and returns only confirmation", async () => {
  const { POST, inserted } = routeWithDatabase();
  for (const payload of [validFeedback(), legacyFeedback()]) {
    const response = await POST(request(payload));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
  }
  assert.equal(inserted.length, 2);
});

test("API rejects malformed JSON and invalid responses before any database write", async () => {
  const { POST, inserted } = routeWithDatabase();
  for (const input of [null, [], {}, { ...validFeedback(), active_days_last_week: 9 }]) {
    assert.equal((await POST(request(input))).status, 400);
  }
  const malformed = new Request("http://localhost/api/feedback", { method: "POST", body: "{" });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal(inserted.length, 0);
});

test("API never reports mock success when storage is unavailable", async () => {
  const { POST, inserted } = routeWithDatabase({ configured: false });
  const response = await POST(request(validFeedback()));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).success, false);
  assert.equal(inserted.length, 0);
});

test("API handles database failures without exposing internal errors or response data", async () => {
  for (const options of [{ error: { message: "Private database details" } }, { throws: true }]) {
    const response = await routeWithDatabase(options).POST(request(validFeedback()));
    assert.equal(response.status, 500);
    const body = await response.json();
    assert.equal(body.success, false);
    assert.equal(JSON.stringify(body).includes("Private"), false);
    assert.equal(body.data, undefined);
  }
});
