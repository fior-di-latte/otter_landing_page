export const languages = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  pt: "Português",
};

export function preferredLanguage(preferences = []) {
  for (const preference of preferences) {
    const language = String(preference).toLowerCase().split(/[-_]/)[0];
    if (Object.hasOwn(languages, language)) return language;
  }
  return "en";
}

export function localizedPath(path, language) {
  if (
    !Object.hasOwn(languages, language) ||
    !path.startsWith("/") ||
    path.startsWith("//")
  ) {
    throw new RangeError("Invalid local path or language");
  }
  const base = path.replace(/^\/(de|fr|es|pt)(?=\/|$)/, "") || "/";
  return language === "en" ? base : `/${language}${base}`;
}

// Explicit localized links win. Only the neutral homepage performs detection;
// deep links remain stable, shareable and usable with JavaScript disabled.
export function initialDestination({
  pathname,
  search = "",
  hash = "",
  saved,
  preferences,
}) {
  if (pathname !== "/") return null;
  const query = new URLSearchParams(search);
  const explicit = query.get("lang");
  const language = Object.hasOwn(languages, explicit)
    ? explicit
    : Object.hasOwn(languages, saved)
      ? saved
      : preferredLanguage(preferences);
  if (language === "en") return null;
  query.delete("lang");
  return (
    localizedPath(pathname, language) + (query.size ? `?${query}` : "") + hash
  );
}

export function setupLanguage() {
  let saved;
  try {
    saved = localStorage.getItem("otterday-language");
  } catch {
    /* Storage may be blocked; URL choices still work. */
  }
  const destination = initialDestination({
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    saved,
    preferences: navigator.languages,
  });
  if (destination) {
    location.replace(destination);
    return;
  }
  document.querySelectorAll("[data-language]").forEach((link) => {
    // Preserve the current section when switching language, including without storage.
    const sync = () => {
      const url = new URL(link.href);
      url.hash = location.hash;
      link.href = url.href;
    };
    sync();
    addEventListener("hashchange", sync);
    link.addEventListener("click", () => {
      sync();
      try {
        localStorage.setItem("otterday-language", link.dataset.language);
      } catch {
        /* The selected locale is also encoded in the destination URL. */
      }
    });
  });
  const menu = document.querySelector(".language-menu");
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (menu?.open && !menu.contains(event.target)) menu.open = false;
  });
}
