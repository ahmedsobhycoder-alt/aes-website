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
  heroLine2: { en: "Experience", ar: "التجربة" },
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
    en: "AES is an art direction and interior design studio founded in 2020 by Ayman & Ehab Sobhy. We bring art and design together — from concept and branding to execution and F&B consultancy — to shape spaces with their own vibe.",
    ar: "AES استوديو إدارة فنية وتصميم داخلي، اتأسس سنة 2020 على إيد أيمن وإيهاب صبحي. بنجمع الفن والتصميم مع بعض — من الفكرة والهوية لحد التنفيذ واستشارات المطاعم والكافيهات — عشان نطلّع أماكن ليها إحساسها الخاص.",
  },
  est2020: { en: "Est. 2020", ar: "تأسس 2020" },
  since2013: { en: "Since 2013", ar: "من سنة 2013" },
  projectsExecuted: { en: "Projects Executed", ar: "مشروع اتنفذ" },
  industriesExecuted: { en: "industries Executed", ar: "مجال اشتغلنا فيه" },

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

export const PROJECT_COPY: Record<string, { title: I18nText; category: I18nText }> = {
  ozel: {
    title: { en: "Ozel", ar: "أوزيل" },
    category: { en: "Hospitality & F&B", ar: "ضيافة ومطاعم" },
  },
  nuwa: {
    title: { en: "Nuwa", ar: "نوا" },
    category: { en: "Hospitality & F&B", ar: "ضيافة ومطاعم" },
  },
  "aaly-al-makam": {
    title: { en: "Aaly Al Makam", ar: "عالي المقام" },
    category: { en: "Hospitality & F&B", ar: "ضيافة ومطاعم" },
  },
  rixance: {
    title: { en: "Rixance", ar: "ريكسانس" },
    category: { en: "Branding", ar: "هوية تجارية" },
  },
  "magaz-clinic": {
    title: { en: "Magaz Clinic", ar: "عيادة مچاز" },
    category: { en: "Commercial", ar: "تجاري" },
  },
  "salon-ali-yehia": {
    title: { en: "Salon Ali Yehia", ar: "صالون علي يحيى" },
    category: { en: "Commercial", ar: "تجاري" },
  },
  "hyde-park": {
    title: { en: "Hyde Park", ar: "هايد بارك" },
    category: { en: "Residential", ar: "سكني" },
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
