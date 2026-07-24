import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  FolderKanban,
  BadgeCheck,
  UserRound,
  Mail,
  FileText,
  type LucideIcon,
} from "lucide-react";

export type ViewKey =
  | "overview"
  | "experience"
  | "skills"
  | "projects"
  | "certifications"
  | "profile"
  | "contact";

export type NavItem = {
  key: ViewKey;
  label: string;
  icon: LucideIcon;
  color: string;
};

export type NavGroup = {
  heading: string;
  items: NavItem[];
};

export const navGroups: NavGroup[] = [
  {
    heading: "My Work",
    items: [
      { key: "overview", label: "Overview", icon: LayoutDashboard, color: "#0f6cbd" },
      { key: "experience", label: "Experience", icon: Briefcase, color: "#0f6cbd" },
      { key: "skills", label: "Skills", icon: Sparkles, color: "#0f6cbd" },
    ],
  },
  {
    heading: "Portfolio",
    items: [
      { key: "projects", label: "Projects", icon: FolderKanban, color: "#107c41" },
      { key: "certifications", label: "Certifications", icon: BadgeCheck, color: "#8764b8" },
    ],
  },
  {
    heading: "About",
    items: [
      { key: "profile", label: "Profile", icon: UserRound, color: "#038387" },
      { key: "contact", label: "Contact", icon: Mail, color: "#038387" },
    ],
  },
];

export const docsItem: NavItem = {
  key: "profile",
  label: "Download CV",
  icon: FileText,
  color: "#c33d2e",
};

export const viewTitles: Record<ViewKey, string> = {
  overview: "My Overview",
  experience: "Professional Experience",
  skills: "Skills & Capabilities",
  projects: "Projects",
  certifications: "Certifications & Education",
  profile: "Profile",
  contact: "Contact",
};
