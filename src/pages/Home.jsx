import React from "react";
import Navbar from "@/components/aveness/Navbar";
import Hero from "@/components/aveness/Hero";
import Services from "@/components/aveness/Services";
import Approach from "@/components/aveness/Approach";
import Portfolio from "@/components/aveness/Portfolio";
import Estimator from "@/components/aveness/Estimator";
import ContactForm from "@/components/aveness/ContactForm";
import Footer from "@/components/aveness/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Approach />
      <Portfolio />
      <Estimator />
      <ContactForm />
      <Footer />
    </div>
  );
}
