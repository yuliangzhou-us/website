"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { categorizeNews, formatNewsDate, newsYear, type NewsCategory, type NewsItem } from "@/content/news";
import { withBasePath } from "@/lib/with-base-path";
import { useHashTarget } from "@/lib/use-hash-target";
import { Lightbox, type LightboxImage } from "@/components/ui/lightbox";
import { SectionHeading } from "@/components/ui/section-heading";
import { ChevronDownIcon, ZoomIcon } from "@/components/ui/icons";

const VISIBLE_COUNT = 8;

const categoryStyles: Record<NewsCategory, { label: string; dot: string }> = {
  Publication: { label: "Papers", dot: "bg-brand" },
  Grant: { label: "Grants", dot: "bg-accent" },
  Talk: { label: "Talks", dot: "bg-sky-500" },
  Outreach: { label: "Outreach", dot: "bg-emerald-500" },
  Milestone: { label: "Milestones", dot: "bg-violet-500" },
  Update: { label: "Updates", dot: "bg-slate-400" }
};

type Filter = NewsCategory | "All";

type CategorizedNews = NewsItem & { category: NewsCategory; imageIndex?: number };

export function NewsSection({ items }: { items: NewsItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [showArchive, setShowArchive] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { news, images, counts } = useMemo(() => {
    const images: LightboxImage[] = [];
    const counts = new Map<NewsCategory, number>();
    const news: CategorizedNews[] = items.map((item) => {
      const category = categorizeNews(item.text);
      counts.set(category, (counts.get(category) ?? 0) + 1);
      if (!item.image) return { ...item, category };
      images.push({ src: withBasePath(item.image), alt: `${formatNewsDate(item.date)} news image`, caption: item.text });
      return { ...item, category, imageIndex: images.length - 1 };
    });
    return { news, images, counts };
  }, [items]);

  const filtered = filter === "All" ? news : news.filter((item) => item.category === filter);
  const hasArchive = filter === "All" && filtered.length > VISIBLE_COUNT;
  const visible = hasArchive ? filtered.slice(0, VISIBLE_COUNT) : filtered;
  const archived = hasArchive ? filtered.slice(VISIBLE_COUNT) : [];

  useHashTarget(
    (id) => news.some((item) => item.id === id),
    (id) => {
      let changed = false;
      const target = news.find((item) => item.id === id);
      if (filter !== "All" && target?.category !== filter) {
        setFilter("All");
        changed = true;
      }
      if (news.findIndex((item) => item.id === id) >= VISIBLE_COUNT && !showArchive) {
        setShowArchive(true);
        changed = true;
      }
      return changed;
    }
  );

  const filters: Filter[] = ["All", ...(Object.keys(categoryStyles) as NewsCategory[]).filter((c) => counts.has(c))];

  return (
    <section id="news" className="scroll-mt-20 bg-bg-subtle py-20 md:py-28">
      <div className="fluid-gutter mx-auto w-full max-w-7xl">
        <SectionHeading kicker="Latest updates" title="News" />

        <div data-reveal role="toolbar" aria-label="Filter news" className="mt-8 flex flex-wrap gap-2 font-sans">
          {filters.map((option) => {
            const selected = filter === option;
            const count = option === "All" ? news.length : counts.get(option);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(option)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                  selected
                    ? "border-brand bg-brand text-on-brand shadow-card"
                    : "border-line bg-surface text-ink-2 hover:border-brand/40 hover:text-brand"
                }`}
              >
                {option !== "All" ? (
                  <span aria-hidden="true" className={`h-2 w-2 rounded-full ${categoryStyles[option].dot}`} />
                ) : null}
                {option === "All" ? "All" : categoryStyles[option].label}
                <span className={`text-xs ${selected ? "text-on-brand/75" : "text-muted"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        <NewsTimeline items={visible} onOpenImage={setLightboxIndex} />

        {archived.length > 0 ? (
          <>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                showArchive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              aria-hidden={!showArchive}
              inert={!showArchive}
            >
              <div className="overflow-hidden">
                <NewsTimeline
                  items={archived}
                  previousYear={newsYear(visible[visible.length - 1].date)}
                  onOpenImage={setLightboxIndex}
                  continued
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowArchive((open) => !open)}
              aria-expanded={showArchive}
              className="btn-ghost mt-8"
            >
              {showArchive ? "Hide older news" : `Show ${archived.length} older updates`}
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${showArchive ? "rotate-180" : ""}`} />
            </button>
          </>
        ) : null}
      </div>

      <Lightbox images={images} index={lightboxIndex} onIndexChange={setLightboxIndex} />
    </section>
  );
}

type NewsTimelineProps = {
  items: CategorizedNews[];
  onOpenImage: (index: number) => void;
  /** Year of the item just before this list, so a continued list doesn't repeat that year's label. */
  previousYear?: string;
  continued?: boolean;
};

function NewsTimeline({ items, onOpenImage, previousYear, continued = false }: NewsTimelineProps) {
  if (items.length === 0) {
    return <p className="mt-10 text-muted">No news in this category yet.</p>;
  }

  return (
    <ol className={`relative ml-2 border-l border-line pl-6 sm:ml-3 sm:pl-10 ${continued ? "pt-6" : "mt-10"}`}>
      {items.map((item, index) => {
        const year = newsYear(item.date);
        const previous = index === 0 ? previousYear : newsYear(items[index - 1].date);
        const style = categoryStyles[item.category];
        return (
          <li key={item.id} className="relative pb-6 last:pb-0">
            {year !== previous ? (
              <p className="relative -ml-[2.05rem] mb-4 flex items-center gap-3 font-sans text-sm font-bold tracking-wide text-ink sm:-ml-[3.05rem]">
                <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 shadow-card">{year}</span>
              </p>
            ) : null}
            <span
              aria-hidden="true"
              className={`absolute -left-[1.83rem] mt-[1.35rem] h-2.5 w-2.5 rounded-full ring-4 ring-bg-subtle sm:-left-[2.83rem] ${style.dot}`}
            />
            <article
              id={item.id}
              className="card grid scroll-mt-28 items-start gap-4 p-4 transition-shadow hover:shadow-lift sm:p-5 md:grid-cols-[1fr_auto]"
            >
              <div className="space-y-2">
                <p className="flex flex-wrap items-center gap-2 font-sans text-xs">
                  <time dateTime={item.date} className="font-semibold uppercase tracking-wider text-brand">
                    {formatNewsDate(item.date)}
                  </time>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2 py-0.5 font-medium text-muted">
                    <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {item.category}
                  </span>
                </p>
                <p className="text-[1rem] leading-7 text-ink-2">{item.text}</p>
              </div>
              {item.image && item.imageIndex !== undefined ? (
                <button
                  type="button"
                  onClick={() => onOpenImage(item.imageIndex!)}
                  aria-label={`Enlarge image for ${formatNewsDate(item.date)} news`}
                  className="group relative block w-full overflow-hidden rounded-xl md:w-40"
                >
                  <Image
                    src={withBasePath(item.image)}
                    alt=""
                    width={320}
                    height={240}
                    className="aspect-[4/3] h-auto w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                    <ZoomIcon className="h-6 w-6" />
                  </span>
                </button>
              ) : null}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
