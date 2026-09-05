export const OTHER = "Lainnya";
export const AI_INTERVIEW = "AI Interview Simulator";
export const NOT_ASSESSED = "Belum bisa menilai";
export const FEATURES = ["PvP Battle", AI_INTERVIEW, "Practice Mode", "Analytics & Stats"];
export const SOURCES = ["Teman / Komunitas CPNS/BUMN", "TikTok / Instagram", OTHER];
export const GOALS = ["Persiapan SKD", "Latihan interview", "Sekadar penasaran", "Direkomendasikan teman", OTHER];
export const PMF = ["Sangat kecewa", "Agak kecewa", "Tidak masalah", "Sudah tidak pakai lagi"];
export const STATUSES = ["Aktif mendaftar CPNS/BUMN sekarang", "Bersiap untuk tahun depan", "Hanya mencoba-coba / tidak mendaftar"];

export interface FeedbackPayload {
  survey_version: 2;
  name: string;
  email: string;
  source: string;
  source_other: string;
  goal: string;
  goal_other: string;
  tutorial_clarity: number | "Belum mencoba tutorial" | null;
  onboarding_obstacles: string;
  usage_duration: string;
  previous_preparation: string[];
  previous_preparation_other: string;
  active_days_last_week: number | null;
  features_used: string[];
  pmf_score: string;
  pmf_followup: string;
  return_reason: string;
  practice_frequency_change: string;
  weak_topic_clarity_change: string;
  time_pressure_readiness_change: string;
  learning_actions: string[];
  learning_actions_other: string;
  interview_changes: string[];
  interview_changes_other: string;
  concrete_change: string;
  remaining_obstacles: string;
  preparation_status: string;
  contact_consent: boolean | null;
  contact_info: string;
}

export type FeedbackField = Exclude<keyof FeedbackPayload, "survey_version">;
export type FeedbackValue = FeedbackPayload[FeedbackField];
export type FeedbackErrors = Partial<Record<FeedbackField, string>>;
type FeedbackTextField = { [K in FeedbackField]: FeedbackPayload[K] extends string ? K : never }[FeedbackField];
type Choice = string | number | boolean;
export interface FeedbackQuestion {
  field: FeedbackField;
  label: string;
  kind: "text" | "email" | "textarea" | "single" | "multi";
  options?: readonly Choice[];
  optionLabels?: readonly string[];
  exclusive?: readonly string[];
  otherField?: FeedbackTextField;
  optional?: boolean;
  hint?: string;
}
export interface FeedbackStep {
  id: string;
  title: string;
  questions: FeedbackQuestion[];
}

