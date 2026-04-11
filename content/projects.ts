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
