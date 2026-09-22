import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";
async function htmlFiles(dir = "dist") {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) result.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith(".html")) result.push(path);
  }
  return result;
}
test("all pages have metadata and resolve local links, fragments and assets", async () => {
  for (const file of await htmlFiles()) {
    const html = await readFile(file, "utf8");
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, file);
    assert.match(html, /<meta name="description" content="[^"]+">/);
    assert.match(
      html,
      /<link rel="canonical" href="https:\/\/www.otterday.app\//,
    );
    assert.match(html, /<html lang="(en|de|fr|es|pt)">/);
    for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
      const url = match[1].replace(/\?[^#]*/, "");
      if (!url.startsWith("/") && !url.startsWith("#")) continue;
      const [path, fragment] = url.split("#");
      const target = path
        ? `dist${path}${path.endsWith("/") ? "index.html" : ""}`
        : file;
      await access(target);
      if (fragment)
        assert.ok(
          (await readFile(target, "utf8")).includes(`id="${fragment}"`),
          `${file}: ${url}`,
        );
    }
    for (const match of html.matchAll(
      /<script type="application\/ld\+json">(.*?)<\/script>/gs,
    ))
      JSON.parse(match[1]);
  }
});
test("home contains Monday-first challenge, player reviews and six features", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.deepEqual(
    [...html.matchAll(/data-day="(\d)"/g)].map((m) => Number(m[1])),
    [1, 2, 3, 4, 5, 6, 0],
  );
  assert.equal((html.match(/class="feature reveal"/g) || []).length, 6);
  assert.doesNotMatch(html, /Fictional examples|MOCK REVIEW|example player/);
  assert.doesNotMatch(html, /aggregateRating|"@type":"Review"/);
  assert.doesNotMatch(html, /<iframe|<audio|speechSynthesis|cdn\./);
});
