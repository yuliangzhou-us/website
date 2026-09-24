"use client";

import { useEffect, useRef } from "react";

/**
 * Lets a section respond to "#item-id" links (from search results or shared URLs) for items it renders.
 * `reveal` should make the item visible (clear filters, open an archive) and return true if that
 * changed the layout, so scrolling waits for the expand animation. The item is then scrolled to and
 * briefly highlighted via the .is-flashing class.
 */
export function useHashTarget(ownsId: (id: string) => boolean, reveal: (id: string) => boolean) {
  const ownsIdRef = useRef(ownsId);
  const revealRef = useRef(reveal);

  useEffect(() => {
    ownsIdRef.current = ownsId;
    revealRef.current = reveal;
  });

  useEffect(() => {
    let timer: number | undefined;

    const handle = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id || !ownsIdRef.current(id)) return;
      const layoutChanged = revealRef.current(id);

      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => {
          const element = document.getElementById(id);
          if (!element) return;
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          element.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
          element.classList.remove("is-flashing");
          void element.offsetWidth; // restart the animation if the same item is targeted again
          element.classList.add("is-flashing");
        },
        layoutChanged ? 350 : 60
      );
    };

    handle();
    window.addEventListener("hashchange", handle);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", handle);
    };
  }, []);
}
