import NotFoundContent from "@/components/NotFoundContent";

/**
 * App Router not-found boundary for the (en) group.
 *
 * Note this does NOT produce out/404.html — under `output: "export"` only a
 * root-level not-found does, and a root-level one is impossible here because the
 * (en)/(ar) groups own the root layouts (Next errors with "not-found.tsx doesn't
 * have a root layout"). The static 404 comes from not-found-page/ instead.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
