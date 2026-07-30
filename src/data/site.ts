export const SITE = {
  name: "AES",
  fullName: "AES — Ayman Ehab Studio",
  tagline: "We don't just design spaces, we shape experiences.",
  motto: "We Create Vibes",
  established: "2020",
  contact: {
    phone: "+20 100 408 5006",
    phoneHref: "+201004085006",
    whatsapp: "201004085006",
    email: "contact@aes-designstudio.com",
    domain: "aes-designstudio.com",
    location: "Cairo, Egypt",
  },
  socials: [
    { label: "Instagram", href: " https://www.instagram.com/aes_designstudio?igsh=MTZtbHB2c3ZxYmQxNQ==" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/aes-interior-design-architecture/" },
    { label: "Facebook", href: "https://www.facebook.com/share/1GWRhvFK1F/?mibextid=wwXIfr" },
  ],
  values: ["Creativity", "Innovation", "Top-Notch Quality", "Functionality", "Transparency"],
  nav: [
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Work", to: "/work" },
    { label: "Philosophy", to: "/philosophy" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ],
} as const;
