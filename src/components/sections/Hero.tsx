"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaBriefcase, FaDownload } from "react-icons/fa";

import FloatingTech from "../FloatingTech";
import InteractiveBackground from "../InteractiveBackground";
import TypewriterRoles from "../TypewriterRoles";

const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef(null);

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

  // Animation Variants para sa stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
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
      
      {/* Dynamic Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b0764,transparent)] opacity-50" />

      <motion.div 
        style={{ opacity: yOpacity, y: yTranslate }}
        variants={containerVariants}
        initial="hidden"
        // --- DAGDAG DITO PARA SA REPEAT ANIMATION ---
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        // --------------------------------------------
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"
      >
        
        {/* --- LEFT SIDE: THE INFO --- */}
        <div className="z-10 order-2 lg:order-1">
          {/* Status Indicator */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#d946ef] animate-pulse shadow-[0_0_10px_#d946ef]" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-violet-400 uppercase">
              Core Protocol v2.0 // Active
            </span>
          </motion.div>

          {/* Intro Text */}
          <motion.div variants={itemVariants} className="mb-2">
            <span className="text-violet-500 font-mono font-bold tracking-widest text-lg">
              HI, I'M
            </span>
          </motion.div>

          {/* Main Name with Glow Effect */}
          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-500 to-[#d946ef] drop-shadow-[0_0_30px_rgba(139,92,246,0.3)] animate-pulse">
              KEVIN
            </span>
            {/* Invisible text para sa SEO bots para rank ka sa "Full Stack Developer" */}
            <span className="sr-only"> Macandog - Full Stack Software Developer</span>
            <span className="text-[#d946ef]">.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.div variants={itemVariants} className="mt-4 space-y-4">
            <p className="text-lg md:text-xl text-slate-400 font-light max-w-md leading-relaxed">
              Architecting <span className="text-white font-medium">high-performance</span> digital systems with a balance of performance, creativity, and clean code.
            </p>
            
            {/* Tech Chips */}
            <TypewriterRoles />
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-violet-600 rounded-full hover:bg-violet-500 text-white text-xs font-bold tracking-widest transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
            >
              <FaBriefcase /> INITIALIZE PROJECT
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white text-xs font-bold tracking-widest transition-all"
            >
              <FaDownload /> DOWNLOAD CV
            </motion.button>
          </motion.div>
        </div>

        {/* --- RIGHT SIDE: THE VISUAL --- */}
        <motion.div 
          // --- DAGDAG DITO PARA MAG-REPEAT ANG VISUAL ---
          variants={itemVariants}
          // ----------------------------------------------
          className="relative z-10 order-1 lg:order-2 flex justify-center items-center h-[400px] md:h-[600px] w-full -bottom-[95px]"
        >
          <FloatingTech />
          
          {/* Subtle Glow behind FloatingTech */}
          <div className="absolute w-[300px] h-[300px] bg-[#d946ef]/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        </motion.div>

      </motion.div>

      {/* --- SCROLL INDICATOR --- */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#d946ef] to-transparent" />
        <span className="text-[8px] font-mono tracking-widest uppercase text-white">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;