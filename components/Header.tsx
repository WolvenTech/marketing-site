import Link from "next/link";
import { CTA } from "./CTA";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-hairline-strong bg-surface-dark">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
        <Link
          href="/"
          className="font-display text-body-strong font-bold uppercase tracking-wide text-on-dark"
        >
          Wolven<span className="text-primary">Forge</span>
        </Link>
        <nav className="hidden items-center gap-xl md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-strong font-bold text-on-dark-mute transition-colors hover:text-on-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <CTA href="/contact" variant="primary" size="sm">
          Get Started
        </CTA>
      </div>
    </header>
  );
}
