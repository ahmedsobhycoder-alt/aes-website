export type BlogPost = {
  slug: string; title: string; category: string; date: string; author: string;
  excerpt: string; coverImg: string; body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "why-every-space-needs-a-vibe",
    title: "Why Every Space Needs Its Own Vibe",
    category: "Art Direction",
    date: "June 2026",
    author: "AES Studio",
    excerpt: "A space without a distinctive vibe loses its potential — no matter how polished the design. Here is how we design the feeling first.",
    coverImg: "/projects/ozel/01.jpg",
    body: `A room can be beautifully finished and still feel like nothing. Perfect materials, correct proportions, expensive lighting — and no pulse. We have walked into many of them.\n\nAt AES we start from the opposite end. Before a single material is chosen, we ask what the space should make a person feel the moment they step inside. Calm. Energised. Curious. That feeling becomes the brief that everything else answers to.\n\nThis is what we mean by "vibe." It is not decoration. It is the integration of art into design — the deliberate choice behind every line, texture, and palette. When the vibe leads, materials stop being a shopping list and start being a language.\n\nDesign the feeling first. Everything else is in service of it.`,
  },
  {
    slug: "concept-to-turnkey",
    title: "From Concept to Turnkey: How AES Delivers",
    category: "Execution",
    date: "May 2026",
    author: "AES Studio",
    excerpt: "The vision that starts on paper too often dies in execution. Our turnkey model exists to make sure it survives all the way to the finished space.",
    coverImg: "/projects/nuwa/01.jpg",
    body: `The gap between a design and a built space is where most concepts quietly lose themselves. A substitution here, a value-engineered detail there, and the thing that made the idea special is gone by opening day.\n\nWe built AES to close that gap. We are a one-stop studio: concept, branding, interior design, execution, decoration, and furnishing under one roof. When the same team that imagined the space is accountable for building it, nothing gets lost in translation.\n\nTurnkey is not just a convenience for the client. It is how we protect the vibe. The finish on site should feel exactly like the concept promised — because the people guarding the concept never left the room.`,
  },
  {
    slug: "fb-design-menu-meets-interior",
    title: "F&B Design: Where the Menu Meets the Interior",
    category: "F&B",
    date: "April 2026",
    author: "AES Studio",
    excerpt: "A restaurant is a business before it is a mood board. Our F&B consultancy designs the concept, the space, and the numbers as one.",
    coverImg: "/projects/aaly-al-makam/01.jpg",
    body: `A beautiful restaurant that does not work as a business is not a success — it is an expensive photograph. Great hospitality design has to hold both truths at once: the atmosphere and the economics.\n\nThat is why our food and beverage work goes beyond interiors. We help concepts stand up as businesses — business plans, feasibility studies, menu engineering — so the space and the operation are designed together rather than fighting each other later.\n\nWhen the interior, the brand, and the menu all tell the same story, guests feel it without being able to name it. That coherence is the difference between a place people visit once and a place they return to.`,
  },
];
