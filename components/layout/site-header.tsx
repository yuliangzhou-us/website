"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navItems, siteTitle } from "@/lib/site-data";

type ThemeMode = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "theme-mode";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function SiteHeader() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initial: ThemeMode =
      saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
    setThemeMode(initial);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (themeMode === "system") {
      root.removeAttribute("data-theme");
      const initial = getSystemTheme();
      root.setAttribute("data-theme-resolved", initial);
      setResolvedTheme(initial);

      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        const next = media.matches ? "dark" : "light";
        root.setAttribute("data-theme-resolved", next);
        setResolvedTheme(next);
      };

      if (media.addEventListener) {
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
      }
      media.addListener(onChange);
      return () => media.removeListener(onChange);
    }

    root.setAttribute("data-theme", themeMode);
    root.setAttribute("data-theme-resolved", themeMode);
    setResolvedTheme(themeMode);
  }, [themeMode]);

  function toggleTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setThemeMode(next);
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-300/70 bg-[#edf2f8]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-[#1f3a5f] sm:text-xl"
          >
            {siteTitle}
          </Link>
          <nav aria-label="Main navigation">
            <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-[15px] text-slate-700 transition hover:bg-[#e4ebf5] hover:text-[#1f3a5f] sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <button
        type="button"
        onClick={toggleTheme}
        className="theme-toggle-btn fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/70 bg-white/95 text-lg text-slate-700 shadow-sm backdrop-blur transition hover:bg-[#e4ebf5] hover:text-[#1f3a5f]"
        aria-label="Toggle light and dark mode"
        title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        {resolvedTheme === "dark" ? "☀️" : "🌙"}
      </button>
    </>
  );
}
