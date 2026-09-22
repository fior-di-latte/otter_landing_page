import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseHTML } from "linkedom";
import {
  languages,
  preferredLanguage,
  localizedPath,
  initialDestination,
} from "../site/assets/language.js";
import { pages } from "../scripts/pages.mjs";

test("language detection respects preference order, regional tags and explicit choice", () => {
  assert.equal(preferredLanguage(["ja-JP", "pt-PT", "en-US"]), "pt");
  assert.equal(preferredLanguage(["FR-ca", "de"]), "fr");
  assert.equal(preferredLanguage(["zh"]), "en");
  assert.equal(
    initialDestination({ pathname: "/", preferences: ["de-DE"] }),
    "/de/",
  );
  assert.equal(
    initialDestination({ pathname: "/", saved: "es", preferences: ["de"] }),
    "/es/",
  );
  assert.equal(
    initialDestination({ pathname: "/", saved: "en", preferences: ["de"] }),
    null,
  );
  assert.equal(
    initialDestination({
      pathname: "/",
      search: "?lang=en",
      saved: "de",
      preferences: ["de"],
    }),
    null,
  );
  assert.equal(
    initialDestination({
      pathname: "/",
      search: "?utm_source=test&lang=fr",
      hash: "#try",
      saved: "de",
    }),
    "/fr/?utm_source=test#try",
  );
  assert.equal(
    initialDestination({
      pathname: "/",
      saved: "invalid",
      preferences: ["es-MX"],
    }),
    "/es/",
  );
  assert.equal(
    initialDestination({ pathname: "/fr/", saved: "de", preferences: ["de"] }),
    null,
  );
  assert.equal(
    initialDestination({
      pathname: "/guide/",
      saved: "de",
      preferences: ["de"],
    }),
    null,
  );
});

test("switching languages retains the page, replaces a prefix, and rejects external paths", () => {
  assert.equal(
    localizedPath("/de/guide/#centuries", "pt"),
    "/pt/guide/#centuries",
  );
  assert.equal(localizedPath("/fr/faq/", "en"), "/faq/");
  assert.equal(localizedPath("/", "de"), "/de/");
  assert.throws(() => localizedPath("//external.example", "fr"));
  assert.throws(() => localizedPath("/", "unknown"));
});

test("all 30 language pages have reciprocal alternates, localized navigation and metadata", async () => {
  const domain = "https://www.otterday.app";
  for (const locale of Object.keys(languages)) {
    for (const page of pages) {
      const path = localizedPath(page.path, locale);
      const { document } = parseHTML(
        await readFile(`dist${path}index.html`, "utf8"),
      );
      assert.equal(document.documentElement.lang, locale);
      assert.equal(
        document.querySelector("[rel=canonical]").href,
        domain + path,
      );
      assert.equal(
        document.querySelector('[property="og:url"]').content,
        domain + path,
      );
      const alternates = [...document.querySelectorAll("[rel=alternate]")];
      assert.equal(alternates.length, 6);
      for (const code of Object.keys(languages)) {
        assert.equal(
          document.querySelector(`[hreflang="${code}"][rel=alternate]`).href,
          domain + localizedPath(page.path, code),
        );
      }
      const menu = [...document.querySelectorAll("[data-language]")];
      assert.equal(menu.length, 5);
      assert.equal(
        document.querySelector("[data-language][aria-current]").dataset
          .language,
        locale,
      );
      for (const a of document.querySelectorAll(
        'a[href^="/"]:not([data-language])',
      )) {
        if (locale !== "en")
          assert.ok(a.href.startsWith(`/${locale}/`), `${locale} ${a.href}`);
      }
      if (locale !== "en") assert.notEqual(document.title, page.title);
      const messages = JSON.parse(
        document.querySelector("#site-messages").textContent,
      );
      assert.ok(messages.assisted && messages.unassisted && messages.language);
      const ld = document.querySelector('[type="application/ld+json"]');
      if (ld) assert.equal(JSON.parse(ld.textContent).inLanguage, locale);
    }
  }
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  assert.equal((sitemap.match(/<loc>/g) || []).length, 30);
});

test("all localized games keep Monday first and all translated guide tables keep the method", async () => {
  for (const locale of Object.keys(languages)) {
    const root = localizedPath("/", locale);
    const { document } = parseHTML(
      await readFile(`dist${root}index.html`, "utf8"),
    );
    assert.deepEqual(
      [...document.querySelectorAll("[data-day]")].map((b) => +b.dataset.day),
      [1, 2, 3, 4, 5, 6, 0],
    );
    assert.equal(document.querySelectorAll(".feature").length, 6);
    assert.ok(document.querySelector('[src="/assets/times-square-v2.webp"]'));
    const guide = parseHTML(
      await readFile(`dist${root}guide/index.html`, "utf8"),
    ).document;
    const codes = [...guide.querySelectorAll(".code-table tbody td")].map(
      (n) => n.textContent,
    );
    assert.deepEqual(codes, [
      "6",
      "5",
      "2",
      "1",
      "2",
      "2",
      "5",
      "5",
      "0",
      "0",
      "3",
      "3",
      "5",
      "5",
      "1",
      "1",
      "4",
      "4",
      "6",
      "6",
      "2",
      "2",
      "4",
      "4",
      "5",
      "3",
      "1",
      "0",
    ]);
    assert.equal(guide.querySelectorAll('[href="' + root + 'faq/"]').length, 3);
  }
});
