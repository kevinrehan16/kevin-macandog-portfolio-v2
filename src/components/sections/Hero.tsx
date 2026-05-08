"use client";
import { useState, useEffect, useRef } from "react";
// FIX: Nag-import tayo ng Variants type mula sa framer-motion
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { FaBriefcase, FaDownload } from "react-icons/fa";

import FloatingTech from "../FloatingTech";
import InteractiveBackground from "../InteractiveBackground";
import TypewriterRoles from "../TypewriterRoles";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  
  // FIX: Nilagyan natin ng type ang useRef (HTMLElement) para sa useScroll
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll Animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // FIX: Nilagyan natin ng "Variants" type para malinis ang autocomplete at walang build error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section 
      ref={sectionRef}
      style={{ position: 'relative' }}
      className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-16 overflow-hidden bg-[#030014]"
    >
      {isClient && <InteractiveBackground />}
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b0764,transparent)] opacity-50" />

      <motion.div 
        style={{ opacity: yOpacity, y: yTranslate }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 py-20 lg:py-0"
      >
        
        {/* LEFT SIDE */}
        <div className="z-10 order-2 lg:order-1 text-center lg:text-left">
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#d946ef] animate-pulse shadow-[0_0_10px_#d946ef]" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-violet-400 uppercase">
              Core Protocol v2.0 // Active
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-2">
            <span className="text-violet-500 font-mono font-bold tracking-widest text-base md:text-lg">
              HI, I'M
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-500 to-[#d946ef] drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              KEVIN
            </span>
            <span className="sr-only"> Macandog - Full Stack Software Developer</span>
            <span className="text-[#d946ef]">.</span>
          </motion.h1>

          <motion.div variants={itemVariants} className="mt-4 space-y-4 flex flex-col items-center lg:items-start">
            <p className="text-base md:text-xl text-slate-400 font-light max-w-md leading-relaxed px-4 lg:px-0">
              Architecting <span className="text-white font-medium">high-performance</span> digital systems with a balance of performance, creativity, and clean code.
            </p>
            <TypewriterRoles />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 px-4 lg:px-0">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 rounded-full hover:bg-violet-500 text-white text-xs font-bold tracking-widest transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            >
              <FaBriefcase /> INITIALIZE PROJECT
            </motion.button>
            <motion.a
              href="/file/Macandog_Kevin_CV.pdf" 
              download="Macandog_Kevin_CV"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white text-xs font-bold tracking-widest transition-all cursor-pointer"
            >
              <FaDownload /> DOWNLOAD CV
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div 
          variants={itemVariants}
          className="relative z-10 order-1 lg:order-2 flex justify-center items-center h-[300px] md:h-[500px] lg:h-[600px] w-full lg:-bottom-[95px] overflow-visible"
        >
          <div className="scale-90 md:scale-100 flex items-center justify-center w-full h-full">
             <FloatingTech />
          </div>
          <div className="absolute w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#d946ef]/10 blur-[80px] md:blur-[120px] rounded-full -z-10 animate-pulse" />
        </motion.div>

      </motion.div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#d946ef] to-transparent" />
        <span className="text-[8px] font-mono tracking-widest uppercase text-white">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;