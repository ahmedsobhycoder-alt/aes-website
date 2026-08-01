# Search Console & Bing — setup and monitoring

## Verification

Two supported methods.

**Preferred — DNS (domain property).** Covers every subdomain and protocol, and
survives redeploys. Add the TXT record Google gives you at the registrar.

**Alternative — HTML meta tag.** Supported in code, emitted only when a value
exists. Add to `.env` (not `.env.example`) and **rebuild** — these are read at
build time:

```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
```

With both empty, no verification tags are emitted at all. Nothing is hardcoded.

Confirm after deploy:

```bash
curl -s https://aes-designstudio.com/ | grep -o '<meta name="google-site-verification"[^>]*>'
```

## First-run checklist

1. **Record a baseline before promoting anything.** Export Performance
   (clicks / impressions / CTR / average position) for the last 3 months. Without
   it you cannot prove any of this work helped.
2. Submit the sitemap: *Indexing → Sitemaps* → `sitemap.xml`.
   Expect **43 URLs discovered**.
3. Inspect and request indexing for the priority routes:
   - `/`
   - `/founders/ayman-sobhy/` and `/founders/ehab-sobhy/` — new, and the entity
     pages for the founder-name queries
   - `/services/interior-design/`, `/services/architecture/`
   - `/work/`
4. *Indexing → Pages* — confirm nothing appears under "Excluded by noindex". If a
   production URL does, check `NEXT_PUBLIC_SITE_ENV` on the build machine.
5. Add the **staging property separately** and follow `STAGING_DEINDEXING.md`.

## Ongoing monitoring

**Weekly**
- Pages → Indexed count trending up, not down
- Any new "Crawled – currently not indexed" entries (usually thin content)
- Coverage errors

**Monthly**
- Performance → split branded vs non-branded. Track these explicitly:
  `AES`, `AES interior design`, `Ayman Sobhy`, `Ehab Sobhy`,
  `interior design Cairo`, `restaurant interior design Egypt`
- Enhancements → structured-data errors. This site emits
  Organization/LocalBusiness, WebSite, ProfilePage/Person, CreativeWork,
  BlogPosting, Service, CollectionPage, BreadcrumbList
- Core Web Vitals → mobile first
- Links report → new referring domains

## Realistic expectations

Timelines, not promises:

| Query type | Realistic outcome |
|---|---|
| `AES design studio`, `Ayman Sobhy`, `Ehab Sobhy` | Good chance within 4–8 weeks — the entity is now properly declared and the founder pages are new |
| `interior design Cairo`, `restaurant interior design Egypt` | Competitive; 3–6 months, and dependent on the content work in `SEO_CONTENT_PLAN.md` |
| `interior design`, `architecture` (bare head terms) | Not winnable through markup. These are decided by domain authority and backlinks over years |

**No ranking position can be guaranteed.** Anyone promising a specific position
is either guessing or misleading you.

## Other tools

- **Rich Results Test** — validate a founder page and a project page after deploy
- **Schema Markup Validator** — catches JSON-LD syntax errors Google's tool skips
- **Bing Webmaster Tools** — can import directly from Search Console
- **PageSpeed Insights** — field data over lab data; lab scores mislead

## Do not add

Analytics, Tag Manager or advertising scripts unless AES supplies a real
measurement ID. Every third-party script costs page-experience performance, and
placeholder IDs collect nothing while still loading.
