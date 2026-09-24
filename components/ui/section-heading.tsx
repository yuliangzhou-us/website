type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

/** Section title with a small accent kicker; optional children render right-aligned (actions, counts). */
export function SectionHeading({ kicker, title, description, children }: SectionHeadingProps) {
  return (
    <div data-reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-3xl space-y-3">
        <p className="flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent-ink">
          <span aria-hidden="true" className="h-[2px] w-8 rounded-full bg-accent" />
          {kicker}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-[2.2rem]">{title}</h2>
        {description ? <p className="text-[1.02rem] leading-7 text-muted">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}
