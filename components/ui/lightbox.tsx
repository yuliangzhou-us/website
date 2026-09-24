"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui/icons";

export type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

/** Full-screen image viewer on a native <dialog>: Esc closes, arrow keys step through the gallery. */
export function Lightbox({ images, index, onIndexChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const position = index ?? 0;
  const current = index !== null ? (images[index] ?? null) : null;
  const open = current !== null;
  const count = images.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open || count < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onIndexChange((position + 1) % count);
      if (event.key === "ArrowLeft") onIndexChange((position - 1 + count) % count);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, position, count, onIndexChange]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={current?.alt ?? "Image viewer"}
      onClose={() => onIndexChange(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onIndexChange(null);
      }}
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-[rgb(5_10_20/0.85)] backdrop:backdrop-blur-sm open:animate-fade-in"
    >
      {current ? (
        <div className="flex h-[100dvh] w-screen flex-col items-center justify-center gap-4 px-4 py-6 sm:px-16">
          <div className="flex w-full max-w-6xl items-center justify-between font-sans text-sm text-white/80">
            <span>{count > 1 ? `${position + 1} / ${count}` : ""}</span>
            <button
              type="button"
              onClick={() => onIndexChange(null)}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-white/90 transition hover:bg-white/10"
              autoFocus
            >
              <CloseIcon className="h-5 w-5" />
              Close
            </button>
          </div>

          <div
            className="relative flex min-h-0 w-full max-w-6xl flex-1 items-center justify-center"
            onClick={(event) => {
              if (event.target === event.currentTarget) onIndexChange(null);
            }}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={1600}
              height={1200}
              className="max-h-full w-auto max-w-full animate-fade-in rounded-lg object-contain shadow-2xl"
              priority
            />
            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => onIndexChange((position - 1 + count) % count)}
                  aria-label="Previous image"
                  className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white transition hover:bg-black/60 sm:-left-14"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => onIndexChange((position + 1) % count)}
                  aria-label="Next image"
                  className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white transition hover:bg-black/60 sm:-right-14"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            ) : null}
          </div>

          {current.caption ? (
            <p className="max-w-3xl text-center font-sans text-sm leading-6 text-white/80">{current.caption}</p>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
}
