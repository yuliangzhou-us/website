import Link from "next/link";
import { email } from "@/lib/site-data";
import { ArrowRightIcon, EmailIcon } from "@/components/ui/icons";

export function StudentsSection({ paragraphs }: { paragraphs: string[] }) {
  return (
    <section id="students" className="scroll-mt-20 bg-bg-subtle py-20 md:py-28">
      <div className="fluid-gutter mx-auto w-full max-w-7xl">
        {/* Fixed navy palette in both themes so the call-to-action stands out. */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#0c2244_0%,#13305c_55%,#1d4a86_100%)] px-6 py-12 text-white shadow-lift sm:px-12 md:py-16"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]"
          />
          <div aria-hidden="true" className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#5b9bf0]/25 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="space-y-5">
              <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#f7b27a]">
                <span aria-hidden="true" className="h-[2px] w-8 rounded-full bg-[#e87722]" />
                Join the group
              </p>
              <h2 className="text-3xl font-semibold tracking-tight md:text-[2.2rem]">Students</h2>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-sans text-sm font-semibold ring-1 ring-white/20">
                <span className="h-2 w-2 rounded-full bg-[#f59e4b]" aria-hidden="true" />
                Currently recruiting
              </p>
              <div className="space-y-4 text-[1.05rem] leading-8 text-white/85">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 font-sans sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                href="/students"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#13305c] shadow-card transition hover:bg-[#fdf1e6]"
              >
                Recruitment details &amp; how to apply
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`mailto:${email}?subject=${encodeURIComponent("Prospective Ph.D. student inquiry")}`}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/35 transition hover:bg-white/10"
              >
                <EmailIcon className="h-4 w-4" />
                Email about openings
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
