export type NavItem = {
  label: string;
  href: string;
};

export type ProfileLinkKind = "email" | "scholar" | "linkedin" | "web";

export type ProfileLink = {
  label: string;
  href: string;
  kind: ProfileLinkKind;
};

export type EducationEntry = {
  degree: string;
  school: string;
  year: string;
};

export type Course = {
  codes: string[];
  title: string;
  terms: string[];
};

export const siteTitle = "Yuliang Zhou";
export const siteUrl = "https://yuliangzhou-us.github.io/website/";

export const email = "yuliang.zhou@morgan.edu";
export const phone = "443-885-5064";

export const department = "Department of Transportation & Urban Infrastructure Studies";
export const school = "School of Engineering";
export const university = "Morgan State University";
export const addressLines = ["1700 E. Cold Spring Lane", "Baltimore, MD 21251"];
export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Morgan+State+University+1700+E+Cold+Spring+Ln+Baltimore+MD+21251";

export const scholarUrl = "https://scholar.google.com/citations?user=pg8L1nkAAAAJ";

export const profileLinks: ProfileLink[] = [
  { label: "Email", href: `mailto:${email}`, kind: "email" },
  { label: "Google Scholar", href: `${scholarUrl}&hl=en&oi=ao`, kind: "scholar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yuliang-zhou-527508289/", kind: "linkedin" },
  {
    label: "Morgan Profile",
    href: "https://www.morgan.edu/transportation-and-urban-infrastructure-studies/faculty-and-staff/dr-yuliang-zhou",
    kind: "web"
  }
];

export const navItems: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "News", href: "/#news" },
  { label: "Research", href: "/#research" },
  { label: "Publication", href: "/#publications" },
  { label: "Teaching", href: "/#teaching" },
  { label: "Students", href: "/#students" },
  { label: "Contact", href: "/#contact" }
];

export const education: EducationEntry[] = [
  { degree: "Ph.D. in Civil Engineering", school: "The Pennsylvania State University", year: "2025" },
  { degree: "Ph.D. in Transportation Engineering", school: "Tongji University", year: "2021" },
  { degree: "B.S. in Traffic Engineering", school: "Tongji University", year: "2016" }
];

export const courses: Course[] = [
  {
    codes: ["TRSS 302"],
    title: "Introduction to Rail Transportation Systems",
    terms: ["Spring 2026"]
  },
  {
    codes: ["TRSS 426", "TRSP 626"],
    title: "Rail Transportation Engineering",
    terms: ["Fall 2025", "Fall 2026"]
  },
  {
    codes: ["TRSS 428", "TRSP 628"],
    title: "Railroad Inspection and Maintenance Management",
    terms: ["Fall 2026"]
  }
];

export const teachingPhotos = [
  "/images/teaching/T1.jpg",
  "/images/teaching/T2.jpg",
  "/images/teaching/T3.jpg",
  "/images/teaching/T4.jpg"
];
