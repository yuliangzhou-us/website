import { HomePage } from "@/components/pages/home-page";
import {
  loadBiographyParagraphs,
  loadNewsItems,
  loadPublicationEntries,
  loadResearchInterests,
  loadResearchProjects,
  loadStudentsHomeParagraphs
} from "@/content/load-editable";

export default function Home() {
  const bioParagraphs = loadBiographyParagraphs();
  const researchInterests = loadResearchInterests();
  const researchProjects = loadResearchProjects();
  const newsItems = loadNewsItems();
  const publications = loadPublicationEntries();
  const studentsHomeParagraphs = loadStudentsHomeParagraphs();

  return (
    <HomePage
      bioParagraphs={bioParagraphs}
      researchInterests={researchInterests}
      researchProjects={researchProjects}
      newsItems={newsItems}
      publications={publications}
      studentsHomeParagraphs={studentsHomeParagraphs}
    />
  );
}
