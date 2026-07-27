export type ProcessStep = { title: string; description: string };

export type Service = {
  num: string;
  slug: string;
  title: string;
  desc: string;
  deliverables: string[];
  img: string;
  /** Editorial body copy shown beside `desc` on the service detail page. */
  longDesc: string;
  /** Scope & process steps shown on the service detail page. */
  process?: ProcessStep[];
  /**
   * Detail-page imagery. The first entry is used as the hero; the rest fill the
   * "Selected Work" grid. All paths are verified files under /public/projects.
   */
  gallery?: string[];
  /**
   * True when `gallery` reuses imagery from other projects because no
   * service-specific photography exists yet. Temporary — replace the gallery
   * with real work for this service and remove this flag.
   */
  placeholderGallery?: true;
};

export const SERVICES: Service[] = [
  {
    num: "01",
    slug: "art-direction",
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
    longDesc:
      "Art direction establishes the central logic that guides every visual and spatial decision. It begins by identifying the project's character, audience, context, and intended emotional impact. From material language and composition to branding, lighting, graphics, and interior atmosphere, every element is evaluated as part of one connected experience — which is what prevents a project from becoming a collection of isolated design decisions. AES carries this direction through the complete process, so the original concept stays legible from the first presentation to the final built environment.",
    process: [
      {
        title: "Brief & Context",
        description:
          "We begin with the brand, the audience, and the site — what the place has to do, who it is for, and what surrounds it.",
      },
      {
        title: "Concept",
        description:
          "A single written and visual proposition the whole project can be measured against, rather than a collection of loose ideas.",
      },
      {
        title: "Visual Language",
        description:
          "Palette, material families, lighting temperature, and reference imagery are set together so interior, brand, and detail speak the same way.",
      },
      {
        title: "Creative Supervision",
        description:
          "We stay on the project as the creative authority, reviewing design, procurement, and execution decisions against the agreed direction.",
      },
    ],
    gallery: [
      "/projects/rixance/01.jpg",
      "/projects/rixance/03.jpg",
      "/projects/rixance/05.jpg",
      "/projects/rixance/08.jpg",
    ],
  },
  {
    num: "02",
    slug: "interior-design",
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
    longDesc:
      "Interior design begins with movement. Before a finish is selected, we test how a space is entered, where it slows, and how people occupy it — because a plan that fails at this level cannot be rescued by material. Finishes, joinery, and lighting are then developed as a single palette rather than three separate selections, each specified for how it behaves through the day and how it holds up under real use. The design is documented to the level a site can genuinely build from, so the atmosphere approved in drawing is the atmosphere delivered in the finished room.",
    process: [
      {
        title: "Space Planning",
        description:
          "Zoning, circulation, and capacity are resolved first, so the layout serves guests and staff before anything is styled.",
      },
      {
        title: "Concept Design",
        description:
          "Spatial character is developed in plan, elevation, and three dimensions at once, holding one atmosphere across every zone.",
      },
      {
        title: "Material & Lighting",
        description:
          "Finishes, joinery, and a layered lighting strategy are selected as one palette, tuned to how the space is used through the day.",
      },
      {
        title: "Technical Package",
        description:
          "Drawings, schedules, and specifications are issued at the level of detail execution actually requires.",
      },
    ],
    gallery: [
      "/projects/ozel/12.jpg",
      "/projects/ozel/20.jpg",
      "/projects/ozel/05.jpg",
      "/projects/ozel/02.jpg",
    ],
  },
  {
    num: "03",
    slug: "architecture",
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
    longDesc:
      "Architecture sets the frame every other decision lives inside. We begin with the site — orientation, access, daylight, and regulation — because the constraints of a place usually contain the idea that resolves it. Form and plan are then developed together, so the shape of the building and the logic of its interior agree rather than compete, and the facade is treated as both a public face and an environmental skin rather than decoration applied at the end. Holding architecture and interiors within one studio keeps the building and the spaces inside it speaking the same language, from first concept through authority submission.",
    process: [
      {
        title: "Site & Context",
        description:
          "Orientation, access, daylight, and regulation are read first — the constraints usually contain the idea.",
      },
      {
        title: "Massing & Plan",
        description:
          "Form and floor plans are developed together so the building's shape and its internal logic agree.",
      },
      {
        title: "Facade & Envelope",
        description:
          "Materials, openings, and depth are resolved as the building's public face and its environmental skin at once.",
      },
      {
        title: "Documentation",
        description:
          "Coordinated construction drawings are issued for permitting, tender, and execution.",
      },
    ],
    // PLACEHOLDER: no architectural or exterior photography exists in
    // /public/projects. These are interior views standing in temporarily.
    gallery: [
      "/projects/nuwa/03.jpg",
      "/projects/nuwa/02.jpg",
      "/projects/nuwa/06.jpg",
      "/projects/magaz-clinic/02.jpg",
    ],
    placeholderGallery: true,
  },
  {
    num: "04",
    slug: "execution-construction",
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
    longDesc:
      "Execution is where design is either protected or lost. Most projects lose their detail in the gap between the drawing and the site, and that gap is where we do our most deliberate work. We run the programme ourselves — sequencing trades, coordinating MEP against finishes rather than after them, and reviewing every shop drawing against the approved intent before anything is fabricated. Procurement, installation, snagging, and commissioning are tracked as one continuous process, so what is handed over is what was approved.",
    process: [
      {
        title: "Pre-Construction",
        description:
          "Programme, budget, and trade packages are set, and shop drawings are reviewed against the design intent.",
      },
      {
        title: "Site Management",
        description:
          "Trades are supervised and sequenced daily, with MEP coordinated against finishes rather than after them.",
      },
      {
        title: "Procurement",
        description:
          "Materials, joinery, furniture, and lighting are sourced, sampled, and tracked to the installation schedule.",
      },
      {
        title: "Quality & Handover",
        description:
          "Snagging, commissioning, and a documented handover, so the finished space matches what was approved.",
      },
    ],
    // PLACEHOLDER: no site, progress, or construction photography exists in
    // /public/projects. These are finished-project views standing in temporarily.
    gallery: [
      "/projects/magaz-clinic/08.jpg",
      "/projects/magaz-clinic/14.jpg",
      "/projects/salon-ali-yehia/10.jpg",
      "/projects/nuwa/05.jpg",
    ],
    placeholderGallery: true,
  },
  {
    num: "05",
    slug: "brand-experience",
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
    longDesc:
      "A brand is what people experience, not what a logo asserts. We work from the customer's path — the first sight of a facade, the moment of arrival, the way they are received, and how they leave. Identity is then extended across signage, wayfinding, surfaces, packaging, and collateral as one coherent system, so the space and the brand tell a single story instead of two competing ones. Every physical artefact is specified and produced to hold that story at full scale, across every location and every repeat visit.",
    process: [
      {
        title: "Positioning",
        description:
          "We establish what the brand stands for and where it sits against its market before translating any of it into space.",
      },
      {
        title: "Journey Mapping",
        description:
          "The customer path is mapped moment by moment, from first sight of the facade to the way they leave.",
      },
      {
        title: "Environmental Branding",
        description:
          "Identity is applied across signage, wayfinding, surfaces, and collateral as one coherent system.",
      },
      {
        title: "Touchpoint Rollout",
        description:
          "Every physical artefact is specified and produced so the experience holds together at full scale.",
      },
    ],
    // PLACEHOLDER: no signage, wayfinding, or touchpoint photography exists in
    // /public/projects. These are Rixance branding views, also used by 01.
    gallery: [
      "/projects/rixance/09.jpg",
      "/projects/rixance/11.jpg",
      "/projects/rixance/06.jpg",
      "/projects/rixance/12.jpg",
    ],
    placeholderGallery: true,
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
