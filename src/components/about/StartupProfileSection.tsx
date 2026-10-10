import Link from "next/link";
import { landingHref, type LocaleProps } from "@/lib/landing-copy";
import { CONTACT_EMAIL, PIDI_CATALOG_URL } from "@/lib/links";
import { startupCopy } from "@/lib/startup-copy";
import { TEAM_MEMBERS } from "@/lib/team";

export function StartupProfileSection({ locale = "id" }: LocaleProps) {
  const { profile: copy, recognition } = startupCopy[locale];

  return (
    <section aria-labelledby="startup-profile-title" className="w-full px-6 pb-14 sm:px-10 sm:pb-20">
      <div className="mx-auto max-w-[1020px] rounded-[28px] border-2 border-stone-950 bg-[#f6f7ef] p-6 sm:p-8 lg:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-stone-600">{copy.label}</p>
        <h2 id="startup-profile-title" className="mt-3 max-w-[740px] text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">{copy.title}</h2>
        <p className="mt-4 max-w-[740px] text-sm leading-relaxed text-stone-600 sm:text-base">{copy.description}</p>
        <dl className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-[0.65fr_0.8fr_1.55fr]">
          <div>
            <dt className="text-xs font-semibold text-stone-600">{copy.founders}</dt>
            <dd className="mt-2 text-3xl font-extrabold">{TEAM_MEMBERS.length}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-stone-600">{copy.market}</dt>
            <dd className="mt-2 text-xl font-extrabold">{copy.marketValue}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-stone-600">{copy.contact}</dt>
            <dd className="mt-2">
              <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-lg font-extrabold text-blue-800 underline underline-offset-4">{CONTACT_EMAIL}</a>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">{copy.contactDescription}</p>
            </dd>
          </div>
        </dl>
        <div className="mt-8 border-t border-stone-300 pt-6">
          <p className="text-xs font-semibold text-stone-600">{copy.recognition}</p>
          <p className="mt-2 text-lg font-extrabold">{recognition.short}</p>
          <p className="mt-2 text-sm text-stone-600">{recognition.organizer}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <Link href={landingHref(locale, "#traction")} className="inline-flex min-h-11 items-center text-sm font-bold text-blue-800 underline underline-offset-4">{copy.viewTraction}</Link>
            <a href={PIDI_CATALOG_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-blue-800 underline underline-offset-4">{recognition.catalog}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
