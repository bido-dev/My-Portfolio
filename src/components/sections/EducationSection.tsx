"use client";

import ScrollRevealWrapper from "@/components/ui/ScrollRevealWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaGraduationCap } from "react-icons/fa";

const education = [
  {
    degree: "Bachelor's in Computer Science College of Software Engineering",
    institution: "King Saud University",
    location: "Riyadh, Saudi Arabia",
    period: "2022 – 2026",
    description:
      "Studied software engineering, algorithms, data structures, databases, and web development. Graduated with honors.",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-24 px-6" style={{ backgroundColor: "#f7f7f7" }}>
      <div className="max-w-4xl mx-auto">
        <ScrollRevealWrapper>
          <SectionHeading
            title="Education"
            subtitle="My academic background"
          />
        </ScrollRevealWrapper>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-mid/30 hidden sm:block" />

          <div className="flex flex-col gap-10">
            {education.map(({ degree, institution, location, period, description }, i) => (
              <ScrollRevealWrapper key={i} delay={i * 150} origin="left">
                <div className="flex gap-6 sm:pl-16 relative">
                  {/* Circle on timeline */}
                  <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-purple-mid items-center justify-center shadow-lg shadow-purple-dark/30 flex-shrink-0">
                    <FaGraduationCap size={20} className="text-white" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-navy-heading">{degree}</h3>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-mid/10 text-purple-mid whitespace-nowrap">
                        {period}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-orange mb-1">
                      {institution} — {location}
                    </p>
                    <p className="text-sm text-navy-text/70 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </ScrollRevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
