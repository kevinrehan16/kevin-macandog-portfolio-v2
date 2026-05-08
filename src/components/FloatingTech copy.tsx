"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaReact } from "react-icons/fa";
import { SiPhp, SiTailwindcss, SiVuedotjs, SiJavascript, SiLaravel, SiNodedotjs, SiCss, SiPostgresql, SiMysql, SiPrisma, SiGit } from "react-icons/si";

const FloatingTech = () => {
  const rotationDuration = 4;
  // Rotation for the new outer orbit
  const outerRotationDuration = 7;

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const icons = [
    { Icon: FaReact, color: "#61DAFB", x: 150, y: -125, hitTime: 0.15 }, 
    { Icon: SiVuedotjs, color: "#468432", x: 170, y: 30, hitTime: 0.28 },
    { Icon: SiTailwindcss, color: "#38B2AC", x: -20, y: 170, hitTime: 0.50 },
    { Icon: SiJavascript, color: "#F7DF1E", x: -160, y: 120, hitTime: 0.63 },
    { Icon: SiPhp, color: "#831C91", x: -180, y: -160, hitTime: 0.88 }, 
    { Icon: SiLaravel, color: "#D00000", x: -30, y: -230, hitTime: 0.97 },
  ];

  // --- NEW OUTER ORBIT ICONS ---
  const outerIcons = [
    { Icon: SiNodedotjs, color: "#9AD872", radius: 290, angle: 55, hitTime: 0.15 },
    { Icon: SiCss, color: "#2178D6", radius: 300, angle: 120, hitTime: 0.33 },
    { Icon: SiPostgresql, color: "#336791", radius: 300, angle: 240, hitTime: 0.66 },
    { Icon: SiMysql, color: "#FFA02E", radius: 300, angle: 320, hitTime: 0.88 },
    { Icon: SiPrisma, color: "#FF653F", radius: 290, angle: 0, hitTime: 0.99 },
    { Icon: SiGit, color: "#336791", radius: 310, angle: 560, hitTime: 0.55 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* --- ENHANCED BORDER SCANNER (Comet Tail) --- */}
      
      {/* Profile Section */}
      <div className="group relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] flex items-center justify-center">

        {/* --- ORBITING GLOW PARTICLE --- */}
        <div className="absolute z-20 w-64 h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="relative w-full h-full"
          >
            {/* Ito yung maliit na kumikinang na bilog */}
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5"
            >
              {/* The Core Orb */}
              <div className="w-full h-full bg-violet-400 rounded-full shadow-[0_0_15px_#8b5cf6,0_0_30px_#8b5cf6]" />
              
              {/* The Glow Aura around the orb */}
              <div className="absolute inset-0 bg-violet-500 rounded-full blur-md opacity-60" />
            </motion.div>
          </motion.div>

          {/* Subtle Static Guide Ring (Optional: Para makita yung orbit path) */}
          <div className="absolute inset-0 border border-white/5 rounded-full" />
        </div>
        {/* Rotating Gradient Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-30px] rounded-full opacity-40 blur-md pointer-events-none"
          style={{
            background:
              "conic-gradient(from 0deg, #8b5cf6, #d946ef, #6366f1, #8b5cf6)",
          }}
        />

        {/* Decorative Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-20px] rounded-full border border-dashed border-fuchsia-500/20 scale-105 pointer-events-none"
        />

        {/* Pulse Wave 1 */}
        <motion.div
          animate={{
            scale: [1, 1.4],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 border border-violet-400 rounded-full"
        />

        {/* Pulse Wave 2 */}
        <motion.div
          animate={{
            scale: [1, 1.7],
            opacity: [0.2, 0],
          }}
          transition={{
            duration: 3,
            delay: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="absolute inset-0 border border-fuchsia-400 rounded-full"
        />

        {/* Background Glow */}
        <div className="absolute inset-0 bg-fuchsia-500/10 rounded-full blur-[80px] animate-pulse pointer-events-none" />

        {/* Main Image */}
        <motion.div
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 1, 0, -1, 0],
            x: mousePosition.x * 0.2,
            y: mousePosition.y * 0.2,
          }}
          transition={{
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              type: "spring",
              stiffness: 50,
            },
            y: {
              type: "spring",
              stiffness: 50,
            },
          }}
          className="relative w-full h-full rounded-full p-[3px] bg-gradient-to-tr from-violet-500 via-fuchsia-400 to-violet-500 shadow-[0_0_100px_rgba(139,92,246,0.5)] overflow-hidden"
        >
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[#030014]">
            <Image
              src="/img/hero.png"
              alt="Kevin"
              fill
              priority
              sizes="(max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw"
              className="
                object-cover object-[center_20%]
                brightness-90 contrast-110 saturate-[1.2] sepia-[0.2]
                group-hover:sepia-0
                group-hover:saturate-150
                group-hover:brightness-100
                transition-all duration-700
              "
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-violet-300/30 mix-blend-color" />
          </div>
        </motion.div>

        {/* Lens Flare */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-3xl z-20 pointer-events-none" />
      </div>

      {/* --- TECH ICONS --- */}
      {icons.map((tech, i) => (
        <div
          key={i}
          className="absolute z-30"
          style={{ 
            // Ang base position ay sa gitna muna lahat
            left: "50%", 
            top: "50%" 
          }}
        >
          <motion.div
            // 1. INITIAL STATE: Lahat nasa gitna, walang opacity
            initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
            
            // 2. ENTRY ANIMATION: Lalabas paikot counter-clockwise papunta sa x,y position nila
            animate={{ 
              x: tech.x, 
              y: tech.y, 
              opacity: 1, 
              rotate: -360, // Counter-clockwise rotation

              // 3. FLOATING & GLOW (Idinugtong ang dati mong effects pagkatapos ng entry)
              transitionEnd: {
                // Pagkatapos ng entry animation, ito ang magpapatuloy
                rotate: 0 
              }
            }}
            transition={{
              // Entry transition settings
              duration: 1.5,
              delay: i * 0.2, // Isa-isang lalabas (Staggered)
              ease: "easeOut"
            }}
          >
            <motion.div
              // 4. PERSISTENT EFFECTS: Floating at Scanner Glow
              animate={{ 
                y: [0, -15, 0], // Floating (Staggered floating logic below)
                boxShadow: [
                  "0 0 0px rgba(217,70,239,0)", 
                  "0 0 0px rgba(217,70,239,0)", 
                  "0 0 50px rgba(217,70,239,0.8)", 
                  "0 0 0px rgba(217,70,239,0)",
                  "0 0 0px rgba(217,70,239,0)"
                ],
                scale: [1, 1, 1.25, 1, 1],
                borderColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)", "rgba(217,70,239,1)", "rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]
              }}
              transition={{
                y: {
                  duration: 3 + i, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5 + (i * 0.2) // Magsisimulang lumutang pagkalapag sa pwesto
                },
                default: {
                  duration: rotationDuration,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, tech.hitTime - 0.03, tech.hitTime, tech.hitTime + 0.05, 1]
                }
              }}
              className="p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner"
            >
              <tech.Icon size={28} color={tech.color} />
            </motion.div>
          </motion.div>
        </div>
      ))}

      {/* --- NEW OUTER ORBIT & SCANNER --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px] rounded-full border border-dashed border-white/10 flex items-center justify-center">
          
          {/* --- NEW OUTER ORBITING SCANNER (Bilog na umiikot) --- */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: outerRotationDuration,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
          >
            {/* The Outer Orb Scanner */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
            >
              {/* Core of the Outer Orb */}
              <div className="w-full h-full bg-fuchsia-400 rounded-full shadow-[0_0_20px_#d946ef,0_0_40px_#d946ef]" />
              {/* Outer Aura */}
              <div className="absolute inset-0 bg-fuchsia-500 rounded-full blur-md opacity-70" />
            </motion.div>
          </motion.div>

          {/* --- NEW OUTER TECH ICONS & GLOW LOGIC --- */}
          {outerIcons.map((tech, i) => {
            // Calculate static position on the orbit path
            const radian = tech.angle * (Math.PI / 180);
            const x = Math.sin(radian) * tech.radius;
            const y = -Math.cos(radian) * tech.radius; // Negative cos for correct top orientation

            return (
              <div
                key={i}
                className="absolute z-10"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)"
                }}
              >
                {/* 1. INITIAL ENTRY: Staggered Fade In */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: 2 + (i * 0.3), // delay so they come after main icons
                    ease: "backOut"
                  }}
                >
                  {/* 2. PERSISTENT FLOATING: Slow up and down */}
                  <motion.div
                    animate={{
                      y: [0, -20, 0]
                    }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3 + (i * 0.3) // Magsisimulang lumutang pagkalapag sa pwesto
                    }}
                  >
                    {/* 3. SYNCED SCANNER GLOW: Glows when outer scanner hits it */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(139,92,246,0)",
                          "0 0 0px rgba(139,92,246,0)",
                          "0 0 60px rgba(139,92,246,0.9)",
                          "0 0 0px rgba(139,92,246,0)",
                          "0 0 0px rgba(139,92,246,0)"
                        ],
                        scale: [1, 1, 1.3, 1, 1],
                        borderColor: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)", "rgba(139,92,246,1)", "rgba(255,255,255,0.05)", "rgba(255,255,255,0.05)"]
                      }}
                      transition={{
                        duration: outerRotationDuration, // Must match the outer scanner rotation duration
                        repeat: Infinity,
                        ease: "linear",
                        // times logic: scanner hits them based on their angle. angles are 0, 120, 240.times are fraction of time. 0, 120/360, 240/360.
                        times: [0, tech.hitTime - 0.02, tech.hitTime, tech.hitTime + 0.04, 1]
                      }}
                      className="p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-inner"
                    >
                      <tech.Icon size={28} color={tech.color} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FloatingTech;