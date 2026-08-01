import type { Metadata } from "next";

/**
 * Segment layout for /ar/*. Deliberately renders nothing of its own — <html>,
 * dir, fonts, Nav/Footer and the locale provider all belong to the (ar) root
 * layout one level up.
 *
 * It exists only to scope the Arabic title template and description to the /ar
 * segment, which is where they actually apply.
 */
export const metadata: Metadata = {
  title: {
    default: "AES — استوديو أيمن وإيهاب · بنصنع التجربة",
    template: "%s · AES — استوديو أيمن وإيهاب",
  },
  description:
    "AES استوديو إدارة فنية وتصميم داخلي. إحنا مابنصممش أماكن وبس، إحنا بنصنع تجارب.",
};

export default function ArabicSegmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
