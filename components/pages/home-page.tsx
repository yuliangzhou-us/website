import type { NewsItem } from "@/content/news";
import type { ResearchProject } from "@/content/projects";
import type { PublicationEntry } from "@/content/publications";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { NewsSection } from "@/components/home/news-section";
import { PublicationsSection } from "@/components/home/publications-section";
import { ResearchSection } from "@/components/home/research-section";
import { StudentsSection } from "@/components/home/students-section";
import { TeachingSection } from "@/components/home/teaching-section";

type HomePageProps = {
  bioParagraphs: string[];
  researchInterests: string[];
  researchProjects: ResearchProject[];
  newsItems: NewsItem[];
  publications: PublicationEntry[];
  studentsHomeParagraphs: string[];
};

export function HomePage({
  bioParagraphs,
  researchInterests,
  researchProjects,
  newsItems,
  publications,
  studentsHomeParagraphs
}: HomePageProps) {
  return (
    <>
      <HeroSection bioParagraphs={bioParagraphs} researchInterests={researchInterests} />
      <NewsSection items={newsItems} />
      <ResearchSection projects={researchProjects} />
      <PublicationsSection publications={publications} />
      <TeachingSection />
      <StudentsSection paragraphs={studentsHomeParagraphs} />
      <ContactSection />
    </>
  );
}
