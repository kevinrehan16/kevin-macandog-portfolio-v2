"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Rocket, Cpu, Briefcase, User, Mail, Monitor } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", id: "home", icon: <Cpu size={18} /> }, // "/" para sa clean URL
  { name: "About", href: "#about", id: "about", icon: <User size={18} /> },
  { name: "Projects", href: "#projects", id: "projects", icon: <Briefcase size={18} /> },
  { name: "Services", href: "#services", id: "services", icon: <Monitor size={18} /> },
  { name: "Contact", href: "#contact", id: "contact", icon: <Mail size={18} /> },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let isScrollingManual = false; // Flag para malaman kung galing sa click ang scroll

    const handleScroll = () => {
      // Background glow logic
      setScrolled(window.scrollY > 20);

      // Active Section Intersection
      const scrollPosition = window.scrollY + 150; // Offset

      // Default to home
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-6 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300",
          "bg-background/40 backdrop-blur-xl border-white/10",
          scrolled ? "shadow-[0_0_20px_rgba(139,92,246,0.3)] border-violet-500/50" : "shadow-none"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white to-white border-2 border-violet-500/50">
          <Image
            src="/img/logo.png"
            alt="Me"
            width={25}
            height={25}
            priority
            unoptimized
            className="
              relative
              z-30
              w-[35px] md:w-[350px]
              h-auto
              object-contain
              brightness-[1.1] 
              contrast-[1.1]
              saturate-[1.15]
              drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]
            "
          />
        </div>

        {/* Links */}
        <div className="flex items-center gap-1 px-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  // 2. Custom Scroll Logic para iwas stacking ng hash
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    const targetId = link.href.replace("#", "");
                    const elem = document.getElementById(targetId);
                    elem?.scrollIntoView({ behavior: "smooth" });
                    
                    // Update URL nang hindi nagpapatong (replaceState)
                    window.history.replaceState(null, "", link.href);
                    setActiveSection(link.id);
                  } else {
                    // Kung Home (/), i-reset ang scroll sa taas at linisin ang URL
                    setActiveSection("home");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    window.history.pushState(null, "", "/");
                  }
                }}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full outline-none",
                  isActive ? "text-white" : "text-slate-400 hover:text-violet-300"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="hidden md:inline">{link.icon}</span>
                  {link.name}
                </span>

                {/* Active Indicator (Yung gumagalaw na background) */}
                {isActive && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute inset-0 bg-violet-600/20 border border-violet-500/30 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, // Medyo mas mabilis na spring
                      damping: 35,    // Para hindi masyadong bouncy
                      mass: 0.8       // Para mas "lightweight" ang pakiramdam ng paggalaw
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <button className="hidden sm:block ml-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-violet-600 rounded-full hover:bg-violet-500 hover:scale-105 transition-all active:scale-95 shadow-[0_10px_20px_rgba(139,92,246,0.3)]">
          Hire Me
        </button>
      </motion.nav>
    </header>
  );
};

export default Navbar;