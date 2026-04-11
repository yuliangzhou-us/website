import fs from "fs";
import path from "path";
import type { NewsItem } from "@/content/news";
import type { PublicationEntry } from "@/content/publications";
import type { ResearchProject } from "@/content/projects";

const contentRoot = path.join(process.cwd(), "content");
const editableDir = path.join(contentRoot, "editable");
const researchProjectsRoot = path.join(contentRoot, "research-projects");

function readUtf8(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

function readOptionalFile(filePath: string): string | null {
  try {
    return readUtf8(filePath);
  } catch {
    return null;
  }
}

function readRequiredFile(filePath: string): string {
  return readUtf8(filePath);
}

/** Paragraphs separated by one or more blank lines. */
export function loadBiographyParagraphs(): string[] {
  const p = path.join(editableDir, "biography.txt");
  const raw = readRequiredFile(p);
  return raw
    .split(/\n{2,}/)
    .map((s) => s.trim().replace(/\n/g, " "))
    .filter(Boolean);
}

/** One interest per line. */
export function loadResearchInterests(): string[] {
  const p = path.join(editableDir, "research-interests.txt");
  const raw = readRequiredFile(p);
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readSingleLineText(filePath: string): string {
  const raw = readRequiredFile(filePath);
  return raw
    .split(/\n/)
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
}

function readAbstract(filePath: string): string {
  return readRequiredFile(filePath).trim().replace(/\s+/g, " ");
}

function readCollaborators(filePath: string): string[] {
  const raw = readRequiredFile(filePath);
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function readCoverImage(filePath: string): string {
  const line = readRequiredFile(filePath)
    .split("\n")
    .map((s) => s.trim())
    .find(Boolean);
  if (!line) {
    throw new Error(`cover-image.txt is empty: ${filePath}`);
  }
  return line;
}

function readVideoEmbed(filePath: string): string | undefined {
  const raw = readOptionalFile(filePath);
  if (raw == null) return undefined;
  const line = raw
    .split("\n")
    .map((s) => s.trim())
    .find(Boolean);
  return line || undefined;
}

function readPaperLink(filePath: string): string | undefined {
  const raw = readOptionalFile(filePath);
  if (raw == null) return undefined;
  const line = raw
    .split("\n")
    .map((s) => s.trim())
    .find(Boolean);
  return line || undefined;
}

function readReportLink(filePath: string): string | undefined {
  const raw = readOptionalFile(filePath);
  if (raw == null) return undefined;
  const line = raw
    .split("\n")
    .map((s) => s.trim())
    .find(Boolean);
  return line || undefined;
}

function readGalleryImages(filePath: string): string[] {
  const raw = readOptionalFile(filePath);
  if (raw == null) return [];
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** URL path segment for /projects/[slug]; one line in slug.txt */
function readSlug(filePath: string): string {
  const line = readRequiredFile(filePath)
    .split("\n")
    .map((s) => s.trim())
    .find(Boolean);
  if (!line) {
    throw new Error(`slug.txt is empty: ${filePath}`);
  }
  return line;
}

/** folderId is the numbered folder name from _order.txt, e.g. "01" */
function loadProjectFromFolder(folderId: string, index: number): ResearchProject {
  const dir = path.join(researchProjectsRoot, folderId);
  const id = `proj-${String(index + 1).padStart(2, "0")}`;
  const slug = readSlug(path.join(dir, "slug.txt"));

  const title = readSingleLineText(path.join(dir, "title.txt"));
  const sponsor = readSingleLineText(path.join(dir, "sponsor.txt"));
  const abstract = readAbstract(path.join(dir, "abstract.txt"));
  const collaborators = readCollaborators(path.join(dir, "collaborators.txt"));
  const image = readCoverImage(path.join(dir, "cover-image.txt"));
  const videoEmbed = readVideoEmbed(path.join(dir, "video-embed.txt"));
  const paperLink = readPaperLink(path.join(dir, "paper-link.txt"));
  const reportLink = readReportLink(path.join(dir, "report-link.txt"));
  const galleryImages = readGalleryImages(path.join(dir, "gallery-images.txt"));

  const project: ResearchProject = {
    id,
    slug,
    title,
    sponsor,
    image,
    abstract,
    collaborators
  };
  if (videoEmbed) project.videoEmbed = videoEmbed;
  if (paperLink) project.paperLink = paperLink;
  if (reportLink) project.reportLink = reportLink;
  if (galleryImages.length > 0) project.galleryImages = galleryImages;
  return project;
}

export function loadResearchProjects(): ResearchProject[] {
  const orderPath = path.join(researchProjectsRoot, "_order.txt");
  const orderRaw = readRequiredFile(orderPath);
  const folderIds = orderRaw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !s.startsWith("#"));

  return folderIds.map((folderId, i) => loadProjectFromFolder(folderId, i));
}

export function getProjectBySlug(slug: string): ResearchProject | undefined {
  return loadResearchProjects().find((p) => p.slug === slug);
}

function loadNewsImagePathQueue(): string[] {
  const p = path.join(editableDir, "news-image-paths.txt");
  const raw = readRequiredFile(p);
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Blocks in news.txt separated by a line that is only --- */
function parseNewsBlocks(raw: string): NewsItem[] {
  const blocks = raw
    .split(/\n---\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const pathQueue = [...loadNewsImagePathQueue()];
  const items: NewsItem[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const lines = blocks[i].split("\n");
    if (lines.length < 3) {
      throw new Error(
        `news.txt block ${i + 1}: need date, Y/N, then text (at least one line).`
      );
    }
    const date = lines[0].trim();
    const imageFlag = lines[1].trim().toUpperCase();
    const text = lines
      .slice(2)
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .join(" ");

    if (!text) {
      throw new Error(`news.txt block ${i + 1}: text is empty.`);
    }

    if (imageFlag !== "Y" && imageFlag !== "N") {
      throw new Error(
        `news.txt block ${i + 1}: line 2 must be Y or N (image on/off), got "${lines[1].trim()}".`
      );
    }

    const id = `news-${String(i + 1).padStart(2, "0")}`;
    const base: NewsItem = { id, date, text };

    if (imageFlag === "Y") {
      const src = pathQueue.shift();
      if (!src) {
        throw new Error(
          `news.txt block ${i + 1} uses Y but news-image-paths.txt has no more paths (add one line per Y, top to bottom).`
        );
      }
      items.push({ ...base, image: src });
    } else {
      items.push(base);
    }
  }

  if (pathQueue.length > 0) {
    throw new Error(
      `news-image-paths.txt has ${pathQueue.length} extra path line(s): each line must match one Y block in news.txt in order.`
    );
  }

  return items;
}

export function loadNewsItems(): NewsItem[] {
  const p = path.join(editableDir, "news.txt");
  return parseNewsBlocks(readRequiredFile(p));
}

/** One publication per blank-line-separated paragraph in publications.txt */
export function loadPublicationEntries(): PublicationEntry[] {
  const p = path.join(editableDir, "publications.txt");
  const raw = readRequiredFile(p);
  return raw
    .split(/\n{2,}/)
    .map((s) => s.trim().replace(/\n/g, " "))
    .filter(Boolean)
    .map((citation, index) => ({
      id: `pub-${String(index + 1).padStart(2, "0")}`,
      citation
    }));
}

/** Home-page Students section (paragraphs separated by blank lines). */
export function loadStudentsHomeParagraphs(): string[] {
  const p = path.join(editableDir, "students-home.txt");
  const raw = readRequiredFile(p);
  return raw
    .split(/\n{2,}/)
    .map((s) => s.trim().replace(/\n/g, " "))
    .filter(Boolean);
}

export type StudentsRecruitmentSegment = {
  heading?: string;
  body?: string;
  bullets?: string[];
};

/**
 * students-recruitment.txt: blocks separated by blank lines.
 * A block whose first line starts with "## " is a section heading; remaining lines in that block are body text.
 * Blocks without "## " are plain paragraphs.
 */
export function loadStudentsRecruitmentContent(): StudentsRecruitmentSegment[] {
  const p = path.join(editableDir, "students-recruitment.txt");
  const raw = readRequiredFile(p);
  const parseBodyAndBullets = (contentLines: string[]): StudentsRecruitmentSegment => {
    const bullets = contentLines
      .filter((l) => l.startsWith("- "))
      .map((l) => l.slice(2).trim())
      .filter(Boolean);
    const body = contentLines
      .filter((l) => !l.startsWith("- "))
      .join(" ")
      .trim();
    return { body: body || undefined, bullets: bullets.length > 0 ? bullets : undefined };
  };

  return raw
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((segment): StudentsRecruitmentSegment => {
      const lines = segment
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      const firstNonEmpty = lines.find((l) => l.length > 0) ?? "";

      if (firstNonEmpty.startsWith("## ")) {
        const heading = firstNonEmpty.slice(3).trim();
        const rest = lines.slice(lines.indexOf(firstNonEmpty) + 1);
        const parsed = parseBodyAndBullets(rest);
        return { heading, ...parsed };
      }
      return parseBodyAndBullets(lines);
    })
    .filter((s) => s.heading || s.body || (s.bullets && s.bullets.length > 0));
}
