"use client";

import { motion } from "framer-motion";
import { 
  SiVuedotjs, SiReact, SiTailwindcss, SiJavascript, 
  SiTypescript, SiLaravel, SiNodedotjs, SiMongodb, 
  SiFramer, SiPostgresql, SiPhp, SiGit, SiMysql, 
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiInsomnia,
  SiPostman,
  SiXml,
  SiJson,
  SiJquery,
  SiAxios,
  SiExpress,
  SiPrisma
} from "react-icons/si";

const techStack = [
  { icon: SiVuedotjs, name: "Vue.js", color: "#42b883" },
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiJquery, name: "jQuery", color: "#0769AD" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiHtml5, name: "HTML5", color: "#E34C26" },
  { icon: SiBootstrap, name: "Bootstrap", color: "#563D7C" },
  { icon: SiCss, name: "CSS3", color: "#1572B6" },
  { icon: SiFramer, name: "Framer Motion", color: "#0055FF" },
  { icon: SiLaravel, name: "Laravel", color: "#FF2D20" },
  { icon: SiPhp, name: "PHP", color: "#777BB4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiPrisma, name: "Prisma", color: "#5A59ED" },
  { icon: SiExpress, name: "Express", color: "#000000" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiMysql, name: "MySql", color: "#2895AB" },
  { icon: SiInsomnia, name: "Insomnia", color: "#875G7C" },
  { icon: SiPostman, name: "Postman", color: "#FF6C37" },
  { icon: SiXml, name: "XML", color: "#HH6C98" },
  { icon: SiJson, name: "JSON", color: "#F0C14E" },
  { icon: SiAxios, name: "Axios", color: "#5A29E4" },
  { icon: SiGit, name: "Git", color: "#2496ED" },
];

const TechMarquee = () => {
  const duplicatedStack = [...techStack, ...techStack];

  return (
    // UPDATED BACKGROUND: Darker base with a subtle top-to-bottom gradient
    <div className="relative py-12 md:py-20 bg-gradient-to-b from-[#030014] via-[#05011a] to-[#030014] overflow-hidden group border-y border-white/5">
      
      {/* Background Decor - Subtle violet pulse in the center for separation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Gradient Fades - Responsive width */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-48 bg-gradient-to-r from-[#030014] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-48 bg-gradient-to-l from-[#030014] to-transparent z-20 pointer-events-none" />

      <motion.div
        // Responsive gap: gap-8 on mobile, gap-16 on desktop
        className="flex whitespace-nowrap gap-8 md:gap-16 w-max" 
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedStack.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 md:gap-6 group/icon cursor-default"
          >
            <div className="relative">
              <div 
                className="absolute inset-0 blur-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500 rounded-full"
                style={{ backgroundColor: `${tech.color}40` }} 
              />
              
              <tech.icon 
                // Responsive Icon size: 32px on mobile, 45px on desktop
                size={typeof window !== 'undefined' && window.innerWidth < 768 ? 32 : 45}
                className="text-white/20 transition-all duration-500 group-hover/icon:text-white group-hover/icon:scale-110"
              />
            </div>
            
            <span className="text-white/10 font-mono text-lg md:text-xl tracking-tighter transition-all duration-500 group-hover/icon:text-white">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;