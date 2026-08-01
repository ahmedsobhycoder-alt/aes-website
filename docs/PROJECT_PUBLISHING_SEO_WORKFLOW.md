# Publishing a project — what has to happen for it to be indexable

## The constraint

`next.config.mjs` sets `output: "export"`. There is no server at runtime. **A
page exists only if it was generated during a build.** Publishing a project in
an admin panel does not create a URL; a rebuild does.

Anything that hides this from an editor causes the same failure every time: the
project looks live in the admin, the public URL 404s, and nobody notices for
weeks.

## Current state (accurate as of this commit)

```
src/data/projects.ts  →  generateStaticParams()  →  out/work/<slug>/index.html
```

All 19 projects are statically imported and **fully present in the exported
HTML** — title, category, challenge/approach/outcome, gallery, JSON-LD, internal
links. Nothing SEO-critical is client-fetched.

The Express API is **not** part of this pipeline. It is built but not deployed,
and Atlas connectivity is unverified.

So the outcome Phase 8 asks for — SEO content in static HTML, not behind JS — is
already met. What is **not** built is the admin → API → build chain below.

## Target workflow

```
1. Editor publishes a project in the admin
2. Project becomes available at GET /api/public/projects  (status: published only)
3. A production build is triggered
4. Build fetches published projects, validates, generates /work/<slug>/
5. sitemap.xml regenerates from the same data
6. Deploy completes
7. Indexing requested in Search Console
```

Steps 2–4 do not exist yet. Until they do, adding a project means editing
`src/data/projects.ts` and rebuilding — which is what happened for
`engineers-apartment`.

## Implementation notes for when the API is live

**Fetch at build time, in `generateStaticParams` / the data module — never in a
client component.**

Requirements the implementation must meet:

1. **Filter server-side to `status: "published"`.** Draft and archived projects
   must never reach the build. Do not filter in the client.
2. **Validate every record before use.** A project missing a slug, title or
   cover must be skipped with a loud log line, not rendered half-broken.
3. **Reject unsafe slugs.** Accept `^[a-z0-9-]+$` only; anything else could
   escape the output directory.
4. **Fall back to `src/data/projects.ts` if the API is unreachable**, and log
   clearly:
   `[build] WARNING: project API unreachable — using src/data fallback (19 projects)`
   A silent fallback that quietly ships stale content is worse than a failure.
5. **Fail the build if the API returns zero projects** while the fallback also
   has none. An empty `/work` is a worse outcome than a failed deploy.
6. **Never use a query URL as the canonical project URL.** `/work/project?slug=x`
   is not indexable as a distinct page. Clean static paths only.

## Deployment hook (optional)

If a rebuild can be triggered automatically, use a **server-only** variable —
never `NEXT_PUBLIC_`:

```
DEPLOY_HOOK_URL=      # server-side only; must never reach the browser bundle
```

The backend POSTs to it after a publish/unpublish. Rules:

- The hook URL is a credential. Keep it out of the repo and out of logs.
- The API must never execute shell commands to build. It calls a webhook; the
  build runs elsewhere.
- Debounce. Ten edits in a minute should trigger one build, not ten.

## If there is no hook

Do not let the admin imply a project is live when it is not. Show an explicit
state, e.g.:

> **Published — awaiting site rebuild.** This project will appear at
> `/work/<slug>/` after the next production deploy.

and surface the last successful build time so an editor can tell whether their
change shipped.

## After every deploy

1. Confirm the page exists: `curl -sI https://aes-designstudio.com/work/<slug>/ | head -1` → `200`
2. Confirm it is in the sitemap.
3. Search Console → URL Inspection → **Request indexing**.
4. Check the rendered HTML actually contains the project copy (View Source, not
   DevTools — Source shows what the crawler receives).
