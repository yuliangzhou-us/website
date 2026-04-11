"use client";

import { useState, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ResearchProject } from "@/content/projects";
import type { NewsItem } from "@/content/news";
import type { PublicationEntry } from "@/content/publications";
import { ImageModal } from "@/components/ui/image-modal";
import { withBasePath } from "@/lib/with-base-path";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props} />;
}

function EmailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </IconBase>
  );
}

function ScholarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M6 10v4c0 2 2.8 3.5 6 3.5s6-1.5 6-3.5v-4" />
    </IconBase>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7" />
      <path d="M8 7.5h.01" />
      <path d="M12 17v-4.2a2.3 2.3 0 014.6 0V17" />
    </IconBase>
  );
}

function GlobeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.8 2.4 2.8 15.6 0 18" />
      <path d="M12 3c-2.8 2.4-2.8 15.6 0 18" />
    </IconBase>
  );
}

function DegreeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M6 10v3.2c0 1.8 2.8 3.2 6 3.2s6-1.4 6-3.2V10" />
    </IconBase>
  );
}

type HomePageProps = {
  researchInterests: string[];
  researchProjects: ResearchProject[];
  newsItems: NewsItem[];
  publications: PublicationEntry[];
  studentsHomeParagraphs: string[];
};

export function HomePage({
  researchInterests,
  researchProjects,
  newsItems,
  publications,
  studentsHomeParagraphs
}: HomePageProps) {
  const profileLinks = [
    {
      label: "Email",
      href: "mailto:yuliang.zhou@morgan.edu",
      icon: EmailIcon
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=pg8L1nkAAAAJ&hl=en&oi=ao",
      icon: ScholarIcon
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/yuliang-zhou-527508289/",
      icon: LinkedInIcon
    },
    {
      label: "Morgan Profile",
      href: "https://www.morgan.edu/transportation-and-urban-infrastructure-studies/faculty-and-staff/dr-yuliang-zhou",
      icon: GlobeIcon
    }
  ];

  const hideSponsorSlugs = new Set([
    "bridge-response-analytics-under-operational-loading",
    "mechanics-informed-das-track-diagnostics"
  ]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showNewsArchive, setShowNewsArchive] = useState(false);
  const [activeNewsImage, setActiveNewsImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const defaultVisibleProjects = researchProjects.slice(0, 5);
  const archivedProjects = researchProjects.slice(5);
  const defaultVisibleNews = newsItems.slice(0, 10);
  const archivedNews = newsItems.slice(10);

  return (
    <div className="space-y-0 pb-8">
      <section
        id="home"
        className="scroll-mt-24 bg-[#ffffff] py-20 md:py-28 lg:min-h-[86vh] lg:py-32"
      >
        <div className="fluid-gutter mx-auto w-full max-w-7xl">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 lg:gap-14">
            <div className="flex flex-col items-center gap-7">
              <div className="mx-auto w-full max-w-[280px]">
                <Image
                  src={withBasePath("/profile.jpg")}
                  alt="Yuliang Zhou profile photo"
                  width={280}
                  height={280}
                  className="aspect-square h-auto w-full rounded-full object-cover object-center"
                  priority
                />
              </div>
              <div className="space-y-4 text-center">
                <h1 className="whitespace-nowrap text-[1.55rem] font-semibold leading-tight tracking-tight text-slate-900 sm:text-[1.95rem] lg:text-[2.15rem]">
                  Yuliang Zhou, Ph.D.
                </h1>
                <p className="text-[1.45rem] font-medium text-[#1f3a5f]">Assistant Professor</p>
                <p className="text-[1.05rem] leading-8 text-slate-600">
                  Department of Transportation &amp; Urban Infrastructure Studies
                  <br />
                  Morgan State University
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[1.02rem] text-slate-700">
                  {profileLinks.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="inline-flex items-center gap-1.5 underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                      >
                        <ItemIcon className="h-[18px] w-[18px]" />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14">
              <div className="self-start space-y-4 md:pr-1">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                  Research Interests
                </h2>
                <ul className="space-y-2.5 text-base leading-8 text-slate-700">
                  {researchInterests.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="self-start space-y-4 md:pl-1">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                  Education
                </h2>
                <ul className="space-y-2.5 text-base leading-8 text-slate-700">
                  <li className="space-y-0">
                    <p className="inline-flex items-center gap-2 font-medium text-slate-900 md:whitespace-nowrap">
                      <DegreeIcon className="h-[18px] w-[18px] text-[#1f3a5f]" />
                      Ph.D. in Civil Engineering
                    </p>
                    <p>The Pennsylvania State University, 2025</p>
                  </li>
                  <li className="space-y-0">
                    <p className="inline-flex items-center gap-2 font-medium text-slate-900 md:whitespace-nowrap">
                      <DegreeIcon className="h-[18px] w-[18px] text-[#1f3a5f]" />
                      Ph.D. in Transportation Engineering
                    </p>
                    <p>Tongji University, 2021</p>
                  </li>
                  <li className="space-y-0">
                    <p className="inline-flex items-center gap-2 font-medium text-slate-900 md:whitespace-nowrap">
                      <DegreeIcon className="h-[18px] w-[18px] text-[#1f3a5f]" />
                      B.S. in Traffic Engineering
                    </p>
                    <p>Tongji University, 2016</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="news"
        className="scroll-mt-24 bg-[#f5f7fa] py-20 md:py-28 lg:min-h-[75vh] lg:py-32"
      >
        <div className="fluid-gutter mx-auto w-full max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.05rem]">
            News
          </h2>
          <ul className="mt-6 space-y-5">
            {defaultVisibleNews.map((item) => (
              <li key={item.id} className="max-w-6xl text-[17px] leading-8 text-slate-700">
                {item.image ? (
                  <div className="grid items-start gap-4 md:grid-cols-[1fr_150px] md:gap-6">
                    <p>
                      <span className="mr-3 font-semibold text-slate-700">[{item.date}]</span>
                      {item.text}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveNewsImage({
                          src: withBasePath(item.image!),
                          alt: `${item.date} news image`
                        })
                      }
                      className="block w-full cursor-pointer justify-self-end"
                    >
                      <Image
                        src={withBasePath(item.image)}
                        alt={`${item.date} news thumbnail`}
                        width={320}
                        height={240}
                        className="aspect-[4/3] h-auto w-full rounded-sm object-cover object-center transition-transform duration-200 hover:scale-[1.02]"
                      />
                    </button>
                  </div>
                ) : (
                  <p>
                    <span className="mr-3 font-semibold text-slate-700">[{item.date}]</span>
                    {item.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
          {archivedNews.length > 0 ? (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowNewsArchive((prev) => !prev)}
                className="text-[15px] text-[#1f3a5f] underline underline-offset-4 hover:text-[#172e4d]"
              >
                {showNewsArchive ? "▲ Hide archive" : "▼ Click here for news archive"}
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  showNewsArchive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="mt-4 space-y-5">
                    {archivedNews.map((item) => (
                      <li key={item.id} className="max-w-6xl text-[17px] leading-8 text-slate-700">
                        {item.image ? (
                          <div className="grid items-start gap-4 md:grid-cols-[1fr_150px] md:gap-6">
                            <p>
                              <span className="mr-3 font-semibold text-slate-700">[{item.date}]</span>
                              {item.text}
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                setActiveNewsImage({
                                  src: withBasePath(item.image!),
                                  alt: `${item.date} news image`
                                })
                              }
                              className="block w-full cursor-pointer justify-self-end"
                            >
                              <Image
                                src={withBasePath(item.image)}
                                alt={`${item.date} news thumbnail`}
                                width={320}
                                height={240}
                                className="aspect-[4/3] h-auto w-full rounded-sm object-cover object-center transition-transform duration-200 hover:scale-[1.02]"
                              />
                            </button>
                          </div>
                        ) : (
                          <p>
                            <span className="mr-3 font-semibold text-slate-700">[{item.date}]</span>
                            {item.text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {activeNewsImage ? (
        <ImageModal
          imageSrc={activeNewsImage.src}
          imageAlt={activeNewsImage.alt}
          onClose={() => setActiveNewsImage(null)}
        />
      ) : null}

      <section
        id="research"
        className="scroll-mt-24 bg-[#ffffff] py-20 md:py-28 lg:min-h-[75vh] lg:py-32"
      >
        <div className="fluid-gutter mx-auto w-full max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.05rem]">
            Research
          </h2>
          <ul className="mt-8 divide-y divide-slate-200">
            {defaultVisibleProjects.map((project) => (
              <li key={project.id} className="py-6 first:pt-0 last:pb-0">
                <div className="grid items-start gap-7 md:grid-cols-[34%_66%] md:gap-10 lg:gap-12">
                  <Link href={`/projects/${project.slug}`} className="block w-full">
                    <Image
                      src={withBasePath(project.image)}
                      alt={`${project.title} preview`}
                      width={880}
                      height={495}
                      className="aspect-video h-auto w-full rounded-md object-cover object-center"
                    />
                  </Link>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="hover:text-[#1f3a5f] hover:underline"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    {!hideSponsorSlugs.has(project.slug) && project.sponsor ? (
                      <p className="text-[15px] leading-7 text-slate-600">Sponsor: {project.sponsor}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {archivedProjects.length > 0 ? (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                className="text-[15px] text-[#1f3a5f] underline underline-offset-4 hover:text-[#172e4d]"
              >
                {showAllProjects ? "▲ Show less" : "▼ Show more projects"}
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  showAllProjects ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="divide-y divide-slate-200">
                    {archivedProjects.map((project) => (
                      <li key={project.id} className="py-6 first:pt-0 last:pb-0">
                        <div className="grid items-start gap-7 md:grid-cols-[34%_66%] md:gap-10 lg:gap-12">
                          <Link href={`/projects/${project.slug}`} className="block w-full">
                            <Image
                      src={withBasePath(project.image)}
                              alt={`${project.title} preview`}
                              width={880}
                              height={495}
                              className="aspect-video h-auto w-full rounded-md object-cover object-center"
                            />
                          </Link>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                              <Link
                                href={`/projects/${project.slug}`}
                                className="hover:text-[#1f3a5f] hover:underline"
                              >
                                {project.title}
                              </Link>
                            </h3>
                            {!hideSponsorSlugs.has(project.slug) && project.sponsor ? (
                              <p className="text-[15px] leading-7 text-slate-600">
                                Sponsor: {project.sponsor}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section
        id="publications"
        className="scroll-mt-24 bg-[#f5f7fa] py-20 md:py-28 lg:min-h-[75vh] lg:py-32"
      >
        <div className="fluid-gutter mx-auto w-full max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.05rem]">
            Publication
          </h2>
          <ol className="mt-6 space-y-5">
            {publications.slice(0, 10).map((publication) => (
              <li key={publication.id} className="max-w-6xl text-[17px] leading-8 text-slate-700">
                <p>{publication.citation}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-[17px] leading-8 text-slate-700">
            See full publication list on{" "}
            <a
              href="https://scholar.google.com/citations?user=pg8L1nkAAAAJ"
              className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
            >
              Google Scholar
            </a>
            .
          </p>
        </div>
      </section>

      <section
        id="teaching"
        className="scroll-mt-24 bg-[#ffffff] py-20 md:py-28 lg:min-h-[73vh] lg:py-32"
      >
        <div className="fluid-gutter mx-auto w-full max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.05rem]">
            Teaching
          </h2>
          <ul className="mt-6 max-w-6xl list-disc space-y-3 pl-5 text-[17px] leading-8 text-slate-700">
            <li>
              TRSS 302 - Introduction to Rail Transportation Systems{" "}
              <span className="text-slate-600">(Spring 2026)</span>
            </li>
            <li>
              TRSS 426 / TRSP 626 - Rail Transportation Engineering{" "}
              <span className="text-slate-600">(Fall 2025, Fall 2026)</span>
            </li>
            <li>
              TRSS 428 / TRSP 628 - Railroad Inspection and Maintenance Management{" "}
              <span className="text-slate-600">(Fall 2026)</span>
            </li>
          </ul>
          <div className="mt-8 grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
            <Image
              src={withBasePath("/images/teaching/T1.jpg")}
              alt="Teaching activity photo 1"
              width={1600}
              height={1200}
              className="h-auto w-full rounded-md object-cover object-center"
            />
            <Image
              src={withBasePath("/images/teaching/T2.jpg")}
              alt="Teaching activity photo 2"
              width={1600}
              height={1200}
              className="h-auto w-full rounded-md object-cover object-center"
            />
            <Image
              src={withBasePath("/images/teaching/T3.jpg")}
              alt="Teaching activity photo 3"
              width={1600}
              height={1200}
              className="h-auto w-full rounded-md object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section id="students" className="scroll-mt-24 bg-[#f5f7fa] py-16 md:py-24 lg:py-28">
        <div className="fluid-gutter mx-auto w-full max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.05rem]">
            Students
          </h2>
          <p className="mt-4 inline-flex max-w-max rounded-md bg-[#1f3a5f]/10 px-3 py-1.5 text-sm font-semibold text-[#1f3a5f]">
            Currently recruiting
          </p>
          <div className="mt-6 max-w-6xl space-y-4 text-[17px] leading-8 text-slate-700">
            {studentsHomeParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <Link
            href="/students"
            className="mt-6 inline-flex rounded-md bg-[#1f3a5f] px-4 py-2 text-sm font-medium text-white hover:bg-[#172e4d]"
          >
            Recruitment details &amp; how to apply
          </Link>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 bg-[#ffffff] py-16 md:py-24 lg:py-28">
        <div className="fluid-gutter mx-auto w-full max-w-7xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-[2.05rem]">
            Contact
          </h2>
          <div className="mt-6 max-w-6xl space-y-6 text-[17px] leading-8 text-slate-700">
            <div>
              <p>Department of Transportation &amp; Urban Infrastructure Studies</p>
              <p>School of Engineering</p>
              <p>Morgan State University</p>
            </div>

            <div>
              <p>1700 E. Cold Spring Lane</p>
              <p>Baltimore, MD 21251</p>
            </div>

            <div>
              <p>Phone: 443-885-5064</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:yuliang.zhou@morgan.edu"
                  className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                >
                  yuliang.zhou@morgan.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
