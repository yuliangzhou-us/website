import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDetailFigureSources } from "@/content/projects";
import { getProjectBySlug, loadResearchProjects } from "@/content/load-editable";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return loadResearchProjects().map((project) => ({
    slug: project.slug
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const figureSources = getDetailFigureSources(project);
  const showVideoPlusFigures = Boolean(project.videoEmbed || figureSources.length > 0);
  const useReducedFigureSize = project.slug === "mechanics-informed-das-track-diagnostics";
  const useSideBySideMedia = project.id === "proj-05" && Boolean(project.videoEmbed) && figureSources.length > 0;
  const hideCollaborators = new Set([
    "bridge-response-analytics-under-operational-loading",
    "mechanics-informed-das-track-diagnostics"
  ]).has(project.slug);

  return (
    <div className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
        <p className="text-sm text-slate-600">
          <Link href="/#research" className="underline underline-offset-4 hover:text-slate-900">
            Back to Research
          </Link>
        </p>

        <header className="mt-5 space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {project.title}
          </h1>
          {project.sponsor ? <p className="text-base text-slate-600">Sponsor: {project.sponsor}</p> : null}
        </header>

        <section className="mt-8">
          {showVideoPlusFigures ? (
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 md:gap-8">
              {useSideBySideMedia ? (
                <div className="mx-auto grid w-full max-w-[1240px] gap-6 md:grid-cols-2 md:gap-8">
                  <div className="h-[338px] w-full overflow-hidden rounded-md">
                    <iframe
                      src={project.videoEmbed}
                      title={`${project.title} overview video`}
                      className="h-full w-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <div className="space-y-4">
                    {figureSources.map((src, index) => (
                      <figure key={`${src}-${index}`} className="h-[338px] w-full">
                        <Image
                          src={src}
                          alt={`${project.title} — figure ${index + 1}`}
                          width={1600}
                          height={1000}
                          className="h-full w-full rounded-md object-contain object-center"
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, 600px"
                        />
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
              {!useSideBySideMedia && project.videoEmbed ? (
                <div className="mx-auto w-full max-w-[600px] overflow-hidden rounded-md">
                  <iframe
                    src={project.videoEmbed}
                    title={`${project.title} overview video`}
                    className="aspect-video h-auto min-h-[240px] w-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              ) : null}
              {!useSideBySideMedia
                ? figureSources.map((src, index) => (
                    <figure
                      key={`${src}-${index}`}
                      className={
                        useReducedFigureSize
                          ? "mx-auto flex h-[338px] w-full max-w-[600px] items-stretch justify-center"
                          : "mx-auto w-full max-w-[600px]"
                      }
                    >
                      <Image
                        src={src}
                        alt={`${project.title} — figure ${index + 1}`}
                        width={1600}
                        height={1000}
                        className={
                          useReducedFigureSize
                            ? "h-full w-auto max-w-full rounded-md object-contain object-center"
                            : "h-auto w-full rounded-md object-contain object-center"
                        }
                        priority={!project.videoEmbed && index === 0}
                        sizes="(max-width: 600px) 100vw, 600px"
                      />
                    </figure>
                  ))
                : null}
            </div>
          ) : (
            <div className="mx-auto w-full md:w-3/4">
              <Image
                src={project.image}
                alt={`${project.title} media`}
                width={1200}
                height={675}
                className="h-auto w-full rounded-md object-cover object-center"
                priority
              />
            </div>
          )}
        </section>

        <section className="detail-card mt-10 space-y-4 rounded-xl p-0 md:p-0">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Project Description</h2>
          <p className="text-[17px] leading-8 text-slate-700">{project.abstract}</p>
          {project.paperLink ? (
            <p className="text-base text-slate-700">
              Paper:{" "}
              <a
                href={project.paperLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3e6fb6] underline underline-offset-4 hover:text-[#2f5f9f]"
              >
                {project.paperLink}
              </a>
            </p>
          ) : null}
          {project.reportLink ? (
            <p className="text-base text-slate-700">
              FRA report:{" "}
              <a
                href={project.reportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3e6fb6] underline underline-offset-4 hover:text-[#2f5f9f]"
              >
                {project.reportLink}
              </a>
            </p>
          ) : null}
        </section>

        {!hideCollaborators ? (
          <section className="detail-card mt-10 space-y-4 rounded-xl p-0 md:p-0">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Collaborators</h2>
            <ul className="list-disc space-y-2 pl-5 text-[17px] leading-8 text-slate-700">
              {(project.collaborators ?? ["Collaborator information will be added."]).map(
                (collaborator) => (
                  <li key={collaborator}>{collaborator}</li>
                )
              )}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
