export type PublicationEntry = {
  id: string;
  citation: string;
};

/** Year in APA-style parentheses, e.g. "Zhou, Y. (2024). Title..." -> "2024". */
export function publicationYear(citation: string): string | undefined {
  return /\((\d{4})[a-z]?\)/.exec(citation)?.[1];
}

/** Article title: the sentence after "(YYYY). ", falling back to the whole citation. */
export function publicationTitle(citation: string): string {
  return /\(\d{4}[a-z]?\)\.\s*(.+?[.?!])(?:\s|$)/.exec(citation)?.[1] ?? citation;
}