export const FEEDBACK_STEPS: FeedbackStep[] = [
  { id: "profile", title: "Profil", questions: [
    { field: "name", label: "Nama lengkap", kind: "text" },
    { field: "email", label: "Alamat email", kind: "email" },
    { field: "source", label: "Dari mana kamu pertama kali mendengar tentang YUDHA?", kind: "single", options: SOURCES,
      optionLabels: ["Rekomendasi teman / Komunitas CPNS & BUMN", "Media Sosial (TikTok / Instagram / X)", OTHER], otherField: "source_other" },
    { field: "goal", label: "Apa tujuan utama kamu saat mencoba YUDHA pertama kali?", kind: "single", options: GOALS,
      optionLabels: ["Persiapan Ujian SKD CPNS / BUMN", "Melatih Interview Berbasis AI", "Sekadar Penasaran Menguji Skill", "Direkomendasikan Oleh Teman", OTHER], otherField: "goal_other" },
  ] },
  { id: "onboarding", title: "Pengalaman awal", questions: [
    { field: "tutorial_clarity", label: "Seberapa jelas panduan awal (tutorial) YUDHA dalam membantumu memahami cara bermain?", kind: "single", options: [1, 2, 3, 4, 5, "Belum mencoba tutorial"], hint: "1 = Sangat membingungkan • 5 = Sangat jelas & mudah dipahami" },
    { field: "onboarding_obstacles", label: "Apakah ada bagian tutorial atau alur awal yang menurutmu kurang jelas?", kind: "textarea", optional: true },
  ] },
  { id: "context", title: "Kondisi penggunaan", questions: [
    { field: "usage_duration", label: "Sudah berapa lama kamu menggunakan YUDHA?", kind: "single", options: ["Baru mencoba hari ini", "2–6 hari", "7–13 hari", "14–28 hari", "Lebih dari 28 hari"] },
    { field: "previous_preparation", label: "Sebelum menggunakan YUDHA, bagaimana kamu biasanya mempersiapkan tes?", kind: "multi", options: ["Belum rutin belajar", "Buku", "Video atau media sosial", "Aplikasi latihan", "Bimbel", OTHER], exclusive: ["Belum rutin belajar"], otherField: "previous_preparation_other" },
  ] },
  { id: "activity", title: "Aktivitas", questions: [
    { field: "active_days_last_week", label: "Dalam 7 hari terakhir, berapa hari kamu berlatih menggunakan YUDHA?", kind: "single", options: [0, 1, 2, 3, 4, 5, 6, 7], hint: "Hitung hari, bukan jumlah sesi. Pilih 0 jika belum berlatih." },
    { field: "features_used", label: "Fitur YUDHA mana saja yang pernah kamu gunakan?", kind: "multi", options: [...FEATURES, "Belum mencoba fitur"], exclusive: ["Belum mencoba fitur"] },
  ] },
  { id: "product", title: "Validasi produk", questions: [
    { field: "pmf_score", label: "Jika YUDHA tiba-tiba tidak tersedia lagi besok, bagaimana perasaanmu?", kind: "single", options: PMF },
    { field: "pmf_followup", label: "Apa faktor utama yang membuatmu kurang tertarik atau berhenti di YUDHA?", kind: "textarea" },
  ] },
  { id: "return", title: "Alasan kembali", questions: [
    { field: "return_reason", label: "Apa yang membuatmu ingin kembali berlatih di YUDHA, jika ada?", kind: "textarea", hint: "Jika belum ingin kembali, kamu juga boleh menceritakannya." },
  ] },
  { id: "learning", title: "Perubahan belajar", questions: [
    { field: "practice_frequency_change", label: "Dibanding sebelum menggunakan YUDHA, seberapa sering kamu sekarang berlatih soal?", kind: "single", options: ["Jauh lebih jarang", "Lebih jarang", "Sama", "Lebih sering", "Jauh lebih sering", NOT_ASSESSED] },
    { field: "weak_topic_clarity_change", label: "Dibanding sebelum menggunakan YUDHA, bagaimana kemampuanmu mengenali materi yang perlu dipelajari lagi?", kind: "single", options: ["Jauh lebih sulit", "Lebih sulit", "Tidak berubah", "Lebih mudah", "Jauh lebih mudah", NOT_ASSESSED] },
  ] },
  { id: "readiness", title: "Kesiapan dan tindakan", questions: [
    { field: "time_pressure_readiness_change", label: "Dibanding sebelum menggunakan YUDHA, bagaimana kesiapanmu mengerjakan soal dengan batas waktu?", kind: "single", options: ["Jauh kurang siap", "Kurang siap", "Tidak berubah", "Lebih siap", "Jauh lebih siap", NOT_ASSESSED] },
    { field: "learning_actions", label: "Apakah hasil analisis atau pembahasan YUDHA membuatmu melakukan sesuatu secara berbeda saat belajar?", kind: "multi", options: ["Mempelajari topik yang lemah", "Mengubah strategi menjawab", "Mengatur waktu latihan", "Belum mengubah apa pun", "Belum menggunakan fitur tersebut", OTHER], exclusive: ["Belum mengubah apa pun", "Belum menggunakan fitur tersebut"], otherField: "learning_actions_other" },
  ] },
  { id: "interview", title: "Latihan AI Interview", questions: [
    { field: "interview_changes", label: "Setelah latihan AI Interview, apa yang kamu ubah saat menjawab pertanyaan interview?", kind: "multi", options: ["Struktur jawaban", "Contoh pengalaman yang digunakan", "Relevansi jawaban", "Durasi jawaban", "Belum mengubah apa pun", OTHER], exclusive: ["Belum mengubah apa pun"], otherField: "interview_changes_other" },
  ] },
  { id: "experience", title: "Pengalaman nyata", questions: [
    { field: "concrete_change", label: "Ceritakan satu perubahan nyata setelah memakai YUDHA, jika ada.", kind: "textarea", optional: true, hint: "Apa yang sebelumnya sulit, lalu bagaimana kondisinya sekarang? Tidak ada perubahan juga boleh." },
    { field: "remaining_obstacles", label: "Apa kendala utama yang masih menghambat persiapan ujianmu saat menggunakan YUDHA?", kind: "textarea", optional: true },
  ] },
  { id: "followup", title: "Follow-up", questions: [
    { field: "preparation_status", label: "Bagaimana status pendaftaran CPNS / BUMN kamu saat ini?", kind: "single", options: STATUSES,
      optionLabels: ["Sedang aktif mendaftar & bersiap tes periode ini", "Bersiap untuk pendaftaran periode tahun depan", "Hanya mencoba-coba / belum ada rencana mendaftar"] },
    { field: "contact_consent", label: "Bolehkah tim YUDHA menghubungimu dalam 2–3 bulan ke depan untuk tanya hasil tes kamu?", kind: "single", options: [true, false], optionLabels: ["Ya, tentu boleh", "Tidak untuk saat ini"], hint: "Kontak digunakan untuk follow-up evaluasi perkembangan peserta." },
    { field: "contact_info", label: "Nomor WhatsApp atau alamat email untuk follow-up", kind: "text" },
  ] },
];

export function createFeedback(): FeedbackPayload {
  return {
    survey_version: 2, name: "", email: "", source: "", source_other: "", goal: "", goal_other: "",
    tutorial_clarity: null, onboarding_obstacles: "", usage_duration: "", previous_preparation: [], previous_preparation_other: "",
    active_days_last_week: null, features_used: [], pmf_score: "", pmf_followup: "", return_reason: "",
    practice_frequency_change: "", weak_topic_clarity_change: "", time_pressure_readiness_change: "",
    learning_actions: [], learning_actions_other: "", interview_changes: [], interview_changes_other: "",
    concrete_change: "", remaining_obstacles: "", preparation_status: "", contact_consent: null, contact_info: "",
  };
}

