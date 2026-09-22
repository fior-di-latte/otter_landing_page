# Release verification — 2026-09-22

- Build: six static pages plus 404, sitemap and robots.
- Tests: all 146,097 Gregorian dates in 1700–2099 match the independent UTC calendar; worked examples and invalid leap days checked.
- Generated page checks: single H1, descriptive metadata, canonical URL, all local links/assets/fragments resolve, JSON-LD parses, six features, Monday-first weekday order, disclosed mocks without review/rating schema.
- Browser: 1440, 768 and 375px layouts inspected. Mobile orbit overflow found and fixed; document width stays within viewport.
- Interaction: wrong answer reveals Liv; correct answer reveals learning promise; compact Download now scrolls to top and focuses App Store link. Next date resets state. Text-only hints, no microphone or audio access.
- Review carousel: arrow click and Enter work; native horizontal scrolling remains available.
- Guide: mobile tables checked; checker for 2000-02-29 gives Tuesday. FAQ input/output accordion expands correctly.
- Award: expanded image inspected; RevenueCat and creator-story links present, AI recreation caption visible.
- Degraded state: review fixture with website module omitted retains content/downloads and shows JavaScript explanation; unavailable controls disabled. Fixture is excluded from build.
- Accessibility: semantic headings, tables, native disclosure controls, live result messages, skip link and visible keyboard focus. Reduced-motion rules disable entrance/page transitions; script respects reduced-motion preference. No autoplay carousel.
- Asset QA: real 750×1334 screenshots inspected at source and rendered sizes; academy icon displayed at native 192px; transparent crystal/Liv retained. ImageGen ring checked for seven nodes. Local font licenses included.

Reference, manifest and visual artifacts: `/Users/felixplagge/code/otter-project/otter-landing-page/explore/implementation/`.

Production deployment result is recorded separately after Vercel finishes.
