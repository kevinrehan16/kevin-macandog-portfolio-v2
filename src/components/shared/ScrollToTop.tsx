"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Check scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      // Lalabas lang ang button kung lumagpas na ng 500px (approx. Hero height)
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: "#7c3aed" }} // Violet-600 on hover
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[9999] p-4 rounded-full bg-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] border border-white/20 backdrop-blur-sm transition-colors group"
          aria-label="Back to Top"
        >
          <ArrowUp 
            size={24} 
            className="group-hover:-translate-y-1 transition-transform duration-300" 
          />
          
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-violet-400/20 blur-xl -z-10 animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;