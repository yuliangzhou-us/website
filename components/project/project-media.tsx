"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/lightbox";
import { ZoomIcon } from "@/components/ui/icons";

type ProjectMediaProps = {
  title: string;
  coverImage: string;
  videoEmbed?: string;
  /** Figure URLs, already base-path prefixed. */
  figures: string[];
  sideBySide: boolean;
  reducedFigureSize: boolean;
};

function VideoFrame({ src, title, className }: { src: string; title: string; className: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-black shadow-card ${className}`}>
      <iframe
        src={src}
        title={`${title} overview video`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}

/** Video + figures for a project detail page; figures open in a lightbox. */
export function ProjectMedia({ title, coverImage, videoEmbed, figures, sideBySide, reducedFigureSize }: ProjectMediaProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const images = (figures.length > 0 ? figures : [coverImage]).map((src, index) => ({
    src,
    alt: figures.length > 0 ? `${title} — figure ${index + 1}` : `${title} media`
  }));

  const figureButton = (index: number, frameClass: string, imageClass: string) => (
    <figure key={`${images[index].src}-${index}`} className={frameClass}>
      <button
        type="button"
        onClick={() => setLightboxIndex(index)}
        aria-label={`Enlarge ${images[index].alt}`}
        className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-card"
      >
        <Image
          src={images[index].src}
          alt={images[index].alt}
          width={1600}
          height={1000}
          className={`rounded-xl object-contain object-center transition-transform duration-500 group-hover:scale-[1.02] ${imageClass}`}
          priority={index === 0 && !videoEmbed}
          sizes="(max-width: 768px) 100vw, 640px"
        />
        <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition group-hover:opacity-100">
          <ZoomIcon className="h-4 w-4" />
        </span>
      </button>
    </figure>
  );

  let content: React.ReactNode;
  if (!videoEmbed && figures.length === 0) {
    content = figureButton(0, "mx-auto w-full md:w-3/4", "h-auto w-full");
  } else if (sideBySide && videoEmbed && figures.length > 0) {
    content = (
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        <VideoFrame src={videoEmbed} title={title} className="aspect-video md:aspect-auto md:h-[338px]" />
        <div className="space-y-4">
          {images.map((_, index) => figureButton(index, "h-[338px] w-full", "h-full w-full"))}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 md:gap-8">
        {videoEmbed ? <VideoFrame src={videoEmbed} title={title} className="aspect-video w-full" /> : null}
        {figures.map((_, index) =>
          reducedFigureSize
            ? figureButton(index, "mx-auto h-[338px] w-full max-w-[640px]", "h-full w-auto max-w-full")
            : figureButton(index, "mx-auto w-full max-w-[640px]", "h-auto w-full")
        )}
      </div>
    );
  }

  return (
    <>
      {content}
      <Lightbox images={images} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </>
  );
}
