"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ResearchProject } from "@/content/projects";
import type { NewsItem } from "@/content/news";
import type { PublicationEntry } from "@/content/publications";
import { ImageModal } from "@/components/ui/image-modal";
import { withBasePath } from "@/lib/with-base-path";

type HomePageProps = {
  bioParagraphs: string[];
  researchInterests: string[];
  researchProjects: ResearchProject[];
  newsItems: NewsItem[];
  publications: PublicationEntry[];
  studentsHomeParagraphs: string[];
};

export function HomePage({
  bioParagraphs,
  researchInterests,
  researchProjects,
  newsItems,
  publications,
  studentsHomeParagraphs
}: HomePageProps) {
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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[390px_1fr] lg:items-start lg:gap-14">
            <div className="w-full max-w-[240px] space-y-4 sm:max-w-[280px] lg:max-w-[390px]">
              <Image
                src={withBasePath("/profile.jpg")}
                alt="Yuliang Zhou profile photo"
                width={280}
                height={280}
                className="aspect-square h-auto w-full rounded-full object-cover object-center"
                priority
              />
              <h1 className="text-[1.75rem] font-semibold tracking-tight text-slate-900 sm:text-[2.1rem] lg:text-[2.35rem]">
                Yuliang Zhou, Ph.D.
              </h1>
              <p className="text-lg font-medium text-[#1f3a5f]">Assistant Professor</p>
              <p className="text-base text-slate-600">
                Department of Transportation &amp; Urban Infrastructure Studies
                <br />
                Morgan State University
              </p>
              <p className="text-[15px] text-slate-700">
                <a
                  href="mailto:yuliang.zhou@morgan.edu"
                  className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                >
                  Email
                </a>
                {" · "}
                <a
                  href="https://scholar.google.com/citations?user=pg8L1nkAAAAJ&hl=en&oi=ao"
                  className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                >
                  Google Scholar
                </a>
                {" · "}
                <a
                  href="https://www.linkedin.com/in/yuliang-zhou-527508289/"
                  className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                >
                  LinkedIn
                </a>
                {" · "}
                <a
                  href="https://www.morgan.edu/transportation-and-urban-infrastructure-studies/faculty-and-staff/dr-yuliang-zhou"
                  className="underline decoration-slate-400 underline-offset-4 hover:text-slate-900"
                >
                  Morgan Profile
                </a>
              </p>
            </div>

            <div className="space-y-10 lg:pt-1">
              <div className="max-w-6xl space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-[1.8rem]">
                  Biography
                </h2>
                {bioParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-8 text-slate-700">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="grid gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-14">
                <div className="self-start space-y-4 md:pr-1">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                    Research Interests
                  </h3>
                  <ul className="space-y-2.5 text-base leading-8 text-slate-700">
                    {researchInterests.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="self-start space-y-4 md:pl-1">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                    Education
                  </h3>
                  <ul className="space-y-2.5 text-base leading-8 text-slate-700">
                    <li className="space-y-0">
                      <p className="font-medium text-slate-900 md:whitespace-nowrap">
                        Ph.D. in Civil Engineering
                      </p>
                      <p>The Pennsylvania State University, 2025</p>
                    </li>
                    <li className="space-y-0">
                      <p className="font-medium text-slate-900 md:whitespace-nowrap">
                        Ph.D. in Transportation Engineering
                      </p>
                      <p>Tongji University, 2021</p>
                    </li>
                    <li className="space-y-0">
                      <p className="font-medium text-slate-900 md:whitespace-nowrap">
                        B.S. in Traffic Engineering
                      </p>
                      <p>Tongji University, 2016</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="news"
        className="scroll-mt-24 bg-[#f5f7fa] py-20 md:py-28 lg:min-h-[75vh] lg:py-32"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
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
