import Link from "next/link";
import { department, navItems, profileLinks, siteTitle, university } from "@/lib/site-data";
import { ProfileLinkIcon } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-subtle font-sans">
      <div className="fluid-gutter mx-auto grid w-full max-w-7xl gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-serif text-xl font-semibold tracking-tight text-ink">{siteTitle}, Ph.D.</p>
          <p className="text-sm leading-6 text-muted">
            Assistant Professor
            <br />
            {department}
            <br />
            {university}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-2 transition-colors hover:text-brand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Connect</p>
          <ul className="mt-4 space-y-2 text-sm">
            {profileLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.kind === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="inline-flex items-center gap-2 text-ink-2 transition-colors hover:text-brand"
                >
                  <ProfileLinkIcon kind={link.kind} className="h-4 w-4" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="fluid-gutter mx-auto max-w-7xl py-5 text-xs text-muted">
          &copy; {new Date().getFullYear()} {siteTitle} · {university}
        </p>
      </div>
    </footer>
  );
}
