"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { SearchGroup, SearchItem } from "@/lib/search-index";
import { highlightTerms, matchesAllTerms, searchTerms } from "@/lib/text-search";
import { DocumentIcon, FlaskIcon, HashIcon, NewspaperIcon, SearchIcon } from "@/components/ui/icons";

type CommandPaletteProps = {
  items: SearchItem[];
  open: boolean;
  onClose: () => void;
};

const groupOrder: SearchGroup[] = ["Pages", "Research", "Publications", "News"];
const groupIcons = {
  Pages: HashIcon,
  Research: FlaskIcon,
  Publications: DocumentIcon,
  News: NewspaperIcon
} satisfies Record<SearchGroup, unknown>;
const perGroupLimit = 6;

function rankResults(items: SearchItem[], query: string) {
  const terms = searchTerms(query);
  const groups = groupOrder.map((group) => {
    const inGroup = items.filter((item) => item.group === group);
    if (terms.length === 0) {
      // Empty query: offer quick jumps to sections and projects.
      return { group, items: group === "Pages" || group === "Research" ? inGroup : [] };
    }
    const matches = inGroup
      .filter((item) => matchesAllTerms(`${item.title} ${item.subtitle ?? ""} ${item.keywords ?? ""}`, terms))
      .map((item) => ({ item, titleHit: matchesAllTerms(item.title, terms) }))
      .sort((a, b) => Number(b.titleHit) - Number(a.titleHit))
      .slice(0, perGroupLimit)
      .map(({ item }) => item);
    return { group, items: matches };
  });
  let offset = 0;
  const nonEmpty = groups
    .filter((g) => g.items.length > 0)
    .map((g) => {
      const withOffset = { ...g, offset };
      offset += g.items.length;
      return withOffset;
    });
  return { terms, groups: nonEmpty };
}

export function CommandPalette({ items, open, onClose }: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const { terms, groups } = useMemo(() => rankResults(items, query), [items, query]);
  const flat = groups.flatMap((g) => g.items);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function close() {
    setQuery("");
    setActive(0);
    onClose();
  }

  function go(item: SearchItem) {
    close();
    if (item.href.startsWith("/#") && pathname === "/") {
      const hash = `#${item.href.slice(2)}`;
      if (window.location.hash === hash) {
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      } else {
        window.location.hash = hash;
      }
      return;
    }
    router.push(item.href);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (event.key === "Enter" && flat[active]) {
      event.preventDefault();
      go(flat[active]);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the site"
      onClose={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      className="mt-[10vh] w-[min(40rem,calc(100vw-2rem))] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-[rgb(5_10_20/0.55)] backdrop:backdrop-blur-sm open:animate-pop-in"
    >
      <div className="card overflow-hidden font-sans shadow-lift">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search projects, publications, news…"
            aria-label="Search"
            aria-controls="command-palette-results"
            aria-activedescendant={flat[active] ? `cmd-${flat[active].id}` : undefined}
            role="combobox"
            aria-expanded="true"
            className="h-14 w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-muted"
          />
          <kbd className="hidden rounded-md border border-line px-1.5 py-0.5 text-[0.7rem] text-muted sm:block">
            Esc
          </kbd>
        </div>

        <div
          ref={listRef}
          id="command-palette-results"
          role="listbox"
          aria-label="Search results"
          className="max-h-[min(60vh,28rem)] overflow-y-auto p-2"
        >
          {groups.length === 0 ? (
            <p className="px-3 py-10 text-center text-sm text-muted">
              No results for <span className="font-semibold text-ink">“{query}”</span>
            </p>
          ) : (
            groups.map(({ group, items: groupItems, offset }) => {
              const Icon = groupIcons[group];
              return (
                <div key={group} role="group" aria-label={group} className="py-1">
                  <p className="px-3 pb-1 pt-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
                    {group}
                  </p>
                  {groupItems.map((item, i) => {
                    const index = offset + i;
                    const isActive = index === active;
                    return (
                      <div
                        key={item.id}
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive}
                        onMouseMove={() => setActive(index)}
                        onClick={() => go(item)}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                          isActive ? "bg-brand-soft" : ""
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line ${
                            isActive ? "bg-surface text-brand" : "bg-surface-2 text-muted"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="line-clamp-2 text-sm font-medium leading-5 text-ink">
                            {highlightTerms(item.title, terms)}
                          </span>
                          {item.subtitle ? (
                            <span className="mt-0.5 block truncate text-xs text-muted">{item.subtitle}</span>
                          ) : null}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-line bg-surface-2/60 px-4 py-2.5 text-[0.7rem] text-muted">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-line bg-surface px-1">↑</kbd>
            <kbd className="rounded border border-line bg-surface px-1">↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-line bg-surface px-1">↵</kbd>
            open
          </span>
          <span className="ml-auto">{flat.length} result{flat.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </dialog>
  );
}
