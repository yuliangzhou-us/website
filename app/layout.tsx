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
  title: "Yuliang Zhou",
  description: "Research-oriented personal academic website."
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
