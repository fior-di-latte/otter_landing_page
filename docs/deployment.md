# Production release — 2026-09-22

- PR: https://github.com/fior-di-latte/otter_landing_page/pull/1 (merged).
- Implementation commit: `5eedc5d5a8c3e3e8ba6b1cda7a92e4e9da48765b`.
- Merge: `3c6c0187ff4e32dc955ecc02b14be84763004165`.
- Vercel project: `fiordilattes-projects/otter-landing-page-teoi`.
- Successful production deployment: https://otter-landing-page-teoi-hezertjgn-fiordilattes-projects.vercel.app
- Custom domain verified: https://www.otterday.app/; apex redirects to www.
- Homepage, guide, FAQ, three legal URLs, sitemap, robots and browser module return HTTP 200 from Vercel. Unknown URL returns the custom 404 with HTTP 404.
- Public browser check: new hero, real gameplay image, local fonts and interactive date challenge load. Correct Sunday answer succeeds. Guide illustration and calculator load. No application console errors (prior Vercel login page emitted unrelated Google sign-in warnings).
- Preview was built successfully but protected by Vercel authentication; visual QA used local build, then the public production domain.
- Legacy GitHub Pages was disabled only for `otter_landing_page`. An already queued legacy Pages deploy consequently failed; it is obsolete and will not run for subsequent commits. Website CI and Vercel succeeded. No checks were bypassed.
- Personal homepage `fior-di-latte.github.io` remains built with CNAME `felixplagge.dev` and was not modified.

Visual evidence and HTTP results are saved in the app repository at `otter-landing-page/explore/implementation/`. Documentation-only follow-up commits do not change the generated site.
