# Landing-page polish — 2026-09-22

- Repeated the hero's restrained blue glow behind the date challenge, features, reviews and final download section. Decorative gradients do not intercept input or add scrolling motion.
- Updated review labels and five-star presentation at the owner's request and confirmation. Existing quotations remain unchanged. No aggregate rating or store attribution was added.
- Added a local SVG laurel-and-star award mark, inspired by the laurel treatment in the first [App Store screenshot](https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/72/bb/d0/72bbd056-c5b2-89b6-d842-0ddcf4692a66/0_Iphone_English_opaque.png/320x480bb.jpg). The award story and source links remain available by expanding the banner.
- Placed an app-first learning invitation and both store links above the guide heading. It explains that the otter guides teach the method interactively, step by step.
- Updated English, German, French, Spanish and Portuguese, including carousel announcements and accessible star labels.

## Verification

- Build produces all 30 localized pages and localized error pages. Eight existing Node tests pass.
- Browser checks cover the homepage and guide in all five languages at 375, 768 and 1440 pixels: 30 layouts, no horizontal overflow or broken loaded images.
- Visually inspected the desktop award mark, review stars and blue backgrounds, and the mobile guide invitation with both store links. German carousel navigation announces the current review correctly.
- Local SVG responses use `image/svg+xml`; the preview server now declares this MIME type.

Browser measurements and screenshots are retained in `otter-project/otter-landing-page/explore/implementation/polish-v3/`.
