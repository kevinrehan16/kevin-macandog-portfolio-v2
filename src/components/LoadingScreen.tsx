"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Fake loading progress
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinished, 500); // Konting gap bago mag-hide
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <motion.div
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014] text-white"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full animate-pulse" />

      <div className="relative overflow-hidden mb-4">
        <motion.h1
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-4xl font-bold tracking-[0.5em] uppercase font-mono"
        >
          Kevin <span className="text-violet-500">Macandog</span>
        </motion.h1>
      </div>

      {/* Progress Bar Container */}
      <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${count}%` }}
          className="absolute h-full bg-violet-500 shadow-[0_0_15px_#8b5cf6]"
        />
      </div>

      {/* Percentage */}
      <motion.span 
        className="mt-4 font-mono text-violet-400 text-sm tracking-widest"
      >
        {count}%
      </motion.span>
    </motion.div>
  );
};

export default LoadingScreen;