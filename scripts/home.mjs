import { image, stores, download } from "./components.mjs";
const feature = (number, category, title, copy, visual, link = "") =>
  `<article class="feature reveal"><div class="feature-visual">${visual}</div><div class="feature-copy"><span class="eyebrow">${number} / ${category}</span><h3>${title}</h3><p>${copy}</p>${link}</div></article>`;
const levels = `<div class="level-map" role="img" aria-label="Six levels expand from this year to 1700 through 2099"><span class="eyebrow">YOUR TIME WINDOW GROWS</span><div class="level-bars">${[1, 2, 3, 4, 5, 6].map((n) => `<div><i style="--level:${n}"></i><span>${n}</span></div>`).join("")}</div><div class="range"><span><small>LEVEL 1</small>This year</span><span><small>LEVEL 6</small>1700–2099</span></div></div>`;
const reviews = [
  [
    "“A tiny daily puzzle with a very satisfying light-bulb moment.”",
    "Alex · example player",
  ],
  [
    "“I came for the otters. I stayed for the calendar trick.”",
    "Sam · example player",
  ],
  [
    "“The kind of skill you immediately want to try on your friends.”",
    "Robin · example player",
  ],
];
export const home = `
<div class="wrap"><details class="award-banner" id="award"><summary><span class="award-mark" aria-hidden="true">✧</span><span><strong>SHIPATON 2025 WINNER</strong><span>1st place · Best Vibes</span></span><span class="award-more">The story <b aria-hidden="true">↗</b></span></summary><div class="award-story"><figure>${image("times-square", "AI recreation of the turquoise Otter Day billboard in Times Square, viewed straight on", "", false, 1536, 1024)}<figcaption>Times Square, reimagined with AI from Felix’s original photograph.</figcaption></figure><div><span class="eyebrow">A LITTLE GAME. A BIG MOMENT.</span><h2>From a date trick<br>to Times Square.</h2><p>Otter Day took first place in the Best Vibes category at RevenueCat’s Shipaton 2025, celebrating creative use of AI tools.</p><p>For creator Felix, a surprise win email became a last-minute trip to New York, a trophy, and seeing his app on “The One” billboard. His story is about using AI for art, animations and voices while shaping a game of his own.</p><a class="text-link" href="https://www.revenuecat.com/blog/company/shipaton-2025-winners/#best-vibes-award">The official winners, on RevenueCat ↗</a><a class="text-link" href="https://felixplagge.dev/#/about/otter">Felix’s thoughts on the win ↗</a></div></div></details></div>
<section class="hero wrap"><div class="hero-copy"><p class="eyebrow">A LOGIC GAME FOR CURIOUS MINDS</p><h1>Be the<br><span>Human</span><br>Calendar.</h1><p class="lead">Turn any date into its weekday.<br>Learn to work it out in your head.</p><div id="hero-download">${stores}</div><p class="fine">Free to download · iPhone &amp; Android · In-app purchases</p><a class="text-link hero-try" href="#try">Try your first date right here <span aria-hidden="true">↓</span></a></div><div class="hero-product"><div class="orbit orbit-one" aria-hidden="true"></div><div class="orbit orbit-two" aria-hidden="true"></div><div class="phone">${image("gameplay", "Otter Day gameplay: a date challenge above a seven-day answer wheel", "", true, 750, 1334)}</div><span class="product-caption">ONE DATE. SEVEN POSSIBILITIES.</span></div></section>
<section class="try-section wrap section" id="try"><div class="section-intro"><span class="eyebrow">TRY A DATE</span><h2>Every date<br>has its day.</h2><p>Pick a weekday. Liv can help.</p></div><section class="demo" data-game aria-label="Try a weekday challenge"><div class="demo-top"><span class="eyebrow">WHICH WEEKDAY?</span><span data-round>01 / 06</span></div><div class="demo-question"><p>Which weekday is</p><h3 data-date>July 20, 1969</h3><span aria-hidden="true">?</span></div><div class="hint-request"><span>Need a hint?</span><button type="button" data-ask disabled aria-controls="liv" aria-expanded="false">Ask Liv <span aria-hidden="true">✧</span></button></div><div class="liv-hint" id="liv" data-liv hidden>${image("liv", "Liv, your otter guide", "", false, 512, 479)}<div><span class="eyebrow">A LITTLE HELP FROM LIV</span><p data-hint role="status"></p></div></div><fieldset class="weekdays"><legend class="sr-only">Choose a weekday</legend>${[
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
  [0, "Sunday"],
]
  .map(
    ([i, d]) =>
      `<button type="button" data-day="${i}" aria-label="${d}" disabled>${d.slice(0, 3)}</button>`,
  )
  .join(
    "",
  )}</fieldset><div class="demo-bottom"><p data-feedback role="status">Pick a weekday. Ask Liv if you need help.</p><button type="button" data-next disabled>Next date →</button></div><div class="learning-promise" data-learning-promise hidden><span class="eyebrow">MAKE IT A SKILL</span><h4>Now learn to do it for any date.</h4><p>Otter Day teaches you the method, step by step.</p><a class="button download-now" href="#top">Download now <span aria-hidden="true">↑</span></a></div><noscript><p>Enable JavaScript to play, or <a href="/guide/">learn the calendar trick in our guide</a>.</p></noscript></section></section>
<section class="features wrap section" id="learn"><div class="section-heading reveal"><span class="eyebrow">LEARN. PLAY. KEEP GOING.</span><h2>A little every day.<br>A skill that stays.</h2><p>A skill you can learn. A game you want to play.</p></div>
${feature("01", "GUIDED TUTORIALS", "Meet the method.", "Follow your otter guides through the calendar trick. Small steps, clear examples, and practice that clicks.", `<div class="feature-phone">${image("tutorial-menu", "The real tutorial menu: a scrollable learning path with Basics, Advanced and Exam, plus standalone exercises", "", false, 750, 1334)}</div>`, `<a class="text-link" href="/guide/">Explore the method <span aria-hidden="true">↗</span></a>`)}
${feature("02", "SIX LEVELS", "Make it second nature.", "Play through ever-wider date ranges. Start with this year; reach from 1700 to 2099 in Level 6.", levels)}
${feature("03", "SPEED ACADEMY", "Put it all together.", "Build better shortcuts in Speed Academy. With practice, work toward a weekday in five seconds.", `<div class="academy-art">${image("academy-mark", "", "", false, 192, 86)}<strong>Speed Academy</strong><span>Small shortcuts. Quicker thinking.</span></div>`)}
${feature("04", "DAILY STREAKS", "Keep your spark alive.", "A little practice goes a long way. Return each day and keep your otter crystal glowing.", `<div class="crystal-art">${image("core", "The glowing otter crystal at the heart of your daily streak")}<span class="eyebrow">ONE DAY AT A TIME</span></div>`)}
${feature("05", "OTTER IQ", "See how far you’ve come.", "Your in-game progress score, built as you learn and play. A record of your calendar skills — not a real-world IQ test.", `<div class="iq-art">${image("observatory", "Otter guide in the calendar mastery observatory", "", false, 862, 600)}<span>OTTER IQ<small>YOUR PROGRESS, MADE VISIBLE</small></span></div>`)}
${feature("06", "HOME WIDGETS", "Your otter. Always with you.", "Keep a little Otter Day on your home screen. Your streak and your companion, one glance away.", `<div class="widget-art">${image("widget", "Otter resting beside softly glowing plants", "", false, 768, 768)}<div>${image("widget-mark", "", "", false, 256, 256)}<strong>2</strong><span>You’re growing.</span></div></div>`)}
<p class="fine feature-note">App screenshots show the upcoming version. Feature artwork illustrates the experience.</p></section>
<section class="reviews section wrap" aria-labelledby="review-heading" aria-roledescription="carousel"><div class="review-heading"><div><span class="eyebrow">THE PLAYER PERSPECTIVE</span><h2 id="review-heading">A little curiosity.<br>A new daily ritual.</h2><p class="fine">Sample reviews · Fictional examples, not customer testimonials.</p></div><div class="carousel-controls"><button type="button" data-review-prev disabled aria-label="Previous sample review" aria-controls="review-track">←</button><button type="button" data-review-next disabled aria-label="Next sample review" aria-controls="review-track">→</button></div></div><div class="review-track" id="review-track" tabindex="0" aria-label="Sample reviews; scroll to browse">${reviews.map(([q, a], i) => `<figure class="review" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${reviews.length}"><span class="eyebrow">MOCK REVIEW / ${String(i + 1).padStart(2, "0")}</span><blockquote>${q}</blockquote><figcaption>${a}</figcaption></figure>`).join("")}</div><p class="sr-only" data-review-status role="status"></p></section>
<section class="guide-teaser wrap section reveal"><div><span class="eyebrow">NO MAGIC. A METHOD.</span><h2>You can learn<br>to think like this.</h2><p>Three small codes. One weekday.<br>See how the calendar trick works.</p><a class="button" href="/guide/">Read the guide <span aria-hidden="true">↗</span></a><a class="text-link" href="/faq/">Questions? Start here →</a></div>${image("guide-week", "An otter tutor studies a seven-node ring representing the days of the week", "", false, 1200, 800)}</section>
${download}`;
