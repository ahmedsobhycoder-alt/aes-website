# Removing staging pages from Google

> **Read `SEO_AUDIT.md` §0.1 first.** The brief names `staging.aes-artdirection.com`,
> but this repository is configured for `aes-designstudio.com` and contains no
> reference to `aes-artdirection.com`. Substitute the real staging hostname for
> `STAGING_HOST` below once AES confirms which domain is actually leaking.

## The single most important point

**`robots.txt` does not remove anything from Google.**

A `Disallow` tells a crawler not to *fetch* a page. If that page is already
indexed, blocking it means Google can no longer see the `noindex` you added —
so the URL stays in the index, often with the "No information is available for
this page" description. Blocking too early is the most common way people make
this problem permanent.

**Correct order: let Google crawl → see `noindex` → drop the page → only then
block crawling (optional).**

---

## Layer 1 — Server header (do this first, strongest)

`X-Robots-Tag` works for every response including PDFs and images, and applies
whether or not the crawler renders HTML.

In CloudPanel: **Sites → [staging site] → Vhost**, add inside the `server` block:

```nginx
# STAGING ONLY. Must never appear in the production vhost.
add_header X-Robots-Tag "noindex, nofollow, noarchive, nosnippet" always;
```

The `always` flag matters — without it the header is omitted on 4xx/5xx
responses, which are exactly the ones that can get indexed as soft 404s.

Then reload and **verify**:

```bash
curl -sI https://STAGING_HOST/ | grep -i x-robots-tag
# expect: x-robots-tag: noindex, nofollow, noarchive, nosnippet
```

Also confirm production does **not** have it:

```bash
curl -sI https://aes-designstudio.com/ | grep -i x-robots-tag
# expect: no output
```

## Layer 2 — In-HTML meta (already implemented in this repo)

Build staging with:

```bash
NEXT_PUBLIC_SITE_ENV=staging
NEXT_PUBLIC_SITE_URL=https://STAGING_HOST
```

This is wired through `IS_INDEXABLE` in `src/data/seo.ts` and produces, verified
by a real staging build:

- `<meta name="robots" content="noindex, nofollow, nocache">`
- `<meta name="googlebot" content="noindex, nofollow, noimageindex">`
- `robots.txt` → `User-Agent: *` / `Disallow: /`, **no** `Sitemap:` line

A production build (no env var, or `production`) emits `index, follow` and does
reference the sitemap. Both states were confirmed by building each way.

> `NEXT_PUBLIC_*` values are read at **build time**. Setting them only in the
> runtime environment does nothing — staging must be *rebuilt* with them.

## Layer 3 — HTTP authentication (strongest, but blocks Google too)

CloudPanel: **Sites → [staging site] → Security → Basic Auth**.

Use this only *after* the URLs have been dropped from the index. While auth is
on, Google cannot fetch the page, cannot see `noindex`, and any already-indexed
URL will linger.

---

## Search Console — removing what is already indexed

Staging must be its own property; a production property has no authority over it.

1. **Add the staging property.** Search Console → Add property → Domain or
   URL-prefix for `STAGING_HOST`. Verify by DNS TXT or the HTML meta tag.
2. **Find what is indexed.** Query `site:STAGING_HOST` in Google, and check
   Search Console → *Indexing → Pages → Indexed*. Record the count now — it is
   your progress baseline.
3. **Temporary removal (fast, ~1 day, lasts ~6 months).**
   *Removals → New request → Remove all URLs with this prefix* → `https://STAGING_HOST/`.
   This hides results quickly but **does not deindex**. It is a stopgap that buys
   time while layers 1–2 do the real work.
4. **Let the permanent signal take effect.** With `X-Robots-Tag` and the meta tag
   live and crawling *allowed*, Google will re-crawl and drop each URL. This
   typically takes **2–6 weeks**. Do not add a `Disallow` during this window.
5. **Speed up the important ones.** Use *URL Inspection → Request indexing* on
   the handful of staging URLs that actually rank, so they are re-crawled sooner.
6. **Confirm.** When *Pages → Indexed* reaches zero and `site:STAGING_HOST`
   returns nothing, the removal is complete.
7. **Only now, lock it down.** Enable Basic Auth (layer 3), or leave the
   `Disallow: /` in place permanently.

## Never do these

- Never `Disallow` a URL you are trying to deindex before it has dropped out.
- Never point a staging canonical at production, or vice versa. Staging pages
  must self-canonicalise; the repo does this automatically via `SITE_URL`.
- Never submit a staging sitemap. The staging build omits the reference entirely.
- Never apply `X-Robots-Tag: noindex` to the production vhost. If production
  traffic disappears, check this first.

## Prevention

- Staging deploys must set `NEXT_PUBLIC_SITE_ENV=staging`. Consider failing the
  staging deploy script if the variable is missing.
- Add a post-deploy smoke check to both environments:

```bash
# production must NOT be noindex
curl -s https://aes-designstudio.com/ | grep -q 'content="noindex' && echo "FAIL: production is noindexed"
# staging MUST be noindex
curl -s https://STAGING_HOST/ | grep -q 'content="noindex' || echo "FAIL: staging is indexable"
```
