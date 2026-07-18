import Link from "next/link";
import type { ReactNode } from "react";

type CTAVariant = "primary" | "outline" | "outline-on-dark" | "ghost";
type CTASize = "sm" | "md" | "lg";

const variantClasses: Record<CTAVariant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-dark",
  outline: "border-2 border-primary bg-transparent text-ink hover:bg-primary/10",
  "outline-on-dark": "border border-on-dark bg-transparent text-on-dark hover:bg-on-dark/10",
  ghost: "border-none bg-transparent p-0 text-primary underline-offset-4 hover:underline",
};

const sizeClasses: Record<CTASize, string> = {
  sm: "px-md py-sm text-button-sm",
  md: "px-xl py-[11px] text-button-md",
  lg: "px-xl py-[11px] text-button-lg",
};

type CTAProps = {
  href: string;
  children: ReactNode;
  variant?: CTAVariant;
  size?: CTASize;
  className?: string;
};

export function CTA({ href, children, variant = "primary", size = "md", className = "" }: CTAProps) {
  const isGhost = variant === "ghost";
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-xs rounded-sm font-bold tracking-button-sm transition-colors ${variantClasses[variant]} ${isGhost ? "" : sizeClasses[size]} ${className}`}
    >
      {children}
      {isGhost && <span aria-hidden="true">&rarr;</span>}
    </Link>
  );
}
