"use client";

import { useState, useRef, type FormEvent } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollRevealWrapper from "@/components/ui/ScrollRevealWrapper";
import ContactIllustration from "@/components/ui/ContactIllustration";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<"email" | "whatsapp" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = () => formRef.current?.reportValidity() ?? false;

  const handleEmail = (e: FormEvent) => {
    e.preventDefault();
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:abdallamohammed.ammar@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(body)}`;
    setSent("email");
    setName(""); setEmail(""); setMessage("");
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    const text = `Hello! I'm ${name} (${email}).\n\n${message}`;
    window.open(`https://wa.me/966551124480?text=${encodeURIComponent(text)}`, "_blank");
    setSent("whatsapp");
    setName(""); setEmail(""); setMessage("");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy-mid placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-mid transition";

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 px-6"
      style={{ backgroundColor: "#e5ecfb" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollRevealWrapper>
          <SectionHeading
            title="Get In Touch"
            subtitle="Have a project in mind or just want to say hello? I'd love to hear from you."
          />
        </ScrollRevealWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — illustration */}
          <ScrollRevealWrapper origin="left" delay={100}>
            <ContactIllustration />
          </ScrollRevealWrapper>

          {/* Right — form */}
          <ScrollRevealWrapper origin="right" delay={200}>
            <form
              ref={formRef}
              onSubmit={handleEmail}
              className="bg-white rounded-2xl shadow-lg shadow-navy-mid/10 p-5 sm:p-8 space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-navy-mid mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-mid mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-mid mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-purple-btn text-white font-semibold text-sm uppercase tracking-wider hover:bg-purple-btn-hover transition-colors shadow-lg"
                >
                  <MdEmail size={18} />
                  {sent === "email" ? "Email Sent ✓" : "Send Email"}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#1ebe5d] transition-colors shadow-lg"
                >
                  <FaWhatsapp size={18} />
                  {sent === "whatsapp" ? "Sent ✓" : "WhatsApp"}
                </button>
              </div>

              {sent && (
                <p className="text-center text-sm text-purple-mid">
                  {sent === "email"
                    ? "Your mail client should open with the pre-filled message."
                    : "WhatsApp opened with your message pre-filled."}
                </p>
              )}
            </form>
          </ScrollRevealWrapper>
        </div>
      </div>
    </section>
  );
}
