# Otter Day website

Production: https://www.otterday.app/ — existing Vercel integration. The personal homepage at felixplagge.dev is a separate repository and is not changed.

## Develop

Node.js 22+: `npm ci`, `npm run build`, `npm test`, `npm start`.
Open http://127.0.0.1:8770/. Rebuild and reload after edits.

Static HTML with local fonts and images. JavaScript enhances the date challenge, review carousel and guide checker. No browser framework, analytics or external CDN.

- `scripts/{home,guide,faq}.mjs`: English content.
- `scripts/components.mjs`: shared navigation, downloads, footer, metadata.
- `styles/`: styles concatenated at build time.
- `site/assets/`: app assets, generated illustrations, fonts, browser modules.
- `content/legal/`: existing legal documents, preserved verbatim.
- `scripts/build.mjs`: emits `dist/`, sitemap, robots.txt and 404.
- `test/`: all 146,097 dates in 1700–2099 plus generated-page validation.
- `docs/`: source provenance, SEO and release evidence.

## Deploy

`vercel.json` replaces the legacy Jekyll build with `npm run build`, output `dist`, framework preset disabled. Existing Vercel GitHub integration creates branch previews and deploys production branch `master` to the custom domain. GitHub Actions validates builds and tests; no GitHub Pages workflow is added.

Push branch → inspect Vercel preview and CI → merge to master → verify production homepage, guide, FAQ, legal URLs, sitemap and 404.

Rollback: use Vercel deployment history or revert the merge. Original site remains in Git history at `e836b98482aa78698c780bc194afb9f5ceb88cad`.

## Content rules

Mock reviews are visibly fictional and excluded from rating/review structured data. Replace them with attributable, consented feedback before presenting them as testimonials. Award is verified against RevenueCat; generated billboard image is labelled a recreation. Feature previews refer to the upcoming app version. Five seconds is a training goal; Otter IQ is an in-game score.

Calendar codes use Sunday = 0. The website picker displays Monday first.
