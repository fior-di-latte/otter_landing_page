import { mkdir, readFile, writeFile, cp, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { layout, domain } from "./components.mjs";
import { pages } from "./pages.mjs";
import {
  localizedPage,
  localizedPath,
  languages,
  runtime,
} from "./localize.mjs";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("site", "dist", { recursive: true });
await writeFile(
  "dist/assets/site.css",
  (
    await Promise.all(
      [
        "base",
        "home",
        "features",
        "content",
        "responsive",
        "mobile",
        "locales",
        "atmosphere",
        "scenes",
      ].map((name) => readFile(`styles/${name}.css`, "utf8")),
    )
  ).join("\n"),
);
// Bust cached entry points and their module imports together after a deployment.
const modules = ["calendar.js", "language.js", "site.js"];
const scripts = await Promise.all(
  modules.map((name) => readFile(`site/assets/${name}`, "utf8")),
);
const version = createHash("sha256")
  .update(scripts.join("\n") + (await readFile("dist/assets/site.css", "utf8")))
  .digest("hex")
  .slice(0, 12);
for (const [index, name] of modules.entries()) {
  await writeFile(
    `dist/assets/${name}`,
    scripts[index].replace(/from "\.\/(.+?\.js)"/g, `from "./$1?v=${version}"`),
  );
}
const versioned = (html) =>
  html.replace(/(\/assets\/(?:site\.js|site\.css))"/g, `$1?v=${version}"`);
const locales = Object.keys(languages);
for (const locale of locales) {
  for (const page of pages) {
    const path = localizedPath(page.path, locale);
    await mkdir(`dist${path}`, { recursive: true });
    await writeFile(
      `dist${path}index.html`,
      versioned(localizedPage(layout(page), locale, page.path)),
    );
  }
  const m = runtime.en;
  const notFound = layout({
    title: m.missingTitle,
    description: m.missingDescription,
    path: "/404.html",
    noindex: true,
    content: `<section class="page-head wrap"><span class="eyebrow">${m.lost}</span><h1>${m.missingHeading}</h1><p>${m.missingCopy}</p><a class="button" href="/">${m.back}</a></section>`,
  });
  await writeFile(
    `dist${localizedPath("/404.html", locale)}`,
    versioned(localizedPage(notFound, locale, "/404.html", { noindex: true })),
  );
}
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`,
);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${locales.flatMap((locale) => pages.map((p) => `<url><loc>${domain}${localizedPath(p.path, locale)}</loc></url>`)).join("")}</urlset>`,
);
console.log(
  `Built ${pages.length * locales.length} pages + localized 404s into dist/.`,
);
