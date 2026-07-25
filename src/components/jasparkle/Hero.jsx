import React from "react";
import { ArrowRight, Star } from "lucide-react";
import { handleSectionLinkClick } from "@/lib/scrollToSection";

const HERO =
  "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/71b438f87_generated_image.png";

export default function Hero() {
  return (
    <section
      id="js-top"
      className="bg-jas-paper pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-jas-ink/10 text-xs font-semibold text-jas-moss uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-jas-lime" /> Coastal
            Carolina Lawn Care · Rocky Mount, NC
          </span>
          <h1 className="font-bricolage text-jas-ink text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mt-6">
            Lawns that{" "}
            <span className="relative inline-block">
              sparkle
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="14"
                viewBox="0 0 200 14"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 11C50 3 150 3 198 11"
                  stroke="#C8F24E"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            . Yards that turn heads.
          </h1>
          <p className="text-jas-ink/70 text-lg mt-6 max-w-md leading-relaxed">
            JA Sparkle LLC brings sharp mowing, clean edges, and year-round
            care to homes and businesses across Rocky Mount and Nash County.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#js-quote"
              onClick={handleSectionLinkClick("js-quote")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-jas-lime text-jas-ink font-semibold hover:brightness-95 transition shadow-sm"
            >
              Get a Free Quote <ArrowRight size={18} />
            </a>
            <a
              href="#js-work"
              onClick={handleSectionLinkClick("js-work")}
              className="inline-flex items-center px-6 py-3.5 rounded-full bg-white border border-jas-ink/15 text-jas-ink font-semibold hover:border-jas-moss hover:text-jas-moss transition"
            >
              See Our Work
            </a>
          </div>
          <div className="flex items-center gap-4 mt-10">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={16}
                  className="text-jas-clay"
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="text-sm text-jas-ink/60">
              Trusted by 300+ neighbors in the Coastal Plains
            </p>
          </div>
        </div>
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] lg:aspect-[5/6] shadow-xl">
            <img
              src={HERO}
              alt="Manicured North Carolina lawn"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="absolute -left-4 lg:-left-8 bottom-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg p-5 border border-jas-ink/8 w-44">
            <p className="font-bricolage text-3xl font-bold text-jas-ink">8+ yrs</p>
            <p className="text-xs text-jas-ink/60 mt-1">keeping NC yards sharp</p>
          </div>
          <div className="absolute -top-4 right-4 lg:-right-6 grid place-items-center w-24 h-24 rounded-full bg-jas-ink text-center">
            <div>
              <p className="font-bricolage text-jas-lime text-2xl font-bold leading-none">
                100%
              </p>
              <p className="text-jas-lime/70 text-[9px] uppercase tracking-wider mt-1">
                Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}