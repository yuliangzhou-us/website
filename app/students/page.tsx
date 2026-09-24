import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { email } from "@/lib/site-data";
import { withBasePath } from "@/lib/with-base-path";
import { ArrowLeftIcon, CheckIcon, EmailIcon, ExternalLinkIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Student recruitment | Yuliang Zhou",
  description: "Graduate student opportunities, expectations, and how to apply.",
  alternates: {
    canonical: "/website/students/"
  },
  openGraph: {
    title: "Student Recruitment | Yuliang Zhou",
    description:
      "Funded Ph.D. opportunities in Rail Transportation Engineering at Morgan State University.",
    url: "https://yuliangzhou-us.github.io/website/students/",
    siteName: "Yuliang Zhou",
    type: "website",
    images: [
      {
        url: "https://yuliangzhou-us.github.io/website/images/logo.jpg",
        width: 1200,
        height: 700,
        alt: "Morgan State University logo"
      }
    ]
  }
};

const programUrl =
  "https://www.morgan.edu/transportation-and-urban-infrastructure-studies/graduate/phd-transportation-and-urban-infrastructure-systems";
const admissionsUrl = "https://www.morgan.edu/school-of-graduate-studies/admissions";

const sections = [
  { id: "position", label: "Position Description" },
  { id: "directions", label: "Research Directions" },
  { id: "qualifications", label: "Qualifications" },
  { id: "apply", label: "How to Apply" }
];

const researchDirections = [
  "Digital twin for railroad and rail transit infrastructure",
  "Infrastructure monitoring, condition assessment, and predictive maintenance",
  "Sensing and data-driven modeling for infrastructure performance evaluation",
  "UAS-based inspection and computer vision for rail transit infrastructure",
  "Distributed acoustic sensing and fiber-optic sensing for track condition assessment",
  "Modeling, monitoring, and structural assessment for railroad bridges"
];

const preferredExperience = [
  "Programming in Python, MATLAB, or related tools",
  "Finite element modeling or computational analysis",
  "Data analysis, signal processing, or machine learning",
  "Experimental, sensing, or field data analysis"
];

function SectionTitle({ id, index, children }: { id: string; index: number; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex scroll-mt-24 items-baseline gap-3 text-2xl font-semibold tracking-tight text-ink">
      <span className="font-sans text-sm font-bold tabular-nums text-accent-ink">{String(index).padStart(2, "0")}</span>
      {children}
    </h2>
  );
}

export default function StudentsPage() {
  return (
    <div>
      <header className="relative overflow-hidden border-b border-line bg-bg-subtle">
        <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0" />
        <div className="fluid-gutter relative mx-auto w-full max-w-5xl py-12 text-center md:py-16">
          <p className="text-left font-sans text-sm">
            <Link href="/#students" className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-brand">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Students
            </Link>
          </p>
          <div className="mx-auto mt-6 w-full max-w-[340px] rounded-2xl bg-white p-4 shadow-card ring-1 ring-line">
            <Image
              src={withBasePath("/images/logo.jpg")}
              alt="Morgan State University logo"
              width={1200}
              height={700}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
          <p className="mt-8 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">
            Funded Ph.D. positions
          </p>
          <h1 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.4rem]">
            Prospective Ph.D. Students
            <br />
            in Rail Transportation Engineering
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-3 font-sans">
            <a href="#apply" className="btn-primary">
              How to apply
            </a>
            <a href={`mailto:${email}?subject=${encodeURIComponent("Prospective Ph.D. student inquiry")}`} className="btn-ghost">
              <EmailIcon className="h-4 w-4" />
              {email}
            </a>
          </div>
        </div>
      </header>

      <div className="fluid-gutter mx-auto grid w-full max-w-5xl gap-12 py-12 md:py-16 lg:grid-cols-[190px_1fr]">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24 font-sans">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">On this page</p>
            <ol className="mt-4 space-y-1 border-l border-line">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-2 transition-colors hover:border-accent hover:text-brand"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0 space-y-12 text-[1.05rem] leading-8 text-ink-2">
          <section className="space-y-4">
            <SectionTitle id="position" index={1}>
              Position Description
            </SectionTitle>
            <p>
              The Department of Transportation and Urban Infrastructure Studies at Morgan State University
              is recruiting funded Ph.D. students in Rail Transportation Engineering. The research
              focuses on rail infrastructure, with particular emphasis on track, bridges,
              and rail transit applications. Projects integrate sensing data, engineering knowledge, and
              computational methods to support safer, more reliable, and more efficient infrastructure
              management. Depending on students&apos; backgrounds and dissertation topics, work may include
              methodological development, computational modeling, and application-oriented studies.
            </p>
          </section>

          <section className="space-y-4">
            <SectionTitle id="directions" index={2}>
              Research Directions
            </SectionTitle>
            <p>Possible research directions include:</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {researchDirections.map((direction) => (
                <li key={direction} data-reveal className="card flex gap-3 p-4 text-[0.98rem] leading-7">
                  <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {direction}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <SectionTitle id="qualifications" index={3}>
              Qualifications
            </SectionTitle>
            <p>
              Applicants should have a strong academic background in civil engineering, transportation
              engineering, geotechnical engineering, structural engineering, or a closely related field.
            </p>
            <p>Experience in one or more of the following areas is preferred:</p>
            <ul className="space-y-2">
              {preferredExperience.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="mt-1.5 h-5 w-5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Applicants should also be willing to work independently, communicate clearly, and
              contribute to publications, conference presentations, and related research activities.
            </p>
          </section>

          <section className="card space-y-4 border-brand/20 bg-brand-soft/40 p-6 sm:p-8">
            <SectionTitle id="apply" index={4}>
              How to Apply
            </SectionTitle>
            <p>
              Interested students are encouraged to contact{" "}
              <a href={`mailto:${email}`} className="text-link">
                {email}
              </a>{" "}
              with a brief introduction and supporting materials, such as a CV and transcripts. Students
              may also apply directly through Morgan State University.
            </p>
            <div className="flex flex-col gap-3 pt-2 font-sans sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Prospective Ph.D. student inquiry")}`}
                className="btn-primary"
              >
                <EmailIcon className="h-4 w-4" />
                Email with your CV
              </a>
              <a href={programUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Ph.D. program information
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
              <a href={admissionsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                Application page
                <ExternalLinkIcon className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
