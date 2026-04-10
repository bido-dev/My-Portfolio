"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  return (
    <main
      className="min-h-screen pt-24 pb-20 px-6"
      style={{
        background: "linear-gradient(to bottom, #000031 0%, #00002c 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-orange transition-colors text-sm mb-10"
        >
          <FaArrowLeft size={12} />
          Back to portfolio
        </Link>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-2">
          All Projects
        </h1>
        <p className="text-white/50 text-sm sm:text-base mb-12">
          A full list of things I&apos;ve built and shipped.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(({ slug, title, description, image, tags, role, period }) => (
            <Link
              key={slug}
              href={`/projects/${slug}`}
              className="group relative rounded-2xl overflow-hidden bg-navy-mid border border-white/10 shadow-xl shadow-black/40 flex flex-col hover:border-orange/40 transition-colors"
            >
              {/* Image */}
              <div className="relative w-full h-48 overflow-hidden bg-purple-mid/30 flex-shrink-0">
                {!imgErrors.has(slug) && (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-16 group-hover:scale-105 transition-transform duration-500"
                    onError={() => setImgErrors(prev => {
                      if (prev.has(slug)) return prev;
                      const next = new Set(prev);
                      next.add(slug);
                      return next;
                    })}
                  />
                )}
                {imgErrors.has(slug) && (
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 text-5xl font-bold select-none">
                    {title[0]}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-white font-bold text-lg mb-1">{title}</h2>

                {(role || period) && (
                  <p className="text-white/40 text-xs mb-2">
                    {[role, period].filter(Boolean).join(" · ")}
                  </p>
                )}

                <p className="text-white/60 text-sm leading-relaxed flex-1 line-clamp-3">
                  {description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-mid/40 text-cyan border border-cyan/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 text-xs font-semibold text-orange group-hover:translate-x-1 transition-transform">
                  View details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
