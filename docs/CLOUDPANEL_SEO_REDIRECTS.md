# CloudPanel / Nginx — canonical origin and redirects

**Review before applying. Nothing here has been applied to production** — this
repository builds static files; it does not manage server configuration.

## Canonical origin

Per `SEO_AUDIT.md` §0.1, the repository's confirmed origin is:

```
https://aes-designstudio.com
```

Decide **one** canonical host and never vary it. The repo currently uses the
apex (no `www`). The brief used `www.` on a different domain. Whichever AES
picks, it must match `NEXT_PUBLIC_SITE_URL`, or every canonical tag on the site
will point at a host that redirects.

## 1. Force HTTPS and one hostname

```nginx
# Redirect http → https, and www → apex, in ONE hop each.
server {
    listen 80;
    server_name aes-designstudio.com www.aes-designstudio.com;
    return 301 https://aes-designstudio.com$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.aes-designstudio.com;
    # ... ssl_certificate directives ...
    return 301 https://aes-designstudio.com$request_uri;
}
```

**Chain check.** `http://www.` must reach `https://aes-designstudio.com` in a
single 301, not two. Verify:

```bash
curl -sIL http://www.aes-designstudio.com/about/ | grep -E "^HTTP|^[Ll]ocation"
```

Expect exactly one `301` then one `200`. Two 301s is a chain — fix it.

## 2. Trailing slashes

The site is built with `trailingSlash: true`, so `/about/` is canonical and
`/about` must redirect to it. Do **not** write a rule that strips slashes — that
would fight the build output and create a loop.

```nginx
location / {
    try_files $uri $uri/ $uri/index.html /404.html;
}
```

## 3. Custom 404

`npm run build` produces `out/404.html` via `scripts/copy-404.mjs`, with full
site chrome.

```nginx
error_page 404 /404.html;
location = /404.html { internal; }
```

Confirm it returns a real `404` status, not `200` — a soft 404 gets indexed.

```bash
curl -sI https://aes-designstudio.com/definitely-not-a-page/ | head -1
# expect: HTTP/2 404
```

## 4. Legacy WordPress URLs — mapping required before writing rules

**This section is deliberately incomplete.** Writing redirects for URLs that were
never verified to exist would create rules that never fire, or worse, shadow
real routes.

To produce the map, AES needs to supply either:

- Search Console → *Indexing → Pages* export from the old property, or
- `site:` search results for the old domain, or
- The old WordPress permalink structure plus a page list.

Then each old URL is mapped to its **closest real equivalent**, one at a time:

| Old URL | New URL | Type |
|---|---|---|
| `/portfolio/<name>/` | `/work/<slug>/` | 301, per project |
| `/services/interior/` | `/services/interior-design/` | 301 |
| `/our-team/` | `/about/` | 301 |
| `/contact-us/` | `/contact/` | 301 |
| *(anything with no equivalent)* | — | **let it 404** |

The last row is the important one. Redirecting unmatched old URLs to the
homepage produces a soft 404: Google treats a mass redirect to an irrelevant
page as a 404 anyway, and it dilutes the homepage. A clean 404 is the correct,
honest answer for content that no longer exists.

Implementation once mapped:

```nginx
# One entry per verified old URL. Exact matches only — no catch-all.
location = /portfolio/ozel/  { return 301 https://aes-designstudio.com/work/ozel/; }
location = /our-team/        { return 301 https://aes-designstudio.com/about/; }
```

For more than ~30 entries, use a `map` block instead so nginx does a single hash
lookup rather than evaluating locations in order.

## 5. Post-deploy verification

```bash
# canonical host resolves 200
curl -sI https://aes-designstudio.com/ | head -1
# unslashed redirects once to slashed
curl -sIL https://aes-designstudio.com/about | grep -E "^HTTP|^[Ll]ocation"
# no redirect loop anywhere
curl -sIL --max-redirs 3 https://aes-designstudio.com/work/ozel/ | head -1
# production is not noindexed
curl -s https://aes-designstudio.com/ | grep -c 'content="noindex'   # expect 0
```
