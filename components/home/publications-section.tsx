"use client";

import { Fragment, useMemo, useState } from "react";
import { publicationTitle, publicationYear, type PublicationEntry } from "@/content/publications";
import { scholarUrl } from "@/lib/site-data";
import { highlightTerms, matchesAllTerms, searchTerms } from "@/lib/text-search";
import { useHashTarget } from "@/lib/use-hash-target";
import { CopyButton } from "@/components/ui/copy-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChevronDownIcon, CloseIcon, ExternalLinkIcon, ScholarIcon, SearchIcon } from "@/components/ui/icons";

const VISIBLE_COUNT = 10;
/** Author name as it appears in citations; rendered bold. */
const AUTHOR_PATTERN = /(Zhou, Y\.)/;

function Citation({ text, terms }: { text: string; terms: string[] }) {
  return (
    <>
      {text.split(AUTHOR_PATTERN).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-ink">
            {highlightTerms(part, terms)}
          </strong>
        ) : (
          <Fragment key={index}>{highlightTerms(part, terms)}</Fragment>
        )
      )}
    </>
  );
}

export function PublicationsSection({ publications }: { publications: PublicationEntry[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);

  const entries = useMemo(
    () =>
      publications.map((publication, index) => ({
        ...publication,
        number: index + 1,
        year: publicationYear(publication.citation) ?? "Other",
        title: publicationTitle(publication.citation)
      })),
    [publications]
  );

  const years = useMemo(() => {
    const counts = new Map<string, number>();
    entries.forEach((entry) => counts.set(entry.year, (counts.get(entry.year) ?? 0) + 1));
    return [...counts.entries()].sort(([a], [b]) => b.localeCompare(a));
  }, [entries]);

  const terms = searchTerms(query);
  const isFiltering = terms.length > 0 || year !== "All";
  const filtered = entries.filter(
    (entry) => (year === "All" || entry.year === year) && matchesAllTerms(entry.citation, terms)
  );
  const shown = isFiltering || showAll ? filtered : filtered.slice(0, VISIBLE_COUNT);

  useHashTarget(
    (id) => entries.some((entry) => entry.id === id),
    (id) => {
      let changed = false;
      if (isFiltering && !filtered.some((entry) => entry.id === id)) {
        setQuery("");
        setYear("All");
        changed = true;
      }
      if (entries.findIndex((entry) => entry.id === id) >= VISIBLE_COUNT && !showAll) {
        setShowAll(true);
        changed = true;
      }
      return changed;
    }
  );

  function clearFilters() {
    setQuery("");
    setYear("All");
  }

  return (
    <section id="publications" className="scroll-mt-20 bg-bg-subtle py-20 md:py-28">
      <div className="fluid-gutter mx-auto w-full max-w-7xl">
        <SectionHeading kicker="Selected work" title="Publication">
          <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <ScholarIcon className="h-4 w-4" />
            Full list on Google Scholar
          </a>
        </SectionHeading>

        <div data-reveal className="mt-8 flex flex-col gap-4 font-sans lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full lg:max-w-sm">
            <span className="sr-only">Search publications</span>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, author, or journal"
              className="h-11 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink shadow-card outline-none transition placeholder:text-muted focus:border-brand/50 focus:ring-4 focus:ring-brand/10"
            />
          </label>
          <div role="toolbar" aria-label="Filter by year" className="flex flex-wrap gap-1.5">
            {[["All", entries.length] as const, ...years].map(([option, count]) => {
              const selected = year === option;
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setYear(option)}
                  className={`rounded-full border px-3 py-1 text-[0.8rem] font-medium transition ${
                    selected
                      ? "border-brand bg-brand text-on-brand"
                      : "border-line bg-surface text-ink-2 hover:border-brand/40 hover:text-brand"
                  }`}
                >
                  {option}
                  <span className={`ml-1.5 text-[0.7rem] ${selected ? "text-on-brand/75" : "text-muted"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-5 font-sans text-sm text-muted" aria-live="polite">
          {isFiltering ? (
            <>
              {filtered.length} of {entries.length} publications
              <button type="button" onClick={clearFilters} className="text-link ml-3 inline-flex items-center gap-1">
                <CloseIcon className="h-3.5 w-3.5" />
                Clear filters
              </button>
            </>
          ) : (
            <>{entries.length} selected publications</>
          )}
        </p>

        {shown.length > 0 ? (
          <ol className="mt-5 space-y-3">
            {shown.map((entry) => (
              <li
                key={entry.id}
                id={entry.id}
                className="card group flex scroll-mt-28 gap-4 p-4 transition-shadow hover:shadow-lift sm:gap-5 sm:p-5"
              >
                <span
                  aria-hidden="true"
                  className="hidden w-9 shrink-0 pt-0.5 text-right font-sans text-sm font-semibold tabular-nums text-muted/70 sm:block"
                >
                  {String(entry.number).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 space-y-2.5">
                  <p className="text-[1rem] leading-7 text-ink-2">
                    <Citation text={entry.citation} terms={terms} />
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs">
                    <span className="rounded-full bg-brand-soft px-2 py-0.5 font-semibold text-brand">{entry.year}</span>
                    <CopyButton value={entry.citation} label="Copy citation" showLabel />
                    <a
                      href={`https://scholar.google.com/scholar?q=${encodeURIComponent(entry.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-muted transition hover:text-brand"
                    >
                      <ExternalLinkIcon className="h-4 w-4" />
                      Find paper
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="card mt-5 p-10 text-center">
            <p className="text-ink">No publications match your search.</p>
            <button type="button" onClick={clearFilters} className="btn-ghost mt-4">
              Clear filters
            </button>
          </div>
        )}

        {!isFiltering && filtered.length > VISIBLE_COUNT ? (
          <button
            type="button"
            onClick={() => setShowAll((open) => !open)}
            aria-expanded={showAll}
            className="btn-ghost mt-6"
          >
            {showAll ? "Show fewer" : `Show all ${filtered.length}`}
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        ) : null}
      </div>
    </section>
  );
}
