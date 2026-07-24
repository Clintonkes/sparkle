import React from "react";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="js-contact" className="bg-jas-ink text-white">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-jas-lime">
                <Sparkles size={18} className="text-jas-ink" />
              </span>
              <span className="font-bricolage text-2xl font-bold tracking-tight">
                JA Sparkle
              </span>
            </div>
            <p className="text-white/60 mt-4 max-w-xs leading-relaxed">
              Honest, dependable lawn care for Rocky Mount and the Coastal
              Plains of North Carolina.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-jas-lime text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Get in touch
            </p>
            <a
              href="tel:+12523142894"
              className="flex items-center gap-3 hover:text-jas-lime transition"
            >
              <Phone size={18} className="text-jas-lime" /> +1 252 314 2894
            </a>
            <a
              href="mailto:jasparkle@proton.me"
              className="flex items-center gap-3 hover:text-jas-lime transition"
            >
              <Mail size={18} className="text-jas-lime" /> jasparkle@proton.me
            </a>
            <p className="flex items-start gap-3 text-white/70">
              <MapPin size={18} className="text-jas-lime mt-1" /> 541 Bills Ln,
              Rocky Mount, NC 27801-9113
            </p>
          </div>
          <div>
            <p className="text-jas-lime text-xs font-semibold uppercase tracking-[0.2em] mb-3">
              Ready to start?
            </p>
            <a
              href="js-quote"
              className="inline-flex items-center px-6 py-3 rounded-full bg-jas-lime text-jas-ink font-bold text-sm hover:brightness-95 transition"
            >
              Get a Free Quote
            </a>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs uppercase tracking-wide text-white/40">
          <span>© {new Date().getFullYear()} JA Sparkle LLC · All Rights Reserved</span>
          <span>Licensed & Insured · Rocky Mount, NC</span>
        </div>
      </div>
    </footer>
  );
}