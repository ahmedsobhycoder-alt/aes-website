# AES — Technical SEO Audit

Audited against the repository at `feature/added-works` and the generated static
output in `out/`. Every finding below was verified by inspecting built HTML, not
inferred from source.

---

## 0. Two premises in the brief that do not match this repository

These change the work, so they are recorded first.

### 0.1 — The canonical domain in the brief is not this site's domain

**Severity: critical (blocks Phases 2 and 3 from being completed in code).**

The brief specifies `https://www.aes-artdirection.com` as the canonical origin
and `staging.aes-artdirection.com` as the leaking staging host.

The string `artdirection` **does not appear anywhere in this repository.** The
configured origin, in four independent places, is:

| Source | Value |
|---|---|
| `src/data/seo.ts` → `SITE_URL` | `https://aes-designstudio.com` |
| `.env.example` → `NEXT_PUBLIC_SITE_URL` | `https://aes-designstudio.com` |
| `src/app/(en)/layout.tsx` → `metadataBase` | `https://aes-designstudio.com` |
| `src/data/site.ts` → `contact.domain` / `contact.email` | `aes-designstudio.com` |

Per the brief's own instruction — *"If the repository has a different confirmed
production origin, use the repository configuration as the source of truth and
document the difference"* — all implementation uses **`aes-designstudio.com`**.

**This must be resolved by AES before the redirect and deindexing work can be
finished.** There are three possibilities and they require different actions:

1. `aes-artdirection.com` is an **older/previous** AES domain that still has
   indexed pages. → Needs 301 redirects to the current domain, host-level.
   See `CLOUDPANEL_SEO_REDIRECTS.md`.
2. `aes-artdirection.com` is the **intended future** production domain. → The
   repository config is wrong and must be changed first; everything else follows.
3. The brief simply used the wrong domain. → No action; ignore.

Until AES confirms which, the redirect and staging documents are written with
the hostname as an explicit, clearly-marked variable rather than hardcoded.

### 0.2 — No approved source supports a "CEO" title

**Severity: high (would have published an unverifiable claim).**

The brief permits describing Ayman Sobhy as "CEO & Co-Founder" *only when
supported by approved AES information*. No such source exists in this repository.
`ABOUT_FOUNDERS` in `src/i18n/messages.ts` — the only founder role data present,
and what the live About page already displays — states for **both** founders:

> Art Director · Interior Designer · Co-Founder

The founder pages therefore publish that verified role. No CEO, Managing
Director or Creative Director title was invented for either person.
Verified in built output: `CEO claim: false` on both pages.

---

## 1. Findings

Severity key: **C** critical · **H** high · **M** medium · **L** low.
Status: **Fixed** · **Documented** · **Blocked** · **Deferred**.

### C1 — Staging exposure had no code-level defence
- **Route:** all
- **Was:** `robots.ts` returned `allow: "/"` unconditionally and the root layout
  hardcoded `index: true, follow: true`. Any build from any branch, deployed
  anywhere, advertised itself as indexable and published a sitemap.
- **Now:** `SITE_ENV` / `IS_INDEXABLE` in `src/data/seo.ts`. A build with
  `NEXT_PUBLIC_SITE_ENV=staging` emits `noindex, nofollow, nocache`, googlebot
  `noindex, nofollow, noimageindex`, and a blanket-disallow `robots.txt` with no
  sitemap reference. Default is `production`, so the failure mode is a visible
  indexable staging site rather than an invisible noindexed production site.
- **Verified:** staging build → `robots meta: noindex, nofollow, nocache`;
  production build → `index, follow`, sitemap referenced, `noindex` absent.
- **Status: Fixed (in-HTML layer).** The `X-Robots-Tag` header layer and the
  removal of already-indexed URLs are server/console work — see
  `STAGING_DEINDEXING.md`. **robots.txt alone will not deindex anything.**

### C2 — No founder entity pages
- **Route:** `/founders/ayman-sobhy`, `/founders/ehab-sobhy` (new)
- **Was:** The founders appeared only as two names in a grid on `/about`, with
  no dedicated URL, no `Person` markup and nothing to rank for a name query.
- **Now:** Two statically-generated profiles with a single H1 (the name),
  verified role, AES relationship, discipline links into `/services/*`, real
  project links into `/work/*`, `ProfilePage` + `Person` (`worksFor` → the
  studio `@id`) + `BreadcrumbList`, unique title/description, descriptive
  portrait alt text, and reciprocal links to each other and back to `/about`.
- **Status: Fixed — but see §3, these pages need real biographies.**

### H1 — Service pages shared a one-line description and had no Service markup
- **Route:** `/services/{slug}` × 5
- **Was:** `title: s.title` (a bare noun such as "Architecture"), description =
  the same short `s.desc` used on the services index card, canonical without a
  trailing slash despite `trailingSlash: true`, and no per-service structured data.
- **Now:** Intent-led unique titles (e.g. `Luxury Interior Design in Egypt`,
  `Architecture Studio in Egypt`), descriptions from each service's unique
  `longDesc`, trailing-slash canonical, plus `Service` + `BreadcrumbList` JSON-LD.
- **Status: Fixed.**

### H2 — No `manifest`, no Search Console verification hook
- **Route:** global
- **Now:** `src/app/manifest.ts` emits `/manifest.webmanifest` using the real
  theme tokens; `verificationMeta()` emits Google/Bing tags **only** when
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`
  are set. No values are hardcoded.
- **Status: Fixed.**

### H3 — `robots.txt` did not disallow admin or API paths
- **Now:** disallows `/admin`, `/admin/`, `/api/`, plus a `Host` directive.
  Recorded explicitly: **robots.txt is not a security control.** The admin panel
  is a separate application and API authentication remains the boundary.
- **Status: Fixed.**

### M1 — Sitemap omitted the founder routes
- **Now:** derived from `FOUNDERS`, priority `0.8` — above project pages,
  because they carry the founder-name queries. 41 → **43 URLs**.
- **Status: Fixed.**

### M2 — Project pages depend on `src/data`, not the API
- **Route:** `/work/{slug}` × 19
- **Current:** all project content is statically imported from
  `src/data/projects.ts` and fully present in the exported HTML. There is **no**
  client-side fetching of SEO-critical content anywhere on the public site.
- **Assessment:** this already satisfies the *outcome* Phase 8 asks for. The
  build-time API pipeline it describes is **not implemented** — see §2.
- **Status: Deferred, documented** in `PROJECT_PUBLISHING_SEO_WORKFLOW.md`.

### L1 — `/404/` has no `lang` attribute
- **Route:** `/404/`
- **Cause:** with two root layouts, Next refuses a root-level `not-found.tsx`,
  so `out/404.html` is generated from a real route and copied by
  `scripts/copy-404.mjs`. That copy is correct and carries `lang="en"`; the
  separate `/404/` directory index is Next's own artifact.
- **Impact:** negligible — 404s are not indexable.
- **Status: Deferred.**

---

## 2. Verified as already correct (no change needed)

The starting state was considerably better than the brief assumes. Confirmed by
inspecting built HTML across all 43 pages:

| Check | Result |
|---|---|
| Exactly one `<h1>` per page | **43/43 pass** |
| Duplicate meta descriptions | **0 groups** |
| Pages missing a description | **0** |
| Canonical on every indexable page | present, absolute, production origin |
| `hreflang` reciprocity | present on the 7 translated routes in both locales (`en`, `ar-EG`, `x-default`); correctly **absent** on untranslated detail pages |
| Arabic `<html lang="ar-EG" dir="rtl">` | in static HTML, not JS-applied |
| Placeholder metadata / `TODO` / `lorem ipsum` / `YOUR_DOMAIN` | **none** |
| `localhost` in production metadata | **none** |
| Staging URLs in production output | **none** |
| Admin routes in sitemap | **none exist in this app** |
| Fonts | `next/font` self-hosts at build; no external font requests |
| Image optimizer | `unoptimized: true` — correct for static export |

---

## 3. Content still requiring verified AES information

The founder pages are **entity scaffolding, not finished profiles.** They
currently carry only what the repository can substantiate. Until AES supplies
the following, they are thin, and the two pages are structurally similar enough
to risk being treated as near-duplicates:

- A genuine biography for each founder (150–300 words), differentiating them
- Each founder's actual specialism — the repository gives both identical roles
- Verified personal profile URLs for `sameAs` (LinkedIn, Instagram). The studio
  accounts in `SITE.socials` are **not** personal and were deliberately not used
- Any real press, interviews, exhibitions, lectures or awards
- Confirmation of project-level attribution, if any project can be attributed
  to one founder rather than to the studio
- Whether "CEO" is in fact Ayman's approved title

**Recommendation:** if that content will take more than ~2 weeks, set the
founder routes to `noindex` until it lands rather than letting two thin,
similar pages be crawled and classified.

---

## 4. Not implemented, with reasons

| Brief item | Why not |
|---|---|
| Route moves to `/projects/*`, `/interior-design`, `/architecture` | Would break every existing indexed URL and require a full 301 map for no ranking gain. The brief itself says *"reuse strong existing URLs and avoid unnecessary URL changes."* `/work/{slug}` and `/services/{slug}` are kept. |
| Descriptive image filenames (Phase 14) | Renaming ~420 files would invalidate every `gallery` reference in `projects.ts`, and the numbered `01.jpg` scheme was adopted at your explicit request earlier. High risk, low return — filenames are a weak signal next to alt text, which is already descriptive. Not done unilaterally. |
| Build-time API content pipeline (Phase 8) | The Express backend is not deployed and Atlas connectivity is unverified. A build-time fetch would fail or silently fall back on every build. Documented instead. |
| Admin SEO fields (Phase 10) | No admin frontend exists yet — `/admin` has no routes. Cannot extend a UI that has not been built. |
| Location pages (Phase 5) | The brief requires real evidence per location. Project records carry no `location` field, so there is nothing to substantiate a New Cairo or Sheikh Zayed page. Locations are mentioned naturally instead. |
| `npm run lint` | No ESLint config exists; `next lint` drops into an interactive setup prompt. Not run. |