export function visibleFeedbackSteps(data: FeedbackPayload): FeedbackStep[] {
  return FEEDBACK_STEPS.filter(step => step.id !== "interview" || data.features_used.includes(AI_INTERVIEW));
}

export function visibleQuestions(step: FeedbackStep, data: FeedbackPayload): FeedbackQuestion[] {
  return step.questions.filter(q => (q.field !== "contact_info" || data.contact_consent === true)
    && (q.field !== "pmf_followup" || Boolean(data.pmf_score)));
}

export function questionLabel(question: FeedbackQuestion, data: FeedbackPayload): string {
  if (question.field !== "pmf_followup") return question.label;
  if (data.pmf_score === "Sangat kecewa") return "Nilai atau manfaat terbesar apa yang membuat YUDHA sangat berharga bagimu?";
  if (data.pmf_score === "Agak kecewa") return "Hal utama apa yang perlu ditingkatkan agar YUDHA jauh lebih bermanfaat?";
  return question.label;
}

export function toggleFeedbackChoice(selected: string[], choice: string, exclusive: readonly string[] = []): string[] {
  if (selected.includes(choice)) return selected.filter(value => value !== choice);
  if (exclusive.includes(choice)) return [choice];
  return [...selected.filter(value => !exclusive.includes(value)), choice];
}

export function updateFeedback(data: FeedbackPayload, field: FeedbackField, value: FeedbackValue): FeedbackPayload {
  const next = { ...data, [field]: value };
  for (const question of FEEDBACK_STEPS.flatMap(step => step.questions)) {
    if (question.otherField && !hasOther(next[question.field])) next[question.otherField] = "";
  }
  if (!next.features_used.includes(AI_INTERVIEW)) {
    next.interview_changes = [];
    next.interview_changes_other = "";
  }
  if (next.contact_consent !== true) next.contact_info = "";
  if (field === "pmf_score" && data.pmf_score !== value) next.pmf_followup = "";
  return next;
}

export function hasOther(value: unknown): boolean {
  return value === OTHER || (Array.isArray(value) && value.includes(OTHER));
}

export function validateFeedback(data: Record<string, unknown>, steps = FEEDBACK_STEPS): FeedbackErrors {
  const errors: FeedbackErrors = {};
  for (const step of steps) {
    if (step.id === "interview" && !(Array.isArray(data.features_used) && data.features_used.includes(AI_INTERVIEW))) continue;
    for (const q of step.questions) {
      if (q.field === "contact_info" && data.contact_consent !== true) continue;
      const value = data[q.field];
      if (q.kind === "single") {
        if (!q.options?.some(option => option === value)) errors[q.field] = "Pilih salah satu jawaban yang tersedia.";
      } else if (q.kind === "multi") {
        if (!Array.isArray(value) || value.length === 0 || value.some(item => !q.options?.includes(item))
          || new Set(value).size !== value.length || (value.length > 1 && value.some(item => q.exclusive?.includes(item)))) {
          errors[q.field] = "Pilih jawaban yang sesuai; pilihan belum menggunakan atau belum berubah tidak bisa digabung.";
        }
      } else if (typeof value !== "string" || (!q.optional && !value.trim()) || value.length > 2000) {
        errors[q.field] = q.optional ? "Gunakan teks maksimal 2.000 karakter." : "Isi jawaban ini (maksimal 2.000 karakter).";
      } else if (q.kind === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        errors[q.field] = "Masukkan alamat email yang valid.";
      }
      if (q.otherField && hasOther(value)) {
        const other = data[q.otherField];
        if (typeof other !== "string" || !other.trim() || other.length > 2000) errors[q.otherField] = "Sebutkan jawaban lainnya (maksimal 2.000 karakter).";
      }
    }
  }
  return errors;
}

export function parseFeedback(input: unknown): { data?: FeedbackPayload; errors: FeedbackErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { errors: { name: "Format jawaban tidak valid." } };
  const raw = input as Record<string, unknown>;
  if (raw.survey_version !== 2) return { errors: { name: "Versi survei tidak didukung." } };
  const defaults = createFeedback();
  const data = Object.fromEntries(Object.entries(defaults).map(([field, fallback]) => {
    const value = Object.hasOwn(raw, field) ? raw[field] : fallback;
    return [field, typeof value === "string" ? value.trim() : value];
  }));
  const errors = validateFeedback(data);
  if (Object.keys(errors).length) return { errors };
  // Hidden answers are discarded so consent and conditional responses cannot become stale.
  for (const q of FEEDBACK_STEPS.flatMap(step => step.questions)) {
    if (q.otherField && !hasOther(data[q.field])) data[q.otherField] = "";
  }
  if (!(data.features_used as string[]).includes(AI_INTERVIEW)) {
    data.interview_changes = [];
    data.interview_changes_other = "";
  }
  if (data.contact_consent !== true) data.contact_info = "";
  return { data: data as unknown as FeedbackPayload, errors: {} };
}
