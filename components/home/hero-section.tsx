import Image from "next/image";
import Link from "next/link";
import { department, education, profileLinks, university } from "@/lib/site-data";
import { withBasePath } from "@/lib/with-base-path";
import { ArrowRightIcon, ProfileLinkIcon } from "@/components/ui/icons";

type HeroSectionProps = {
  bioParagraphs: string[];
  researchInterests: string[];
};

export function HeroSection({ bioParagraphs, researchInterests }: HeroSectionProps) {
  return (
    <section id="home" className="relative scroll-mt-24 overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="blueprint absolute inset-0" />
        <div className="absolute -left-40 -top-48 h-[36rem] w-[36rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="fluid-gutter relative mx-auto w-full max-w-7xl pb-20 pt-12 md:pb-28 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
          <div data-reveal className="space-y-6 text-center lg:text-left">
            <div className="relative mx-auto w-52 sm:w-60 lg:mx-0 lg:w-[17rem]">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-full bg-gradient-to-br from-brand via-brand/50 to-accent opacity-80 blur-[1px]"
              />
              <Image
                src={withBasePath("/profile.jpg")}
                alt="Yuliang Zhou profile photo"
                width={320}
                height={320}
                className="relative aspect-square h-auto w-full rounded-full border-[5px] border-bg object-cover object-center"
                priority
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-[2.1rem] font-semibold leading-tight tracking-tight text-ink sm:whitespace-nowrap sm:text-[2.4rem] lg:text-[2.15rem]">
                Yuliang Zhou, Ph.D.
              </h1>
              <p className="font-sans text-base font-semibold text-brand">Assistant Professor</p>
              <p className="text-[0.98rem] leading-6 text-muted">
                {department}
                <br />
                {university}
              </p>
            </div>

            <Link
              href="/students"
              className="group inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 py-1.5 pl-3 pr-4 font-sans text-sm font-semibold text-accent-ink transition hover:bg-accent/15"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              Recruiting Ph.D. students
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {profileLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.kind === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="btn-ghost px-3.5 py-1.5 text-[0.8rem]"
                  >
                    <ProfileLinkIcon kind={link.kind} className="h-4 w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10 lg:pt-4">
            <div data-reveal className="space-y-4">
              <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">
                <span aria-hidden="true" className="h-[2px] w-8 rounded-full bg-accent" />
                Welcome
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-[2.2rem]">About me</h2>
              {bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? "text-[1.08rem] leading-8 text-ink-2" : "text-base leading-8 text-ink-2"}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div data-reveal className="card p-6">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">Education</h3>
                <ol className="mt-5 space-y-5 border-l border-line pl-5">
                  {education.map((entry) => (
                    <li key={`${entry.degree}-${entry.year}`} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-brand ring-2 ring-brand/20"
                      />
                      <p className="font-semibold leading-6 text-ink">{entry.degree}</p>
                      <p className="text-[0.92rem] leading-6 text-muted">
                        {entry.school} · <span className="font-sans text-[0.85rem]">{entry.year}</span>
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div data-reveal className="card p-6">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Research Interests
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {researchInterests.map((interest) => (
                    <li
                      key={interest}
                      className="inline-flex items-center gap-2 rounded-xl border border-brand/15 bg-brand-soft px-3 py-2 font-sans text-[0.82rem] font-medium leading-5 text-brand"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
