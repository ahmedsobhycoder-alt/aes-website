export type CasePoint = { title: string; body: string };
export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  alt: string;
  tags: string[];
  client: string;
  role: string;
  challenge: string;
  approach: string;
  outcome: string;
  caseStudy?: { intro: string; points?: CasePoint[] };
  gallery: { src: string; alt: string }[];
};

const g = (slug: string, ns: number[], alt: string) =>
  ns.map((n) => ({ src: `/projects/${slug}/${String(n).padStart(2, "0")}.jpg`, alt: `${alt} — view ${n}` }));

export const PROJECTS: Project[] = [
  {
    slug: "ozel",
    title: "Ozel",
    category: "Hospitality & F&B",
    year: "2024",
    cover: "/projects/ozel/12.jpg",
    alt: "Ozel restaurant interior",
    tags: ["Hospitality & F&B"],
    client: "Ozel Restaurant",
    role: "Art Direction · Interior Design · Execution",
    challenge: "Ozel needed a dining environment with a distinctive identity — a space guests would remember for its atmosphere as much as its food.",
    approach: "We developed the concept, interior architecture, and material palette as one language, using lighting and texture to build mood across the guest journey from entrance to table.",
    outcome: "A fully realised restaurant delivered turnkey, from concept through execution.",
    gallery: g("ozel", [12, 5, 20, 2, 3, 1], "Ozel restaurant"),
  },
  {
    slug: "nuwa",
    title: "Nuwa",
    category: "Hospitality & F&B",
    year: "2024",
    cover: "/projects/nuwa/01.jpg",
    alt: "Nuwa restaurant interior",
    tags: ["Hospitality & F&B"],
    client: "Nuwa Restaurant",
    role: "Art Direction · Interior Design · Execution",
    challenge: "Create a hospitality concept where interior and brand read as a single, coherent experience.",
    approach: "Concept, spatial design, and finishes were developed holistically, with a considered lighting strategy shaping the mood of each zone.",
    outcome: "A complete restaurant environment delivered end to end.",
    gallery: g("nuwa", [1, 2, 3, 4, 5, 6], "Nuwa restaurant"),
  },
  {
    slug: "aaly-al-makam",
    title: "Aaly Al Makam",
    category: "Hospitality & F&B",
    year: "2023",
    cover: "/projects/aaly-al-makam/01.jpg",
    alt: "Aaly Al Makam restaurant interior",
    tags: ["Hospitality & F&B"],
    client: "Aaly Al Makam Restaurant",
    role: "Art Direction · Interior Design",
    challenge: "Give a restaurant a strong sense of place rooted in character and warmth.",
    approach: "We shaped the interior architecture and detailing around a clear atmospheric concept, treating light and material as the primary storytelling tools.",
    outcome: "A characterful dining space with a cohesive identity from front to back.",
    gallery: g("aaly-al-makam", [1, 2, 3, 4, 5, 6], "Aaly Al Makam"),
  },
  {
    slug: "rixance",
    title: "Rixance",
    category: "Branding",
    year: "2024",
    cover: "/projects/rixance/01.jpg",
    alt: "Rixance menswear brand",
    tags: ["Branding"],
    client: "Rixance Menswear",
    role: "Art Direction · Branding · Retail Concept",
    challenge: "Position a new menswear label between premium contemporary and entry-level luxury, extending beyond clothing into a complete lifestyle.",
    approach: "We built a calm, confident identity and retail language around timeless silhouettes, premium materials, and sophisticated simplicity — every detail from fabric to finish considered.",
    outcome: "A cohesive brand and spatial identity that empowers customers to dress confidently and effortlessly.",
    caseStudy: {
      intro: "Rixance is designed to capture the essence of modern classic menswear through timeless silhouettes, premium materials, and a calm, confident identity. Positioned between premium contemporary and entry-level luxury, the brand blends traditional tailoring with a modern edge, extending beyond clothing into a complete lifestyle.",
      points: [
        { title: "Modern Classic Tailoring", body: "A refined bridge between traditional luxury tailoring and contemporary fashion, built for the modern man." },
        { title: "Timeless Elegance", body: "Versatile, distinctive pieces designed to work across business, social, and lifestyle settings without chasing trends." },
        { title: "Crafted Quality", body: "Premium materials, sophisticated simplicity, and attention to detail in every piece, delivered with consistency." },
        { title: "Confidence by Design", body: "A strong, cohesive identity that empowers men to dress confidently and effortlessly, backed by an elevated customer experience." },
      ],
    },
    gallery: g("rixance", [1, 2, 3, 4, 5, 6], "Rixance"),
  },
  {
    slug: "magaz-clinic",
    title: "Magaz Clinic",
    category: "Commercial",
    year: "2023",
    cover: "/projects/magaz-clinic/01.jpg",
    alt: "Magaz Clinic interior",
    tags: ["Commercial"],
    client: "Magaz Clinic",
    role: "Interior Design · Execution",
    challenge: "Design a clinic interior that feels calm, clean, and reassuring while remaining highly functional.",
    approach: "We balanced a soft, considered material and lighting palette with a practical, easy-to-navigate layout that supports both staff flow and patient comfort.",
    outcome: "A welcoming clinical environment that reads as care, not sterility.",
    gallery: g("magaz-clinic", [1, 2, 3, 4, 5, 6], "Magaz Clinic"),
  },
  {
    slug: "salon-ali-yehia",
    title: "Salon Ali Yehia",
    category: "Commercial",
    year: "2023",
    cover: "/projects/salon-ali-yehia/01.jpg",
    alt: "Salon Ali Yehia interior",
    tags: ["Commercial"],
    client: "Ali Yehia",
    role: "Interior Design · Art Direction",
    challenge: "Deliver an elevated interior with a refined, cohesive atmosphere throughout.",
    approach: "A warm, layered material palette and a carefully tuned lighting strategy give each space a distinct yet connected character.",
    outcome: "A polished, considered interior with a strong sense of place.",
    gallery: g("salon-ali-yehia", [1, 2, 3, 4, 5, 6], "Salon Ali Yehia"),
  },
  {
  slug: "hyde-park",
  title: "Hyde Park",
  category: "Residential",
  year: "",
  cover: "projects/hyde-park/hydepark1.jpg",
  alt: "Hyde Park residential interior",
  tags: ["Residential"],
  client: "Private Client",
  role: "Interior Design · Art Direction · Turnkey Execution",
  challenge:
    "A family apartment in Hyde Park, New Cairo, with a familiar developer shell and an unfamiliar ambition: a home that feels composed, not furnished.",
  approach:
    "We directed a modern contemporary language built on calm: a warm neutral palette, clean architectural lines, and layered lighting that shifts the apartment from daylight ease to evening intimacy, with natural wood and stone holding the scene together.",
  outcome:
    "A residence that reads as one continuous frame, where every room answers the same design sentence, delivered turnkey as one production.",
  gallery: g(
    "hyde-park",
    [1, 2, 3, 4, 5, 6],
    "Hyde Park"
  ),
}
];
