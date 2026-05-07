"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechMarquee from "@/components/sections/TechMarquee";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-[#030014] min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onFinished={() => setIsLoading(false)} />
        ) : (
          <div key="main-content">
            <Hero />
            <About />
            <TechMarquee />
            <Projects />
            <Experience />
            <Services />
            <Contact />
            <ParallaxBackground />
            {/* Dagdag ka pa dito ng Projects, etc. */}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}