import { readFile, readdir } from "node:fs/promises";
import { marked } from "marked";
import { domain } from "./components.mjs";
import { home } from "./home.mjs";
import { guide } from "./guide.mjs";
import { faq } from "./faq.mjs";
export const pages = [
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
