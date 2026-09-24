export type ResearchProject = {
  id: string;
  slug: string;
  title: string;
  sponsor: string;
  image: string;
  videoEmbed?: string;
  /** Detail page figures below the video; if omitted but videoEmbed is set, the cover image is shown */
  galleryImages?: string[];
  abstract: string;
  paperLink?: string;
  reportLink?: string;
  collaborators?: string[];
};

/**
 * Per-project display exceptions, keyed by slug (stable even if _order.txt is rearranged).
 * - hideSponsor: no sponsor line on the home page card
 * - hideCollaborators: no Collaborators section on the detail page
 * - sideBySideMedia: detail page shows the video and figures in two columns
 * - reducedFigureSize: detail page figures use a fixed, shorter height
 */
const projectDisplay: Record<
  string,
  { hideSponsor?: boolean; hideCollaborators?: boolean; sideBySideMedia?: boolean; reducedFigureSize?: boolean }
> = {
  "bridge-response-analytics-under-operational-loading": {
    hideSponsor: true,
    hideCollaborators: true
  },
  "mechanics-informed-das-track-diagnostics": {
    hideSponsor: true,
    hideCollaborators: true,
    sideBySideMedia: true,
    reducedFigureSize: true
  }
};

export function getProjectDisplay(project: ResearchProject) {
  return projectDisplay[project.slug] ?? {};
}

/** Figures shown under the video on the project detail page (or alone if no video). */
export function getDetailFigureSources(project: ResearchProject): string[] {
  if (project.galleryImages && project.galleryImages.length > 0) {
    return project.galleryImages;
  }
  if (project.videoEmbed) {
    return [project.image];
  }
  return [];
}
