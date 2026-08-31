const TEAM_MEMBERS = [
  {
    name: "Ridho Aditya",
    role: "Co-Founder",
    position: "CEO",
  },
  {
    name: "Galnoel Rindengan",
    role: "Co-Founder",
    position: "CTO",
  },
  {
    name: "Regina George",
    role: "Co-Founder",
    position: "Product Lead",
  },
  {
    name: "Ahmad Triadi",
    role: "Co-Founder",
    position: "Business Lead",
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
            <div key={member.name} className="flex flex-col items-center text-center">
              {/* Photo Rectangle Placeholder */}
              <div className="w-full aspect-[4/5] bg-[#d9d9d9] rounded-none mb-4 sm:mb-5 transition-colors" />

              {/* Name */}
              <h3 className="text-xs sm:text-sm md:text-[15px] font-bold text-stone-950 leading-tight mb-1">
                {member.name}
              </h3>

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
