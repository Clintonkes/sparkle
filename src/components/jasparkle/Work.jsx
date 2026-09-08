import React from "react";
import { handleSectionLinkClick } from "@/lib/scrollToSection";

const PROJECTS = [
  {
    name: "Sunset Avenue Lawn",
    area: "Rocky Mount",
    tag: "Weekly Mowing",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/71b438f87_generated_image.png",
  },
  {
    name: "Battleboro Retreat",
    area: "Battleboro",
    tag: "Mowing + Fertilization",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/493477298_generated_772bfbd1.png",
  },
  {
    name: "Nash County Home",
    area: "Nash County",
    tag: "Biweekly",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/9ee7327f1_generated_5fdb9850.png",
  },
  {
    name: "Tarboro Estate",
    area: "Tarboro",
    tag: "Full Season Program",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/0643672ee_generated_66730131.png",
  },
  {
    name: "Wilson Residence",
    area: "Wilson",
    tag: "Cleanup + Mowing",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/858347446_generated_f5cc6c49.png",
  },
  {
    name: "Spring Hope Lot",
    area: "Spring Hope",
    tag: "Weekly Mowing",
    img: "https://media.base44.com/images/public/6a5d5a3dd2e5eb4ee0df1b96/44eaa2275_generated_5f653fb1.png",
  },
];

export default function Work() {
  return (
    <section id="js-work" className="bg-jas-paper py-20 lg:py-28">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 text-jas-moss text-sm font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-jas-lime" /> Our work
            </span>
            <h2 className="font-bricolage text-jas-ink text-4xl md:text-5xl font-bold tracking-tight">
              Lawns we keep <span className="text-jas-moss">sharp</span>.
            </h2>
          </div>
          <a
            href="#js-quote"
            onClick={handleSectionLinkClick("js-quote")}
            className="inline-flex items-center gap-2 text-jas-ink font-semibold border-b-2 border-jas-lime pb-1 hover:text-jas-moss transition w-fit"
          >
            Start yours →
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-xl transition"
            >
              <img
                src={p.img}
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jas-ink/85 via-jas-ink/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block bg-jas-lime text-jas-ink text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full mb-3">
                  {p.tag}
                </span>
                <h3 className="font-bricolage text-white text-xl font-bold tracking-tight">
                  {p.name}
                </h3>
                <p className="text-white/70 text-sm">{p.area}, NC</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}