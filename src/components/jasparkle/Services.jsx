import React from "react";
import { Sparkles, Scissors, Droplets, Leaf } from "lucide-react";

const SERVICES = [
  {
    icon: Sparkles,
    t: "Lawn Mowing",
    d: "Even, clean cuts on a dependable schedule: edges defined and clippings cleared every visit.",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/0643672ee_generated_66730131.png",
  },
  {
    icon: Scissors,
    t: "Edging & Trimming",
    d: "Crisp borders along drives, walks, and beds for that professionally kept finish.",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/44eaa2275_generated_5f653fb1.png",
  },
  {
    icon: Droplets,
    t: "Fertilization & Weed Control",
    d: "Carolina tuned feeding programs that keep grass green through the heat and choke out weeds.",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/858347446_generated_f5cc6c49.png",
  },
  {
    icon: Leaf,
    t: "Seasonal Cleanup",
    d: "Spring and fall cleanups, leaf removal, and bed maintenance to keep your yard sharp year round.",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/493477298_generated_772bfbd1.png",
  },
];

export default function Services() {
  return (
    <section id="js-services" className="bg-jas-paper py-20 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 text-jas-moss text-sm font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-jas-lime" /> What we
              do
            </span>
            <h2 className="font-bricolage text-jas-ink text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
              Four services.{" "}
              <span className="text-jas-moss">One sparkling</span> result.
            </h2>
          </div>
          <p className="text-jas-ink/60 max-w-sm">
            Every visit, the same standard: sharp lines, healthy turf, and a
            yard you're proud to come home to.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.t}
                className="group rounded-3xl overflow-hidden bg-white border border-jas-ink/8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.t}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jas-ink/40 to-transparent" />
                  <div className="absolute top-4 left-4 grid place-items-center w-11 h-11 rounded-full bg-jas-lime shadow">
                    <Icon size={20} className="text-jas-ink" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bricolage text-jas-ink text-2xl font-bold tracking-tight">
                    {s.t}
                  </h3>
                  <p className="text-jas-ink/65 mt-2 leading-relaxed">{s.d}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}