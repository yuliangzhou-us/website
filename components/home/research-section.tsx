"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectDisplay, type ResearchProject } from "@/content/projects";
import { withBasePath } from "@/lib/with-base-path";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";

const VISIBLE_COUNT = 5;
/** The first two cards are wider on large screens (a 2-up row, then rows of 3). */
const FEATURED_COUNT = 2;

export function ResearchSection({ projects }: { projects: ResearchProject[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = projects.slice(0, VISIBLE_COUNT);
  const archived = projects.slice(VISIBLE_COUNT);

  return (
    <section id="research" className="scroll-mt-20 bg-bg py-20 md:py-28">
      <div className="fluid-gutter mx-auto w-full max-w-7xl">
        <SectionHeading
          kicker="Research projects"
          title="Research"
          description="Sensing, modeling, and data-driven assessment of railroad track, bridges, and transit infrastructure."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {visible.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index < FEATURED_COUNT}
              wideOnTablet={index === 0 && visible.length % 2 === 1}
            />
          ))}
        </ul>

        {archived.length > 0 ? (
          <>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                showAll ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              inert={!showAll}
            >
              <div className="overflow-hidden">
                <ul className="grid gap-6 pt-6 md:grid-cols-2 lg:grid-cols-6">
                  {archived.map((project) => (
                    <ProjectCard key={project.id} project={project} featured={false} wideOnTablet={false} />
                  ))}
                </ul>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAll((open) => !open)}
              aria-expanded={showAll}
              className="btn-ghost mt-8"
            >
              {showAll ? "Show fewer projects" : `Show ${archived.length} more project${archived.length === 1 ? "" : "s"}`}
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: ResearchProject;
  featured: boolean;
  /** Spans both columns at tablet width (image beside text) so an odd count doesn't leave a gap. */
  wideOnTablet: boolean;
};

function ProjectCard({ project, featured, wideOnTablet }: ProjectCardProps) {
  const showSponsor = Boolean(project.sponsor) && !getProjectDisplay(project).hideSponsor;

  return (
    <li
      data-reveal
      className={`${featured ? "lg:col-span-3" : "lg:col-span-2"} ${wideOnTablet ? "md:col-span-2" : ""}`}
    >
      <article
        className={`card group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift ${
          wideOnTablet ? "md:flex-row lg:flex-col" : ""
        }`}
      >
        <div
          className={`relative aspect-video shrink-0 overflow-hidden bg-surface-2 ${
            wideOnTablet ? "md:w-1/2 md:self-center lg:w-full" : ""
          }`}
        >
          <Image
            src={withBasePath(project.image)}
            alt=""
            width={880}
            height={495}
            sizes={featured ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 400px, 100vw"}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          {showSponsor || project.videoEmbed ? (
            <p className="flex items-start justify-between gap-3 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.12em]">
              <span className="line-clamp-2 text-accent-ink">{showSponsor ? project.sponsor : null}</span>
              {project.videoEmbed ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-muted">
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-current" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Video
                </span>
              ) : null}
            </p>
          ) : null}
          <h3 className={`font-semibold leading-snug tracking-tight text-ink ${featured ? "text-[1.35rem]" : "text-xl"}`}>
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand"
            >
              {project.title}
            </Link>
          </h3>
          <p className="line-clamp-3 text-[0.95rem] leading-7 text-muted">{project.abstract}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-1 font-sans text-sm font-semibold text-brand">
            View project
            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </li>
  );
}
