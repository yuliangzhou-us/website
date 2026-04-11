export type NavItem = {
  label: string;
  href: string;
};

export type SimpleCard = {
  title: string;
  description: string;
};

export const siteTitle = "Yuliang Zhou";

export const navItems: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "News", href: "/#news" },
  { label: "Research", href: "/#research" },
  { label: "Publication", href: "/#publications" },
  { label: "Teaching", href: "/#teaching" },
  { label: "Students", href: "/#students" },
  { label: "Contact", href: "/#contact" }
];

export const researchThemes: SimpleCard[] = [
  {
    title: "Theme 1",
    description: "Placeholder summary for a core research direction."
  },
  {
    title: "Theme 2",
    description: "Placeholder summary for another area of focus."
  },
  {
    title: "Theme 3",
    description: "Placeholder summary for an emerging line of inquiry."
  }
];

export const featuredProjects: SimpleCard[] = [
  {
    title: "Project Placeholder A",
    description: "Short placeholder for a future project overview."
  },
  {
    title: "Project Placeholder B",
    description: "Short placeholder for a future project overview."
  },
  {
    title: "Project Placeholder C",
    description: "Short placeholder for a future project overview."
  }
];

export const selectedPublications: SimpleCard[] = [
  {
    title: "Publication Placeholder 1",
    description: "Citation details will be added later."
  },
  {
    title: "Publication Placeholder 2",
    description: "Citation details will be added later."
  }
];

export const teachingSnapshot: SimpleCard[] = [
  {
    title: "Course Placeholder",
    description: "Course title, term, and role will be added later."
  },
  {
    title: "Mentorship Placeholder",
    description: "Student mentorship details will be added later."
  }
];
