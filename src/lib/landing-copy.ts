export type Locale = "id" | "en";

export interface LocaleProps {
  locale?: Locale;
}

export function getLocale(value: string | string[] | undefined): Locale {
  return value === "en" ? "en" : "id";
}

export function localizedHref(path: string, locale: Locale, hash = "") {
  return `${path}${locale === "en" ? "?lang=en" : ""}${hash}`;
}

export function landingHref(locale: Locale, hash = "") {
  return localizedHref("/", locale, hash);
}

const id = {
  metadata: {
    title: "Yudha — Latihan Tes Seleksi & Wawancara AI",
    description: "Latihan tes seleksi CPNS, BUMN, dan management trainee lewat soal GAT, duel PvP, analisis progres, dan simulasi wawancara AI. Tersedia di Google Play.",
  },
  nav: {
    home: "Beranda Yudha",
    about: "Tentang Kami",
    howToPlay: "Cara Main",
    menu: "Buka menu",
    closeMenu: "Tutup menu",
    language: "Pilih bahasa",
    contact: "Hubungi Kami",
    main: "Navigasi utama",
    traction: "Pencapaian",
  },
  download: "Download Yudha di Google Play",
  community: "Gabung komunitas WhatsApp",
  hero: {
    availability: "Tersedia di Google Play",
    category: "Latihan GAT & simulasi wawancara AI",
    title: "Drilling soal dengan",
    titleEnd: "cara paling seru",
    description: "Siapkan tes CPNS, BUMN, dan management trainee lewat latihan soal, duel PvP, dan simulasi wawancara AI—langsung dari ponselmu.",
    note: "Gratis di Android. Latihan singkat, progres terukur, dan komunitas yang tumbuh bersama.",
  },
  map: {
    title: "Satu kemampuan, ratusan pintu terbuka",
    description: "Tes kemampuan umum atau General Aptitude Test (GAT) menjadi bagian dari banyak seleksi kerja dan beasiswa. Latih kemampuan verbal, numerik, logika, dan figural yang bisa kamu gunakan di berbagai tes.",
    imageAlt: "Diagram tingkat keketatan seleksi dan kompleksitas soal GAT",
    caption: "Semakin ke kanan, soal makin kompleks. Semakin ke atas, seleksi makin ketat.",
    note: "Yudha melatih kamu di semua level.",
  },
  catalog: {
    title: "Latihan sesuai tujuan seleksimu",
    description: "Yudha menyediakan latihan soal GAT lengkap—verbal, numerik, logika, dan figural—untuk persiapan CPNS, BUMN, hingga management trainee.",
    cards: { numerik: "Numerik", verbal: "Verbal", logis: "Logis", figural: "Figural", akhlak: "Akhlak", tkp: "TKP", twk: "TWK" },
  },
  demo: {
    label: "Cara main",
    title: "Lihat Yudha beraksi",
    intro: "Kenali pengalaman belajar Yudha lewat video demo ini.",
    description: "Mulai dari latihan soal dan duel bersama pemain lain hingga melihat progres dan berlatih wawancara dengan AI.",
    videoTitle: "Video Demo YUDHA",
    youtube: "Tonton di YouTube",
    steps: [
      { title: "Pilih latihanmu", description: "Latih soal GAT sesuai topik dan tujuan seleksimu." },
      { title: "Belajar sambil berduel", description: "Uji kemampuanmu lewat duel PvP dan bangun kebiasaan latihan." },
      { title: "Kenali langkah berikutnya", description: "Lihat analisis progres dan asah cara menjawab lewat AI Interview." },
    ],
  },
  practice: {
    title: "Latihan tiap hari, tanpa terasa berat",
    description: "Yudha bikin drilling harian nempel lewat streak, duel PvP, dan progres yang keliatan tiap hari—bukan numpuk soal di last minute.",
    features: [
      { id: "arena-pvp", label: "Arena PvP", description: "Duel lawan pemain lain secara real-time. Kalah menang bukan akhir—kamu langsung dikasih tau kelemahan kamu ada di mana, dan diarahkan latihan sendiri di topik itu." },
      { id: "analisis-performa", label: "Analisis Performa", description: "Semua progres kamu terekam: win rate, streak, akurasi jawaban, sampai kecepatan respons. Satu tempat buat lihat seberapa siap kamu sebenarnya." },
      { id: "ai-interview", label: "AI Interview", description: "Latihan jawab pertanyaan interview langsung ke AI, dapat feedback instan soal cara jawabmu. Bukan cuma soal tertulis, tapi juga persiapan ngomong di depan pewawancara." },
    ],
    screens: {
      "arena-main": "Tampilan Arena PvP Yudha",
      "arena-question": "Tampilan Soal Duel Arena PvP Yudha",
      profile: "Tampilan Analisis Performa Profil Yudha",
      interview: "Tampilan AI Interview Simulasi Suara Yudha",
    },
  },
  faq: {
    title: "Pertanyaan yang sering ditanyakan",
    items: [
      { question: "Apakah Yudha benar-benar gratis?", answer: "Ya, Yudha gratis untuk digunakan. Kamu bisa latihan drilling soal GAT, ikut duel PvP, dan pantau progres tanpa biaya apapun." },
      { question: "Soal GAT apa saja yang tersedia di Yudha?", answer: "Yudha menyediakan 7 jenis soal GAT: Numerik, Verbal, Logis, Figural, Akhlak, TKP, dan TWK. Semua dirancang untuk persiapan seleksi CPNS, BUMN, dan management trainee." },
      { question: "Bagaimana cara kerja fitur Arena PvP?", answer: "Di Arena PvP, kamu duel menjawab soal dengan pemain lain secara real-time. Setelah selesai, sistem menunjukkan kelemahan kamu dan mengarahkan latihan mandiri di topik tersebut." },
      { question: "Apakah AI Interview bisa bantu persiapan wawancara BUMN?", answer: "Tentu. AI Interview melatih kamu menjawab pertanyaan interview dan memberi feedback instan soal cara jawabmu—bukan cuma soal tertulis, tapi juga persiapan berbicara di depan pewawancara." },
    ],
  },
  cta: {
    title: "Latihan dimulai sekarang",
    description: "Akses soal di mana saja, kapan saja",
    imageAlt: "Karakter chibi Yudha beristirahat di atas bukit",
  },
  footer: {
    company: "Yudha", about: "Tentang Kami", team: "Tim Kami", mission: "Misi Kami",
    resources: "Informasi", contact: "Hubungi Kami", help: "Pusat Bantuan", download: "Download Aplikasi",
    legal: "Legal", privacy: "Kebijakan Privasi", connect: "Terhubung", community: "Komunitas WhatsApp",
    traction: "Pencapaian",
    description: "Persiapan tes seleksi dan wawancara yang lebih terjangkau, seru, dan terarah.",
    copyright: "Hak cipta dilindungi.",
    builtFor: "Dibangun untuk pembelajar di Indonesia.",
  },
};

