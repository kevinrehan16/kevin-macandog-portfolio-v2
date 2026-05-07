import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const roles = [
  "Web Developer",
  "Software Engineer",
  "Software Developer",
  "FullStack Developer",
  "Front-End Developer"
];

const TypewriterRoles = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // ULTRA-SNAPPY SPEED SETTINGS
  const typingSpeed = isDeleting ? 10 : 30; // 20ms na lang ang bura (sobrang bilis!)
  const pauseTime = 1200; // Binawasan ko pa ng konti ang pause (1.2s) para tuloy-tuloy ang flow

  useEffect(() => {
    const currentRole = roles[index % roles.length];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, index]);

  return (
    <div className="flex items-center pt-2 min-h-[40px]">
      <div className="font-mono text-xl md:text-2xl font-bold flex items-center tracking-tight">
        {/* Static Left Bracket */}
        <span className="text-violet-500/80 mr-2">{"<"}</span>
        
        {/* Typing Content */}
        <span className="text-white drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
          {displayText}
        </span>

        {/* Cursor - Binawasan din ang width para mas sleek */}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "steps(2)" }}
          className="inline-block w-[1.5px] h-6 bg-violet-400 mx-1"
        />

        {/* Static Right Bracket */}
        <span className="text-violet-500/80 ml-1">{" />"}</span>
      </div>
    </div>
  );
};

export default TypewriterRoles;