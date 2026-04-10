"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollRevealWrapper from "@/components/ui/ScrollRevealWrapper";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa6";

type Tab = "Education" | "Work" | "Recommendations";

/* ─── Data ──────────────────────────────────────────────────────────── */

const educationData = [
  {
    degree: "Bachelor's in Computer Science — College of Software Engineering",
    institution: "King Saud University",
    location: "Riyadh, Saudi Arabia",
    period: "2022 – 2026",
    description:
      "Studied software engineering, algorithms, data structures, databases, and web development. Graduated with honors.",
  },
];

interface WorkEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string | string[];
}
const workData: WorkEntry[] = [
  {
    role: "Technical Project Manager (TPM)",
    company: "Google Developers Group (GDG) – KSU",
    location: "Riyadh, Saudi Arabia",
    period: "2026 – Present",
    description: [
      "Led engineering teams through the full product lifecycle using Agile Scrum methodologies.",
      "Authored PRDs and managed product backlogs via GitHub Projects.",
      "Drove system architecture design, repository setup, and CI/CD automation.",
    ],
  },
];

interface RecommendationEntry {
  quote: string;
  name: string;
  role: string;
  company: string;
}
const recommendationsData: RecommendationEntry[] = [];

/* ─── Helpers ────────────────────────────────────────────────────────── */

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ─── Sub-components ─────────────────────────────────────────────────── */

function Timeline<T extends { period: string }>({
  items,
  icon,
  renderCard,
}: {
  items: T[];
  icon: React.ReactNode;
  renderCard: (item: T) => React.ReactNode;
}) {
  if (items.length === 0) {
    return (
      <p className="text-center text-navy-mid/50 py-16 text-sm">
        Coming soon — check back later.
      </p>
    );
  }
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-mid/30 hidden sm:block" />
      <div className="flex flex-col gap-10">
        {items.map((item, i) => (
          <div key={i} className="flex gap-6 sm:pl-16 relative">
            <div className="hidden sm:flex absolute left-0 top-1 w-12 h-12 rounded-full bg-purple-mid items-center justify-center shadow-lg shadow-purple-dark/30 flex-shrink-0">
              {icon}
            </div>
            <div className="flex-1 bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              {renderCard(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationTab() {
  return (
    <Timeline
      items={educationData}
      icon={<FaGraduationCap size={20} className="text-white" />}
      renderCard={({ degree, institution, location, period, description }) => (
        <>
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-heading">{degree}</h3>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-mid/10 text-purple-mid whitespace-nowrap">
              {period}
            </span>
          </div>
          <p className="text-sm font-semibold text-orange mb-1">
            {institution} — {location}
          </p>
          <p className="text-sm text-navy-text/70 leading-relaxed">{description}</p>
        </>
      )}
    />
  );
}

function WorkTab() {
  return (
    <Timeline
      items={workData}
      icon={<FaBriefcase size={18} className="text-white" />}
      renderCard={({ role, company, location, period, description }) => (
        <>
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-navy-heading">{role}</h3>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-mid/10 text-purple-mid whitespace-nowrap">
              {period}
            </span>
          </div>
          <p className="text-sm font-semibold text-orange mb-1">
            {company} — {location}
          </p>
          {Array.isArray(description) ? (
            <ul className="list-disc list-inside space-y-1 text-sm text-navy-text/70 leading-relaxed">
              {description.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          ) : (
            <p className="text-sm text-navy-text/70 leading-relaxed">{description}</p>
          )}
        </>
      )}
    />
  );
}

function RecommendationsTab() {
  if (recommendationsData.length === 0) {
    return (
      <p className="text-center text-navy-mid/50 py-16 text-sm">
        Coming soon — check back later.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recommendationsData.map(({ quote, name, role, company }, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex flex-col gap-4"
        >
          <FaQuoteLeft size={22} className="text-purple-mid/40" />
          <p className="text-sm text-navy-text/70 leading-relaxed flex-1">{quote}</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-purple-mid flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials(name)}
            </div>
            <div>
              <p className="text-sm font-bold text-navy-heading">{name}</p>
              <p className="text-xs text-orange">
                {role} — {company}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────────────────── */

const TABS: { id: Tab; icon: React.ReactNode }[] = [
  { id: "Education", icon: <FaGraduationCap size={18} /> },
  { id: "Work", icon: <FaBriefcase size={16} /> },
  { id: "Recommendations", icon: <FaQuoteLeft size={14} /> },
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Education");

  return (
    <section
      id="experience"
      className="py-16 sm:py-24 px-6"
      style={{ backgroundColor: "#f7f7f7" }}
    >
      <div className="max-w-4xl mx-auto">
        <ScrollRevealWrapper>
          <SectionHeading
            title="Experience"
            subtitle="My academic background, work history, and what others say"
          />
        </ScrollRevealWrapper>

        {/* Tab bar */}
        <div className="flex gap-1 bg-gray-200/70 rounded-xl p-1 mb-10">
          {TABS.map(({ id, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              aria-label={id}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 sm:px-4 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeTab === id
                  ? "bg-purple-btn text-white shadow-md"
                  : "text-navy-mid/60 hover:text-navy-mid"
              }`}
            >
              {icon}
              <span className="hidden sm:inline">{id}</span>
            </button>
          ))}
        </div>

        {/* Tab content — key triggers remount + CSS fade-in */}
        <div key={activeTab} className="animate-tab">
          {activeTab === "Education" && <EducationTab />}
          {activeTab === "Work" && <WorkTab />}
          {activeTab === "Recommendations" && <RecommendationsTab />}
        </div>
      </div>
    </section>
  );
}
