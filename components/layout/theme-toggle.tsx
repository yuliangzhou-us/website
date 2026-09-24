"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  THEME_STORAGE_KEY,
  applyTheme,
  readStoredMode,
  saveMode,
  type ResolvedTheme,
  type ThemeMode
} from "@/lib/theme";
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "@/components/ui/icons";

const options: { mode: ThemeMode; label: string; Icon: typeof SunIcon }[] = [
  { mode: "light", label: "Light", Icon: SunIcon },
  { mode: "dark", label: "Dark", Icon: MoonIcon },
  { mode: "system", label: "System", Icon: MonitorIcon }
];

/** Theme state lives on <html data-theme / data-theme-mode>; re-render whenever those change. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-theme-mode"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  const root = document.documentElement;
  return `${root.getAttribute("data-theme-mode") ?? "system"}:${root.getAttribute("data-theme") ?? "light"}`;
}

export function ThemeToggle() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "system:light");
  const [mode, resolved] = snapshot.split(":") as [ThemeMode, ResolvedTheme];
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Follow OS changes while in "system" mode, and sync choices made in other tabs.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (readStoredMode() === "system") applyTheme("system");
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) applyTheme(readStoredMode());
    };
    media.addEventListener("change", onSystemChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onSystemChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const CurrentIcon = resolved === "dark" ? MoonIcon : SunIcon;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Change color theme"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        title="Change color theme"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition hover:border-brand/40 hover:text-brand"
      >
        <CurrentIcon className="h-[18px] w-[18px]" />
      </button>
      {menuOpen ? (
        <div
          role="menu"
          aria-label="Color theme"
          className="card absolute right-0 top-11 z-50 w-40 animate-pop-in p-1.5 font-sans shadow-lift"
        >
          {options.map(({ mode: option, label, Icon }) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              aria-checked={mode === option}
              onClick={() => {
                saveMode(option);
                setMenuOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-surface-2 ${
                mode === option ? "font-semibold text-brand" : "text-ink-2"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
              {mode === option ? <CheckIcon className="ml-auto h-4 w-4" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
