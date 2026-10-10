import { landingHref, type LocaleProps } from "@/lib/landing-copy";
import { DEMO_VIDEO_ANCHOR, PIDI_CATALOG_URL, PIDI_PROGRAM_URL, PLAY_STORE_URL, WHATSAPP_COMMUNITY_URL } from "@/lib/links";
import { startupCopy } from "@/lib/startup-copy";

const milestoneLinks = [PLAY_STORE_URL, DEMO_VIDEO_ANCHOR, WHATSAPP_COMMUNITY_URL];

export function TractionSection({ locale = "id" }: LocaleProps) {
  const { traction: copy, recognition } = startupCopy[locale];

  return (
    <section id="traction" aria-labelledby="traction-title" className="scroll-mt-6 w-full bg-white px-5 py-12 sm:px-10 sm:py-16 lg:px-14">
      <div className="mx-auto max-w-[1120px]">
        <div className="mb-8 max-w-[760px] sm:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-stone-600">{copy.label}</p>
          <h2 id="traction-title" className="text-3xl font-extrabold leading-tight tracking-tight text-stone-950 sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base">{copy.description}</p>
        </div>

        <div className="mb-6 rounded-[24px] border-2 border-stone-950 bg-[#eef4ff] p-6 sm:p-8">
          <dl className="grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-stone-700">{copy.downloads}</dt>
              <dd className="mt-2 text-4xl font-extrabold tracking-tight text-blue-800 sm:text-5xl">10+</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-stone-700">{copy.latestUpdate}</dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-tight text-stone-950 sm:text-3xl">
                <time dateTime="2026-09-23">23 Sep 2026</time>
              </dd>
            </div>
          </dl>
          <div className="mt-5 border-t border-stone-950/15 pt-4 text-xs leading-relaxed text-stone-600">
            <p>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-800 underline underline-offset-4">{copy.source} ↗</a>
              <span className="mx-2" aria-hidden="true">·</span>
              <time dateTime="2026-10-10">{copy.checked}</time>
            </p>
            <p className="mt-1">{copy.downloadsNote}</p>
          </div>
        </div>

        <div className="grid items-stretch gap-6 md:grid-cols-2">
          <article className="flex flex-col rounded-[28px] border-2 border-stone-950 bg-[#f2f6bc] p-6 shadow-[4px_5px_0_#090909] sm:p-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-stone-950 bg-[#e2ef44]">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 3h8v5a4 4 0 0 1-8 0V3Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 1v6m-4 3h8m-6-3h4v3h-4v-3Z" />
              </svg>
            </div>
            <p className="text-4xl font-extrabold tracking-tight sm:text-5xl">{recognition.rank}</p>
            <h3 className="mt-3 text-xl font-extrabold leading-snug">{recognition.event}</h3>
            <p className="mt-2 text-sm font-semibold text-stone-700">{recognition.organizer}</p>
            <p className="mt-5 text-sm leading-relaxed text-stone-700">{recognition.description}</p>
            <a href={PIDI_PROGRAM_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-bold underline underline-offset-4 hover:text-blue-700">
              {recognition.program}<span aria-hidden="true">↗</span>
            </a>
            <div className="mt-6 border-t border-stone-950/20 pt-5">
              <p className="text-sm leading-relaxed text-stone-700">{recognition.catalogNote}</p>
              <a href={PIDI_CATALOG_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold underline underline-offset-4 hover:text-blue-700">
                {recognition.catalog}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>

          <div className="rounded-[28px] border-2 border-stone-950 bg-[#f6f7ef] p-6 sm:p-8">
            <h3 className="text-xl font-extrabold">{copy.productTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">{copy.productDescription}</p>
            <ul className="mt-5 divide-y divide-stone-300">
              {copy.milestones.map((milestone, index) => (
                <li key={milestone.title} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">✓</span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-extrabold sm:text-base">{milestone.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-stone-600">{milestone.description}</p>
                      {index === 1 ? (
                        <a href={landingHref(locale, milestoneLinks[index])} className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 underline underline-offset-4">
                          {milestone.action}<span aria-hidden="true">→</span>
                        </a>
                      ) : (
                        <a href={milestoneLinks[index]} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-700 underline underline-offset-4">
                          {milestone.action}<span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
