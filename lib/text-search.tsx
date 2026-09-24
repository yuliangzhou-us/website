import { Fragment, type ReactNode } from "react";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Lower-cased, whitespace-separated search terms. */
export function searchTerms(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

/** True when every term appears somewhere in the haystack (case-insensitive). */
export function matchesAllTerms(haystack: string, terms: string[]): boolean {
  const text = haystack.toLowerCase();
  return terms.every((term) => text.includes(term));
}

/** Wraps each occurrence of any term in <mark>. */
export function highlightTerms(text: string, terms: string[]): ReactNode {
  if (terms.length === 0) return text;
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  return text.split(pattern).map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="rounded-sm bg-accent/25 px-0.5 text-inherit">
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}
