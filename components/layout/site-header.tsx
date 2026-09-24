"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, siteTitle, university } from "@/lib/site-data";
import type { SearchItem } from "@/lib/search-index";
import { CommandPalette } from "@/components/layout/command-palette";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CloseIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";

const sectionIds = navItems.map((item) => item.href.replace("/#", ""));

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

/** Highlights the nav item for the section currently in the middle band of the viewport (home page only). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function SiteHeader({ searchItems }: { searchItems: SearchItem[] }) {
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname === "/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll progress bar + header shadow once the page has moved.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
      setIsScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // ⌘K / Ctrl+K toggles search; "/" opens it when not typing in a field.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen((open) => !open);
      } else if (event.key === "/" && !isTypingTarget(event.target)) {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  function isActive(href: string) {
    return activeSection !== null && href === `/#${activeSection}`;
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b bg-bg/80 font-sans backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] ${
          isScrolled || isMenuOpen ? "border-line shadow-card" : "border-transparent"
        }`}
      >
        <div className="fluid-gutter mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-serif text-sm font-bold tracking-tight text-on-brand shadow-card transition group-hover:bg-brand-2"
            >
              YZ
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold tracking-tight text-ink">{siteTitle}</span>
              <span className="hidden text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted sm:block">
                {university}
              </span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "location" : undefined}
                    className={`relative block rounded-full px-3 py-2 text-[0.84rem] font-medium transition-colors hover:text-brand ${
                      isActive(item.href) ? "text-brand" : "text-ink-2"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent transition-transform duration-300 ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search the site"
              className="flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-2.5 text-sm text-muted transition hover:border-brand/40 hover:text-brand md:px-3"
            >
              <SearchIcon className="h-[18px] w-[18px]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden rounded-md border border-line bg-surface-2 px-1.5 text-[0.68rem] font-medium md:inline">
                /
              </kbd>
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-2 transition hover:text-brand lg:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Main navigation"
          className={`grid transition-[grid-template-rows,opacity] duration-300 lg:hidden ${
            isMenuOpen ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="fluid-gutter mx-auto grid max-w-7xl grid-cols-2 gap-1.5 pb-4 pt-1 sm:grid-cols-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={isMenuOpen ? undefined : -1}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block rounded-xl border px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "border-brand/30 bg-brand-soft text-brand"
                        : "border-line bg-surface text-ink-2 hover:text-brand"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[-1px] h-[2px] origin-left scale-x-0 bg-gradient-to-r from-brand via-brand to-accent"
        />
      </header>

      <CommandPalette items={searchItems} open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
