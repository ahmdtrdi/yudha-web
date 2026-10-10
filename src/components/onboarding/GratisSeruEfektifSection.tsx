import { landingCopy, type LocaleProps } from "@/lib/landing-copy";
import { DEMO_VIDEO_ID, DEMO_VIDEO_URL } from "@/lib/links";

export function GratisSeruEfektifSection({ locale = "id" }: LocaleProps) {
  const copy = landingCopy[locale].demo;
  return (
    <section id="how-to-play" className="scroll-mt-6 w-full bg-[#9DD8F5] rounded-[28px] sm:rounded-[36px] py-10 sm:py-12 lg:py-14 px-5 sm:px-8 lg:px-10 flex flex-col items-center text-center font-sans my-4 sm:my-6 lg:my-8">
      <div className="w-full max-w-[1020px] flex flex-col items-center">

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-stone-700">{copy.label}</p>

        {/* Heading — 48px bold per Figma */}
        <h2 className="text-3xl sm:text-[40px] lg:text-[48px] font-extrabold text-stone-950 tracking-tight leading-[1.1] mb-2 sm:mb-3">
          {copy.title}
        </h2>

        {/* Subtitle — 16px, line break after first sentence per Figma */}
        <p className="text-sm sm:text-[15px] md:text-[16px] text-stone-700 font-normal leading-relaxed max-w-[740px] mb-5 sm:mb-6">
          {copy.intro}
          <br />
          {copy.description}
        </p>

        {/* Video Card — left+bottom black shadow per Figma */}
        <div id="demo-video" className="scroll-mt-6 w-full aspect-video border-[2.5px] border-stone-900 rounded-2xl sm:rounded-3xl bg-white shadow-[-4px_6px_0_rgba(0,0,0,0.9)] overflow-hidden">
          <iframe
            className="w-full h-full border-0"
            src={`https://www.youtube.com/embed/${DEMO_VIDEO_ID}`}
            title={copy.videoTitle}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <a href={DEMO_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4 hover:text-blue-800">
          {copy.youtube}
          <span aria-hidden="true">↗</span>
        </a>

        <ol className="mt-8 grid w-full grid-cols-1 gap-4 text-left md:grid-cols-3 sm:mt-10">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border-2 border-stone-950 bg-white/90 p-5 shadow-[3px_3px_0_#090909]">
              <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-stone-950 bg-[#e2ef44] text-sm font-extrabold">{index + 1}</span>
              <h3 className="text-base font-extrabold text-stone-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{step.description}</p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
