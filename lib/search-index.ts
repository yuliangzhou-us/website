import { loadNewsItems, loadPublicationEntries, loadResearchProjects } from "@/content/load-editable";
import { categorizeNews, formatNewsDate } from "@/content/news";
import { publicationTitle, publicationYear } from "@/content/publications";
import { courses, navItems } from "@/lib/site-data";

export type SearchGroup = "Pages" | "Research" | "Publications" | "News";

export type SearchItem = {
  id: string;
  group: SearchGroup;
  title: string;
  subtitle?: string;
  href: string;
  /** Extra text matched by the search but not displayed. */
  keywords?: string;
};

/** Built at compile time (reads content files) and handed to the client-side command palette. */
export function buildSearchIndex(): SearchItem[] {
  const pages: SearchItem[] = [
    ...navItems.map((item) => ({
      id: `page-${item.href}`,
      group: "Pages" as const,
      title: item.label,
      subtitle: "Home page section",
      href: item.href,
      keywords: item.label === "Teaching" ? courses.map((c) => `${c.codes.join(" ")} ${c.title}`).join(" ") : undefined
    })),
    {
      id: "page-students",
      group: "Pages",
      title: "Prospective Ph.D. Students",
      subtitle: "Recruitment details & how to apply",
      href: "/students",
      keywords: "recruiting apply phd position funded rail"
    }
  ];

  const research: SearchItem[] = loadResearchProjects().map((project) => ({
    id: project.id,
    group: "Research",
    title: project.title,
    subtitle: project.sponsor || "Research project",
    href: `/projects/${project.slug}`,
    keywords: project.abstract
  }));

  const publications: SearchItem[] = loadPublicationEntries().map((publication) => ({
    id: publication.id,
    group: "Publications",
    title: publicationTitle(publication.citation),
    subtitle: publicationYear(publication.citation) ?? "Publication",
    href: `/#${publication.id}`,
    keywords: publication.citation
  }));

  const news: SearchItem[] = loadNewsItems().map((item) => ({
    id: item.id,
    group: "News",
    title: item.text,
    subtitle: `${formatNewsDate(item.date)} · ${categorizeNews(item.text)}`,
    href: `/#${item.id}`
  }));

  return [...pages, ...research, ...publications, ...news];
}