const en: typeof id = {
  metadata: {
    title: "Yudha — Aptitude Practice & AI Mock Interviews",
    description: "Prepare for Indonesian civil service, state-owned enterprise, and management trainee selection with GAT practice, PvP duels, progress insights, and AI mock interviews.",
  },
  nav: {
    home: "Yudha home", about: "About", howToPlay: "How to Play",
    menu: "Open menu", closeMenu: "Close menu", language: "Choose language",
    contact: "Contact", main: "Main navigation", traction: "Traction",
  },
  download: "Download Yudha on Google Play",
  community: "Join our WhatsApp community",
  hero: {
    availability: "Available on Google Play",
    category: "GAT practice & AI interview preparation",
    title: "Practice questions.",
    titleEnd: "Have more fun.",
    description: "Prepare for Indonesian civil service, state-owned enterprise, and management trainee selection with aptitude practice, PvP duels, and AI mock interviews.",
    note: "Free on Android. Short practice sessions, clear progress, and a community to grow with.",
  },
  map: {
    title: "One skill, hundreds of open doors",
    description: "General Aptitude Tests (GAT) are part of many recruitment and scholarship selection processes. Build verbal, numerical, logical, and abstract reasoning skills that transfer across tests.",
    imageAlt: "Chart comparing selection competitiveness and GAT question complexity",
    caption: "Further right means more complex questions. Higher up means tougher competition.",
    note: "Yudha helps you practice at every level.",
  },
  catalog: {
    title: "Practice for your next selection test",
    description: "Practice verbal, numerical, logical, and abstract reasoning with Yudha. Prepare for Indonesian civil service (CPNS), state-owned enterprise (BUMN), and management trainee selection tests.",
    cards: { numerik: "Numerical", verbal: "Verbal", logis: "Logical", figural: "Abstract Reasoning", akhlak: "AKHLAK Values", tkp: "Personal Traits (TKP)", twk: "Civic Knowledge (TWK)" },
  },
  demo: {
    label: "How to play",
    title: "See Yudha in action",
    intro: "Get a feel for the Yudha learning experience in this product demo.",
    description: "Explore aptitude practice, duels with other players, progress insights, and AI interview preparation.",
    videoTitle: "YUDHA Demo Video",
    youtube: "Watch on YouTube",
    steps: [
      { title: "Choose your practice", description: "Work on aptitude questions that match your topics and selection goals." },
      { title: "Learn through duels", description: "Put your skills to the test in PvP duels and build a daily practice habit." },
      { title: "Find your next step", description: "Review your progress and improve your responses with AI Interview." },
    ],
  },
  practice: {
    title: "Daily practice that feels effortless",
    description: "Build a daily practice habit with streaks, PvP duels, and progress you can see every day—without the last-minute cramming.",
    features: [
      { id: "arena-pvp", label: "PvP Arena", description: "Challenge other players in real-time duels. Win or lose, you will discover where you can improve and get guided toward solo practice on those topics." },
      { id: "analisis-performa", label: "Performance Analysis", description: "Track everything: your win rate, streak, answer accuracy, and response speed. See how ready you really are, all in one place." },
      { id: "ai-interview", label: "AI Interview", description: "Practice answering interview questions with AI and get instant feedback on your responses. Go beyond written tests and build confidence for the real conversation." },
    ],
    screens: {
      "arena-main": "Yudha PvP Arena screen",
      "arena-question": "Yudha PvP duel question screen",
      profile: "Yudha profile and performance analysis screen",
      interview: "Yudha AI voice interview practice screen",
    },
  },
  faq: {
    title: "Questions, answered",
    items: [
      { question: "Is Yudha really free?", answer: "Yes, Yudha is free to use. Practice GAT questions, join PvP duels, and track your progress at no cost." },
      { question: "What types of GAT questions are available?", answer: "Yudha offers seven question categories: Numerical, Verbal, Logical, Abstract Reasoning, AKHLAK values, Personal Traits (TKP), and Civic Knowledge (TWK). They help you prepare for Indonesian civil service, state-owned enterprise, and management trainee selection tests." },
      { question: "How does the PvP Arena work?", answer: "Answer questions in real-time duels against other players. After each duel, Yudha highlights areas to improve and guides you toward solo practice on those topics." },
      { question: "Can AI Interview help me prepare for BUMN interviews?", answer: "Absolutely. AI Interview lets you practice answering interview questions and gives instant feedback on your responses. It helps you prepare to speak confidently with interviewers, beyond written tests." },
    ],
  },
  cta: {
    title: "Your practice starts now",
    description: "Practice anywhere, anytime",
    imageAlt: "Yudha chibi characters resting on a hill",
  },
  footer: {
    company: "Yudha", about: "About", team: "Our Team", mission: "Our Mission",
    resources: "Resources", contact: "Contact Us", help: "Help Center", download: "Download App",
    legal: "Legal", privacy: "Privacy Policy (ID)", connect: "Connect", community: "WhatsApp Community",
    traction: "Milestones",
    description: "Making aptitude test and interview preparation accessible, engaging, and focused.",
    copyright: "All rights reserved.",
    builtFor: "Built for learners in Indonesia.",
  },
};

export const landingCopy = { id, en };
