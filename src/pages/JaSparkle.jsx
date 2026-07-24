import React from "react";
import Navbar from "@/components/jasparkle/Navbar";
import Hero from "@/components/jasparkle/Hero";
import Services from "@/components/jasparkle/Services";
import Why from "@/components/jasparkle/Why";
import Work from "@/components/jasparkle/Work";
import Quote from "@/components/jasparkle/Quote";
import Footer from "@/components/jasparkle/Footer";

export default function JaSparkle() {
  return (
    <div className="bg-jas-paper">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Why />
        <Work />
        <Quote />
      </main>
      <Footer />
    </div>
  );
}