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
  // Dinoble ang array para sa infinite effect
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <div className="relative py-20 bg-[#030014] overflow-hidden group">
      {/* Gradient Fades - Nilagyan ng z-20 para laging nasa ibabaw ng icons */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] to-transparent z-20 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-16 w-max" 
        animate={{ x: ["0%", "-50%"] }} // Susi sa seamless loop: 0% patungong -50%
        transition={{
          duration: 35, // Bagalan natin ang speed para hindi nakakahilo
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedStack.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-6 group/icon cursor-default"
          >
            <div className="relative">
              {/* Soft glow behind icon on hover */}
              <div 
                className="absolute inset-0 blur-2xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500 rounded-full"
                style={{ backgroundColor: `${tech.color}40` }} 
              />
              
              <tech.icon 
                size={45}
                className="text-white/20 transition-all duration-500 group-hover/icon:text-white group-hover/icon:scale-110"
              />
            </div>
            
            <span className="text-white/10 font-mono text-xl tracking-tighter transition-all duration-500 group-hover/icon:text-white">
              {tech.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechMarquee;