import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiDocker,
  SiScrumalliance,
  SiLinux,
  SiFirebase,
} from "react-icons/si";
import type { Skill } from "@/types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", Icon: SiReact, category: "frontend" },
  { name: "Next.js", Icon: SiNextdotjs, category: "frontend" },
  { name: "TypeScript", Icon: SiTypescript, category: "frontend" },
  { name: "JavaScript", Icon: SiJavascript, category: "frontend" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, category: "frontend" },
  { name: "HTML5", Icon: SiHtml5, category: "frontend" },
  { name: "CSS3", Icon: SiCss, category: "frontend" },
  // Backend
  { name: "Node.js", Icon: SiNodedotjs, category: "backend" },
  { name: "Laravel", Icon: SiLaravel, category: "backend" },
  { name: "PHP", Icon: SiPhp, category: "backend" },
  { name: "MySQL", Icon: SiMysql, category: "backend" },
  { name: "PostgreSQL", Icon: SiPostgresql, category: "backend" },
  { name: "MongoDB", Icon: SiMongodb, category: "backend" },
  // Tools
  { name: "Git", Icon: SiGit, category: "tools" },
  { name: "GitHub", Icon: SiGithub, category: "tools" },
  { name: "Docker", Icon: SiDocker, category: "tools" },
  { name: "Agile", Icon: SiScrumalliance, category: "tools", iconScale: 1.4 },
  { name: "Linux", Icon: SiLinux, category: "tools" },
  { name: "Firebase", Icon: SiFirebase, category: "backend" },
];
