export const domain = "https://www.otterday.app";
export const stores = `<div class="stores"><a class="store" href="https://apps.apple.com/us/app/otterday-calendar-logic-game/id6747994124" aria-label="Download Otter Day on the App Store"><span class="store-icon" aria-hidden="true">↓</span><span><small>Download on the</small><strong>App Store</strong></span><span aria-hidden="true">↗</span></a><a class="store" href="https://play.google.com/store/apps/details?id=fpdigitallabs.otter" aria-label="Get Otter Day on Google Play"><span class="store-icon" aria-hidden="true">▷</span><span><small>Get it on</small><strong>Google Play</strong></span><span aria-hidden="true">↗</span></a></div>`;
export function image(
  name,
  alt = "",
  cls = "",
  eager = false,
  width = 750,
  height = 750,
) {
  return `<img src="/assets/${name}.webp" alt="${alt}" class="${cls}" width="${width}" height="${height}" loading="${eager ? "eager" : "lazy"}" decoding="async"${eager ? ' fetchpriority="high"' : ""}>`;
}
export const nav = `<a class="skip" href="#main">Skip to content</a><header class="nav wrap"><a class="wordmark" href="/">${image("icon", "", "", true, 40, 40)}<span>OTTER DAY</span></a><nav aria-label="Main navigation"><a href="/#learn">The method</a><a href="/guide/">Guide</a><a href="/faq/">FAQ</a></nav><a class="nav-cta" href="/#download">Get the app <span aria-hidden="true">↗</span></a></header>`;
export const footer = `<footer class="footer wrap"><div><a class="wordmark" href="/">OTTER DAY</a><p>A curious mind goes a long way.<br>Made by <a href="https://felixplagge.dev/">Felix Plagge</a> in Cologne.</p></div><nav aria-label="Footer"><a href="/guide/">Calendar guide</a><a href="/faq/">FAQ</a><a href="/legal_disclosure/">Legal disclosure</a><a href="/privacypolicy/">Privacy policy</a><a href="/terms_of_use/">Terms &amp; conditions</a><a href="mailto:felix.digitallabs@proton.me">Say hello ↗</a></nav></footer>`;
export const download = `<section class="download wrap" id="download"><span class="eyebrow">FOR IPHONE &amp; ANDROID</span><h2>Your next daily challenge.</h2><p>Learn the method. Play with dates.</p>${stores}<p class="fine">Free to download · In-app purchases</p></section>`;
export function layout({
  title,
  description,
  path = "/",
  content,
  schema,
  noindex = false,
}) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="${domain}${path}"><meta name="theme-color" content="#07090b">${noindex ? '<meta name="robots" content="noindex">' : ""}<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${domain}${path}"><meta property="og:image" content="${domain}/assets/guide-week.webp"><meta property="og:image:alt" content="Otter Day guide: an otter studies the seven-day week"><meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/assets/icon.webp"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/assets/site.css"><script type="module" src="/assets/site.js"></script>${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>` : ""}</head><body id="top">${nav}<main id="main">${content}</main>${footer}</body></html>`;
}
