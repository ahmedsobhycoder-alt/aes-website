export type PageSeo = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
};

const BASE_TITLE = "AES — Ayman Ehab Studio";

export const SEO: Record<string, PageSeo> = {
  "/": { title: `${BASE_TITLE} · We Create Vibes`, description: "AES is an art direction and interior design studio. We don't just design spaces, we shape experiences — from concept and branding to execution and F&B consultancy.", canonicalPath: "/", ogImage: "/projects/ozel/01.jpg" },
  "/about": { title: `About · ${BASE_TITLE}`, description: "Founded in 2020 by Ayman & Ehab Sobhy, AES brings art direction and interior design together to create spaces with their own vibe.", canonicalPath: "/about" },
  "/services": { title: `Services · ${BASE_TITLE}`, description: "Art Direction, Execution & Construction, and Food & Beverage Consultancy — holistic design delivered turnkey.", canonicalPath: "/services" },
  "/work": { title: `Work · ${BASE_TITLE}`, description: "Selected interior, hospitality, and branding projects by AES.", canonicalPath: "/work" },
  "/philosophy": { title: `Philosophy · ${BASE_TITLE}`, description: "Art and design are inextricably linked. The careful integration of art into design is what sets AES apart.", canonicalPath: "/philosophy" },
  "/blog": { title: `Journal · ${BASE_TITLE}`, description: "Notes on interior design, branding, and food & beverage spaces from the AES studio.", canonicalPath: "/blog" },
  "/contact": { title: `Contact · ${BASE_TITLE}`, description: "Start a project with AES. Cairo, Egypt · +20 100 408 5006.", canonicalPath: "/contact" },
};

export function getSeo(pathname: string): PageSeo {
  if (SEO[pathname]) return SEO[pathname];
  if (pathname.startsWith("/work/")) return { title: `Work · ${BASE_TITLE}`, description: "AES project case study.", canonicalPath: pathname };
  if (pathname.startsWith("/blog/")) return { title: `Journal · ${BASE_TITLE}`, description: "AES studio journal.", canonicalPath: pathname };
  return { title: BASE_TITLE, description: "AES — Ayman Ehab Studio.", canonicalPath: pathname };
}
