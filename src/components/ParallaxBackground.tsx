"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Globe, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// SIGURADUHIN MONG TAMA ANG PATH NITO
import CyberGridBackground from "./CyberGridBackground"; 

const ContactAndFooter = () => {
  const footerRef = useRef(null);

  const lat = 14.460316;
  const lng = 121.049822;

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const yMap = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const opacityCard = useTransform(scrollYProgress, [0.8, 1], [1, 0.4]);

  return (
    <div ref={footerRef} className="relative w-full bg-[#030014]">
      
      {/* --- 1. STICKY MAP SECTION --- */}
      <div className="sticky top-0 h-[60vh] md:h-[70vh] w-full overflow-hidden bg-[#030014]">
        <motion.div style={{ y: yMap }} className="absolute inset-0 w-full h-[120%] pointer-events-none">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3863.784524451071!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph`}
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              filter: "invert(90%) hue-rotate(210deg) brightness(100%) contrast(100%)" 
            }}
            allowFullScreen 
            loading="lazy"
            className="opacity-80"
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative">
              <MapPin size={45} className="text-fuchsia-600 fill-fuchsia-600/20 relative z-10" />
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 bg-fuchsia-500 rounded-full blur-md"
              />
            </div>
          </div>
        </motion.div>

        <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-b from-[#030014] via-transparent to-[#030014] opacity-90" />

        <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex items-end md:items-center justify-center md:justify-end pb-12 md:pb-0">
          <motion.div style={{ opacity: opacityCard }} className="w-full max-w-[340px] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-violet-600 flex items-center justify-center">
                <Globe className="text-white animate-[spin_10s_linear_infinite]" size={20} />
              </div>
              <div>
                <h3 className="text-white font-black text-lg md:text-xl uppercase tracking-tighter">Base Location</h3>
                <p className="text-violet-400 text-[9px] md:text-[10px] font-mono tracking-widest uppercase font-bold">Sucat, Muntinlupa</p>
              </div>
            </div>
            <div className="space-y-4 mb-6 md:mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-fuchsia-500 mt-1 shrink-0" size={18} />
                <p className="text-white text-xs md:text-sm font-bold leading-relaxed italic">Sitio Pagkakaisa, Sucat, <br /> Muntinlupa City, Philippines</p>
              </div>
              <div className="p-2 md:p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[9px] md:text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider">
                COORD: {lat}, {lng}
              </div>
            </div>
            <motion.a href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`} target="_blank" whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black text-[10px] md:text-[11px] font-black rounded-xl md:rounded-2xl uppercase tracking-[0.2em] transition-colors hover:bg-violet-500 hover:text-white">
              <Navigation size={14} /> Open GPS
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* --- 2. LET'S WORK SECTION (WITH BACKGROUND) --- */}
      <section className="relative z-30 bg-[#030014] pt-24 md:pt-32 pb-16 md:pb-20 border-t border-white/5 overflow-hidden">
        {/* IBINALIK KO NA 'YUNG BACKGROUND MO DITO */}
        <div className="absolute inset-0 z-0">
            <CyberGridBackground />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-slate-500 font-mono text-[10px] md:text-sm mb-4 tracking-[0.4em] uppercase">Have a project in mind?</p>
          <Link 
            href="https://m.me/Kevin143777"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block group"
          >
            <h2 className="text-[15vw] md:text-[11vw] font-black text-white leading-none tracking-tighter select-none transition-opacity duration-700 group-hover:opacity-0">
              LET'S WORK
            </h2>
            <h2 className="absolute inset-0 text-[15vw] md:text-[11vw] font-black leading-none tracking-tighter select-none text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              LET'S WORK
            </h2>
          </Link>
        </div>
      </section>

      {/* --- 3. CENTERED FOOTER --- */}
      <footer className="relative z-40 bg-[#030014] pb-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center pt-12 text-center">
          
          {/* LOGO - CENTERED */}
          <Link 
            href="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
            className="group mb-8 block relative"
          >
            {/* The Pulsing Glow Layer (Nasa likod ng image) */}
            <div className="
              absolute inset-0 
              rounded-full 
              bg-violet-500/20 
              blur-md 
              opacity-0 
              pointer-events-none
            " />

            <Image 
              src="/img/logo.png" 
              alt="Logo" 
              width={60} 
              height={60} 
              className="
                relative z-10
                transition-all duration-500 
                opacity-80
                filter grayscale
                group-hover:opacity-100 
                group-hover:!grayscale-0
                /* Dito natin ilalagay yung animation logic para sa color flash */
                animate-[logoFlash_5s_ease-in-out_infinite]
              "
            />
          </Link>

          {/* FOOTER DETAILS - STACKED & CENTERED */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-slate-500 text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase">
              © 2026 Kevin Macandog. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 text-slate-600 font-mono text-[10px]">
              <span className="tracking-tighter">{lat}, {lng}</span>
              <div className="h-4 w-[1px] bg-white/10" />
              <span className="tracking-tighter">My-Portfolio v.2.100.100</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default ContactAndFooter;