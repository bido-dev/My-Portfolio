"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import TypewriterText from "@/components/ui/TypewriterText";
import SocialLinks from "@/components/ui/SocialLinks";
import { FaDownload } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ParticleBackground = dynamic(
  () => import("@/components/ui/ParticleBackground"),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #57059e 0%, #2506ad 40%, #000031 100%)",
      }}
    >
      <ParticleBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-16 sm:py-24 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="text-white/80 text-base sm:text-lg mb-2 font-nunito">Hello, World! 👋</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            I&apos;m{" "}
            <span className="text-orange">Abdalla Ammar</span>
          </h1>
          <div className="text-xl sm:text-2xl text-white/90 font-medium mb-6 min-h-[2.5rem]">
            <TypewriterText
              strings={[
                "Full Stack Developer",
                "React Developer",
                "Next.js Developer",
                "Laravel Developer",
                "Open Source Enthusiast",
              ]}
            />
          </div>
          <p className="text-white/70 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
            Passionate about building products that solve real problems.
            I translate complex user requirements into elegant, scalable web applications, aligning clean code with clear product strategy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-purple-btn text-white font-semibold text-sm uppercase tracking-wider hover:bg-purple-btn-hover transition-colors shadow-lg shadow-purple-dark/40"
            >
              <FaDownload size={14} />
              View Resume
            </a>
            <a
              href="mailto:abdallamohammed.ammar@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-orange text-orange font-semibold text-sm uppercase tracking-wider hover:bg-orange hover:text-white transition-colors"
            >
              <MdEmail size={16} />
              Hire Me
            </a>
          </div>

          <SocialLinks className="justify-center md:justify-start mb-16 md:mb-0" />
        </div>

        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-orange/60 shadow-2xl shadow-purple-dark/50">
            {/* Placeholder shown behind image */}
            <div className="absolute inset-0 flex items-center justify-center bg-purple-mid text-6xl font-bold text-white/30 select-none">
              AB
            </div>
            <Image
              src="/images/portfolio.png"
              alt="Abdalla Ammar"
              fill
              sizes="(max-width: 640px) 224px, 288px"
              className="object-cover object-top relative "
              priority
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs animate-bounce">
        <span>Scroll down</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
