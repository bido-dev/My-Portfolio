"use client";

import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollRevealWrapper from "@/components/ui/ScrollRevealWrapper";
import { skills } from "@/data/skills";

const SkillsGlobe = dynamic(
  () => import("@/components/ui/SkillsGlobe"),
  { ssr: false }
);

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-24 px-6"
      style={{
        background: "linear-gradient(to bottom, #57059e 0%, #4a00e0 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <ScrollRevealWrapper>
          <SectionHeading title="Technical Skills" light />
        </ScrollRevealWrapper>

        <p className="text-white/50 text-sm mb-8 -mt-4">
          Drag to spin
        </p>

        <SkillsGlobe skills={skills} />
      </div>
    </section>
  );
}
