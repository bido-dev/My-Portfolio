import SocialLinks from "@/components/ui/SocialLinks";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#00012b" }}
      className="py-8 px-6 text-center"
    >
      <SocialLinks className="justify-center mb-4" />
      <p className="text-white/60 text-sm flex items-center justify-center gap-1 flex-wrap">
        Made with{" "}
        <span className="text-red-500 animate-pulse">
          <FaHeart size={12} />
        </span>{" "}
        by{" "}
        <span className="text-orange font-semibold">Abdalla Ammar</span>
      </p>
      <p className="text-white/40 text-xs mt-2">
        © {new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
