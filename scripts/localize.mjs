import { readFile } from "node:fs/promises";
import { parseHTML } from "linkedom";
import { languages, localizedPath } from "../site/assets/language.js";
import { translationUnits } from "./translation-units.mjs";
import { domain } from "./components.mjs";

export { languages, localizedPath };
export const runtime = JSON.parse(
  await readFile("content/locales/runtime.json", "utf8"),
);
const catalogs = Object.fromEntries(
  await Promise.all(
    Object.keys(languages)
      .filter((l) => l !== "en")
      .map(async (l) => [
        l,
        JSON.parse(await readFile(`content/locales/${l}.json`, "utf8")),
      ]),
  ),
);
for (const [locale, catalog] of Object.entries(catalogs)) {
  for (const key of Object.keys(runtime.en))
    catalog[runtime.en[key]] = runtime[locale][key];
}
const serialize = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

export function localizedPage(html, locale, path, { noindex = false } = {}) {
  const { document } = parseHTML(html);
  if (locale !== "en") {
    for (const unit of translationUnits(document)) {
      if (!Object.hasOwn(catalogs[locale], unit.source))
        throw new Error(`Missing ${locale}: ${unit.source}`);
      unit.set(catalogs[locale][unit.source]);
    }
  }
  document.documentElement.lang = locale;
  for (const link of document.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (href.startsWith("/") && !href.startsWith("//"))
      link.setAttribute("href", localizedPath(href, locale));
    if (href === "mailto:felix.digtallabs@proton.me")
      link.setAttribute("href", "mailto:felix.digitallabs@proton.me");
  }
  const url = domain + localizedPath(path, locale);
  document.querySelector("[rel=canonical]").href = url;
  document.querySelector('[property="og:url"]').content = url;
  const localeMeta = document.createElement("meta");
  localeMeta.setAttribute("property", "og:locale");
  localeMeta.content = runtime[locale].locale.replace("-", "_");
  document.head.append(localeMeta);
  if (!noindex) {
    for (const alternate of [...Object.keys(languages), "x-default"]) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = alternate;
      link.href =
        domain +
        localizedPath(path, alternate === "x-default" ? "en" : alternate);
      document.head.append(link);
    }
  }
  const structured = document.querySelector('[type="application/ld+json"]');
  if (structured) {
    const schema = JSON.parse(structured.textContent);
    schema.inLanguage = locale;
    if (schema.url) schema.url = url;
    if (schema.mainEntityOfPage) schema.mainEntityOfPage = url;
    if (schema.headline) {
      const heading = document.querySelector("h1").cloneNode(true);
      heading.querySelectorAll("br").forEach((br) => br.replaceWith(" "));
      schema.headline = heading.textContent;
    }
    if (schema.award && locale !== "en")
      schema.award =
        catalogs[locale]["1st place · Best Vibes"] +
        ", RevenueCat Shipaton 2025";
    schema.description = document.querySelector("[name=description]").content;
    structured.textContent = serialize(schema);
  }
  const menu = document.createElement("details");
  menu.className = "language-menu";
  menu.innerHTML = `<summary aria-label="${runtime[locale].language}: ${languages[locale]}"><span aria-hidden="true">◎</span> ${locale.toUpperCase()} <span aria-hidden="true">⌄</span></summary><nav aria-label="${runtime[locale].language}">${Object.entries(
    languages,
  )
    .map(
      ([code, name]) =>
        `<a href="${localizedPath(path, code)}${code === "en" ? "?lang=en" : ""}" lang="${code}" hreflang="${code}" data-language="${code}"${code === locale ? ' aria-current="true"' : ""}>${name}<span aria-hidden="true">${code === locale ? "✓" : ""}</span></a>`,
    )
    .join("")}</nav>`;
  document.querySelector("header.nav").append(menu);
  const messages = document.createElement("script");
  messages.type = "application/json";
  messages.id = "site-messages";
  messages.textContent = serialize(runtime[locale]);
  document.head.append(messages);
  return "<!doctype html>\n" + document.documentElement.outerHTML;
}
