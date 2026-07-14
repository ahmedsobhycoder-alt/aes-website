export type Service = { num: string; title: string; desc: string; deliverables: string[]; img: string };

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Art Direction",
    desc: "The creative core of every AES project — where concept, brand, and interior are shaped into one coherent vibe.",
    deliverables: ["Concept Presentation", "Branding & Identity", "Interior Design", "Visual Language", "Creative Direction"],
    img: "/projects/rixance/01.jpg",
  },
  {
    num: "02",
    title: "Execution & Construction",
    desc: "We take designs from drawing to reality — managing execution end to end for a true turnkey handover.",
    deliverables: ["Turnkey Delivery", "Site Management", "Finishing & Decoration", "Quality Control", "Furnishing"],
    img: "/projects/ozel/01.jpg",
  },
  {
    num: "03",
    title: "Food & Beverage Consultancy",
    desc: "Beyond the space — we help hospitality concepts work as businesses, from plan to plate.",
    deliverables: ["Business Plan", "Feasibility Study", "Menu Engineering", "Concept Development", "Operations Setup"],
    img: "/projects/nuwa/01.jpg",
  },
];
