# AES — Ayman Ehab Studio

Website for AES, an art-direction and interior-design studio based in Cairo.

Built with Next.js (App Router), Tailwind CSS, and Framer Motion. The whole
site is statically generated, so it deploys as plain static files to any web root.

## Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
NEXT_PUBLIC_SITE_URL=https://aes-designstudio.com npm run build
```

This outputs a static site to the `out/` folder.

## Deploy

Upload the contents of `out/` to the site's web root (e.g. `htdocs/aes-designstudio.com/`):

```bash
cp -r out/* /path/to/htdocs/aes-designstudio.com/
```

No Node server is required in production — it's static HTML, CSS, JS, and images.

## Structure

- `src/app` — routes (App Router)
- `src/components` — UI + page components
- `src/data` — site content (projects, blog, services, SEO)
- `public/projects` — project imagery
