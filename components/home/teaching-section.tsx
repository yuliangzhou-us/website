"use client";

import { useState } from "react";
import Image from "next/image";
import { courses, teachingPhotos } from "@/lib/site-data";
import { withBasePath } from "@/lib/with-base-path";
import { Lightbox } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { ZoomIcon } from "@/components/ui/icons";

const photos = teachingPhotos.map((src, index) => ({
  src: withBasePath(src),
  alt: `Teaching activity photo ${index + 1}`
}));

export function TeachingSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="teaching" className="scroll-mt-20 bg-bg py-20 md:py-28">
      <div className="fluid-gutter mx-auto w-full max-w-7xl">
        <SectionHeading kicker="In the classroom" title="Teaching" />

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {courses.map((course) => (
            <li key={course.title} data-reveal className="card relative flex flex-col overflow-hidden p-6">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand to-accent" />
              <p className="flex flex-wrap gap-1.5 font-sans">
                {course.codes.map((code) => (
                  <span
                    key={code}
                    className="rounded-md bg-brand-soft px-2 py-0.5 text-xs font-bold tracking-wide text-brand"
                  >
                    {code}
                  </span>
                ))}
              </p>
              <h3 className="mt-4 text-lg font-semibold leading-snug text-ink">{course.title}</h3>
              <p className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {course.terms.map((term) => (
                  <span key={term} className="chip">
                    {term}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <li key={photo.src} data-reveal>
              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`Enlarge ${photo.alt.toLowerCase()}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-line shadow-card"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={600}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="aspect-[4/3] h-auto w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                  <ZoomIcon className="h-7 w-7" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox images={photos} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </section>
  );
}
