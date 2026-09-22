import { image } from "./components.mjs";
const backdrop = (asset, blur = true) =>
  image(asset, "", `scene-backdrop${blur ? " scene-blur" : ""}`);
const caption = (title, detail) =>
  `<div class="scene-caption"><strong>${title}</strong><span>${detail}</span></div>`;
const scene = (kind, content, title, detail) =>
  `<div class="feature-scene scene-${kind}">${content}${caption(title, detail)}</div>`;
export const tutorialScene = scene(
  "tutorial",
  `${backdrop("tutorial-menu")}<div class="scene-phone">${image("tutorial-menu", "The real tutorial menu: a scrollable learning path with Basics, Advanced and Exam, plus standalone exercises", "", false, 750, 1334)}</div>`,
  "Guided tutorials",
  "Meet the method.",
);
export const levelScene = scene(
  "levels",
  `${backdrop("observatory")}<div class="level-map" role="img" aria-label="Six levels expand from this year to 1700 through 2099"><div class="level-bars">${[1, 2, 3, 4, 5, 6].map((n) => `<div><i style="--level:${n}"></i><span>${n}</span></div>`).join("")}</div><div class="range"><span><small>LEVEL 1</small>This year</span><span><small>LEVEL 6</small>1700–2099</span></div></div>`,
  "Six levels",
  "YOUR TIME WINDOW GROWS",
);
export const academyScene = scene(
  "academy",
  `${backdrop("academy-scene")}<div class="academy-symbol">${image("academy-scene", "", "", false, 1050, 700)}</div>`,
  "Speed Academy",
  "Small shortcuts. Quicker thinking.",
);
export const streakScene = scene(
  "streak",
  `${backdrop("core")}<div class="streak-core">${image("core", "The glowing otter crystal at the heart of your daily streak", "", false, 720, 720)}</div><div class="streak-days" role="img" aria-label="Daily streak progress: two of three days completed">${[true, true, false].map((done) => image(done ? "streak-filled-32" : "streak-outline-32", "", "", false, 96, 96)).join("")}</div>`,
  "Daily streaks",
  "ONE DAY AT A TIME",
);
export const iqScene = scene(
  "iq",
  backdrop("observatory", false),
  "OTTER IQ",
  "YOUR PROGRESS, MADE VISIBLE",
);
// Same three rows, motif order and counts as the app's HomeWidgetPromotionSheet.
const rows = [
  [
    ["b04", 7],
    ["a14", 24],
    ["b11", 12],
    ["b09", 2],
    ["a01", 19],
    ["f01", 30],
  ],
  [
    ["b01", 12],
    ["a03", 7],
    ["b02", 7],
    ["a13", 2],
    ["b25", 14],
    ["f03", 21],
  ],
  [
    ["a12", 24],
    ["b04", 2],
    ["a11", 12],
    ["a14", 30],
    ["b03", 7],
    ["f01", 42],
  ],
];
const tile = ([motif, count], featured = false) =>
  `<div class="widget-tile${featured ? " widget-featured" : ""}">${image(`widget-${motif}`, "", "", false, featured ? 512 : 256, featured ? 512 : 256)}<div class="widget-tile-copy">${image("widget-mark", "", "", false, 256, 256)}<b>${count}</b>${featured ? "<span>You’re growing.</span>" : ""}</div></div>`;
export const widgetScene = scene(
  "widgets",
  `${backdrop("widget")}<div class="widget-gallery" aria-hidden="true">${rows.map((row, i) => `<div class="widget-row" style="--row:${i}"><div class="widget-cycle">${row.map((item) => tile(item)).join("")}</div><div class="widget-cycle">${row.map((item) => tile(item)).join("")}</div></div>`).join("")}</div><div aria-hidden="true">${tile(["b11", 2], true)}</div><button class="scene-motion" type="button" data-scene-motion aria-label="Pause widget animation" aria-pressed="false" hidden><span aria-hidden="true">Ⅱ</span></button>`,
  "Home widgets",
  "Your otter. Always with you.",
);
