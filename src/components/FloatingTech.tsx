"use client";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaReact, FaPhp, FaNodeJs, FaGitAlt, FaCss3Alt, FaBootstrap } from "react-icons/fa";
import { SiTailwindcss, SiVuedotjs, SiJavascript, SiLaravel, SiNextdotjs, SiTypescript, SiPostgresql, SiMysql } from "react-icons/si";

const FloatingTech = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    const timer = setTimeout(() => setIsAnimating(true), 500);
    return () => { window.removeEventListener("mousemove", handleMouseMove); clearTimeout(timer); };
  }, []);

  const icons = [
    { Icon: FaCss3Alt, level: 80 }, { Icon: FaReact, level: 88 },
    { Icon: SiVuedotjs, level: 80 }, { Icon: SiTypescript, level: 70 },
    { Icon: SiJavascript, level: 90 }, { Icon: FaBootstrap, level: 90 },
    { Icon: SiTailwindcss, level: 80 }, { Icon: SiNextdotjs, level: 65 },
    { Icon: FaGitAlt, level: 85 }, { Icon: FaNodeJs, level: 85 },
    { Icon: FaPhp, level: 95 }, { Icon: SiMysql, level: 90 },
    { Icon: SiPostgresql, level: 75 }, { Icon: SiLaravel, level: 85 },
  ];

  const sides = 14;

  const tetradecagonPath = useMemo(() => {
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 360) / sides;
      const radian = (angle - 90) * (Math.PI / 180);
      const x = 50 + 50 * Math.cos(radian);
      const y = 50 + 50 * Math.sin(radian);
      points.push(`${x}% ${y}%`);
    }
    return `polygon(${points.join(", ")})`;
  }, []);

  const getGridPoints = (radius: number) => {
    const points = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 360) / sides;
      const radian = (angle - 90) * (Math.PI / 180);
      const x = 50 + radius * Math.cos(radian);
      const y = 50 + radius * Math.sin(radian);
      points.push(`${x},${y}`);
    }
    return points.join(" ");
  };

  const getStatsPoints = useMemo(() => {
    return icons.map((item, i) => {
      const angle = (i * 360) / sides;
      const radian = (angle - 90) * (Math.PI / 180);
      const dynamicRadius = (item.level / 100) * 50; 
      const x = 50 + dynamicRadius * Math.cos(radian);
      const y = 50 + dynamicRadius * Math.sin(radian);
      return `${x},${y}`;
    }).join(" ");
  }, [icons]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      
      {/* 1. CENTER UNIT */}
      <motion.div
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 35, damping: 25 }}
        className="relative z-20 flex items-center justify-center w-[320px] md:w-[550px] h-[320px] md:h-[550px]"
      >
        <div className="relative flex items-center justify-center w-full h-full group">
          
          {/* LAYER 1: OUTER BACKGROUND GLOW */}
          <div 
            className="absolute inset-0 scale-[1.18] -z-30 opacity-20"
            style={{ 
              clipPath: tetradecagonPath,
              background: "rgba(139, 92, 246, 0.25)",
              filter: "blur(20px) drop-shadow(0 0 15px rgba(139, 92, 246, 0.4))" 
            }}
          />

          {/* LAYER 2: MIDDLE BORDER - THE HOVER TRIGGER */}
          <div 
            className="absolute inset-0 scale-[1.05] -z-20 border border-violet-500/20 pointer-events-auto transition-all duration-300 group-hover:border-violet-500/50"
            style={{ clipPath: tetradecagonPath }}
          />

          {/* LAYER 3: INNER GLASS FRAME */}
          <div 
            className="absolute inset-0 bg-white/[0.03] backdrop-blur-[6px] border border-white/10 -z-10" 
            style={{ clipPath: tetradecagonPath }}
          />

          {/* STATS RADAR - BINABAAN KO ANG Z-INDEX (z-10) PARA NASA LIKOD NG PIC */}
          <div className="absolute inset-0 z-10 flex items-center justify-center p-6 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible transition-all duration-500 opacity-40 group-hover:opacity-100 group-hover:scale-110">
              <defs>
                <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8, 1].map((s, i) => (
                <polygon 
                  key={i} 
                  points={getGridPoints(50)} 
                  /* Kapag i === 0 (0.2 scale), gawin nating solid violet/dark */
                  fill={i === 0 ? "rgba(139, 92, 246, 0.3)" : "none"} 
                  /* Gawin nating mas visible ang stroke ng pinakamaliit */
                  stroke={i === 0 ? "rgba(167, 139, 250, 0.6)" : "rgba(167, 139, 250, 0.2)"} 
                  strokeWidth="0.4" 
                  transform={`scale(${s}) translate(${(50/s)-50} ${(50/s)-50})`} 
                />
              ))}

              {/* The Actual Stats Polygon */}
              <motion.polygon 
                points={getStatsPoints} 
                fill="url(#purpleGrad)" 
                stroke="#a78bfa" 
                strokeWidth="1"
                initial={{ opacity: 0.5 }}
                className="transition-all duration-500"
              />
            </svg>
          </div>

          {/* PORTRAIT - TINAASAN KO ANG Z-INDEX (z-20) PARA NASA HARAP NG STATS */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 ease-out 
                      group-hover:opacity-5 group-hover:blur-[2px]"
          >
            <Image
              src="/img/white.png"
              alt="Me"
              width={500}
              height={700}
              priority
              unoptimized
              className="
                w-[280px] md:w-[480px] h-auto object-contain
                transition-all duration-300 group-hover:grayscale
                drop-shadow-[0_0_20px_rgba(180,126,222,0.35)]
              "
            />
          </motion.div>
        </div>
      </motion.div>

      {/* 2. ORBITING ICONS */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative w-[340px] md:w-[680px] h-[340px] md:h-[680px]">
          {icons.map((tech, i) => {
            const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 340;
            const angle = (i * 360) / sides;
            const radian = (angle - 90) * (Math.PI / 180);
            const tx = Math.cos(radian) * radius;
            const ty = Math.sin(radian) * radius;

            return (
              <motion.div 
                key={i} 
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={isAnimating ? { x: tx, y: ty, opacity: 1, scale: 1 } : { x: 0, y: 0, opacity: 0, scale: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: i * 0.1 
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                {/* FLOATING ANIMATION */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  }}
                  /* DITO ANG MAGIC NG GLOW */
                  whileHover={{ 
                    scale: 1.3, 
                    color: "#c084fc", // Mas maliwanag na violet
                    filter: [
                      "drop-shadow(0 0 8px rgba(167, 139, 250, 0.4))",
                      "drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))", // Outer glow
                      "drop-shadow(0 0 35px rgba(139, 92, 246, 0.4))"  // Wide bloom
                    ],
                  }}
                  className="cursor-pointer relative group"
                >
                  {/* Background Glow Layer (lalabas lang pag hover) */}
                  <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <tech.Icon 
                    size={typeof window !== 'undefined' && window.innerWidth < 768 ? 32 : 46} 
                    className="text-violet-400/40 transition-all duration-300 group-hover:text-violet-300" 
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingTech;