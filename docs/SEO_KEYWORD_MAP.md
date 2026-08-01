# Keyword → page map

One primary query per page. No two pages own the same primary — that is what
causes self-competition, where Google alternates between your own URLs and both
rank worse than one strong page would.

Titles below are the **live** values in the build, not proposals.

---

## Core pages

### `/` — Homepage
- **Primary:** AES interior design studio Egypt
- **Supporting:** AES, AES art direction, AES design studio, Ayman and Ehab Sobhy
- **Intent:** navigational / brand
- **H1:** We Create Experiences
- **Title:** `Interior Design & Architecture Studio in Cairo | AES — Ayman Ehab Studio`
- **Links out:** `/about`, `/services`, `/work`, `/philosophy`, `/contact`, both founder profiles (via About strip)
- **Evidence:** 19 real projects, client logo wall
- **Arabic:** `/ar/`

### `/about`
- **Primary:** about AES Ayman Ehab Studio
- **Supporting:** AES founders, Egyptian interior design studio, design studio Cairo
- **Intent:** informational / brand
- **H1:** About AES
- **Links out:** `/founders/ayman-sobhy`, `/founders/ehab-sobhy`, `/work`, `/philosophy`
- **Arabic:** `/ar/about`

### `/work`
- **Primary:** interior design portfolio Egypt
- **Supporting:** AES projects, restaurant design projects Egypt, commercial interiors Cairo
- **Intent:** commercial investigation
- **H1:** Selected Work
- **Title:** `Interior Design & Architecture Portfolio`
- **Structured data:** `CollectionPage` + `ItemList` (19 projects)
- **Arabic:** `/ar/work`

### `/contact`
- **Primary:** contact AES interior design Cairo
- **Intent:** transactional
- **H1:** Let's Work Together
- **Evidence:** real phone, email, Cairo address — must stay identical to footer and schema
- **Arabic:** `/ar/contact`

---

## Service pages — one query each, no overlap

| Route | Primary query | Live title |
|---|---|---|
| `/services/interior-design` | luxury interior design Egypt | Luxury Interior Design in Egypt |
| `/services/architecture` | architecture studio Egypt | Architecture Studio in Egypt |
| `/services/art-direction` | art direction interior design | Art Direction for Interiors & Brand Spaces |
| `/services/execution-construction` | design and build Egypt | Design & Build Execution in Egypt |
| `/services/brand-experience` | environmental branding Egypt | Brand Experience & Environmental Design |

Supporting language to use **naturally**, not as a checklist: spatial planning,
circulation, material specification, lighting design, design development,
architectural coordination, guest experience, commercial interiors, residential
interiors, turnkey execution, hospitality design.

**Gap — no page owns these high-intent queries yet:**

| Unowned query | Recommended owner |
|---|---|
| restaurant interior design Egypt | new `/services/restaurant-interior-design` **or** an F&B section on `/services/interior-design` |
| F&B design Egypt | same |
| commercial / retail interior design Egypt | same treatment |
| residential / villa interior design Egypt | same treatment |

AES has genuine F&B evidence — Ozel, Nuwa, Cassandra Food Court, Big Pappy,
Bad Ziggy, Blues, Savoy, Sababa, Antika Beirut. That is more than enough to
support one substantial F&B page. It is the **single highest-value content gap**
on the site and is not something markup can solve.

---

## Founder pages

### `/founders/ayman-sobhy`
- **Primary:** Ayman Sobhy
- **Supporting:** Ayman Sobhy interior designer, Ayman Sobhy AES, Ayman Sobhy art director
- **Intent:** navigational / entity
- **H1:** Ayman Sobhy
- **Title:** `Ayman Sobhy — Co-Founder, AES`
- **Structured data:** `ProfilePage` → `Person`, `worksFor` → AES `@id`
- **Links in:** `/about`, the other founder page
- **Links out:** `/services/art-direction`, `/services/interior-design`, `/work/ozel`, `/work/rixance`, `/work/aaly-elmaqam`, `/about`, `/work`
- **Needs:** real biography — see `SEO_AUDIT.md` §3

### `/founders/ehab-sobhy`
- **Primary:** Ehab Sobhy
- **Supporting:** Ehab Sobhy interior designer, Ehab Sobhy AES
- **H1:** Ehab Sobhy
- **Links out:** `/services/interior-design`, `/services/execution-construction`, `/work/nuwa`, `/work/cassandra-food-court`, `/work/hyde-park`
- **Needs:** real biography, and a genuine point of difference from Ayman's page

Note the spelling is **Ehab Sobhy** throughout — verified against
`ABOUT_FOUNDERS`.

---

## Project pages — long tail

`/work/{slug}` × 19. Each owns `{project name} + typology`, e.g.
"Ozel restaurant interior design". These are the pages that win specific,
low-competition searches and feed authority to the service pages above.

Their weakness is depth, not markup: each carries 2–3 sentences
(`challenge` / `approach` / `outcome`). See `SEO_CONTENT_PLAN.md`.

---

## Company naming — use consistently

- **AES** — short form, UI and navigation
- **AES — Ayman Ehab Studio** — the brand string in titles and schema `name`
- **AES Art Direction**, **AES Interior Design Studio** — acceptable descriptive
  variants in prose

All five, plus the Arabic forms, are declared in `alternateName` on the
Organization schema, so the entity resolves regardless of which a searcher types.
Do not invent further variants.
