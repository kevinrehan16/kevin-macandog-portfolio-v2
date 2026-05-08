"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Cpu, Briefcase, User, Mail, Monitor, Menu, X, Handshake, Road } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", id: "home", icon: <Cpu size={15} /> },
  { name: "About", href: "#about", id: "about", icon: <User size={15} /> },
  { name: "Projects", href: "#projects", id: "projects", icon: <Briefcase size={15} /> },
  { name: "Careers", href: "#careers", id: "careers", icon: <Road size={15} /> },
  { name: "Services", href: "#services", id: "services", icon: <Monitor size={15} /> },
  { name: "Contact", href: "#contact", id: "contact", icon: <Mail size={15} /> },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 150;
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

  const handleLinkClick = (e: React.MouseEvent, link: any) => {
    setIsOpen(false); 
    if (link.href.startsWith("#")) {
      e.preventDefault();
      const targetId = link.href.replace("#", "");
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", link.href);
      setActiveSection(link.id);
    } else {
      setActiveSection("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState(null, "", "/");
    }
  };

  const Logo = () => (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-violet-500/50 shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.5)]">
      <Image
        src="/img/logo.png"
        alt="Kevin Logo"
        width={25}
        height={25}
        priority
        unoptimized
        className="w-[35px] h-auto object-contain brightness-[1.1] contrast-[1.1] saturate-[1.15] drop-shadow-[0_0_5px_rgba(139,92,246,0.3)]"
      />
    </div>
  );

  return (
    <>
      {/* --- DESKTOP NAVBAR --- */}
      <header className="fixed -top-3 left-0 right-0 z-[100] hidden md:flex justify-center p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "pointer-events-auto flex items-center gap-[10rem] px-3 py-3 rounded-full border transition-all duration-300",
            "bg-black/25 backdrop-blur-[30px] border-white/10", // Mas transparent at malinaw na glass effect
            scrolled ? "border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]" : ""
          )}
        >
          <Logo />
          
          <div className="flex items-center gap-1 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={cn(
                  "relative px-4 py-2 text-xs font-medium tracking-widest uppercase rounded-full transition-all duration-300",
                  // Inactive: slate-400/muted | Active or Hover: text-white
                  activeSection === link.id ? "text-white" : "text-slate-500 hover:text-purple-300"
                )}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {link.icon} {link.name}
                </span>
                {activeSection === link.id && (
                  <motion.span 
                    layoutId="active-pill" 
                    transition={{
                      type: "tween",      // Pinaka-importante: 'tween' para sa linear/smooth move
                      ease: "easeOut",    // 'easeOut' para swabe ang paghinto, walang bounce
                      duration: 0.3       // Bilis ng slide (0.3s is the sweet spot)
                    }}
                    className="absolute inset-0 bg-violet-600/40 rounded-full border border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]" 
                  />
                )}
              </Link>
            ))}
          </div>

          {/* HIRE ME BUTTON (Laging naka-Neon Glow) */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // Eto yung Alert Animation logic
            animate={activeSection === "contact" ? {
              scale: [1, 1.1, 1], // Pulse effect
              rotate: [0, -2, 2, -2, 0], // Subtle shake
              boxShadow: [
                "0 0 20px rgba(139,92,246,0.7)",
                "0 0 40px rgba(139,92,246,1)", // Lalakas yung glow
                "0 0 20px rgba(139,92,246,0.7)"
              ]
            } : {}}
            transition={activeSection === "contact" ? {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2 // Titigil siya ng 2 seconds bago mag-alert ulit
            } : {}}
            className="relative flex items-center gap-2 px-6 py-3 ml-2 bg-violet-600 rounded-full hover:bg-violet-500 text-white text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          >
            <Handshake size={16} />
            HIRE ME
            
            {/* Ping Effect (Optional: Isang ring na lumalabas mula sa button) */}
            {activeSection === "contact" && (
              <span className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-20 pointer-events-none" />
            )}
          </motion.button>
        </motion.nav>
      </header>

      {/* --- MOBILE TRIGGER --- */}
      <div className="fixed top-6 right-6 z-[120] md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="
            p-3 
            bg-violet-600/80 
            backdrop-blur-md 
            rounded-full 
            border border-white/20 
            text-white 
            shadow-lg 
            /* HOVER EFFECTS START HERE */
            transition-all duration-300
            hover:bg-violet-500/90 
            hover:scale-110 
            hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] 
            active:scale-95
          "
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE GLASS DRAWER --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm md:hidden"
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[75%] z-[115] bg-white/5 backdrop-blur-[40px] border-l border-white/10 p-8 flex flex-col md:hidden shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4 mb-12">
                <Logo />
                <span className="font-black text-white tracking-[0.1em] text-lg uppercase">KevinM.</span>
              </div>

              <div className="flex flex-col gap-4 mb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={cn(
                      "flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 border",
                      activeSection === link.id 
                        ? "bg-violet-600/20 text-white border-violet-500/50 translate-x-2" 
                        : "text-slate-300 border-transparent hover:bg-white/5"
                    )}
                  >
                    <span className={cn(
                      "p-2 rounded-lg bg-white/5 transition-colors",
                      activeSection === link.id && "bg-violet-600 text-white"
                    )}>
                      {link.icon}
                    </span>
                    <span className="font-bold tracking-widest text-sm uppercase">{link.name}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-auto pb-10">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center gap-2 px-6 py-4 ml-2 bg-violet-600 rounded-2xl hover:bg-violet-500 text-white text-xs font-bold tracking-widest uppercase transition-all w-full shadow-[0_0_20px_rgba(139,92,246,0.7)] hover:shadow-[0_0_20px_rgba(139,92,246,1)]" // Default at Hover Glow
                >
                  <Handshake size={16} />HIRE ME
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;