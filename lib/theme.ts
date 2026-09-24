export type ThemeMode = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme-mode";

/**
 * Runs inline in <head> before first paint so the page never flashes the wrong theme.
 * Mirrors applyTheme() below.
 */
export const themeInitScript = `(function(){var r=document.documentElement;try{var m=localStorage.getItem("${THEME_STORAGE_KEY}");if(m!=="light"&&m!=="dark")m="system";var d=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);r.setAttribute("data-theme",d?"dark":"light");r.setAttribute("data-theme-mode",m);}catch(e){}})();`;

export function readStoredMode(): ThemeMode {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode !== "system") return mode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", resolveTheme(mode));
  root.setAttribute("data-theme-mode", mode);
}

export function saveMode(mode: ThemeMode) {
  try {
    if (mode === "system") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  } catch {
    // Storage may be unavailable (private mode); the choice then lasts for this page view.
  }
  applyTheme(mode);
}
