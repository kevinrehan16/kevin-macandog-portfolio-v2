"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Motion values para sa mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics para sa "S-Class" smoothness
  const springConfig = { stiffness: 400, damping: 28 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      // Mag-i-expand ang cursor kung ang element ay link, button, o may data-cursor attribute
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest(".group") ||
        target.getAttribute("data-cursor") === "hover"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* 1. Ang Main "Follower" Ring */}
      <motion.div
        style={{
          translateX: x,
          translateY: y,
          left: -16, // Center ng 32px width
          top: -16,
        }}
        animate={{
          width: isHovered ? 80 : 32,
          height: isHovered ? 80 : 32,
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.1)" : "rgba(139, 92, 246, 0)",
          borderColor: isHovered ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.3)",
        }}
        className="fixed pointer-events-none z-[9999] border rounded-full hidden md:block transition-[background-color,border-color] duration-300"
      />

      {/* 2. Ang Small Center Dot */}
      <motion.div
        style={{
          translateX: x,
          translateY: y,
          left: -2,
          top: -2,
        }}
        className="fixed w-1 h-1 bg-violet-500 rounded-full z-[9999] pointer-events-none hidden md:block"
      />
    </>
  );
};

export default CustomCursor;