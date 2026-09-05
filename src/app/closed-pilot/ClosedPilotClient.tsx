"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Question,
  CONTESTANTS,
  getAssignedPackage,
  QUESTIONS_PAKET_A,
  QUESTIONS_PAKET_B,
  AssessmentRecord,
} from "@/lib/pilot-test-data";

type ScreenState = "LOGIN" | "SELECT_CONTESTANT" | "INFO" | "TEST" | "RESULT";

export default function ClosedPilotClient() {
  // Session & Navigation State
  const [screen, setScreen] = useState<ScreenState>("LOGIN");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // Contestant & Test Selection State (Only A, B, C, D)
  const [selectedContestantId, setSelectedContestantId] = useState<"A" | "B" | "C" | "D">("A");
  const [selectedPhase, setSelectedPhase] = useState<"pre" | "post">("pre");

  // Test Runner State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(20 * 60); // 20 minutes
  const [testStartTime, setTestStartTime] = useState<number>(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Result & History State
  const [currentResult, setCurrentResult] = useState<AssessmentRecord | null>(null);
  const [history, setHistory] = useState<AssessmentRecord[]>([]);
  const [showReview, setShowReview] = useState(false);

  // Check existing session and load history on mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const isAuth = sessionStorage.getItem("yudha_pilot_auth");
        if (isAuth === "true") {
          setScreen("SELECT_CONTESTANT");
        }

        const storedHistory = localStorage.getItem("yudha_pilot_history");
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch {
        // Storage unavailable fallback
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // Save history to localStorage whenever it changes
  const saveRecordToHistory = useCallback((record: AssessmentRecord) => {
    setHistory((prev) => {
      const updated = [record, ...prev];
      try {
        localStorage.setItem("yudha_pilot_history", JSON.stringify(updated));
      } catch {
        // Ignore storage error
      }
      return updated;
    });
  }, []);

  // Determine active question set based on selected contestant & phase
  const assignedPackageName = getAssignedPackage(selectedContestantId, selectedPhase);
  const activeQuestions: Question[] = assignedPackageName === "PAKET A" ? QUESTIONS_PAKET_A : QUESTIONS_PAKET_B;
  const currentQuestion = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const selectedContestant = CONTESTANTS.find((c) => c.id === selectedContestantId) || CONTESTANTS[0];

  // Calculate answered count
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = activeQuestions.length - answeredCount;

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "YudhaJu4r4") {
      try {
        sessionStorage.setItem("yudha_pilot_auth", "true");
      } catch {
        // Storage restricted fallback
      }
      setLoginError("");
      setScreen("SELECT_CONTESTANT");
    } else {
      setLoginError("Password salah. Silakan periksa kembali.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    try {
      sessionStorage.removeItem("yudha_pilot_auth");
    } catch {
      // Storage restricted fallback
    }
    setIsTestActive(false);
    setScreen("LOGIN");
    setPasswordInput("");
  };

  // Timer Tick
  const finishAssessmentRef = useRef<() => void>(() => {});

  // Handle Final Assessment Submission
  const finishAssessment = useCallback(() => {
    setIsTestActive(false);
    const durationSeconds = Math.max(1, Math.round((Date.now() - testStartTime) / 1000));

    // Calculate score
    let scoreGat = 0;
    let scoreSituasional = 0;

    activeQuestions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (ans !== undefined) {
        if (q.category === "SITUASIONAL") {
          const points = q.pointMap ? q.pointMap[ans] : ans === q.correctIndex ? 5 : 0;
          scoreSituasional += points;
        } else {
          if (ans === q.correctIndex) {
            scoreGat += 5;
          }
        }
      }
    });

    const totalScore = scoreGat + scoreSituasional;
    const now = new Date();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const dateDisplay = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()}`;
    const timeDisplay = `${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const newRecord: AssessmentRecord = {
      id: `${Date.now()}-${selectedContestantId}-${selectedPhase}`,
      timestamp: now.toISOString(),
      dateDisplay,
      timeDisplay,
      contestantId: selectedContestantId,
      contestantName: selectedContestant.name,
      phase: selectedPhase,
      packageAssigned: assignedPackageName,
      answers: { ...userAnswers },
      scoreGat,
      scoreSituasional,
      totalScore,
      durationSeconds,
      passingGradeMet: totalScore >= 70,
    };

    setCurrentResult(newRecord);
    saveRecordToHistory(newRecord);
    setShowConfirmModal(false);
    setScreen("RESULT");
  }, [activeQuestions, assignedPackageName, saveRecordToHistory, selectedContestant.name, selectedContestantId, selectedPhase, testStartTime, userAnswers]);

  useEffect(() => {
    finishAssessmentRef.current = finishAssessment;
  }, [finishAssessment]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTestActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            if (interval) clearInterval(interval);
            finishAssessmentRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestActive, secondsRemaining]);

  // Format Timer mm:ss
  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  // Start Test
  const handleStartTest = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setSecondsRemaining(20 * 60);
    setTestStartTime(Date.now());
    setIsTestActive(true);
    setScreen("TEST");
  };

  // Answer selection
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  // Navigate to Next / Skip
  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Reset entire history
  const handleClearHistory = () => {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat data uji coba?")) {
      setHistory([]);
      try {
        localStorage.removeItem("yudha_pilot_history");
      } catch {
        // Ignore
      }
    }
  };

  // Export CSV with standard Blob & UTF-8 BOM for Excel compatibility
  const handleExportCSV = () => {
    if (history.length === 0) {
      alert("Belum ada data riwayat untuk diexport.");
      return;
    }

    const headers = [
      "ID",
      "Tanggal",
      "Waktu",
      "Kontestan",
      "Sesi",
      "Paket Soal",
      "Nilai GAT (/75)",
      "Nilai Situasional (/25)",
      "Total Skor (/100)",
      "Status Passing Grade",
      "Durasi (detik)",
    ];

    // RFC 4180 CSV escaping
    const escapeCsv = (val: string | number) => {
      const str = String(val ?? "");
      if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headerLine = headers.map(escapeCsv).join(",");
    const rows = history.map((rec) => [
      rec.id,
      rec.dateDisplay,
      rec.timeDisplay,
      rec.contestantName,
      rec.phase.toUpperCase(),
      rec.packageAssigned,
      rec.scoreGat,
      rec.scoreSituasional,
      rec.totalScore,
      rec.passingGradeMet ? "LOLOS" : "BELUM LOLOS",
      rec.durationSeconds,
    ]);

    const rowLines = rows.map((row) => row.map(escapeCsv).join(","));
    // Prepend UTF-8 BOM (\uFEFF) so Excel on Windows recognizes UTF-8 without garbled characters
    const csvContent = "\uFEFF" + [headerLine, ...rowLines].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `yudha_pilot_assessment_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 200);
  };

  // Copy TSV to Clipboard for direct paste into Excel / Google Sheets
  const [copiedNotification, setCopiedNotification] = useState(false);
  const handleCopyTable = async () => {
    if (history.length === 0) {
      alert("Belum ada data riwayat untuk disalin.");
      return;
    }

    const headers = [
      "ID",
      "Tanggal",
      "Waktu",
      "Kontestan",
      "Sesi",
      "Paket Soal",
      "Nilai GAT (/75)",
      "Nilai Situasional (/25)",
      "Total Skor (/100)",
      "Status Passing Grade",
      "Durasi (detik)",
    ];

    const rows = history.map((rec) => [
      rec.id,
      rec.dateDisplay,
      rec.timeDisplay,
      rec.contestantName,
      rec.phase.toUpperCase(),
      rec.packageAssigned,
      rec.scoreGat,
      rec.scoreSituasional,
      rec.totalScore,
      rec.passingGradeMet ? "LOLOS" : "BELUM LOLOS",
      rec.durationSeconds,
    ]);

    const tsvContent = [headers.join("\t"), ...rows.map((e) => e.join("\t"))].join("\n");
    try {
      await navigator.clipboard.writeText(tsvContent);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 3000);
    } catch {
      // Fallback
      alert("Gagal menyalin otomatis. Silakan gunakan Export CSV.");
    }
  };

  // ==========================================
  // SHARED HEADER
  // ==========================================
  const renderHeader = () => (
    <header className="w-full max-w-5xl mx-auto bg-white border-2 border-stone-900/20 rounded-2xl sm:rounded-3xl px-6 py-4 flex items-center justify-between shadow-xs mb-6 sm:mb-8">
      {/* Brand Logo & Title */}
      <div className="flex items-center gap-3">
        <Link href="/" className="inline-block">
          <Image
            src="/assets/logo-yudha.svg"
            alt="Yudha Logo"
            width={72}
            height={42}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>
        <span className="text-lg sm:text-xl font-[800] text-stone-950 tracking-tight">
          Yudha Assessment Test
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        style={{ backgroundColor: "#0560fd", color: "#ffffff" }}
        className="px-6 py-2.5 font-[800] text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2.5px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
      >
        Logout
      </button>
    </header>
  );

  // ==========================================
  // RENDER: 1. LOGIN SCREEN (Matching Screenshot 2)
  // ==========================================
  if (screen === "LOGIN") {
    return (
      <main className="min-h-screen w-full bg-[#f4f6f8] flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Top Header: Back to Website Link */}
        <div className="w-full max-w-5xl mx-auto flex justify-end items-center py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-stone-900 hover:text-stone-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Website
          </Link>
        </div>

        {/* Center Card Container */}
        <div className="w-full max-w-4xl mx-auto my-auto bg-white rounded-3xl sm:rounded-[36px] border border-stone-200 shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Column: Artwork Image */}
          <div className="w-full md:w-1/2 min-h-[260px] sm:min-h-[340px] md:min-h-[460px] relative bg-[#7ac2e9] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
            <Image
              src="/assets/hero-43-form.png"
              alt="Yudha Adventurers"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-bottom"
            />
            {/* Top Logo Overlay */}
            <div className="relative z-10">
              <Image
                src="/assets/logo-yudha.svg"
                alt="Yudha Logo"
                width={120}
                height={60}
                priority
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm"
              />
            </div>
            <div className="relative z-10" />
          </div>

          {/* Right Column: Password Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white">
            <h1 className="text-2xl sm:text-3xl font-[800] text-stone-950 tracking-tight leading-snug mb-1">
              Welcome to Yudha,<br />Assessment Test
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-medium mb-6 sm:mb-8">
              Masuk ke Akun
            </p>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs sm:text-sm font-bold text-stone-900">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="your password"
                  className="w-full px-4 py-3 border border-stone-300 rounded-2xl text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition-colors"
                />
                <p className="text-[11px] text-stone-400">
                  Gunakan password akses pilot: <code className="font-mono text-stone-700 bg-stone-100 px-1 py-0.5 rounded">YudhaJu4r4</code>
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
                  {loginError}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  style={{ backgroundColor: "#0560fd", color: "#ffffff" }}
                  className="px-8 py-3 font-[800] text-sm sm:text-base rounded-2xl border-2 border-black shadow-[2.5px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="py-2" />
      </main>
    );
  }

  // ==========================================
  // RENDER: 2. SELECT CONTESTANT & PHASE SCREEN
  // ==========================================
  if (screen === "SELECT_CONTESTANT") {
    const contestantsList: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];

    return (
      <main className="min-h-screen w-full bg-[#f4f6f8] px-4 py-6 sm:py-8 flex flex-col items-center overflow-y-auto">
        {renderHeader()}

        <div className="w-full max-w-4xl bg-white border-2 border-stone-900/15 rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* Clean Heading */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-[800] text-stone-950 tracking-tight">
              Pilih Kontestan & Sesi Ujian
            </h2>
          </div>

          <div className="space-y-6">
            {/* Step 1: Pilih Kontestan (Clean: Only Kontestan A, B, C, D) */}
            <div>
              <label className="text-sm font-[800] text-stone-900 block mb-3">
                1. Pilih Kontestan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {contestantsList.map((id) => {
                  const isSelected = selectedContestantId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedContestantId(id)}
                      className={`p-4 rounded-2xl text-center border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? "border-black bg-blue-50 shadow-[3px_3px_0px_#000000]"
                          : "border-stone-200 bg-white hover:border-stone-400"
                      }`}
                    >
                      <span className="font-[800] text-stone-950 text-base sm:text-lg">
                        Kontestan {id}
                      </span>
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                          isSelected
                            ? "bg-[#0560fd] text-white border-black"
                            : "bg-stone-100 text-stone-400 border-stone-300"
                        }`}
                      >
                        {isSelected ? "✓" : id}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Pilih Sesi (Clean: Pre-Test vs Post-Test) */}
            <div>
              <label className="text-sm font-[800] text-stone-900 block mb-3">
                2. Pilih Sesi:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  type="button"
                  onClick={() => setSelectedPhase("pre")}
                  className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPhase === "pre"
                      ? "border-black bg-[#e2ef44]/40 shadow-[3px_3px_0px_#000000]"
                      : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
                >
                  <div>
                    <span className="font-[800] text-stone-950 text-base sm:text-lg block">
                      Pre-Test
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      Sebelum Menggunakan YUDHA
                    </span>
                  </div>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                      selectedPhase === "pre"
                        ? "bg-black text-white border-black"
                        : "bg-stone-100 text-stone-400 border-stone-300"
                    }`}
                  >
                    {selectedPhase === "pre" ? "✓" : ""}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPhase("post")}
                  className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex items-center justify-between ${
                    selectedPhase === "post"
                      ? "border-black bg-[#e2ef44]/40 shadow-[3px_3px_0px_#000000]"
                      : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
                >
                  <div>
                    <span className="font-[800] text-stone-950 text-base sm:text-lg block">
                      Post-Test
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      Setelah Menggunakan YUDHA
                    </span>
                  </div>
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black border ${
                      selectedPhase === "post"
                        ? "bg-black text-white border-black"
                        : "bg-stone-100 text-stone-400 border-stone-300"
                    }`}
                  >
                    {selectedPhase === "post" ? "✓" : ""}
                  </span>
                </button>
              </div>
            </div>

            {/* Step 3: Clean Summary & Action Button */}
            <div className="p-4 sm:p-5 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
              <div>
                <span className="text-xs font-bold text-stone-500 block">
                  Paket Soal Terpilih:
                </span>
                <p className="text-base sm:text-lg font-[800] text-stone-950 mt-0.5">
                  Kontestan {selectedContestantId} ({selectedPhase.toUpperCase()}) ➔{" "}
                  <span className="text-blue-700 font-extrabold bg-blue-100 px-2.5 py-0.5 rounded-lg border border-blue-300">
                    {assignedPackageName}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setScreen("INFO")}
                style={{ backgroundColor: "#e2ef44", color: "#000000" }}
                className="px-6 py-3 font-[800] text-sm sm:text-base rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer whitespace-nowrap self-stretch sm:self-auto text-center"
              >
                Lanjut ke Ketentuan Tes ➔
              </button>
            </div>
          </div>

          {/* History Preview Link */}
          {history.length > 0 && (
            <div className="mt-8 pt-6 border-t border-stone-200 flex justify-between items-center">
              <span className="text-xs font-medium text-stone-500">
                Tersimpan {history.length} data riwayat assessment di browser ini.
              </span>
              <button
                type="button"
                onClick={() => setScreen("RESULT")}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Lihat Riwayat Assessment ➔
              </button>
            </div>
          )}
        </div>
      </main>
    );
  }

  // ==========================================
  // RENDER: 3. ASSESSMENT INFORMATION (Matching Screenshot 1)
  // ==========================================
  if (screen === "INFO") {
    return (
      <main className="min-h-screen w-full bg-[#f4f6f8] px-4 py-6 sm:py-8 flex flex-col items-center overflow-y-auto">
        {renderHeader()}

        {/* Main Card */}
        <div className="w-full max-w-4xl bg-white border border-stone-300 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm text-left">
          <h2 className="text-2xl sm:text-3xl font-[800] text-stone-950 tracking-tight text-center mb-6">
            Assessment Information
          </h2>

          {/* Badge Info Peserta */}
          <div className="mb-6 p-3.5 bg-blue-50/60 border border-blue-200 rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-stone-500">Peserta:</span>{" "}
              <strong className="text-stone-950 font-bold">Kontestan {selectedContestantId}</strong>
            </div>
            <div>
              <span className="font-semibold text-stone-500">Sesi:</span>{" "}
              <span className="font-bold text-blue-700 uppercase bg-white px-2 py-0.5 rounded border border-blue-200">
                {selectedPhase}-Test
              </span>{" "}
              • <strong className="text-stone-950">{assignedPackageName}</strong>
            </div>
          </div>

          <div className="space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
            {/* Section A */}
            <div>
              <h3 className="font-bold text-stone-950 text-sm sm:text-base mb-2">
                A. Jumlah Soal & Waktu
              </h3>
              <p className="text-stone-600 mb-2">
                Total <strong>20 soal</strong> dikerjakan dalam <strong>20 menit</strong> (1/2 porsi standar GAT), terbagi dalam 4 subtest:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-stone-600">
                <li>
                  <strong>Verbal</strong> (Analogi, Silogisme, Analitis) — 5 soal, Benar = 5, Salah/Kosong = 0
                </li>
                <li>
                  <strong>Numerik</strong> (Deret, Pecahan, Aljabar, Aritmatika) — 6 soal, Benar = 5, Salah/Kosong = 0
                </li>
                <li>
                  <strong>Logis & Figural</strong> (Serial Pola, Inversi, Irisan XOR) — 4 soal, Benar = 5, Salah/Kosong = 0
                </li>
                <li>
                  <strong>Situasional & Integritas</strong> (TWK / TKP) — 5 soal, Skala Adaptif = 5 s.d. 1, Tidak menjawab = 0
                </li>
              </ol>
              <p className="mt-2 text-stone-900 font-semibold">
                Skor maksimal total: <strong>100</strong> (GAT 75 + Situasional 25) • Target Passing Grade: <strong>≥ 70</strong>
              </p>
            </div>

            {/* Section B */}
            <div>
              <h3 className="font-bold text-stone-950 text-sm sm:text-base mb-2">
                B. Ketentuan Pengerjaan
              </h3>
              <ol className="list-decimal pl-5 space-y-1.5 text-stone-600">
                <li>Timer berjalan otomatis sejak sesi dimulai dan tidak dapat dijeda.</li>
                <li>Soal dapat dikerjakan secara acak — lewati soal sulit dan kembali lagi sebelum waktu habis.</li>
                <li>Jawaban tersimpan otomatis saat dipilih; dapat diubah selama sesi masih berjalan.</li>
                <li>Sistem akan submit otomatis begitu waktu 20 menit habis, termasuk soal yang belum terjawab.</li>
                <li>Pastikan koneksi internet stabil — jangan menutup atau me-refresh browser selama tes berlangsung.</li>
                <li>Tidak diperkenankan membuka tab/aplikasi lain selama sesi berjalan.</li>
              </ol>
            </div>

            <p className="text-stone-600 pt-2 font-medium">
              Dengan menekan <strong>&quot;Mulai Assessment&quot;</strong>, Anda menyatakan telah memahami seluruh ketentuan di atas dan siap memulai tes.
            </p>
          </div>

          {/* Button: Mulai Assessment (Lime Green, black border & shadow) */}
          <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setScreen("SELECT_CONTESTANT")}
              className="px-5 py-2.5 rounded-xl border border-stone-300 font-bold text-xs sm:text-sm text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              ← Ganti Kontestan / Sesi
            </button>

            <button
              type="button"
              onClick={handleStartTest}
              style={{ backgroundColor: "#e2ef44", color: "#000000" }}
              className="px-8 py-3.5 font-[800] text-sm sm:text-base rounded-2xl border-2 border-black shadow-[3px_3.5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            >
              Mulai Assessment
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // RENDER: 4. TEST RUNNER (Matching Screenshot 3)
  // ==========================================
  if (screen === "TEST") {
    const isOptionSelected = (optIdx: number) => userAnswers[currentQuestion.id] === optIdx;

    return (
      <main className="min-h-screen lg:h-screen w-full bg-[#f4f6f8] p-3 sm:p-4 flex flex-col justify-between overflow-hidden">
        {/* Top Header Bar - Clean & Compact */}
        <header className="w-full max-w-7xl mx-auto bg-white border border-stone-200 rounded-2xl px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs mb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo-yudha.svg"
              alt="Yudha Logo"
              width={64}
              height={36}
              priority
              className="h-7 sm:h-8 w-auto object-contain"
            />
            <div>
              <span className="text-sm sm:text-base font-[800] text-stone-950 tracking-tight block">
                Yudha Assessment Test
              </span>
              <span className="text-[11px] text-stone-400 font-medium">
                {assignedPackageName} • 20 Soal
              </span>
            </div>
          </div>

          {/* Subtest & Contestant Info in Header */}
          <div className="flex items-center gap-3 text-xs">
            <div className="hidden md:flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
              <span className="text-stone-400 font-semibold">Subtes:</span>
              <span className="text-stone-800 font-bold max-w-xs truncate">{currentQuestion.subtest}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-1 rounded-lg uppercase">
                Kontestan {selectedContestantId} ({selectedPhase}-Test)
              </span>
              <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                Progress: {Math.round((answeredCount / activeQuestions.length) * 100)}%
              </span>
            </div>
          </div>
        </header>

        {/* Main 2-Column CAT Workspace */}
        <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col lg:flex-row gap-3 sm:gap-4 min-h-0 overflow-hidden">
          {/* LEFT SIDEBAR: Question Navigation, Timer & Stats */}
          <aside className="w-full lg:w-72 bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-4 shadow-xs flex flex-col justify-between flex-shrink-0 overflow-y-auto">
            <div className="space-y-3">
              {/* Dark Digital Countdown Timer Box */}
              <div
                style={{ backgroundColor: "#1c1917", color: "#ffffff" }}
                className="p-3 rounded-2xl border border-stone-700 shadow-sm text-center"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  Sisa Waktu
                </span>
                <span className="font-mono font-black text-2xl tracking-wider text-white">
                  {formatTimer(secondsRemaining)}
                </span>
              </div>

              {/* Legend: Hijau vs Merah */}
              <div className="flex items-center justify-between text-[11px] text-stone-600 font-semibold px-1">
                <span>
                  <span className="inline-block w-2.5 h-2.5 bg-[#16a34a] rounded-xs mr-1 align-middle" />
                  Dijawab ({answeredCount})
                </span>
                <span>
                  <span className="inline-block w-2.5 h-2.5 bg-[#dc2626] rounded-xs mr-1 align-middle" />
                  Belum ({unansweredCount})
                </span>
              </div>

              {/* 5x4 Grid of 20 Question Buttons */}
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                  Daftar Soal
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {activeQuestions.map((q, idx) => {
                    const isAnswered = userAnswers[q.id] !== undefined;
                    const isCurrent = currentQuestionIndex === idx;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQuestionIndex(idx)}
                        style={{
                          backgroundColor: isAnswered ? "#16a34a" : "#dc2626",
                          color: "#ffffff",
                        }}
                        className={`h-8 rounded-lg text-xs font-extrabold transition-all flex items-center justify-center cursor-pointer ${
                          isCurrent
                            ? "ring-3 ring-black ring-offset-1 scale-105 z-10 shadow-sm"
                            : "opacity-90 hover:opacity-100 hover:scale-105"
                        }`}
                        title={`Soal ${q.id}: ${isAnswered ? "Sudah dijawab" : "Belum dijawab"}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom of Sidebar: Selesai Assessment Button */}
            <div className="pt-3 border-t border-stone-100 mt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                style={{ backgroundColor: "#e2ef44", color: "#000000" }}
                className="w-full py-2.5 font-[800] text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2px_2.5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer text-center"
              >
                Selesai Assessment
              </button>
            </div>
          </aside>

          {/* RIGHT WORKSPACE: Question Card & Actions */}
          <section className="flex-1 bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Question Card Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-extrabold text-stone-900 bg-stone-100 px-3 py-1 rounded-lg border border-stone-200">
                    Soal No. {currentQuestion.id} / {activeQuestions.length}
                  </span>
                  <span className="text-xs font-semibold text-stone-500 md:hidden">
                    {currentQuestion.subtest}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-stone-400 uppercase tracking-wider">
                  {currentQuestion.category}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-sm sm:text-base font-semibold text-stone-900 leading-relaxed whitespace-pre-line mb-4 sm:mb-5">
                {currentQuestion.question}
              </p>

              {/* Radio Options A, B, C, D, E */}
              <div className="space-y-2 sm:space-y-2.5">
                {currentQuestion.options.map((optionText, optIdx) => {
                  const letter = String.fromCharCode(65 + optIdx);
                  const selected = isOptionSelected(optIdx);

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-2.5 sm:p-3 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                        selected
                          ? "border-[#0560fd] bg-blue-50/70 shadow-xs"
                          : "border-stone-200 bg-white hover:border-stone-400"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 border-2 flex items-center justify-center ${
                          selected ? "border-[#0560fd]" : "border-stone-400"
                        }`}
                      >
                        {selected && <div className="w-2.5 h-2.5 bg-[#0560fd] rounded-full" />}
                      </div>
                      <div className="flex-1 text-xs sm:text-sm text-stone-900 leading-normal">
                        <strong className="font-extrabold text-stone-950 mr-2 inline-block">{letter}.</strong>
                        <span>{optionText}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Prev, Simpan & Lanjutkan, Lewatkan */}
            <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-3.5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm rounded-xl border border-stone-300 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-stone-700"
                >
                  ‹ Sebelumnya
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentQuestionIndex === activeQuestions.length - 1}
                  className="px-3.5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm rounded-xl border border-stone-300 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-stone-700"
                >
                  Berikutnya ›
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleNext}
                  style={{ backgroundColor: "#0560fd", color: "#ffffff" }}
                  className="px-5 sm:px-6 py-2 sm:py-2.5 font-bold text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2px_2.5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  {currentQuestionIndex === activeQuestions.length - 1
                    ? "Tinjau / Selesai"
                    : "Simpan dan Lanjutkan"}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  style={{ backgroundColor: "#0560fd", color: "#ffffff" }}
                  className="px-4 sm:px-5 py-2 sm:py-2.5 font-bold text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2px_2.5px_0px_#000000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
                >
                  Lewatkan
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-black shadow-[4px_5px_0px_#000000] text-center">
              <h3 className="text-xl font-extrabold text-stone-950 mb-2">
                Selesaikan Assessment?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-4">
                {unansweredCount > 0
                  ? `Perhatian: Masih ada ${unansweredCount} butir soal yang belum dijawab. Apakah Anda yakin ingin mengakhiri sesi sekarang?`
                  : "Seluruh 20 soal telah dijawab. Anda siap mengirimkan hasil assessment?"}
              </p>
              <div className="p-3 bg-stone-100 rounded-xl text-xs font-semibold text-stone-700 mb-6 flex justify-around">
                <span>Soal Dijawab: <strong className="text-green-700">{answeredCount}</strong></span>
                <span>Belum Dijawab: <strong className="text-red-700">{unansweredCount}</strong></span>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                >
                  Kembali Mengerjakan
                </button>
                <button
                  type="button"
                  onClick={finishAssessment}
                  style={{ backgroundColor: "#e2ef44", color: "#000000" }}
                  className="px-5 py-2.5 font-[800] text-xs sm:text-sm rounded-xl border-2 border-black shadow-[2px_2.5px_0px_#000000] active:translate-x-[1px] cursor-pointer"
                >
                  Ya, Selesaikan Sekarang
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }

  // ==========================================
  // RENDER: 5. RESULT & HISTORY SCREEN (Matching Screenshot 4)
  // ==========================================
  const displayResult = currentResult || (history.length > 0 ? history[0] : null);

  return (
    <main className="min-h-screen w-full bg-[#f4f6f8] px-4 py-6 sm:py-8 flex flex-col items-center">
      {renderHeader()}

      <div className="w-full max-w-5xl space-y-6">
        {/* Card 1: Assessment Result matching Screenshot 4 */}
        {displayResult && (
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2 mb-6">
              <h2 className="text-2xl sm:text-3xl font-[800] text-stone-950 tracking-tight">
                Assessment Result
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-extrabold rounded-full uppercase border border-blue-200">
                  {displayResult.contestantName}
                </span>
                <span
                  style={{ backgroundColor: "#e2ef44", color: "#000000" }}
                  className="px-3 py-1 text-xs font-extrabold rounded-full uppercase border border-black"
                >
                  {displayResult.phase}-TEST • {displayResult.packageAssigned}
                </span>
              </div>
            </div>

            {/* Score Grid matching Screenshot 4 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-2">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-400 block mb-1">Nilai GAT (/75)</span>
                <span className="text-3xl sm:text-4xl font-[900] text-stone-900">
                  {displayResult.scoreGat}
                </span>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-400 block mb-1">Nilai Situasional (/25)</span>
                <span className="text-3xl sm:text-4xl font-[900] text-stone-900">
                  {displayResult.scoreSituasional}
                </span>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-400 block mb-1">Durasi Pengerjaan</span>
                <span className="text-2xl sm:text-3xl font-[900] text-stone-900">
                  {Math.floor(displayResult.durationSeconds / 60)}m {displayResult.durationSeconds % 60}s
                </span>
              </div>

              <div className="bg-blue-50/70 p-4 rounded-2xl border-2 border-blue-400">
                <span className="text-xs font-bold text-blue-700 block mb-1">Skor Tes (/100)</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-2xl font-black ${displayResult.passingGradeMet ? "text-green-600" : "text-red-500"}`}>
                    {displayResult.passingGradeMet ? "↑" : "↓"}
                  </span>
                  <span className="text-3xl sm:text-4xl font-[900] text-stone-950">
                    {displayResult.totalScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Passing Grade Status */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-stone-500 font-medium">Status Hasil: </span>
                {displayResult.passingGradeMet ? (
                  <strong className="text-green-700 font-extrabold bg-green-100 px-2.5 py-1 rounded-lg">
                    ✓ Lolos Passing Grade (≥ 70)
                  </strong>
                ) : (
                  <strong className="text-red-700 font-extrabold bg-red-100 px-2.5 py-1 rounded-lg">
                    ✕ Belum Mencapai Passing Grade (&lt; 70)
                  </strong>
                )}
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowReview(!showReview)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                >
                  {showReview ? "Sembunyikan Pembahasan" : "Lihat Review & Pembahasan ➔"}
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 font-bold text-xs rounded-xl border border-stone-300 bg-white hover:bg-stone-50 shadow-xs active:translate-x-[1px] transition-all cursor-pointer"
                >
                  📥 Download CSV
                </button>

                <button
                  type="button"
                  onClick={() => setScreen("SELECT_CONTESTANT")}
                  style={{ backgroundColor: "#e2ef44", color: "#000000" }}
                  className="px-4 py-2 font-[800] text-xs rounded-xl border-2 border-black shadow-[2px_2.5px_0px_#000000] active:translate-x-[1px] transition-all cursor-pointer"
                >
                  + Uji Peserta / Sesi Lain
                </button>
              </div>
            </div>

            {/* Review Section */}
            {showReview && (
              <div className="mt-6 pt-6 border-t border-stone-200 space-y-4">
                <h4 className="font-extrabold text-stone-900 text-sm">
                  Review Jawaban & Pembahasan ({displayResult.packageAssigned}):
                </h4>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {(displayResult.packageAssigned === "PAKET A" ? QUESTIONS_PAKET_A : QUESTIONS_PAKET_B).map((q) => {
                    const userAns = displayResult.answers[q.id];
                    const isCorrect = userAns === q.correctIndex;
                    const letterUser = userAns !== undefined ? String.fromCharCode(65 + userAns) : "Tidak Dijawab";
                    const letterKey = String.fromCharCode(65 + q.correctIndex);

                    return (
                      <div key={q.id} className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between font-bold">
                          <span>Soal {q.id} ({q.category})</span>
                          <span className={isCorrect ? "text-green-700" : "text-red-600"}>
                            Jawaban: {letterUser} • Kunci: {letterKey} {isCorrect ? "(Benar)" : "(Salah)"}
                          </span>
                        </div>
                        <p className="text-stone-700 font-medium">{q.question}</p>
                        <p className="text-stone-500 italic bg-white p-2 rounded border border-stone-200">
                          Trik / Penjelasan: {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Card 2: History Assessment matching Screenshot 4 */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-[800] text-stone-950 tracking-tight">
                History Assessment
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Rekapitulasi seluruh sesi uji coba offline 4 peserta.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopyTable}
                className="px-3.5 py-1.5 bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2.5px_0px_#000000] cursor-pointer transition-all"
                title="Salin tabel ke clipboard (bisa langsung paste ke Excel atau Google Sheets)"
              >
                {copiedNotification ? "✓ Tersalin ke Clipboard!" : "📋 Salin Tabel (Excel)"}
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3.5 py-1.5 bg-white hover:bg-stone-50 text-stone-900 font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2.5px_0px_#000000] cursor-pointer transition-all"
              >
                📥 Export CSV
              </button>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="px-3 py-1.5 text-xs text-red-600 font-semibold hover:underline cursor-pointer"
                >
                  Hapus History
                </button>
              )}
            </div>
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs sm:text-sm">
              Belum ada riwayat pengerjaan tes. Silakan mulai assessment pertama.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-stone-400 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                    <th className="py-3 px-3">Tanggal Assessment</th>
                    <th className="py-3 px-3">Waktu</th>
                    <th className="py-3 px-3">Peserta & Sesi</th>
                    <th className="py-3 px-3">Paket</th>
                    <th className="py-3 px-3 text-center">Nilai GAT</th>
                    <th className="py-3 px-3 text-center">Nilai TKP</th>
                    <th className="py-3 px-3 text-right">Skor Tes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {history.map((rec) => (
                    <tr key={rec.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3 px-3 font-medium text-stone-700">{rec.dateDisplay}</td>
                      <td className="py-3 px-3 font-medium text-stone-500">{rec.timeDisplay}</td>
                      <td className="py-3 px-3 font-bold text-stone-900">
                        {rec.contestantName} <span className="text-[11px] text-blue-600 uppercase">({rec.phase})</span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-stone-600">{rec.packageAssigned}</td>
                      <td className="py-3 px-3 text-center font-bold text-stone-700">{rec.scoreGat}</td>
                      <td className="py-3 px-3 text-center font-bold text-stone-700">{rec.scoreSituasional}</td>
                      <td className="py-3 px-3 text-right font-black text-stone-950">
                        <span className={`inline-block mr-1 ${rec.passingGradeMet ? "text-green-600" : "text-red-500"}`}>
                          {rec.passingGradeMet ? "↑" : "↓"}
                        </span>
                        {rec.totalScore}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
