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
      {/* Iniba mula 'md:flex' papuntang 'lg:flex' para siguradong hindi mag-overlap ang mga links kapag sumisikip ang screen */}
      <header className="fixed -top-3 left-0 right-0 z-[100] hidden lg:flex justify-center p-6 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "pointer-events-auto flex items-center gap-4 xl:gap-[10rem] px-3 py-3 rounded-full border transition-all duration-300",
            "bg-black/25 backdrop-blur-[30px] border-white/10",
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
                  "relative px-4 py-2 text-xs font-medium tracking-widest uppercase rounded-full transition-all duration-300 whitespace-nowrap",
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
                      type: "tween",
                      ease: "easeOut",
                      duration: 0.3
                    }}
                    className="absolute inset-0 bg-violet-600/40 rounded-full border border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]" 
                  />
                )}
              </Link>
            ))}
          </div>

          <motion.a 
            href="https://www.linkedin.com/in/kevin-macandog-498697140/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={activeSection === "contact" ? {
              scale: [1, 1.1, 1],
              rotate: [0, -2, 2, -2, 0],
              boxShadow: [
                "0 0 20px rgba(139,92,246,0.7)",
                "0 0 40px rgba(139,92,246,1)",
                "0 0 20px rgba(139,92,246,0.7)"
              ]
            } : {}}
            transition={activeSection === "contact" ? {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2
            } : {}}
            className="relative flex items-center gap-2 px-6 py-3 ml-2 bg-violet-600 rounded-full hover:bg-violet-500 text-white text-xs font-bold tracking-widest uppercase transition-all shrink-0 shadow-[0_0_20px_rgba(139,92,246,0.7)]"
          >
            <Handshake size={16} />
            HIRE ME
            
            {activeSection === "contact" && (
              <span className="absolute inset-0 rounded-full bg-violet-400 animate-ping opacity-20 pointer-events-none" />
            )}
          </motion.a>
        </motion.nav>
      </header>

      {/* --- MOBILE TRIGGER --- */}
      {/* Iniba mula 'md:hidden' papuntang 'lg:hidden' para mag-match sa desktop breakpoint */}
      <div className="fixed top-6 right-6 z-[120] lg:hidden">
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
            {/* Iniba mula 'md:hidden' papuntang 'lg:hidden' */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm lg:hidden"
            />
            
            {/* 
              Binago rito: 
              1. 'md:hidden' naging 'lg:hidden'
              2. 'w-[75%]' ginawang responsive ('w-[85%] sm:w-[60%] md:w-[45%]') para hindi super taba sa malalaking tablet.
              3. Idinagdag ang 'overflow-y-auto max-h-screen' para kapag naka-landscape ang phone, pwedeng ma-scroll pababa ang mga links.
            */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[85%] sm:w-[60%] md:w-[45%] z-[115] bg-white/5 backdrop-blur-[40px] border-l border-white/10 p-8 flex flex-col overflow-y-auto max-h-screen lg:hidden shadow-[-10px_0_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-4 mb-12 shrink-0">
                <Logo />
                <span className="font-black text-white tracking-[0.1em] text-lg uppercase">KevinM.</span>
              </div>

              <div className="flex flex-col gap-4 mb-6">
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

              <div className="mt-auto pt-4 pb-6 shrink-0">
                <motion.a 
                  href="https://www.linkedin.com/in/kevin-macandog-498697140/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center gap-2 px-6 py-4 bg-violet-600 rounded-2xl hover:bg-violet-500 text-white text-xs font-bold tracking-widest uppercase transition-all w-full shadow-[0_0_20px_rgba(139,92,246,0.7)] hover:shadow-[0_0_20px_rgba(139,92,246,1)]"
                >
                  <Handshake size={16} />HIRE ME
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;