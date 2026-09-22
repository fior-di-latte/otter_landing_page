# Feature scenes and shorter guide introduction

All six feature illustrations use the same edge-to-edge frame and lower-left Anta heading / Turret Road detail. Existing artwork supplies the background colors through CSS blur; foreground screenshots and art remain sharp. The tutorial keeps the real scrollable-menu screenshot.

The home-widget gallery follows `otter/lib/shared/home_widgets/home_widget_promotion_gallery.dart`: same three rows, motif order and counts, opposing middle-row motion, and B11 foreground widget. Web tiles use the original scene artwork and streak mark with HTML overlays; this is an adaptation, not a screenshot. The existing feature-artwork disclosure remains. Motion runs only in view, respects reduced motion, and has a keyboard-operable pause toggle.

Streak uses the original crystal and 3x filled/outline day marks. Three connected nodes reflect the app’s three-played-day reward cycle in `streak_reward_track.dart` and `streak_policy.dart`; the illustration shows two completed days.

## Assets

- `widget-{motif}.webp`: 15 original app scenes from `otter/assets/home_widgets/scenes/`. Background tiles resized to 256 × 256; B11 foreground retained at 512 × 512. RGB, WebP quality 83, about 146 KB combined.
- `streak-filled-32.webp`, `streak-outline-32.webp`: app `otter/assets/streak/icons/3.0x/` PNGs, converted losslessly, 96 × 96 RGBA, under 1 KB each.
- `academy-scene.webp`: built-in ImageGen edit using the original 192 × 86 Speed Academy icon as reference. A larger faceted amethyst bolt replaces the small numbered diagram. 1050 × 700 RGBA, 73,198 bytes. Original generation retained in `otter-project/otter-landing-page/explore/implementation/feature-scenes-v4/academy-generated.png`. Superseded web icon removed.

ImageGen direction: preserve the purple faceted lightning bolt and short light streak, remove numbered pills and text, use a transparent background, sharp lavender/amethyst surfaces, and restrained cyberpunk lighting. The generated source was inspected at 1536 × 1024 and the web derivative at its rendered size. Widget assets were checked together at 256 px and in desktop/mobile compositions.

## Copy and verification

The guide now opens with “Learn interactively in the app” and both stores, then identifies the written guide. German hero reads “Werde zum menschlichen Kalender”; the learning section reads “Jeden Tag ein bisschen üben. Eine Fähigkeit, die bleibt.” All new copy and accessible labels cover five languages.

Build and all eight Node tests pass. Browser matrix checks 30 home/guide layouts across five languages at 375/768/1440 px, with no document or caption overflow. Mobile and desktop scenes were visually inspected; the gallery pause/resume toggle works with click and Enter. Evidence is retained under `explore/implementation/feature-scenes-v4/` in the app repository.
