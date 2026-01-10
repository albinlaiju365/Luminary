"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import WellnessImpact from "@/components/WellnessImpact";
import Services from "@/components/Services";
import ResortExperience from "@/components/ResortExperience";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import ChatWidget from "@/components/ChatWidget";
import { useSectionObserver } from "@/hooks/useSectionObserver";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const activeSection = useSectionObserver();
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollDepth(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-stone-50 selection:bg-sand-200 selection:text-sand-900 overflow-x-hidden">

      {/* Global Living Background - Persistent across scroll */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-sunset/30 blur-[130px] rounded-full animate-mesh" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-ocean/30 blur-[150px] rounded-full animate-mesh [animation-delay:-5s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35%] h-[35%] bg-forest/20 blur-[100px] rounded-full animate-mesh [animation-delay:-10s]" />
      </div>

      <div className="relative z-10">
        <Navbar onBook={() => setIsBookingOpen(true)} />

        <Hero onBook={() => setIsBookingOpen(true)} />
        <Experience />
        <WellnessImpact />
        <Services onBook={() => setIsBookingOpen(true)} />
        <ResortExperience />
        <Testimonials />
        <FinalCTA onBook={() => setIsBookingOpen(true)} />
        <Footer />
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <ChatWidget
        currentSection={activeSection}
        scrollDepth={scrollDepth}
      />
    </main>
  );
}
