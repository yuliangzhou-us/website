import Link from "next/link";
import { ArrowLeftIcon } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="blueprint pointer-events-none absolute inset-0" />
      <div className="fluid-gutter relative mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center py-24 text-center">
        <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-accent-ink">Error 404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-md text-lg leading-8 text-muted">
          The page you were looking for doesn&apos;t exist or may have moved. Try the search (press{" "}
          <kbd className="rounded border border-line bg-surface px-1.5 font-sans text-sm">/</kbd>) or head back home.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeftIcon className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
