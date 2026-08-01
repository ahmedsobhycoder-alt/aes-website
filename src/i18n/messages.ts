import type { I18nText } from "./locale";

/**
 * UI copy for the navbar and the homepage.
 *
 * Arabic is Egyptian (عامية مصرية) wherever the English is conversational, and
 * closer to MSA for formal/technical lines. DRAFT — pending native review.
 *
 * Numerals stay Western (80+, 10+, 2020): Egyptian commercial usage overwhelmingly
 * uses Latin digits, and Arabic-Indic digits would break the numeric display type.
 */

export const NAV = {
  about: { en: "About", ar: "عن الاستوديو" },
  services: { en: "Services", ar: "خدماتنا" },
  work: { en: "Work", ar: "أعمالنا" },
  philosophy: { en: "Philosophy", ar: "فلسفتنا" },
  blog: { en: "Blog", ar: "المدونة" },
  contact: { en: "Contact", ar: "تواصل معانا" },
  enquire: { en: "Enquire", ar: "اطلب عرض" },
  toggleMenu: { en: "Toggle menu", ar: "فتح وقفل القائمة" },
  homeAria: {
    en: "AES — Ayman Ehab Studio, home",
    ar: "AES — استوديو أيمن وإيهاب، الصفحة الرئيسية",
  },
} satisfies Record<string, I18nText>;

/** Order matches SITE.nav in src/data/site.ts. */
export const NAV_ORDER = ["about", "services", "work", "philosophy", "blog", "contact"] as const;

export const SWITCHER = {
  en: { en: "EN", ar: "EN" },
  ar: { en: "العربية", ar: "العربية" },
  ariaLabel: { en: "Change language", ar: "تغيير اللغة" },
} satisfies Record<string, I18nText>;

export const HOME = {
  // ---- Hero ----
  heroEyebrow: {
    en: "Art Direction | Architecture | Interior Design | Execution",
    ar: "إدارة فنية | عمارة | تصميم داخلي | تنفيذ",
  },
  heroLine1: { en: "We Create", ar: "إحنا بنصنع" },
  heroLine2: { en: "Experiences", ar: "التجارب" },
  viewOurWork: { en: "View Our Work", ar: "شوف أعمالنا" },
  tagline: {
    en: "We don't just design spaces, we shape experiences.",
    ar: "إحنا مابنصممش أماكن وبس، إحنا بنصنع تجارب.",
  },
  estCairo: { en: "Est. 2020 — Cairo", ar: "تأسس 2020 — القاهرة" },
  showSlide: { en: "Show {label}", ar: "اعرض {label}" },
  heroAlt: { en: "AES interior — {label}", ar: "تصميم داخلي من AES — {label}" },

  // ---- About strip ----
  aboutHeading: { en: "About AES", ar: "عن AES" },
  aboutBody: {
    en: "AES is an art direction and interior design studio founded in 2020 by Ayman & Ehab Sobhy. We bring art and design together - from concept and branding to execution and F&B consultancy - to shape spaces with their own vibe.",
    ar: "AES استوديو إدارة فنية وتصميم داخلي، اتأسس سنة 2020 على إيد أيمن وإيهاب صبحي. بنجمع الفن والتصميم مع بعض — من الفكرة والهوية لحد التنفيذ واستشارات المطاعم والكافيهات — عشان نطلّع أماكن ليها إحساسها الخاص.",
  },
  est2020: { en: "Est. 2020", ar: "تأسس 2020" },
  since2013: { en: "Since 2013", ar: "من سنة 2013" },
  projectsExecuted: { en: "Projects Executed", ar: "مشروع اتنفذ" },
  industriesExecuted: { en: "industries Served ", ar: "مجال اشتغلنا فيه" },

  // ---- Clients ----
  clientsHeading: { en: "Our Clients", ar: "عملاؤنا" },
  clientsBody: {
    en: "AES collaborates with established operators, developers, and emerging brands that treat design as a strategic decision. Through architecture, interiors, execution, and brand direction, we build lasting environments shaped by clarity, precision, and purpose.",
    ar: "بنشتغل مع مشغّلين كبار ومطوّرين وعلامات جديدة بيعتبروا التصميم قرار استراتيجي مش لمسة أخيرة. من خلال العمارة والتصميم الداخلي والتنفيذ وإدارة الهوية، بنبني أماكن تفضل، متبنية على وضوح ودقة وهدف.",
  },
  clientLogoAlt: { en: "{name} logo", ar: "شعار {name}" },

  // ---- What We Do ----
  whatWeDoHeading: { en: "What We Do", ar: "بنعمل إيه" },
  whatWeDoBody: {
    en: "AES shapes bold concepts into complete spatial experiences, aligning brand, architecture, and interior direction from the first idea. We manage execution with precision, protecting every detail throughout the process. The result is a coherent environment built to perform, endure, and leave a lasting impression.",
    ar: "بنحوّل الأفكار الجريئة لتجارب مكانية متكاملة، وبنظبط الهوية والعمارة والتصميم الداخلي على خط واحد من أول فكرة. بندير التنفيذ بدقة وبنحافظ على كل تفصيلة لحد الآخر. والنتيجة مكان متماسك، شغّال، بيفضل، وبيسيب أثر.",
  },
  allServices: { en: "All Services", ar: "كل الخدمات" },
  viewAllServices: { en: "View All Services", ar: "شوف كل الخدمات" },

  // ---- Selected Work ----
  selectedWork: { en: "Selected Work", ar: "مختارات من أعمالنا" },
  allProjects: { en: "All Projects", ar: "كل المشاريع" },

  // ---- Philosophy teaser ----
  philosophyEyebrow: { en: "Our Philosophy", ar: "فلسفتنا" },
  philosophyLine1: { en: "We Create", ar: "إحنا بنصنع" },
  philosophyLine2: { en: "Vibes", ar: "الإحساس" },
  philosophyBody: {
    en: "Art and design are inextricably linked. The careful integration of art into our work is what sets us apart — every line, texture, and palette choice carries deliberate meaning.",
    ar: "الفن والتصميم مايتفصلوش عن بعض. اللي بيفرّقنا إننا بندخّل الفن في شغلنا بعناية — كل خط وكل ملمس وكل لون مختار بمعنى مقصود.",
  },
  morePhilosophy: { en: "More About Our Philosophy", ar: "اعرف أكتر عن فلسفتنا" },
  philosophyAlt: { en: "Design philosophy", ar: "فلسفة التصميم" },

  // ---- Closing CTA ----
  ctaLine1: { en: "Let's Build", ar: "يلا نبني" },
  ctaLine2: { en: "Something Real", ar: "حاجة حقيقية" },
  startProject: { en: "Start a Project", ar: "ابدأ مشروعك" },
} satisfies Record<string, I18nText>;

