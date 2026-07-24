import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const LINKS = [
  { label: "Services", href: "#js-services" },
  { label: "Why Us", href: "#js-why" },
  { label: "Work", href: "#js-work" },
  { label: "Quote", href: "#js-quote" },
  { label: "Contact", href: "#js-contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-jas-paper/80 backdrop-blur-xl border-b border-jas-ink/8"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <a href="#js-top" className="flex items-center gap-2">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-jas-lime">
            <Sparkles size={18} className="text-jas-ink" />
          </span>
          <span className="font-bricolage text-jas-ink text-xl font-bold tracking-tight">
            JA Sparkle
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full border border-jas-ink/10 bg-white/60">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium text-jas-ink/70 hover:text-jas-moss hover:bg-white rounded-full transition"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#js-quote"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-jas-ink text-jas-lime text-sm font-semibold hover:bg-jas-moss transition"
        >
          Free Quote
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden grid place-items-center w-10 h-10 rounded-full border border-jas-ink/15 text-jas-ink"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-jas-paper border-t border-jas-ink/10 px-6 py-5">
          <nav className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-jas-ink/80 text-base font-medium py-2.5 border-b border-jas-ink/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#js-quote"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center px-5 py-3 rounded-full bg-jas-lime text-jas-ink font-semibold"
            >
              Free Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}