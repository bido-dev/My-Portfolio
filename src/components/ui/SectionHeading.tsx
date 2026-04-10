import clsx from "clsx";

interface Props {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light = false }: Props) {
  return (
    <div className="text-center mb-8 sm:mb-12">
      <h2
        className={clsx(
          "text-2xl sm:text-4xl font-bold mb-3 tracking-wide",
          light ? "text-white" : "text-navy-text"
        )}
      >
        {title}
      </h2>
      {/* Decorative underline bar */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="block h-1 w-10 sm:w-16 rounded-full bg-orange" />
        <span className="block h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-orange" />
        <span className="block h-1 w-10 sm:w-16 rounded-full bg-orange" />
      </div>
      {subtitle && (
        <p
          className={clsx(
            "text-sm sm:text-lg max-w-xl mx-auto",
            light ? "text-white/80" : "text-navy-text/70"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
