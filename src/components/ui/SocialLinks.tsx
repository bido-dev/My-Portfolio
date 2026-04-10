import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import clsx from "clsx";

interface Props {
  className?: string;
  iconSize?: number;
}

const links = [
  {
    href: "https://github.com/bido-dev",
    label: "GitHub",
    Icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/abdalla-ammar-418351238/",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  {
    href: "https://x.com/Abdallamohsen02",
    label: "X",
    Icon: FaXTwitter,
  },
  {
    href: "mailto:abdallamohammed.ammar@gmail.com",
    label: "Email",
    Icon: MdEmail,
  },
];

export default function SocialLinks({ className, iconSize = 22 }: Props) {
  return (
    <div className={clsx("flex items-center gap-4", className)}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={label}
          className="text-white/70 hover:text-cyan transition-colors duration-200"
        >
          <Icon size={iconSize} />
        </a>
      ))}
    </div>
  );
}
