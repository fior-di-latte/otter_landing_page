# Localization and billboard revision — 2026-09-22

The website now covers the app's five locales: English, German, French, Spanish and Portuguese. Each locale has a static homepage, guide, FAQ, legal disclosure, privacy policy and terms page, plus a localized 404 document. English retains the existing URLs; other languages use `/de/`, `/fr/`, `/es/` and `/pt/` prefixes.

## Language behavior

- On the neutral homepage, an explicit `?lang=` choice wins, then the saved language, then the first supported browser language. Unsupported languages fall back to English. Regional variants such as `fr-CA` and `pt-PT` resolve to their supported base language.
- Explicit localized paths and deep links are stable. They do not redirect based on browser preference.
- The header language menu uses real links and works without JavaScript. With JavaScript it also remembers the choice locally and preserves the current section. English links include `?lang=en` so they work even when browser storage is blocked.
- Portuguese copy and date formatting use Brazilian Portuguese. Language navigation uses the base `pt` code.
- Every indexable page has its own canonical URL, five reciprocal `hreflang` links and an `x-default`. Sitemap contains all 30 pages. Page titles, descriptions, image descriptions, accessible labels and structured-data descriptions are localized.
- The genuine app screenshots retain their English UI. Every homepage explicitly identifies them as screenshots of the upcoming English version. Brand names and the historical billboard advertisement remain unchanged.

## Maintaining translations

English templates remain in `scripts/`. `scripts/localize.mjs` translates complete prose blocks at build time, retaining emphasis and links, then localizes internal URLs. Four source-keyed catalogs live in `content/locales/`; a missing translation fails the build rather than falling back silently. Runtime game, calculator, carousel and error-page messages are in `runtime.json`.

The original English legal Markdown is preserved. Translations retain its substantive content and dates. The rendered privacy-policy contact link fixes the original `digtallabs` mailto typo to match the visible `digitallabs` address. Browser language preference is stored only in `localStorage`; no language service or tracking request is introduced.

## Game feedback

Each round starts unassisted. Asking Liv or giving a wrong answer reveals her text hint and marks the round assisted. A correct answer then displays the localized joke and learning promise. In German: “Na gut, das war vorgesagt. Aber du kannst es auch lernen.” A correct answer without help gets separate encouragement. Starting the next round resets the state. Monday remains the first button; Sunday retains calculation code zero. No audio is used.

## Billboard

`site/assets/times-square-v2.webp` replaces the previous recreation. Built-in ImageGen was used to edit it, not an external image API. The scene shows a frontal One Times Square-inspired tower, the turquoise Otter Day advertisement, a digital clock reading 20:25 and the rooftop New Year's ball. The fabricated police department sign is removed. The visible caption continues to identify the scene as an AI recreation, not documentary photography.

Generated source: `otter-project/otter-landing-page/explore/implementation/times-square-v2-generated.png`. Web asset: opaque RGB, 1536 × 1024, 316,028 bytes. Inspected at source resolution and in the expanded award banner. Earlier originals remain in `explore/implementation/`.

Final built-in prompt:

> Edit target: supplied Times Square Otter Day billboard recreation. Correct the LOCATION and building architecture: recognizable ONE TIMES SQUARE, the famous narrow tower with the New Year's Eve ball and digital clock above THE ONE giant vertical screen. Front-on clean editorial night photograph, landscape 1536x1024. Pull camera back enough to show the COMPLETE TOP of the tower, ball mast and sparkling spherical New Year's ball ABOVE the billboard, with a clear horizontal digital clock reading 20:25 underneath the ball and above the advertising screen. It is an ordinary evening, NOT a midnight celebration, no countdown, no year numerals, no confetti. Giant tall turquoise Otter Day screen remains central and dominant: preserve cyberpunk otter in a smartphone, white text Learn the “date trick”, small Otter Day app icon. Correct street level to ordinary architectural base, dark subdued storefront windows. Completely remove New York Police Dept, NYPD, police signs, police building and police booth anywhere in image. No prominent invented institution names. Recognizable narrow One Times Square billboard facade with surrounding Times Square towers receding on either side, wet pavement subtle reflections, few small pedestrians, no portrait in foreground. Premium natural photography not fantastical architecture. Keep turquoise light and readable uncluttered ad. The clock and rooftop ball must be clearly visible within frame with breathing space.

Architectural context: [One Times Square](https://onetimessquare.com/) and [Times Square Ball history](https://www.timessquarenyc.org/nye/nye-history-times-square-ball).

## Verification

- Eight Node tests pass, including the existing exhaustive 146,097-date Gregorian check; preference precedence, regional language matching, stable deep links, local link targets, all 30 canonical/alternate sets, translated tables and Monday-first buttons.
- Browser layout matrix: all five languages × homepage/guide/FAQ × 375/768/1440 px. No horizontal document overflow. Screenshots and measurements saved under `otter-project/otter-landing-page/explore/implementation/localization-v2/`.
- Browser interactions: explicit hint then correct answer and next-round unassisted success in all five languages; wrong answer → Liv → corrected answer in German; next-round hint reset; download link returns focus to the first store button; French leap-day calculator returns Thursday; switching language preserves the guide section; saved French choice restores on the neutral homepage; menu keyboard activation and Escape focus return.
- Rapid cross-document navigation occasionally produces WebKit view-transition cancellation messages. No application JavaScript failure occurred. Reduced-motion rules remain in force.
- CSS and JavaScript entry points and module imports now carry content-based cache versions so returning visitors receive the new locale behavior after deployment.

Vercel remains the deployment target. The personal homepage and its GitHub Pages configuration are untouched.
