import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { BackToTop } from "@/components/layout/back-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { buildSearchIndex } from "@/lib/search-index";
import { education, email, profileLinks, siteUrl, university } from "@/lib/site-data";
import { themeInitScript } from "@/lib/theme";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif"
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yuliangzhou-us.github.io"),
  title: "Yuliang Zhou, Ph.D. | Morgan State University",
  description:
    "Yuliang Zhou is an Assistant Professor at Morgan State University. Research areas include railroad transportation engineering, infrastructure sensing, digital twin, and data-driven condition assessment.",
  keywords: [
    "Yuliang Zhou",
    "Morgan State University",
    "Assistant Professor",
    "Railroad Transportation Engineering",
    "Infrastructure sensing",
    "Digital twin",
    "Condition assessment",
    "Rail transportation"
  ],
  openGraph: {
    title: "Yuliang Zhou, Ph.D. | Morgan State University",
    description:
      "Assistant Professor at Morgan State University working on railroad transportation engineering, infrastructure sensing, and data-driven modeling.",
    url: siteUrl,
    siteName: "Yuliang Zhou",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a111e" }
  ]
};

/** schema.org Person data so search engines can show a richer profile result. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuliang Zhou",
  honorificSuffix: "Ph.D.",
  jobTitle: "Assistant Professor",
  url: siteUrl,
  image: `${siteUrl}profile.jpg`,
  email: `mailto:${email}`,
  worksFor: { "@type": "CollegeOrUniversity", name: university },
  alumniOf: [...new Set(education.map((entry) => entry.school))].map((name) => ({
    "@type": "CollegeOrUniversity",
    name
  })),
  sameAs: profileLinks.filter((link) => link.kind !== "email").map((link) => link.href),
  knowsAbout: [
    "Railroad transportation engineering",
    "Infrastructure sensing",
    "Digital twin",
    "Condition assessment",
    "Distributed fiber optic sensing"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchItems = buildSearchIndex();

  return (
    <html lang="en" suppressHydrationWarning className={`${sourceSerif.variable} ${inter.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only z-50 rounded-full bg-brand px-4 py-2 font-sans text-sm font-semibold text-on-brand focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="flex min-h-screen flex-col">
          <SiteHeader searchItems={searchItems} />
          <main id="main-content" className="w-full flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <BackToTop />
        <RevealObserver />
      </body>
    </html>
  );
}
