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
    /** Full postal address — used by the LocalBusiness JSON-LD. */
    address: {
      street: "Villa 18, Aly Shaarawy, Narges 5, Fifth Settlement",
      city: "Cairo",
      region: "Cairo Governorate",
      postalCode: "11835",
      country: "EG",
    },
  },
  /**
   * Map data, read off the studio's own Google Business Profile embed — so the
   * coordinates are verified rather than approximated from the street address.
   * That is what makes `geo` safe to publish in LocalBusiness JSON-LD.
   */
  map: {
    lat: 30.011249520143757,
    lng: 31.46152917500905,
    /**
     * The business name as it appears on the Google listing. NOTE: this differs
     * from SITE.fullName ("AES — Ayman Ehab Studio"). Inconsistent naming across
     * citations weakens local ranking — see docs/LOCAL_SEO_CHECKLIST.md.
     */
    placeName: "AES Art Direction Studio - Interior Design",
    /** Canonical listing link, resolved from the embed's CID. */
    placeUrl: "https://maps.google.com/?cid=16116342101841667317",
    /**
     * The `pb` payload from the Google Maps embed iframe. Stored raw so the
     * iframe src can be rebuilt per locale — the trailing `!1sen!2seg` pairs are
     * language and region, and are swapped to `ar` on Arabic pages.
     */
    embedPb:
      "!1m18!1m12!1m3!1d3454.8922725137677!2d31.46152917500905!3d30.011249520143757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145823f05b049e81%3A0xdfa8bfc0eaf1e4f5!2sAES%20Art%20Direction%20Studio%20-Interior%20Design!5e0!3m2!1sen!2seg!4v1785591518198!5m2!1sen!2seg",
  },
  /**
   * schema.org `priceRange` for LocalBusiness. Google flags its absence as a
   * missing recommended field.
   *
   * "$$$$" is the conventional qualitative marker for premium positioning and is
   * what most consumers understand. If you would rather publish an explicit
   * project-budget band, replace this single value — e.g.
   * "EGP 5,000,000 - EGP 16,000,000". Nothing else needs to change.
   */
  priceRange: "$$$$",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/aes_designstudio?igsh=MTZtbHB2c3ZxYmQxNQ==" },
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
