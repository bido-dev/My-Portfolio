import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "@/data/projects";
import ProjectHeroImage from "@/components/ui/ProjectHeroImage";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Abdelhadi Boukarrad`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { title, description, image, tags, liveUrl, repoUrl, role, period,
    overview, features, challenges, gallery } = project;

  return (
    <main
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: "linear-gradient(to bottom, #000031 0%, #00002c 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-orange transition-colors text-sm mb-8"
        >
          <FaArrowLeft size={12} />
          Back to projects
        </Link>

        {/* Hero image */}
        <ProjectHeroImage src={image} alt={title} fallbackLetter={title[0]} />

        {/* Title + meta */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3">
          {title}
        </h1>
        <p className="text-white/70 text-sm sm:text-base mb-4">{description}</p>

        {(role || period) && (
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/50 mb-5">
            {role && <span><span className="text-orange font-semibold">Role:</span> {role}</span>}
            {period && <span><span className="text-orange font-semibold">Period:</span> {period}</span>}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-mid/40 text-cyan border border-cyan/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 mb-10">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-btn text-white font-semibold text-sm uppercase tracking-wider hover:bg-purple-btn-hover transition-colors shadow-lg"
            >
              <FaGithub size={16} /> Source
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-orange text-orange font-semibold text-sm uppercase tracking-wider hover:bg-orange hover:text-white transition-colors"
            >
              <FaExternalLinkAlt size={14} /> Live Site
            </a>
          )}
        </div>

        {/* Overview */}
        {overview && (
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-orange mb-3">
              Overview
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {overview}
            </p>
          </section>
        )}

        {/* Features */}
        {features && features.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-orange mb-3">
              Key Features
            </h2>
            <ul className="space-y-2">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-white/70 text-sm sm:text-base leading-relaxed"
                >
                  <span className="text-cyan flex-shrink-0">▸</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Challenges */}
        {challenges && (
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-orange mb-3">
              Challenges & Learnings
            </h2>
            <ul className="list-disc list-outside pl-5 space-y-3">
              {challenges.split("\n\n").map((item, i) => (
                <li key={i} className="text-white/70 text-sm sm:text-base leading-relaxed pl-1">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Gallery */}
        {gallery && gallery.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-orange mb-3">
              Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full aspect-video rounded-xl overflow-hidden bg-purple-mid/20 border border-white/10"
                >
                  <Image src={src} alt={`${title} screenshot ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
