"use client";

interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
  category: string;
}

export function FormProgressBar({
  currentStep,
  totalSteps,
  category,
}: FormProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <header className="w-full max-w-2xl mx-auto mb-4">
      <div className="flex items-center justify-between gap-4 mb-1.5">
        <span className="font-bold text-[11px] uppercase tracking-wider px-2.5 py-0.5 bg-[#e3ec35] text-[#090909] border border-[#090909] rounded-full shadow-[-1.5px_1.5px_0_#090909]">
          {category}
        </span>
        <div className="text-[#090909] font-bold text-xs bg-white/70 backdrop-blur px-2.5 py-0.5 rounded-full border border-black/10">
          Langkah <span className="text-[#0c70da]">{currentStep}</span> dari {totalSteps} ({percentage}%)
        </div>
      </div>
      
      <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-[#e3ec35] to-[#0c70da] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </header>
  );
}
