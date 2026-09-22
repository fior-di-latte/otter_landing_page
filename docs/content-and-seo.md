# Content, assets and search intent

Reviewed 2026-09-22. Original copy, except preserved legal documents.

## Sources

- [App Store](https://apps.apple.com/us/app/otterday-calendar-logic-game/id6747994124): Calendar Logic Game, weekday calculation, guided tutorials, audio/voice, languages.
- [Google Play](https://play.google.com/store/apps/details?id=fpdigitallabs.otter): core positioning, free download and in-app purchases.
- [RevenueCat](https://www.revenuecat.com/blog/company/shipaton-2025-winners/#best-vibes-award): first place, Best Vibes, Shipaton 2025.
- [Felix’s account](https://felixplagge.dev/#/about/otter): surprise win, New York trip, The One billboard, creative AI for art, animation and voices. Do not claim this meant the app was vibe-coded.
- App repository `otter/lib/shared/entities/date.dart`: authoritative Gregorian day/month/year/century code convention. Independently tested against UTC weekdays for every date in 1700–2099.
- Current app runtime: six levels, 1700–2099 in level 6; audio and voice labelled Pro.

## Search intent

Qualitative targets from product language and intent, not measured search volumes.

| Page      | Intent            | Natural phrases                                                                                                         |
| --------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `/`       | Discover/download | calendar logic game, weekday game, human calendar, mental maths game, date guessing game                                |
| `/guide/` | Learn method      | how to find weekday of any date, calendar trick, calculate day of week mentally, month codes, year codes, leap years    |
| `/faq/`   | Resolve questions | Otter Day, Doomsday algorithm comparison, Speed Academy, voice input, audio challenges, Otter IQ, streaks, home widgets |

Technical SEO: static crawlable HTML, one H1, unique titles/descriptions, canonicals, sitemap, robots, internal links, image alt text, social metadata, SoftwareApplication and Article JSON-LD. No fabricated aggregate ratings, keyword stuffing or promises of rich results.

## Asset provenance

| Asset            | Source                                                                       |
| ---------------- | ---------------------------------------------------------------------------- |
| icon, touch icon | `otter/assets/app/app_icon_launcher.png`                                     |
| gameplay         | Actual English 750×1334 screenshot, existing iPhone SE debug app, 2026-09-22 |
| tutorial-menu    | Actual English screenshot of scrollable Learning menu, same device/session   |
| academy-mark     | `otter/assets/tutorial/standalone_exercises/speed_academy.png`               |
| liv              | `otter/assets/onboarding/liv_whisper.webp`                                   |
| core             | `otter/assets/streak/posters/normal_poster.png`                              |
| observatory      | `otter/assets/achievements/otter_iq_observatory_hero.webp`                   |
| widget           | `otter/assets/home_widgets/scenes/a11.webp`                                  |
| widget-mark      | `otter/assets/home_widgets/marks/streak.png`                                 |
| font-0/1/2       | Anta Regular, Turret Road Medium/Bold; licenses included                     |
| times-square     | Built-in ImageGen recreation based on user photo; visibly labelled           |
| guide-week       | Built-in ImageGen, app observatory reference; seven nodes checked visually   |

Level chart, formulas and widget composition are HTML/CSS illustrations. Source generation images, app screenshots and browser evidence remain in the app repo under `otter-landing-page/explore/implementation/`.

## ImageGen prompts

Built-in tool used, no CLI/API fallback.

Billboard: photorealistic editorial recreation of user’s Times Square photo. Landscape 3:2, frontal tall turquoise billboard with parallel vertical edges, no foreground selfie person; distant pedestrians, one taxi, wet reflections. Smartphone with cyberpunk otter, exact headline Learn the “date trick”, small app icon. Charcoal night, teal light, restrained surrounding ads. No invented award text or watermark.

Guide: realistic otter tutor on right of quiet dark observatory; simple circular instrument on left with exactly seven illuminated glass nodes. Reference: app Otter IQ observatory. Photorealistic fur, futuristic charcoal clothing, icy-blue edge light, warm eyes. No numbers, pseudo-writing, busy HUD, logos or watermark. Accurate calculations live in accessible HTML, not generated image text.
