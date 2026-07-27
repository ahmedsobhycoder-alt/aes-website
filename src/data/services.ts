export type Service = { num: string; title: string; desc: string; deliverables: string[]; img: string };

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Art Direction",
    desc: "We define the central creative vision of each project, aligning concept, identity, atmosphere, and visual language into one clear direction.",
    deliverables: [
      "Creative Concept",
      "Art Direction Strategy",
      "Visual Language",
      "Material & Mood Direction",
      "Brand Integration",
    ],
    img: "/projects/rixance/01.jpg",
  },
  {
    num: "02",
    title: "Interior Design",
    desc: "We translate the project vision into functional, detailed interiors shaped around circulation, materials, atmosphere, and human experience.",
    deliverables: [
      "Space Planning",
      "Interior Concept Design",
      "Material Specifications",
      "Furniture & Lighting Selection",
      "Technical Design Package",
    ],
    img: "/projects/ozel/01.jpg",
  },
  {
    num: "03",
    title: "Architecture",
    desc: "We shape buildings from the outside in, balancing context, form, function, structure, and identity through a complete architectural approach.",
    deliverables: [
      "Architectural Concept",
      "Site Planning",
      "Floor Plan Development",
      "Facade Design",
      "Construction Documentation",
    ],
    img: "/projects/nuwa/01.jpg",
  },
  {
    num: "04",
    title: "Architecture",
    desc: "We develop architectural solutions that respond to the site, operational requirements, environmental conditions, and the long-term vision of the project.",
    deliverables: [
      "Design Development",
      "Functional Programming",
      "Architectural Detailing",
      "Consultant Coordination",
      "Authority Submission Drawings",
    ],
    img: "/projects/nuwa/01.jpg",
  },
  {
    num: "05",
    title: "Execution & Construction",
    desc: "We carry the approved design into reality, managing site operations, technical coordination, quality, procurement, and delivery from start to handover.",
    deliverables: [
      "Project Management",
      "Site Execution",
      "MEP Coordination",
      "Procurement & Installation",
      "Quality Control & Handover",
    ],
    img: "/projects/nuwa/01.jpg",
  },
  {
    num: "06",
    title: "Brand Experience",
    desc: "We turn brand strategy into a complete physical experience, connecting space, identity, communication, and customer interaction across every touchpoint.",
    deliverables: [
      "Brand Experience Strategy",
      "Customer Journey Mapping",
      "Environmental Branding",
      "Signage & Wayfinding",
      "Physical Brand Touchpoints",
    ],
    img: "/projects/nuwa/01.jpg",
  },
];