import type { ReactNode } from "react";

const toneClasses = {
  canvas: "bg-canvas",
  dark: "bg-surface-dark",
  soft: "bg-surface-soft",
} as const;

type SectionProps = {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
  className?: string;
  id?: string;
};

export function Section({
  children,
  tone = "canvas",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${toneClasses[tone]} px-6 py-12 md:py-16 lg:py-section ${className}`}
    >
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}
