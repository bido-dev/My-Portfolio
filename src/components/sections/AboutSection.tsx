"use client";

import Image from "next/image";
import { useState } from "react";
import ScrollRevealWrapper from "@/components/ui/ScrollRevealWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaMapMarkerAlt, FaEnvelope, FaGithub } from "react-icons/fa";

const infoItems = [
  { Icon: FaMapMarkerAlt, label: "Location", value: "Saudi Arabia" },
  { Icon: FaEnvelope, label: "Email", value: "abdallamohammed.ammar@gmail.com" },
  { Icon: FaGithub, label: "GitHub", value: "github.com/bido-dev" },
];

export default function AboutSection() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section id="about" className="py-16 sm:py-24 px-6" style={{ backgroundColor: "#f7f7f7" }}>
      <div className="max-w-6xl mx-auto">
        <ScrollRevealWrapper>
          <SectionHeading
            title="About Me"
            subtitle="A little bit about who I am"
          />
        </ScrollRevealWrapper>

        <div className="flex flex-col md:flex-row items-center gap-14">
          {/* Photo */}
          <ScrollRevealWrapper origin="left" className="flex-shrink-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-navy-deep/30 group">
              <Image
                src="/images/hero-photo.jpg"
                alt="About Abdelhadi"
                fill
                sizes="(max-width: 640px) 256px, 320px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(false)}
              />
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-purple-mid text-7xl font-bold text-white/30 select-none">
                  AB
                </div>
              )}
            </div>
          </ScrollRevealWrapper>

          {/* Content */}
          <ScrollRevealWrapper origin="right" className="flex-1">
            <div className="text-navy-text">
              <h3 className="text-xl sm:text-3xl font-bold mb-4 text-navy-heading">
                Full Stack Developer & Product Strategist based in Riyadh, KSA
              </h3>
              <p className="text-sm sm:text-base leading-relaxed mb-4 text-navy-text/80">
                I specialize in bridging the gap between product vision and technical execution.
                As a developer focused on modern, scalable web applications, I translate complex business requirements into intuitive, user-centric solutions.
              </p>
              <p className="text-sm sm:text-base leading-relaxed mb-6 text-navy-text/80">
                From engineering robust backends with Laravel and architecting Google Cloud solutions using Firebase, to crafting responsive interfaces with React and Next.js,
                I take ownership of the entire product lifecycle to deliver applications that drive tangible value.
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {infoItems.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <Icon className="text-purple-mid mt-0.5 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                        {label}
                      </p>
                      <p className="text-sm text-navy-text font-semibold break-all">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-btn text-white font-semibold text-sm uppercase tracking-wider hover:bg-purple-btn-hover transition-colors shadow-lg"
              >
                Download Resume
              </a>
            </div>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
}
