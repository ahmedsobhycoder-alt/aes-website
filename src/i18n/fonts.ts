import { Noto_Kufi_Arabic } from "next/font/google";

/**
 * Arabic display + body face. Barlow Condensed and Manrope have no Arabic
 * glyphs at all (both are `subsets: ["latin"]`), so Arabic would otherwise fall
 * back to a system font and lose the brand voice entirely.
 *
 * Variable font: the `wght` axis spans 100–900, so the existing `font-black`
 * headings and `font-medium`/`font-normal` body map straight through from a
 * single file — no `weight` array needed.
 *
 * `preload: false` is deliberate. Nav imports this so the navbar can render
 * Arabic, and Nav is on every page — preloading would make English pages
 * download the Arabic font. Without a preload link the browser fetches it only
 * when Arabic glyphs actually need rendering.
 */
export const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-kufi",
  display: "swap",
  preload: false,
});
