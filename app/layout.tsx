import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap"
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
  alternates: {
    canonical: "/website/"
  },
  openGraph: {
    title: "Yuliang Zhou, Ph.D. | Morgan State University",
    description:
      "Assistant Professor at Morgan State University working on railroad transportation engineering, infrastructure sensing, and data-driven modeling.",
    url: "https://yuliangzhou-us.github.io/website/",
    siteName: "Yuliang Zhou",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSerif.className}>
        <div className="min-h-screen bg-[#ffffff]">
          <SiteHeader />
          <main className="w-full px-0 py-0">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
