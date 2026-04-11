import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student recruitment | Yuliang Zhou",
  description: "Graduate student opportunities, expectations, and how to apply."
};

export default function StudentsPage() {
  return (
    <div className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8 lg:px-10">
        <p className="text-sm text-slate-600">
          <Link href="/#students" className="underline underline-offset-4 hover:text-slate-900">
            Back to Students
          </Link>
        </p>

        <header className="mt-5 space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-[2.25rem]">
            Graduate recruitment
          </h1>
          <p className="text-base text-slate-600">
            Detailed information for prospective Ph.D. students
          </p>
        </header>

        <main className="mt-10 space-y-8 text-[17px] leading-8 text-slate-700">
          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">Position Description</h3>
            <p>
              The research group at Morgan State University is recruiting Ph.D. students in Railroad
              Transportation Engineering. The research focuses on digital twin, infrastructure sensing,
              computer vision, and data-driven modeling for railroad and rail transit infrastructure. The
              overall goal is to develop analytical, computational, and field-informed approaches for
              infrastructure inspection, condition assessment, predictive maintenance, and performance
              evaluation.
            </p>
            <p>
              The work is centered on railroad transportation infrastructure, with particular interest in
              track systems, bridges, and selected rail transit applications. The research emphasizes the
              integration of sensing data, engineering knowledge, and computational methods to support
              safer, more reliable, and more efficient infrastructure management. Depending on the
              student&apos;s background and the specific Ph.D. topic, the research may involve methodological
              development, computational modeling, and application-oriented studies.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">Research Directions</h3>
            <p>Possible research directions include:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Digital twin for railroad and rail transit infrastructure systems</li>
              <li>Infrastructure monitoring, condition assessment, and predictive maintenance</li>
              <li>Sensing and data-driven modeling for infrastructure performance evaluation</li>
              <li>UAS-based inspection and computer vision for rail transit infrastructure</li>
              <li>Distributed acoustic sensing and fiber-optic sensing for track condition assessment</li>
              <li>Modeling, monitoring, and structural assessment for railroad bridges</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">Qualifications</h3>
            <p>
              Applicants should have a strong academic background in civil engineering, transportation
              engineering, geotechnical engineering, structural engineering, or a closely related field.
            </p>
            <p>Experience in one or more of the following areas is preferred:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Programming in Python, MATLAB, or related tools</li>
              <li>Finite element modeling or computational analysis</li>
              <li>Data analysis, signal processing, or machine learning</li>
              <li>Experimental, sensing, or field data analysis</li>
            </ul>
            <p>
              Applicants should also be willing to work independently, communicate clearly, and
              contribute to publications, conference presentations, and related research activities.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">How to Apply</h3>
            <p>
              Interested students are encouraged to contact{" "}
              <a
                href="mailto:Yuliang.Zhou@morgan.edu"
                className="text-[#3e6fb6] underline underline-offset-4 hover:text-[#2f5f9f]"
              >
                Yuliang.Zhou@morgan.edu
              </a>{" "}
              with a brief introduction and supporting materials, such as a CV and transcripts. Students
              may also apply directly through Morgan State University.
            </p>
            <p>
              Ph.D. program information:{" "}
              <a
                href="https://www.morgan.edu/transportation-and-urban-infrastructure-studies/graduate/phd-transportation-and-urban-infrastructure-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3e6fb6] underline underline-offset-4 hover:text-[#2f5f9f]"
              >
                https://www.morgan.edu/transportation-and-urban-infrastructure-studies/graduate/phd-transportation-and-urban-infrastructure-systems
              </a>
            </p>
            <p>
              Application page:{" "}
              <a
                href="https://www.morgan.edu/school-of-graduate-studies/admissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3e6fb6] underline underline-offset-4 hover:text-[#2f5f9f]"
              >
                https://www.morgan.edu/school-of-graduate-studies/admissions
              </a>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
