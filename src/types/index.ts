import type { IconType } from "react-icons";

export interface Skill {
  name: string;
  Icon: IconType;
  category: "frontend" | "backend" | "tools" | "other";
  iconScale?: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;

  // Detail-page fields (all optional)
  role?: string;
  period?: string;
  overview?: string;
  features?: string[];
  challenges?: string;
  gallery?: string[];
}

export interface NavLink {
  label: string;
  href: string;
}
