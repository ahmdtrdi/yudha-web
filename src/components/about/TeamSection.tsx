import { LazyImage } from "@/components/ui/LazyImage";
import { aboutCopy } from "@/lib/about-copy";
import type { LocaleProps } from "@/lib/landing-copy";
import { TEAM_MEMBERS } from "@/lib/team";

export function TeamSection({ locale = "id" }: LocaleProps) {
  const copy = aboutCopy[locale].team;
  return (
    <section id="team" className="scroll-mt-6 w-full bg-white pt-8 sm:pt-12 pb-16 sm:pb-24">
      <div className="w-full max-w-[1020px] mx-auto px-6 sm:px-10 flex flex-col items-center">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 mb-3 text-center">
          {copy.title}
        </h2>
        <p className="mb-8 text-center text-sm text-stone-600 sm:mb-12">{copy.description}</p>

        {/* Team Grid: 4 columns on desktop, 2 on tablet/mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 lg:gap-10 w-full max-w-[860px]">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center group">
              {/* Photo Frame */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} — ${copy.linkedin}`}
                className="w-full aspect-[4/5] relative bg-stone-100 rounded-none mb-4 sm:mb-5 overflow-hidden block transition-transform duration-200 group-hover:scale-[1.02]"
              >
                <LazyImage
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
                  className="object-cover object-top"
                />
              </a>

              {/* Name */}
              <h3 className="text-xs sm:text-sm md:text-[15px] font-bold text-stone-950 leading-tight mb-1">
                {member.name}
              </h3>

              {/* Sub-roles */}
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium leading-relaxed">
                {copy.coFounder}
                <br />
                {member.position === "CEO" || member.position === "CTO" ? member.position : copy[member.position]}
              </p>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} — ${copy.linkedin}`} className="mt-2 inline-flex min-h-11 items-center gap-1 text-xs font-bold text-blue-800 underline underline-offset-4">
                LinkedIn<span aria-hidden="true">↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

