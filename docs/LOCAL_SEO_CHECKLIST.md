# Local SEO checklist

All steps are manual and happen outside this repository.

## The NAP baseline — must be byte-identical everywhere

Source of truth is `src/data/site.ts`. These exact values already appear on the
contact page, in the footer, and in `LocalBusiness` / `Organization` JSON-LD:

| Field | Value |
|---|---|
| Name | AES — Ayman Ehab Studio |
| Street | Villa 18, Aly Shaarawy, Narges 5, Fifth Settlement |
| City | Cairo |
| Postal code | 11835 |
| Country | EG |
| Phone | +20 100 408 5006 (E.164: `+201004085006`) |
| Email | contact@aes-designstudio.com |
| Founded | 2020 |

Inconsistency across citations is the most common cause of weak local ranking.
"Villa 18" vs "Villa No. 18" vs "Fifth Settlement" vs "5th Settlement" read as
different businesses. **Pick these strings and never vary them.**

If any value is wrong, fix `src/data/site.ts` and rebuild — do not patch it in
one place.

## Google Business Profile

- [ ] Claim/verify the profile for the Fifth Settlement address
- [ ] **Primary category:** Interior Designer
- [ ] **Secondary:** Architect · Design Agency · General Contractor *(only if AES genuinely does the work)*
- [ ] Name exactly `AES — Ayman Ehab Studio` — no keyword stuffing. "AES Interior Design Cairo Egypt" risks suspension
- [ ] Website → `https://aes-designstudio.com`
- [ ] Description (750 chars) written from the About page, not keyword-stuffed
- [ ] Services listed to match `/services` — the same five
- [ ] Service area: Cairo, New Cairo, Sheikh Zayed, North Coast, and Egypt-wide
- [ ] **Hours: leave blank unless AES has real, staffed hours.** Inventing them is worse than omitting them — visitors turn up to a closed studio
- [ ] Upload real project photography only. No stock. Geotagging is not required
- [ ] Verify the map pin sits on the actual building, not the street centroid

## Reviews

- [ ] Ask completed clients directly, in person or by email
- [ ] **Never incentivise.** Paid or discounted reviews violate Google policy and can remove all reviews
- [ ] Never buy reviews or write them internally
- [ ] Respond to every review within a week, positive and negative
- [ ] Respond to criticism factually, without arguing

## Other citations

- [ ] Bing Places — same NAP
- [ ] Apple Business Connect
- [ ] Instagram / LinkedIn / Facebook bios → same website URL, same name. These already appear in `sameAs`
- [ ] Egyptian and regional design directories, **only where AES genuinely has a profile**
- [ ] Architecture/design platforms: Behance, ArchDaily, Archello — real submissions only
- [ ] Press coverage in Egyptian design publications, pitched with real project material

**Never** create fake directory accounts, duplicate listings, or listings at
addresses AES does not occupy. Duplicates actively suppress the real listing.

## What is already done in code

- `LocalBusiness` + `ProfessionalService` JSON-LD on all 43 pages, one stable `@id`
- Full `PostalAddress` including street and postal code
- `telephone` in E.164
- `priceRange: "$$$$"` — a qualitative premium marker. Replace in
  `src/data/site.ts` if AES prefers an explicit band
- `areaServed`: Egypt, Saudi Arabia, MENA
- `sameAs` → the three real studio social profiles
- `alternateName` × 5 in English, × 6 in Arabic, so brand-variant searches resolve
- **`geo` coordinates** `30.011250, 31.461529` and **`hasMap`** — taken from the
  studio's own Google Business Profile embed, so they are verified rather than
  geocoded from the street string
- Embedded Google map in the footer on all 44 pages, lazy-loaded, with the
  address as a real `<address>` element linking to the listing

Not added, deliberately: `openingHours` (unverified) and `aggregateRating`
(would be fabricated).

## ⚠ Open issue — the business name does not match

The Google Business Profile is listed as:

> **AES Art Direction Studio - Interior Design**

The site publishes `AES — Ayman Ehab Studio` as the organisation `name`. These
are different strings for the same business, which is exactly the inconsistency
that weakens local ranking.

This also bears on `SEO_AUDIT.md` §0.1: it makes it considerably more likely that
`aes-artdirection.com` is a **real AES domain**, not an error in the brief.

Decide one of the following and apply it everywhere:

1. Rename the Google listing to `AES — Ayman Ehab Studio` to match the site, or
2. Keep the listing name and add it to `alternateName` in
   `src/i18n/messages.ts` → `STUDIO_ALT_NAMES`, so the entity still resolves.

Option 2 is lower risk — renaming a verified listing can trigger re-review.
Either way, **do not leave the two unreconciled.**
