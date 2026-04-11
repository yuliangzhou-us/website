"use client";

import { useEffect } from "react";
import Image from "next/image";

type ImageModalProps = {
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
};

export function ImageModal({ imageSrc, imageAlt, onClose }: ImageModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 transition-opacity duration-200"
      onClick={onClose}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[80vh] w-full max-w-[80vw]" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 z-10 -translate-y-10 rounded px-2 py-1 text-sm text-white"
        >
          Close
        </button>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1600}
          height={1200}
          className="max-h-[80vh] h-auto w-full object-contain"
          priority
        />
      </div>
    </div>
  );
}
