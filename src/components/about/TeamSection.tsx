"use client";

import { LazyImage } from "@/components/ui/LazyImage";

interface TeamMember {
  name: string;
  role: string;
  position: string;
  image: string;
  linkedin: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ridho Aditya",
    role: "Co-Founder",
    position: "CEO",
    image: "/assets/CF1.jpeg",
    linkedin: "https://www.linkedin.com/in/ridhoadityaputra/",
  },
  {
    name: "Galnoel Rindengan",
    role: "Co-Founder",
    position: "CTO",
    image: "/assets/CF2.jpeg",
    linkedin: "https://www.linkedin.com/in/galnoel-rindengan/",
  },
  {
    name: "Regina George",
    role: "Co-Founder",
    position: "Product Lead",
    image: "/assets/CF3.jpeg",
    linkedin: "https://www.linkedin.com/in/regina-george/",
  },
  {
    name: "Ahmad Triadi",
    role: "Co-Founder",
    position: "Business Lead",
    image: "/assets/CF4.jpeg",
    linkedin: "https://www.linkedin.com/in/triadim/",
  },
];

export function TeamSection() {
  return (
    <section className="w-full bg-white pt-8 sm:pt-12 pb-16 sm:pb-24">
      <div className="w-full max-w-[1020px] mx-auto px-6 sm:px-10 flex flex-col items-center">
        {/* Section Title */}
        <h2 className="text-sm sm:text-base font-bold text-stone-950 mb-10 sm:mb-14 text-center">
          The People behind Yudha
        </h2>

        {/* Team Grid: 4 columns on desktop, 2 on tablet/mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 lg:gap-10 w-full max-w-[860px]">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center group">
              {/* Photo Frame */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
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
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm md:text-[15px] font-bold text-stone-950 leading-tight mb-1 hover:underline hover:text-stone-700 transition-colors inline-block"
              >
                {member.name}
              </a>

              {/* Sub-roles */}
              <p className="text-[11px] sm:text-xs text-stone-500 font-medium leading-relaxed">
                {member.role}
                <br />
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

