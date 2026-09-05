"use client";

import dynamic from "next/dynamic";

const ClosedPilotClient = dynamic(() => import("./ClosedPilotClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-4">
      <div className="w-10 h-10 border-4 border-stone-900 border-t-transparent rounded-full animate-spin mb-3" />
      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
        Memuat Assessment Test...
      </span>
    </div>
  ),
});

export default function ClosedPilotPage() {
  return <ClosedPilotClient />;
}
