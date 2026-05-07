"use client";
import { motion } from "framer-motion";

export const GlitchText = ({ text }: { text: string }) => {
  return (
    <span className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      
      {/* Glitch effects lilitaw lang 'pag hinover o naka-loop */}
      <motion.span
        className="absolute top-0 left-0 -z-10 text-violet-500 opacity-0 group-hover:opacity-100"
        animate={{ x: [-2, 2, -1, 0], y: [1, -1, 0] }}
        transition={{ repeat: Infinity, duration: 0.1 }}
      >
        {text}
      </motion.span>
      
      <motion.span
        className="absolute top-0 left-0 -z-20 text-fuchsia-500 opacity-0 group-hover:opacity-100"
        animate={{ x: [2, -2, 1, 0], y: [-1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}
      >
        {text}
      </motion.span>
    </span>
  );
};