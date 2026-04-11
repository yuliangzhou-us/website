import { HomePage } from "@/components/pages/home-page";
import {
  loadNewsItems,
  loadPublicationEntries,
  loadResearchInterests,
  loadResearchProjects,
  loadStudentsHomeParagraphs
} from "@/content/load-editable";

export default function Home() {
  const researchInterests = loadResearchInterests();
  const researchProjects = loadResearchProjects();
  const newsItems = loadNewsItems();
  const publications = loadPublicationEntries();
  const studentsHomeParagraphs = loadStudentsHomeParagraphs();

  return (
    <HomePage
      researchInterests={researchInterests}
      researchProjects={researchProjects}
      newsItems={newsItems}
      publications={publications}
      studentsHomeParagraphs={studentsHomeParagraphs}
    />
  );
}