/** Studio values — order matches SITE.values in src/data/site.ts. */
export const VALUES: I18nText[] = [
  { en: "Creativity", ar: "الإبداع" },
  { en: "Innovation", ar: "الابتكار" },
  { en: "Top-Notch Quality", ar: "جودة من أعلى مستوى" },
  { en: "Functionality", ar: "وظيفية" },
  { en: "Transparency", ar: "شفافية" },
];

/** Hero slideshow captions — order matches HERO_SLIDES in HomePage.tsx. */
export const HERO_SLIDE_LABELS: I18nText[] = [
  { en: "founders", ar: "المؤسسين" },
  { en: "Aaly Al Makam", ar: "عالي المقام" },
  { en: "Ozel", ar: "أوزيل" },
  { en: "Nuwa", ar: "نوا" },
  { en: "hyde park", ar: "هايد بارك" },
];

/** Marquee ticker — order matches TICKER_ITEMS in HomePage.tsx. */
export const TICKER: I18nText[] = [
  { en: "Art Direction", ar: "إدارة فنية" },
  { en: "Architecture", ar: "عمارة" },
  { en: "Interior Design", ar: "تصميم داخلي" },
  { en: "Execution", ar: "تنفيذ" },
  { en: "Brand Experience", ar: "تجربة العلامة" },
];

/**
 * TEMPORARY (Stage 1 only). The homepage displays strings that live in
 * src/data/services.ts, projects.ts and clients.ts. Converting those records to
 * I18nText would force edits into ServicesPage, ServiceDetailPage, WorkPage,
 * WorkDetailPage and their metadata — pages that are explicitly out of scope
 * right now. So the Arabic homepage reads these by slug/id instead.
 *
 * Stage 3 moves them into the data records and deletes these three maps.
 */
export const SERVICE_COPY: Record<string, { title: I18nText; desc: I18nText }> = {
  "art-direction": {
    title: { en: "Art Direction", ar: "الإدارة الفنية" },
    desc: {
      en: "We define the central creative vision of each project, aligning concept, identity, atmosphere, and visual language into one clear direction.",
      ar: "بنحدد الرؤية الإبداعية الأساسية لكل مشروع، وبنظبط الفكرة والهوية والجو واللغة البصرية في اتجاه واحد واضح.",
    },
  },
  "interior-design": {
    title: { en: "Interior Design", ar: "التصميم الداخلي" },
    desc: {
      en: "We translate the project vision into functional, detailed interiors shaped around circulation, materials, atmosphere, and human experience.",
      ar: "بنترجم رؤية المشروع لتصميم داخلي شغّال ومدروس، مبني على الحركة والخامات والجو وتجربة الناس جوه المكان.",
    },
  },
  architecture: {
    title: { en: "Architecture", ar: "العمارة" },
    desc: {
      en: "We shape buildings from the outside in, balancing context, form, function, structure, and identity through a complete architectural approach.",
      ar: "بنشكّل المباني من بره لجوه، وبنوازن بين المكان والشكل والوظيفة والإنشاء والهوية من خلال منهج معماري متكامل.",
    },
  },
  "execution-construction": {
    title: { en: "Execution & Construction", ar: "التنفيذ والإنشاء" },
    desc: {
      en: "We carry the approved design into reality, managing site operations, technical coordination, quality, procurement, and delivery from start to handover.",
      ar: "بننزل بالتصميم المعتمد على أرض الواقع، وبندير الموقع والتنسيق الفني والجودة والتوريد والتسليم من أول يوم لحد الاستلام.",
    },
  },
  "brand-experience": {
    title: { en: "Brand Experience", ar: "تجربة العلامة" },
    desc: {
      en: "We turn brand strategy into a complete physical experience, connecting space, identity, communication, and customer interaction across every touchpoint.",
      ar: "بنحوّل استراتيجية العلامة لتجربة ملموسة كاملة، بنربط المكان والهوية والتواصل وتفاعل العميل في كل نقطة التقاء.",
    },
  },
};

export const PROJECT_COPY: Record<
  string,
  { title: I18nText; category: I18nText; role: I18nText }
