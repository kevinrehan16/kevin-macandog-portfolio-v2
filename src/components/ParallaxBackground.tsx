"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Globe, ArrowUp } from "lucide-react";
import Link from "next/link";

import CyberGridBackground from "./CyberGridBackground";

const ContactAndFooter = () => {
  const footerRef = useRef(null);

  // Exact Coordinates
  const lat = 14.4660;
  const lng = 121.0470;

  // --- PARALLAX LOGIC ---
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Mapa aangat nang kaunti habang nag-scroll
  const yMap = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  // Card fades out slowly
  const opacityCard = useTransform(scrollYProgress, [0.8, 1], [1, 0.4]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div ref={footerRef} style={{ position: 'relative' }} className="relative w-full bg-[#030014]">
      
      {/* --- 1. STICKY MAP SECTION --- */}
      <div className="sticky top-0 h-[70vh] w-full overflow-hidden bg-[#030014]">
        
        {/* PARALLAX CONTAINER (Map + Marker are INSIDE here) */}
        <motion.div style={{ y: yMap }} className="absolute inset-0 w-full h-[120%] pointer-events-none">
          
          {/* THE MAP */}
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3500.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph`}
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

          {/* --- THE MARKER & PULSE (Now Parallaxing WITH the Map) --- */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative">
              {/* Main Pin Icon */}
              <MapPin size={45} className="text-fuchsia-600 fill-fuchsia-600/20 relative z-10" />
              
              {/* Pulse Effect */}
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 bg-fuchsia-500 rounded-full blur-md"
              />
            </div>
          </div>
        </motion.div>

        {/* Cinematic Overlays (Top/Bottom Shade) */}
        <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-b from-[#030014] via-transparent to-[#030014] opacity-90" />

        {/* Floating Details Card */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-6 flex items-center justify-end">
          <motion.div style={{ opacity: opacityCard }} className="w-full max-w-[360px] p-8 rounded-[2.5rem] bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/20 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center">
                <Globe className="text-white animate-[spin_10s_linear_infinite]" size={24} />
              </div>
              <div>
                <h3 className="text-white font-black text-xl uppercase tracking-tighter">Base Location</h3>
                <p className="text-violet-400 text-[10px] font-mono tracking-widest uppercase font-bold">Sucat, Muntinlupa</p>
              </div>
            </div>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="text-fuchsia-500 mt-1" size={18} />
                <p className="text-white text-sm font-bold leading-relaxed">Sitio Pagkakaisa, Sucat, <br /> Muntinlupa City, Philippines</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 border border-white/10 font-mono text-[10px] text-center text-slate-300 font-bold uppercase tracking-wider">
                COORD: {lat}, {lng}
              </div>
            </div>
            <motion.a href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} target="_blank" whileHover={{ scale: 1.05, backgroundColor: "#8b5cf6" }} className="flex items-center justify-center gap-3 w-full py-4 bg-white text-black text-[11px] font-black rounded-2xl uppercase tracking-[0.2em]">
              <Navigation size={14} /> Open GPS
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* --- 2. LET'S WORK SECTION (SMOOTH HOVER) --- */}
      <section className="relative z-30 bg-[#030014] pt-32 pb-20 border-t border-white/5">
        <CyberGridBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-500 font-mono text-sm mb-4 tracking-[0.4em] uppercase">Have a project in mind?</p>
          <Link href="/contact" className="relative inline-block group">
            {/* Base White Text */}
            <h2 className="text-[13vw] md:text-[11vw] font-black text-white leading-none tracking-tighter select-none whitespace-nowrap transition-opacity duration-700 ease-in-out group-hover:opacity-0">
              LET'S WORK
            </h2>
            
            {/* Gradient Text (Fades in over white) */}
            <h2 className="absolute inset-0 text-[13vw] md:text-[11vw] font-black leading-none tracking-tighter select-none whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100">
              LET'S WORK
            </h2>
          </Link>
        </div>
      </section>

      {/* --- 3. SLIM FOOTER --- */}
      <footer className="relative z-40 bg-[#030014] pb-6">
        <div role="contentinfo" className="max-w-full mx-auto px-[19rem] flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6">
          <p className="text-slate-500 text-[11px] md:text-xs font-medium tracking-wide order-3 md:order-2">
            © 2026 Kevin Macandog. All rights reserved.
          </p>
          <div className="flex items-center gap-4 order-1 md:order-3">
             <span className="hidden lg:block text-[9px] font-mono text-slate-600 tracking-tighter italic">14.4660, 121.0470</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactAndFooter;