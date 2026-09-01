export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs">
      <div className="relative flex flex-col items-center gap-4">
        {/* Yudha Neobrutalist Brand Spinner */}
        <div className="relative w-14 h-14 rounded-2xl bg-[#e2ef44] border-2 border-black shadow-[4px_4.5px_0px_#000000] flex items-center justify-center animate-bounce">
          <span className="font-extrabold text-stone-950 text-xl tracking-tight">
            Y
          </span>
        </div>

        {/* Loading text */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0560fd] animate-ping" />
          <span className="text-xs sm:text-sm font-bold text-stone-900 tracking-wide">
            Memuat...
          </span>
        </div>
      </div>
    </div>
  );
}
