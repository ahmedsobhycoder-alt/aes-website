import type { Metadata } from "next";
import { notoKufi } from "@/i18n/fonts";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { HTML_LANG, DIR } from "@/i18n/locale";

export const metadata: Metadata = {
  title: {
    default: "AES — استوديو أيمن وإيهاب · بنصنع التجربة",
    template: "%s · AES — استوديو أيمن وإيهاب",
  },
  description:
    "AES استوديو إدارة فنية وتصميم داخلي. إحنا مابنصممش أماكن وبس، إحنا بنصنع تجارب.",
};

/**
 * Nested layout — it cannot render <html>, so `lang`/`dir` go on a wrapper
 * element. The <html> tag itself is owned by the single root layout and stays
 * `lang="en"`; that is a known trade-off of keeping one root layout.
 *
 * `dir="rtl"` here is what drives Tailwind's `rtl:` variant, which compiles to
 * `:where([dir="rtl"], [dir="rtl"] *)` and therefore matches every descendant.
 */
export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider locale="ar">
      <div lang={HTML_LANG.ar} dir={DIR.ar} className={notoKufi.variable}>
        {children}
      </div>
    </LocaleProvider>
  );
}
