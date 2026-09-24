import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDetailFigureSources, getProjectDisplay } from "@/content/projects";
import { getProjectBySlug, loadResearchProjects } from "@/content/load-editable";
import { siteUrl } from "@/lib/site-data";
import { withBasePath } from "@/lib/with-base-path";
import { ProjectMedia } from "@/components/project/project-media";
import { ArrowLeftIcon, ArrowRightIcon, DocumentIcon, ExternalLinkIcon } from "@/components/ui/icons";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return loadResearchProjects().map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const description = project.abstract.length > 200 ? `${project.abstract.slice(0, 197).trimEnd()}…` : project.abstract;
  const url = `${siteUrl}projects/${project.slug}/`;
  return {
    title: `${project.title} | Yuliang Zhou`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description,
      url,
      siteName: "Yuliang Zhou",
      type: "article",
      images: [{ url: `${siteUrl.replace(/\/$/, "")}${project.image}` }]
    }
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projects = loadResearchProjects();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  if (!project) {
    notFound();
  }

  const display = getProjectDisplay(project);
  const figures = getDetailFigureSources(project).map(withBasePath);
  const collaborators = display.hideCollaborators ? [] : (project.collaborators ?? []);
  const previous = index > 0 ? projects[index - 1] : undefined;
  const next = index < projects.length - 1 ? projects[index + 1] : undefined;

  const links = [
    project.paperLink ? { label: "Read the paper", href: project.paperLink } : null,
    project.reportLink ? { label: "FRA report", href: project.reportLink } : null
  ].filter((link): link is { label: string; href: string } => link !== null);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line bg-bg-subtle">
        <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0" />
        <div className="fluid-gutter relative mx-auto w-full max-w-6xl py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="font-sans text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#research" className="transition-colors hover:text-brand">
                  Research
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink-2">
                Project {index + 1} of {projects.length}
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.6rem]">
            {project.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 font-sans">
            {project.sponsor ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-sm font-semibold text-accent-ink">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                Sponsor: {project.sponsor}
              </span>
            ) : null}
            {links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <DocumentIcon className="h-4 w-4" />
                {link.label}
                <ExternalLinkIcon className="h-3.5 w-3.5 text-muted" />
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="fluid-gutter mx-auto w-full max-w-6xl py-12 md:py-16">
        <section aria-label="Project media">
          <ProjectMedia
            title={project.title}
            coverImage={withBasePath(project.image)}
            videoEmbed={project.videoEmbed}
            figures={figures}
            sideBySide={Boolean(display.sideBySideMedia)}
            reducedFigureSize={Boolean(display.reducedFigureSize)}
          />
        </section>

        <div className={`mt-12 grid gap-8 ${collaborators.length > 0 ? "lg:grid-cols-[1fr_300px]" : ""}`}>
          <section data-reveal className="card p-6 sm:p-8">
            <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">
              <span aria-hidden="true" className="h-[2px] w-8 rounded-full bg-accent" />
              Overview
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">Project Description</h2>
            <p className="mt-4 text-[1.05rem] leading-8 text-ink-2">{project.abstract}</p>
          </section>

          {collaborators.length > 0 ? (
            <aside data-reveal className="card h-fit p-6">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">Collaborators</h2>
              <ul className="mt-4 space-y-2.5">
                {collaborators.map((collaborator) => (
                  <li key={collaborator} className="flex items-center gap-3 text-ink-2">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft font-sans text-xs font-bold text-brand"
                    >
                      {collaborator.charAt(0)}
                    </span>
                    {collaborator}
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>

        <nav aria-label="More projects" className="mt-14 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
          {previous ? <ProjectNavCard project={previous} direction="previous" /> : <span className="hidden sm:block" />}
          {next ? <ProjectNavCard project={next} direction="next" /> : null}
        </nav>
      </div>
    </article>
  );
}

function ProjectNavCard({
  project,
  direction
}: {
  project: { slug: string; title: string; image: string };
  direction: "previous" | "next";
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`card group flex items-center gap-4 p-4 transition hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lift ${
        isNext ? "sm:flex-row-reverse sm:text-right" : ""
      }`}
    >
      <Image
        src={withBasePath(project.image)}
        alt=""
        width={160}
        height={90}
        className="aspect-video w-24 shrink-0 rounded-lg object-cover"
      />
      <span className="min-w-0 flex-1">
        <span
          className={`flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted ${
            isNext ? "sm:justify-end" : ""
          }`}
        >
          {isNext ? null : <ArrowLeftIcon className="h-3.5 w-3.5" />}
          {isNext ? "Next project" : "Previous project"}
          {isNext ? <ArrowRightIcon className="h-3.5 w-3.5" /> : null}
        </span>
        <span className="mt-1 line-clamp-2 font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
          {project.title}
        </span>
      </span>
    </Link>
  );
}
