"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TiltCard from "@/components/ui/TiltCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollRevealWrapper from "@/components/ui/ScrollRevealWrapper";
import { projects } from "@/data/projects";
export default function ProjectsSection() {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 px-6"
      style={{
        background: "linear-gradient(to bottom, #000031 0%, #00002c 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollRevealWrapper>
          <SectionHeading title="My Projects" light />
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.filter((p) => p.featured).map(({ slug, title, description, image, tags }, i) => (
            <ScrollRevealWrapper
              key={title}
              delay={i * 120}
              origin="bottom"
              className="h-full"
            >
              <Link href={`/projects/${slug}`} className="block h-full">
                <TiltCard
                  maxTilt={10}
                  glare
                  className="group relative rounded-2xl overflow-hidden bg-navy-mid border border-white/10 shadow-xl shadow-black/40 h-full flex flex-col cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative w-full h-36 sm:h-48 flex-shrink-0 overflow-hidden bg-purple-mid/30">
                    {!imgErrors.has(slug) && (
                      <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-8 sm:p-16 group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImgErrors(prev => {
                          if (prev.has(slug)) return prev;
                          const next = new Set(prev);
                          next.add(slug);
                          return next;
                        })}
                      />
                    )}
                    {/* Placeholder — only shown when image fails to load */}
                    {imgErrors.has(slug) && (
                      <div className="absolute inset-0 flex items-center justify-center text-white/20 text-4xl font-bold select-none">
                        {title[0]}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-5 flex flex-col flex-1 min-w-0">
                    <h3 className="text-white font-bold text-sm sm:text-lg mb-1 sm:mb-2">{title}</h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed flex-1 line-clamp-3 sm:line-clamp-none">
                      {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-4">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-purple-mid/40 text-cyan border border-cyan/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View details hint */}
                    <div className="mt-3 text-[11px] sm:text-xs font-semibold text-orange group-hover:translate-x-1 transition-transform">
                      View details →
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </ScrollRevealWrapper>
          ))}
        </div>

        {/* View all */}
        <div className="flex justify-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-orange text-orange font-semibold text-sm uppercase tracking-wider hover:bg-orange hover:text-white transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