> = {
  ozel: {
    title: { en: "Ozel", ar: "أوزيل" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design · Execution", ar: "إدارة فنية · تصميم داخلي · تنفيذ" },
  },
  nuwa: {
    title: { en: "Nuwa", ar: "نوا" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design · Execution", ar: "إدارة فنية · تصميم داخلي · تنفيذ" },
  },
  "aaly-elmaqam": {
    title: { en: "Aaly Elmaqam", ar: "عالي المقام" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  "majaz-clinic": {
    title: { en: "Majaz Clinic", ar: "عيادة مجاز" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Interior Design · Execution", ar: "تصميم داخلي · تنفيذ" },
  },
  "ali-yehia-salon": {
    title: { en: "Ali Yehia Salon", ar: "صالون علي يحيى" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Interior Design · Art Direction", ar: "تصميم داخلي · إدارة فنية" },
  },
  "hyde-park": {
    title: { en: "Hyde Park", ar: "هايد بارك" },
    category: { en: "Residential", ar: "سكني" },
    role: { en: "Interior Design · Art Direction · Turnkey Execution", ar: "تصميم داخلي · إدارة فنية · تنفيذ متكامل" },
  },
  blues: {
    title: { en: "Blues", ar: "بلوز" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  sababa: {
    title: { en: "Sababa", ar: "سبابا" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  savoy: {
    title: { en: "Savoy", ar: "سافوي" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  "antika-beirut": {
    title: { en: "Antika Beirut", ar: "أنتيكا بيروت" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  "cassandra-food-court": {
    title: { en: "Cassandra Food Court", ar: "كاساندرا فود كورت" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  "grand-technology-office": {
    title: { en: "Grand Technology Office Space", ar: "مكتب جراند تكنولوجي" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  "big-pappy": {
    title: { en: "Big Pappy", ar: "بيج بابي" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  "bad-ziggy": {
    title: { en: "Bad Ziggy", ar: "باد زيجي" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  nuera: {
    title: { en: "Nuera", ar: "نويرا" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  "hot-office": {
    title: { en: "Hot Office", ar: "هوت أوفيس" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  lalique: {
    title: { en: "Lalique", ar: "لاليك" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
  rixance: {
    title: { en: "Rixance", ar: "ريكسانس" },
    category: { en: "Commercial", ar: "تجاري" },
    role: { en: "Art Direction · Branding · Retail Concept", ar: "إدارة فنية · هوية تجارية · مفهوم تجاري" },
  },
  "engineers-apartment": {
    title: { en: "Engineer's Apartment", ar: "شقة المهندس" },
    category: { en: "Residential", ar: "سكني" },
    role: { en: "Art Direction · Interior Design", ar: "إدارة فنية · تصميم داخلي" },
  },
};

/** Keyed by Client.id in src/data/clients.ts. */
export const CLIENT_NAMES: Record<number, I18nText> = {
  1: { en: "Village West Villas", ar: "فيلاج ويست فيلاز" },
  2: { en: "Palm Hills Developments", ar: "بالم هيلز للتعمير" },
  3: { en: "Marakez", ar: "مراكز" },
  4: { en: "Cairo Festival City Mall", ar: "كايرو فستيفال سيتي مول" },
  5: { en: "Royal Park", ar: "رويال بارك" },
  6: { en: "Mar.V", ar: "مار في" },
  7: { en: "Majid Al Futtaim", ar: "ماجد الفطيم" },
  8: { en: "Ozel", ar: "أوزيل" },
  9: { en: "MinaMark Resort & Spa", ar: "مينامارك ريزورت آند سبا" },
};

/* ----------------------------------------------------------------- Footer */

/**
 * The footer keeps its own link labels — they read longer than the navbar's
 * ("About Us" vs "About"), so they are deliberately not shared with NAV.
 */
export const FOOTER = {
  findUsHeading: { en: "Find Us", ar: "مكاننا" },
  mapTitle: {
    en: "Map showing the AES studio in Fifth Settlement, Cairo",
    ar: "خريطة توضح مكان استوديو AES في التجمع الخامس، القاهرة",
  },
  openInMaps: { en: "Open in Google Maps", ar: "افتح في خرائط جوجل" },
  getDirections: { en: "Get Directions", ar: "الاتجاهات" },
  companyHeading: { en: "Company", ar: "الاستوديو" },
  contactHeading: { en: "Contact", ar: "للتواصل" },
  followHeading: { en: "Follow", ar: "تابعنا" },

  aboutUs: { en: "About Us", ar: "عن الاستوديو" },
  ourServices: { en: "Our Services", ar: "خدماتنا" },
  work: { en: "Work", ar: "أعمالنا" },
  blog: { en: "Blog", ar: "المدونة" },
  contact: { en: "Contact", ar: "تواصل معانا" },

  copyright: {
    en: "© 2026 AES — Ayman Ehab Studio. All rights reserved.",
    ar: "© 2026 AES — استوديو أيمن وإيهاب. كل الحقوق محفوظة.",
  },
  legal: {
    en: "Privacy Policy · Terms of Use",
    ar: "سياسة الخصوصية · شروط الاستخدام",
  },
} satisfies Record<string, I18nText>;

/* --------------------------------------------------------------- Services */

export const SERVICES_PAGE = {
  heroEyebrow: { en: "What We Do", ar: "بنعمل إيه" },
  heroLine1: { en: "Our", ar: "خدماتنا" },
  heroLine2: { en: "Services", ar: "بالتفصيل" },
  ctaHeading: { en: "Ready to Start?", ar: "جاهز تبدأ؟" },
  ctaButton: { en: "Enquire Now", ar: "اطلب عرض دلوقتي" },
} satisfies Record<string, I18nText>;

/**
 * Deliverable bullets keyed by service slug. Order matches the `deliverables`
 * array of each record in src/data/services.ts.
 */
export const SERVICE_DELIVERABLES: Record<string, I18nText[]> = {
  "art-direction": [
    { en: "Creative Concept", ar: "المفهوم الإبداعي" },
    { en: "Art Direction Strategy", ar: "استراتيجية الإدارة الفنية" },
    { en: "Visual Language", ar: "اللغة البصرية" },
    { en: "Material & Mood Direction", ar: "اتجاه الخامات والمزاج" },
    { en: "Brand Integration", ar: "دمج الهوية" },
  ],
  "interior-design": [
    { en: "Space Planning", ar: "توزيع المساحات" },
    { en: "Interior Concept Design", ar: "تصميم المفهوم الداخلي" },
    { en: "Material Specifications", ar: "مواصفات الخامات" },
    { en: "Furniture & Lighting Selection", ar: "اختيار الأثاث والإضاءة" },
    { en: "Technical Design Package", ar: "حزمة التصميم الفني" },
  ],
  architecture: [
    { en: "Architectural Concept", ar: "المفهوم المعماري" },
    { en: "Site Planning", ar: "تخطيط الموقع" },
    { en: "Floor Plan Development", ar: "تطوير المساقط الأفقية" },
    { en: "Facade Design", ar: "تصميم الواجهات" },
    { en: "Construction Documentation", ar: "مستندات التنفيذ" },
  ],
  "execution-construction": [
    { en: "Project Management", ar: "إدارة المشروع" },
    { en: "Site Execution", ar: "التنفيذ في الموقع" },
    { en: "MEP Coordination", ar: "تنسيق الأعمال الكهروميكانيكية" },
    { en: "Procurement & Installation", ar: "التوريد والتركيب" },
    { en: "Quality Control & Handover", ar: "ضبط الجودة والتسليم" },
  ],
  "brand-experience": [
    { en: "Brand Experience Strategy", ar: "استراتيجية تجربة العلامة" },
    { en: "Customer Journey Mapping", ar: "رسم رحلة العميل" },
    { en: "Environmental Branding", ar: "الهوية في المكان" },
    { en: "Signage & Wayfinding", ar: "اللافتات وإرشاد الحركة" },
    { en: "Physical Brand Touchpoints", ar: "نقاط التماس المادية للعلامة" },
  ],
};

/* ------------------------------------------------------------------- Blog */

export const BLOG = {
  heroEyebrow: { en: "Journal", ar: "المدونة" },
  heroLine1: { en: "Studio", ar: "ملاحظات" },
  heroLine2: { en: "Notes", ar: "الاستوديو" },
  read: { en: "Read", ar: "اقرأ" },
  all: { en: "All", ar: "الكل" },
} satisfies Record<string, I18nText>;

/**
 * Category labels keyed by the RAW English category in src/data/blog.ts.
 * The filter compares against that raw value, so only the label is translated —
 * translating the key itself would break filtering.
 */
export const BLOG_CATEGORY_LABELS: Record<string, I18nText> = {
  "Art Direction": { en: "Art Direction", ar: "إدارة فنية" },
  Execution: { en: "Execution", ar: "تنفيذ" },
  "F&B": { en: "F&B", ar: "مطاعم وكافيهات" },
};

/**
 * Per-post copy keyed by slug. `date` is a prose string in the data layer
 * ("June 2026"), not a Date, so the Arabic month is written out rather than
 * formatted with Intl.
 *
 * Post BODIES are not here — the detail pages at /blog/[slug] remain English.
 */
export const BLOG_COPY: Record<
  string,
  { title: I18nText; excerpt: I18nText; date: I18nText }
> = {
  "why-every-space-needs-a-vibe": {
    title: {
      en: "Why Every Space Needs Its Own Vibe",
      ar: "ليه كل مكان محتاج إحساسه الخاص",
    },
    excerpt: {
      en: "A space without a distinctive vibe loses its potential — no matter how polished the design. Here is how we design the feeling first.",
      ar: "المكان من غير إحساس مميز بيضيّع إمكانياته — مهما كان التصميم متقن. ودي طريقتنا في إننا نصمم الإحساس الأول.",
    },
    date: { en: "June 2026", ar: "يونيو 2026" },
  },
  "concept-to-turnkey": {
    title: {
      en: "From Concept to Turnkey: How AES Delivers",
      ar: "من الفكرة للتسليم: إزاي AES بتنفّذ",
    },
    excerpt: {
      en: "The vision that starts on paper too often dies in execution. Our turnkey model exists to make sure it survives all the way to the finished space.",
      ar: "الرؤية اللي بتبدأ على الورق كتير بتموت في التنفيذ. نظامنا المتكامل موجود عشان توصل للمكان النهائي زي ما هي.",
    },
    date: { en: "May 2026", ar: "مايو 2026" },
  },
  "fb-design-menu-meets-interior": {
    title: {
      en: "F&B Design: Where the Menu Meets the Interior",
      ar: "تصميم المطاعم: لما المنيو يقابل المكان",
    },
    excerpt: {
      en: "A restaurant is a business before it is a mood board. Our F&B consultancy designs the concept, the space, and the numbers as one.",
      ar: "المطعم مشروع تجاري قبل ما يكون لوحة إلهام. استشاراتنا بتصمم الفكرة والمكان والأرقام مع بعض.",
    },
    date: { en: "April 2026", ar: "أبريل 2026" },
  },
};

/* ------------------------------------------------------------------- Work */

export const WORK = {
  heroEyebrow: { en: "Portfolio", ar: "أعمالنا" },
  heroLine1: { en: "Selected", ar: "مختارات من" },
  heroLine2: { en: "Work", ar: "أعمالنا" },
  intro: {
    en: "Interior, hospitality, and branding projects — designed, art-directed, and delivered turnkey by AES.",
    ar: "مشاريع تصميم داخلي وضيافة وهوية تجارية — تصميم وإدارة فنية وتنفيذ متكامل من AES.",
  },
  viewProject: { en: "View Project", ar: "شوف المشروع" },
  empty: {
    en: "No projects in this category yet.",
    ar: "مافيش مشاريع في القسم ده لسه.",
  },
} satisfies Record<string, I18nText>;

/**
 * Filter chips. `value` is the identity used to match Project.tags and must stay
 * English — translating it would silently break filtering, since the comparison
 * is against the raw tag strings in src/data/projects.ts.
 *
 * NOTE: "Residential" is absent here but IS used by the hyde-park project, so
 * that project is currently unreachable through the filter UI. Pre-existing bug,
 * left as-is rather than changing the visible filter set unasked.
 */
export const WORK_TAGS: { value: string; label: I18nText }[] = [
  { value: "All", label: { en: "All", ar: "الكل" } },
  { value: "Commercial", label: { en: "Commercial", ar: "تجاري" } },
  { value: "Residential", label: { en: "Residential", ar: "سكني" } },
];

/* ---------------------------------------------------------------- Contact */

export const CONTACT = {
  heroEyebrow: { en: "Get In Touch", ar: "تواصل معانا" },
  heroAlt: {
    en: "AES interior — Salon Ali Yehia",
    ar: "تصميم داخلي من AES — صالون علي يحيى",
  },
  heroLine1: { en: "Let's Work", ar: "يلا نشتغل" },
  heroLine2: { en: "Together", ar: "مع بعض" },

  intro: {
    en: "We work with brands, businesses, and individuals who care deeply about the quality of what they make. If that sounds like you, we'd like to hear from you.",
    ar: "بنشتغل مع علامات وشركات وأفراد بيهتموا فعلاً بجودة اللي بيعملوه. لو ده وصفك، يبقى نفسنا نسمع منك.",
  },

  // ---- Info column ----
  emailLabel: { en: "Email", ar: "الإيميل" },
  phoneLabel: { en: "Phone", ar: "التليفون" },
  whatsapp: { en: "WhatsApp", ar: "واتساب" },
  studioLabel: { en: "Studio", ar: "الاستوديو" },
  location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
  followLabel: { en: "Follow", ar: "تابعنا" },

  // ---- Form ----
  nameLabel: { en: "Name", ar: "الاسم" },
  namePlaceholder: { en: "Your name", ar: "اسمك" },
  emailPlaceholder: { en: "your@email.com", ar: "your@email.com" },
  serviceLabel: { en: "Service Interest", ar: "الخدمة المهتم بيها" },
  servicePlaceholder: { en: "Select a service", ar: "اختار خدمة" },
  messageLabel: { en: "Message", ar: "رسالتك" },
  messagePlaceholder: { en: "Tell us about your project", ar: "احكيلنا عن مشروعك" },
  submit: { en: "Send Enquiry", ar: "ابعت طلبك" },
  sending: { en: "Sending…", ar: "بنبعت…" },

  // ---- Success ----
  // The enquiry is delivered server-side now, so this states delivery as fact
  // rather than asking the visitor to finish the job in their mail client.
  sentEyebrow: { en: "Message Sent", ar: "الرسالة اتبعتت" },
  sentHeading: { en: "Thank You", ar: "شكراً ليك" },
  sentBody: {
    en: "We've received your enquiry and will be in touch within 2 business days.",
    ar: "وصلنا طلبك وهنتواصل معاك خلال يومين عمل.",
  },
  another: { en: "Send Another Enquiry", ar: "ابعت طلب تاني" },

  // ---- Failure ----
  errorEyebrow: { en: "Didn't Send", ar: "مااتبعتش" },
  errorHeading: { en: "Something Went Wrong", ar: "في حاجة غلط حصلت" },
  errorBody: {
    en: "We couldn't deliver your enquiry just now. Your message is still in the form — try again, or reach us directly.",
    ar: "مقدرناش نبعت طلبك دلوقتي. رسالتك لسه موجودة في الفورم — جرّب تاني، أو تواصل معانا على طول.",
  },
  retry: { en: "Try Again", ar: "جرّب تاني" },
  orEmailDirect: {
    en: "Or email us directly at",
    ar: "أو ابعتلنا على طول على",
  },
  openMailApp: { en: "Open Email App", ar: "افتح تطبيق الإيميل" },
} satisfies Record<string, I18nText>;

/**
 * Order matches SERVICES_OPTIONS in ContactPage.tsx.
 *
 * NOTE: this list has drifted from src/data/services.ts — it names three
 * services where the studio now offers five, and "Food & Beverage Consultancy"
 * is no longer among them. Translated as-is; worth reconciling separately.
 */
export const CONTACT_SERVICE_OPTIONS: I18nText[] = [
  { en: "Art Direction", ar: "الإدارة الفنية" },
  { en: "Execution & Construction", ar: "التنفيذ والإنشاء" },
  { en: "Food & Beverage Consultancy", ar: "استشارات المطاعم والكافيهات" },
];

/* ------------------------------------------------------------- Philosophy */

export const PHILOSOPHY = {
  heroEyebrow: { en: "Our Philosophy", ar: "فلسفتنا" },
  heroAlt: {
    en: "AES interior — Aaly Al Makam",
    ar: "تصميم داخلي من AES — عالي المقام",
  },
  /** Three lines because the headline is hard-broken with <br />; the third is lime. */
  heroLine1: { en: "Art &", ar: "الفن" },
  heroLine2: { en: "Design Are", ar: "والتصميم" },
  heroLine3: { en: "One", ar: "شيء واحد" },

  quote1: {
    en: '"Our design philosophy revolves around the belief that art and design are inextricably linked — and that the careful integration of art into design is what sets us apart."',
    ar: "«فلسفتنا في التصميم قايمة على إيمان إن الفن والتصميم مايتفصلوش عن بعض — وإن دمج الفن في التصميم بعناية هو اللي بيفرّقنا.»",
  },

  processAlt: { en: "Studio process", ar: "من كواليس الاستوديو" },
  processEyebrow: { en: "How We Work", ar: "إزاي بنشتغل" },
  processBody1: {
    en: "Our process is not linear and it is not templated. It begins with the question: what does this work need to do? Not what does it need to look like — what does it need to do. Everything else follows from that.",
    ar: "شغلنا مش خط مستقيم ومش قالب جاهز. بيبدأ بسؤال: المشروع ده محتاج يعمل إيه؟ مش شكله يبقى إيه — يعمل إيه. وكل حاجة بعد كده بتيجي من الإجابة دي.",
  },
  processBody2: {
    en: "We work closely with clients throughout, not as service providers but as thinking partners. The best outcomes come from genuine collaboration — when both sides bring something the other cannot.",
    ar: "بنشتغل مع العميل جنب لجنب من الأول للآخر، مش كمقدّمي خدمة لكن كشركاء في التفكير. أحسن النتايج بتيجي من تعاون حقيقي — لما كل طرف يجيب حاجة التاني مايقدرش يجيبها.",
  },

  principlesEyebrow: { en: "How We Think", ar: "إزاي بنفكر" },
  principlesHeading: { en: "Core Principles", ar: "مبادئنا الأساسية" },

  quote2: {
    en: '"The connection between marketing, branding, and interior design isn\'t just an advantage — it\'s essential."',
    ar: "«الربط بين التسويق والهوية والتصميم الداخلي مش ميزة زيادة — ده أساس.»",
  },
  quote2Support: {
    en: "A space without distinctive vibes loses much of its potential, even with stunning interior design. We design the vibe first — then everything serves it.",
    ar: "المكان من غير إحساس مميز بيضيّع كتير من إمكانياته، حتى لو التصميم الداخلي مبهر. إحنا بنصمم الإحساس الأول — وبعدين كل حاجة بتخدمه.",
  },

  ctaHeading: { en: "Work With Us", ar: "اشتغل معانا" },
  ctaButton: { en: "Start a Conversation", ar: "يلا نتكلم" },
} satisfies Record<string, I18nText>;

/** Order matches the PRINCIPLES array in PhilosophyPage.tsx. `num` is locale-invariant. */
export const PHILOSOPHY_PRINCIPLES: { num: string; title: I18nText; body: I18nText }[] = [
  {
    num: "01",
    title: { en: "Create The Vibe First", ar: "ابدأ بالإحساس" },
    body: {
      en: "Before materials or layout, we define the feeling a space must create. Every decision after that serves the vibe — that is what makes a space unforgettable.",
      ar: "قبل الخامات وقبل التوزيع، بنحدد الإحساس اللي المكان لازم يعمله. وكل قرار بعد كده بيخدم الإحساس ده — وده اللي بيخلي المكان مايتنسيش.",
    },
  },
  {
    num: "02",
    title: { en: "Art & Design As One", ar: "الفن والتصميم شيء واحد" },
    body: {
      en: "We refuse the false line between art and design. The careful integration of art into interiors and architecture is the thing that sets our work apart.",
      ar: "إحنا رافضين الخط الوهمي بين الفن والتصميم. دمج الفن بعناية في التصميم الداخلي والعمارة هو اللي بيميّز شغلنا.",
    },
  },
  {
    num: "03",
    title: { en: "Holistic & Turnkey", ar: "متكامل ومن الألف للياء" },
    body: {
      en: "From concept and branding to execution and beyond, we see a project through end to end — so the vision that starts on paper survives all the way to the finished space.",
      ar: "من الفكرة والهوية لحد التنفيذ وبعده، بنمشي مع المشروع من أوله لآخره — عشان الرؤية اللي بدأت على الورق توصل للمكان النهائي زي ما هي.",
    },
  },
];

/* ------------------------------------------------------------------ About */

export const ABOUT = {
  viewProfile: { en: "View Profile", ar: "شوف الملف" },
  heroLine1: { en: "About", ar: "عن" },
  heroLine2: { en: "AES", ar: "AES" },
  heroAlt: {
    en: "AES interior — Aaly Al Makam",
    ar: "تصميم داخلي من AES — عالي المقام",
  },

  // ---- Manifesto ----
  storyEyebrow: { en: "Our Story", ar: "حكايتنا" },
  storyAlt: { en: "AES interior — Ozel", ar: "تصميم داخلي من AES — أوزيل" },
  /**
   * Three fragments, because the middle one is wrapped in the lime accent span.
   * Kept separate so the translator controls Arabic word order around the
   * highlight instead of it being concatenated in JSX.
   */
  manifestoLead: {
    en: "Founded in 2020 by Ayman & Ehab Sobhy on one belief:",
    ar: "اتأسس سنة 2020 على إيد أيمن وإيهاب صبحي على قناعة واحدة:",
  },
  manifestoHighlight: {
    en: "a space without its own vibe loses its potential",
    ar: "المكان من غير إحساس خاص بيه بيضيّع إمكانياته",
  },
  manifestoTail: {
    en: "— no matter how polished the design.",
    ar: "— مهما كان التصميم متقن.",
  },
  storyBody1: {
    en: "We are a one-stop studio that transforms spaces of all types — residential, commercial, and hospitality — handling everything from concept and design to execution, decoration, and branding. Our approach is holistic and turnkey: we see a project through from inception to completion and beyond.",
    ar: "إحنا استوديو متكامل بنحوّل كل أنواع الأماكن — سكني وتجاري وضيافة — وبنمسك كل حاجة من الفكرة والتصميم لحد التنفيذ والديكور والهوية. منهجنا شامل ومن الألف للياء: بنمشي مع المشروع من أول لحظة لحد ما يخلص وبعدها كمان.",
  },
  storyBody2: {
    en: "Our secret is a deep-rooted belief in the power of art, a rich understanding of diverse cultures, and unparalleled expertise. These let us craft tailored atmospheres that resonate — leaving lasting impressions and breathing life into every project.",
    ar: "سرّنا إيمان عميق بقوة الفن، وفهم واسع لثقافات مختلفة، وخبرة مالهاش مثيل. ده اللي بيخلّينا نصمم أجواء مفصّلة على المكان توصل للناس — تسيب أثر يفضل وتدّي المشروع روح.",
  },

  // ---- Founders ----
  foundersEyebrow: { en: "The Founders", ar: "المؤسسون" },

  // ---- Mission / Vision / Values ----
  missionVisionEyebrow: { en: "Mission & Vision", ar: "رسالتنا ورؤيتنا" },
  missionHeading: { en: "Mission", ar: "رسالتنا" },
  visionHeading: { en: "Vision", ar: "رؤيتنا" },
  mission: {
    en: "We exist to design spaces that inspire, energize, and captivate. Through innovation, artistic vision, and a commitment to constant evolution, we set new standards in commercial design, creating environments that leave a lasting impact.",
    ar: "إحنا موجودين عشان نصمم أماكن تلهم وتدّي طاقة وتشدّ الانتباه. بالابتكار والرؤية الفنية والالتزام بالتطور المستمر، بنضع معايير جديدة في التصميم التجاري، وبنخلق بيئات تسيب أثر يفضل.",
  },
  vision: {
    en: "To redefine commercial design standards and become the leading innovator in the Middle East by delivering holistic solutions with expertise in branding and design, execution, furnishing, operations, food and beverage consultancy, and more.",
    ar: "إننا نعيد تعريف معايير التصميم التجاري ونبقى الرائد الأول في الشرق الأوسط، من خلال حلول متكاملة وخبرة في الهوية والتصميم والتنفيذ والتأثيث والتشغيل واستشارات المطاعم والكافيهات وغيرها.",
  },
  valuesEyebrow: { en: "Our Values", ar: "قيمنا" },
} satisfies Record<string, I18nText>;

/** Order matches the STATS array in AboutPage.tsx. */
export const ABOUT_STATS: { value: I18nText; label: I18nText }[] = [
  {
    value: { en: "2020", ar: "2020" },
    label: { en: "Established", ar: "سنة التأسيس" },
  },
  {
    value: { en: "20+", ar: "20+" },
    label: { en: "Projects Delivered", ar: "مشروع اتسلّم" },
  },
  {
    value: { en: "03", ar: "03" },
    label: { en: "Core Disciplines", ar: "تخصصات أساسية" },
  },
  {
    // Not a numeral, so unlike the others this value genuinely translates.
    value: { en: "MENA", ar: "الشرق الأوسط" },
    label: { en: "Region Served", ar: "المنطقة اللي بنخدمها" },
  },
];

/** Order matches the FOUNDERS array in AboutPage.tsx. */
export const ABOUT_FOUNDERS: { name: I18nText; role: I18nText }[] = [
  {
    name: { en: "Ayman Sobhy", ar: "أيمن صبحي" },
    role: {
      en: "Art Director · Interior Designer · Co-Founder",
      ar: "مدير فني · مصمم داخلي · شريك مؤسس",
    },
  },
  {
    name: { en: "Ehab Sobhy", ar: "إيهاب صبحي" },
    role: {
      en: "Art Director · Interior Designer · Co-Founder",
      ar: "مدير فني · مصمم داخلي · شريك مؤسس",
    },
  },
];

/**
 * Copy that appears only inside the JSON-LD payload, never on screen.
 *
 * Kept here rather than in `schema.ts` so every translated string in the project
 * lives in one file and the `satisfies` guard catches a missing `ar` at compile
 * time — the same rule as the visible UI.
 */
export const STUDIO_SCHEMA = {
  name: {
    en: "AES — Ayman Ehab Studio",
    ar: "AES — استوديو أيمن وإيهاب",
  },
  description: {
    en: "Interior design, architecture and art direction studio in Cairo, Egypt. AES designs and delivers restaurants, food and beverage outlets, retail, offices and private residences turnkey.",
    ar: "استوديو تصميم داخلي وعمارة وإدارة فنية في القاهرة، مصر. AES بتصمم وتنفّذ المطاعم والكافيهات والمحلات والمكاتب والفيلات والوحدات السكنية تسليم مفتاح.",
  },
  catalogName: {
    en: "Design & Build Services",
    ar: "خدمات التصميم والتنفيذ",
  },
  founderTitle: {
    en: "Art Director & Interior Designer",
    ar: "مدير فني ومصمم داخلي",
  },
} satisfies Record<string, I18nText>;

/** `knowsAbout` — the studio's declared areas of expertise, per locale. */
export const STUDIO_EXPERTISE: Record<"en" | "ar", string[]> = {
  en: [
    "Interior Design",
    "Architecture",
    "Art Direction",
    "Food and Beverage Design",
    "Restaurant Interior Design",
    "Brand Experience",
    "Turnkey Execution",
  ],
  ar: [
    "التصميم الداخلي",
    "العمارة",
    "الإدارة الفنية",
    "تصميم المطاعم والكافيهات",
    "تصميم مطاعم داخلي",
    "تجربة العلامة",
    "التنفيذ تسليم مفتاح",
  ],
};

/** Founder names — transliterated for the Arabic payload. */
export const STUDIO_FOUNDERS: Record<"en" | "ar", [string, string]> = {
  en: ["Ayman Sobhy", "Ehab Sobhy"],
  ar: ["أيمن صبحي", "إيهاب صبحي"],
};

/** Place names used by `areaServed`. */
export const STUDIO_AREAS = {
  egypt: { en: "Egypt", ar: "مصر" },
  saudi: { en: "Saudi Arabia", ar: "السعودية" },
  mena: { en: "Middle East and North Africa", ar: "الشرق الأوسط وشمال أفريقيا" },
} satisfies Record<string, I18nText>;

/** Address parts that genuinely differ by script. */
export const STUDIO_ADDRESS = {
  street: {
    en: "Villa 18, Aly Shaarawy, Narges 5, Fifth Settlement",
    // Western digits, per the numeral convention at the top of this file — and
    // so the Arabic address still matches the English one for Google Business
    // Profile reconciliation.
    ar: "فيلا 18، علي شعراوي، النرجس 5، التجمع الخامس",
  },
  city: { en: "Cairo", ar: "القاهرة" },
  region: { en: "Cairo Governorate", ar: "محافظة القاهرة" },
} satisfies Record<string, I18nText>;

/**
 * The names people actually search for. Without these the entity is not
 * associated with "ayman and ehab" at all. The Arabic list keeps the Latin
 * forms too — Egyptian users routinely type the brand in either script.
 */
export const STUDIO_ALT_NAMES: Record<"en" | "ar", string[]> = {
  en: ["AES", "Ayman & Ehab", "Ayman and Ehab", "Ayman & Ehab Studio", "AES Design Studio"],
  ar: [
    "AES",
    "Ayman & Ehab",
    "Ayman and Ehab",
    "أيمن وإيهاب",
    "استوديو أيمن وإيهاب",
    "ايه اي اس",
  ],
};

/* -------------------------------------------------------------- Lightbox */

export const LIGHTBOX = {
  dialogLabel: { en: "Image viewer", ar: "عارض الصور" },
  close: { en: "Close image viewer", ar: "اقفل عارض الصور" },
  next: { en: "Next image", ar: "الصورة اللي بعدها" },
  previous: { en: "Previous image", ar: "الصورة اللي قبلها" },
  expand: { en: "View full screen", ar: "اعرض ملء الشاشة" },
} satisfies Record<string, I18nText>;

/* -------------------------------------------------------------- Founders */

export const FOUNDER_PAGE = {
  eyebrow: { en: "Co-Founder", ar: "شريك مؤسس" },
  aboutStudioHeading: { en: "At AES", ar: "في AES" },
  aboutStudioBody: {
    en: "AES is an art direction, interior design and architecture studio in Cairo, founded in 2020. The studio works across food and beverage, retail, workplace and private residential projects, taking each from concept and art direction through documentation and on-site execution.",
    ar: "AES استوديو إدارة فنية وتصميم داخلي وعمارة في القاهرة، اتأسس سنة 2020. الاستوديو بيشتغل على مشاريع المطاعم والكافيهات والريتيل والمكاتب والسكني، من الفكرة والإدارة الفنية لحد التنفيذ في الموقع.",
  },
  disciplinesHeading: { en: "Disciplines", ar: "التخصصات" },
  projectsHeading: { en: "Selected AES Projects", ar: "مختارات من مشاريع AES" },
  projectsNote: {
    en: "Projects delivered by the AES studio.",
    ar: "مشاريع نفّذها استوديو AES.",
  },
  otherFounder: { en: "The Other Co-Founder", ar: "الشريك المؤسس التاني" },
  viewAllWork: { en: "View All Work", ar: "شوف كل الأعمال" },
  startProject: { en: "Start a Project", ar: "ابدأ مشروعك" },
  backToAbout: { en: "Back to About AES", ar: "ارجع لصفحة عن AES" },
} satisfies Record<string, I18nText>;
