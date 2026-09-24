export type NewsItem = {
  id: string;
  date: string;
  text: string;
  image?: string;
};

export type NewsCategory = "Publication" | "Grant" | "Talk" | "Outreach" | "Milestone" | "Update";

/** Checked in order; the first matching rule wins. Anything unmatched is an "Update". */
const categoryRules: [NewsCategory, RegExp][] = [
  ["Publication", /\bour paper\b|accepted for publication|\bpublished\b/i],
  ["Grant", /\bfunded\b|\bgrant\b|launched a new/i],
  ["Talk", /\bpresented\b|\breported\b|\bkeynote\b|invited talk/i],
  ["Outreach", /\borganized\b|site visit|\bseminar\b|student chapter/i],
  ["Milestone", /\bjoined\b|\bearned\b|\bgraduated\b|\bappointed\b|\baward/i]
];

export function categorizeNews(text: string): NewsCategory {
  return categoryRules.find(([, pattern]) => pattern.test(text))?.[0] ?? "Update";
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-04" -> "Apr 2026"; anything else is returned unchanged. */
export function formatNewsDate(date: string): string {
  const match = /^(\d{4})-(\d{1,2})$/.exec(date.trim());
  if (!match) return date;
  const month = monthNames[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : date;
}

export function newsYear(date: string): string {
  return /^\d{4}/.exec(date.trim())?.[0] ?? "Earlier";
}
