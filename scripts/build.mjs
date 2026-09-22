import { mkdir, readFile, writeFile, readdir, cp, rm } from "node:fs/promises";
import { marked } from "marked";
import { layout, domain } from "./components.mjs";
import { home } from "./home.mjs";
import { guide } from "./guide.mjs";
import { faq } from "./faq.mjs";
const pages = [
  {
    path: "/",
    title: "Otter Day — Calendar Logic Game | Be the Human Calendar",
    description:
      "Turn any date into its weekday. Learn the mental calendar trick with Otter Day: guided tutorials, six levels and a daily logic challenge for iPhone and Android.",
    content: home,
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Otter Day",
      applicationCategory: "GameApplication",
      operatingSystem: "iOS, Android",
      url: domain,
      description:
        "A calendar logic game that teaches mental weekday calculation.",
      award: "1st place, Best Vibes Award, RevenueCat Shipaton 2025",
      sameAs: [
        "https://apps.apple.com/us/app/otterday-calendar-logic-game/id6747994124",
        "https://play.google.com/store/apps/details?id=fpdigitallabs.otter",
      ],
      author: {
        "@type": "Person",
        name: "Felix Plagge",
        url: "https://felixplagge.dev/",
      },
    },
  },
  {
    path: "/guide/",
    title: "How to Find the Weekday of Any Date — Otter Day Guide",
    description:
      "Learn the mental calendar trick with month codes, year codes, leap-year rules and clear examples. A step-by-step guide to calculating weekdays in your head.",
    content: guide,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How to find the weekday of any date",
      author: {
        "@type": "Person",
        name: "Felix Plagge",
        url: "https://felixplagge.dev/",
      },
      image: domain + "/assets/guide-week.webp",
      mainEntityOfPage: domain + "/guide/",
    },
  },
  {
    path: "/faq/",
    title: "Otter Day FAQ — Calendar Trick, Game Modes & More",
    description:
      "Answers about the calendar trick, Doomsday algorithm, Speed Academy, voice play, Otter IQ, streaks, widgets and downloading Otter Day.",
    content: faq,
  },
];
for (const file of await readdir("content/legal")) {
  const raw = await readFile(`content/legal/${file}`, "utf8");
  const title = raw.match(/^title: (.+)$/m)[1];
  const body = raw.replace(/^---[\s\S]*?---\s*/, "");
  pages.push({
    path: `/${file.replace(".md", "")}/`,
    title: `${title} — Otter Day`,
    description: `${title} for Otter Day, by Felix Plagge Digital Labs.`,
    content: `<div class="wrap"><article class="legal"><h1>${title}</h1>${marked.parse(body.replace(/^# Legal Disclosure\s*/, ""))}</article></div>`,
  });
}
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("site", "dist", { recursive: true });
await writeFile(
  "dist/assets/site.css",
  (
    await Promise.all(
      ["base", "home", "features", "content", "responsive", "mobile"].map((name) =>
        readFile(`styles/${name}.css`, "utf8"),
      ),
    )
  ).join("\n"),
);
for (const page of pages) {
  await mkdir(`dist${page.path}`, { recursive: true });
  await writeFile(`dist${page.path}index.html`, layout(page));
}
await writeFile(
  "dist/404.html",
  layout({
    title: "Page not found — Otter Day",
    description: "Find your way back to Otter Day.",
    path: "/404.html",
    noindex: true,
    content:
      '<section class="page-head wrap"><span class="eyebrow">404 / LOST IN TIME</span><h1>This date took<br>a different turn.</h1><p>The page you’re looking for isn’t here.</p><a class="button" href="/">Back to Otter Day →</a></section>',
  }),
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`,
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${domain}${p.path}</loc></url>`).join("")}</urlset>`,
);
console.log(`Built ${pages.length} pages + 404 into dist/.`);
