// Translate complete prose blocks so inline emphasis and links retain their context.
const prose = new Set([
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "BLOCKQUOTE",
  "FIGCAPTION",
  "LI",
]);
const ignored = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);
export function translationUnits(document) {
  const units = [];
  function walk(node) {
    if (node.nodeType === 3) {
      const source = node.textContent.trim();
      if (/[A-Za-z]/.test(source))
        units.push({
          source,
          set: (value) => {
            node.textContent = node.textContent.replace(source, value);
          },
        });
      return;
    }
    if (node.nodeType !== 1 || ignored.has(node.tagName)) return;
    for (const attribute of ["alt", "aria-label", "aria-roledescription"]) {
      const source = node.getAttribute(attribute);
      if (source && /[A-Za-z]/.test(source))
        units.push({
          source,
          set: (value) => node.setAttribute(attribute, value),
        });
    }
    if (
      node.tagName === "META" &&
      ["description", "og:title", "og:description", "og:image:alt"].includes(
        node.getAttribute("name") || node.getAttribute("property"),
      )
    ) {
      units.push({
        source: node.getAttribute("content"),
        set: (value) => node.setAttribute("content", value),
      });
    }
    if (prose.has(node.tagName) && /[A-Za-z]/.test(node.textContent)) {
      units.push({
        source: node.innerHTML,
        set: (value) => {
          node.innerHTML = value;
        },
      });
      return;
    }
    if (!node.children.length && /[A-Za-z]/.test(node.textContent)) {
      const source = node.textContent.trim();
      units.push({
        source,
        set: (value) => {
          node.textContent = value;
        },
      });
      return;
    }
    for (const child of [...node.childNodes]) walk(child);
  }
  walk(document.documentElement);
  // noscript is prose too, but parsing is browser-dependent; process its text as one unit.
  for (const node of document.querySelectorAll("noscript"))
    units.push({
      source: node.innerHTML,
      set: (value) => {
        node.innerHTML = value;
      },
    });
  return units;
}
