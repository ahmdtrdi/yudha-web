export interface TeamMember {
  name: string;
  position: "CEO" | "CTO" | "productLead" | "businessLead";
  image: string;
  linkedin: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Ridho Aditya",
    position: "CEO",
    image: "/assets/CF1.jpeg",
    linkedin: "https://www.linkedin.com/in/ridhoadityaputra/",
  },
  {
    name: "Galnoel Rindengan",
    position: "CTO",
    image: "/assets/CF2.jpeg",
    linkedin: "https://www.linkedin.com/in/galnoel-rindengan/",
  },
  {
    name: "Regina George",
    position: "productLead",
    image: "/assets/CF3.jpeg",
    linkedin: "https://www.linkedin.com/in/regina-george/",
  },
  {
    name: "Ahmad Triadi",
    position: "businessLead",
    image: "/assets/CF4.jpeg",
    linkedin: "https://www.linkedin.com/in/triadim/",
  },
];
