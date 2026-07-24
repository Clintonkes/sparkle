import React from "react";
import { Check } from "lucide-react";

const POINTS = [
  "Locally owned and operated in Rocky Mount, NC",
  "Reliable weekly and bi-weekly schedules",
  "Licensed, insured, background-checked crew",
  "Upfront pricing — no surprise fees",
  "Carolina expertise: heat, humidity, sandy loam",
  "Satisfaction guaranteed on every visit",
];

const METRICS = [
  { n: "8+", l: "Years serving NC" },
  { n: "300+", l: "Lawns maintained" },
  { n: "48h", l: "Quote turnaround" },
];

export default function Why() {
  return (
    <section id="js-why" className="bg-white py-20 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden aspect-[4/3] shadow-lg">
            <img
              src="https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/0643672ee_generated_66730131.png"
              alt="Healthy Carolina lawn"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-jas-ink rounded-2xl p-6 grid grid-cols-3 gap-4 shadow-xl">
            {METRICS.map((m) => (
              <div key={m.l} className="text-center px-3">
                <p className="font-bricolage text-jas-lime text-2xl lg:text-3xl font-bold leading-none">
                  {m.n}
                </p>
                <p className="text-jas-lime/60 text-[10px] uppercase tracking-wide mt-1.5">
                  {m.l}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-jas-moss text-sm font-semibold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-jas-lime" /> Why JA
            Sparkle
          </span>
          <h2 className="font-bricolage text-jas-ink text-4xl md:text-5xl font-bold tracking-tight leading-[1.02]">
            Dependable care, week after week.
          </h2>
          <p className="text-jas-ink/65 text-lg mt-5 leading-relaxed">
            We're not the biggest — we're the most dependable. Every lawn gets
            the same careful attention, whether it's a quarter-acre lot or a
            five-acre estate.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mt-8">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-jas-lime shrink-0 mt-0.5">
                  <Check size={14} className="text-jas-ink" />
                </span>
                <span className="text-jas-ink/80 text-sm font-medium leading-snug">
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}