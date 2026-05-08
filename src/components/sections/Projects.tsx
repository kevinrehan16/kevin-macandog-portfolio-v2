"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus, Terminal, ExternalLink } from "lucide-react";

// --- PROJECT CARD COMPONENT (HYPER-TERMINAL V2) ---
const ProjectCard = ({ p, index }: { p: any; index: number }) => {
  if (!p) return null;

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: (index % 3) * 0.1 }}
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-[380px] md:h-[450px] w-full rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-1.5 md:p-2 overflow-hidden shadow-2xl"
      >
        {/* TERMINAL SIDEBAR STRIP */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-10 border-r border-white/5 bg-white/[0.02] flex flex-col items-center py-6 gap-3 md:gap-4 z-30">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500/40" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-amber-500/40" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500/40" />
          <div className="mt-auto rotate-180 [writing-mode:vertical-lr] text-[7px] md:text-[8px] font-mono text-slate-500 uppercase tracking-widest opacity-40">
            PRJ-{p.id} // SRC.LNK
          </div>
        </div>

        {/* INNER CONTAINER */}
        <div className="relative ml-8 md:ml-10 h-full rounded-[1.6rem] md:rounded-[2rem] overflow-hidden bg-[#030014]">
          {/* IMAGE LAYER (Recessed) */}
          <motion.img
            src={p.image}
            alt={p.title}
            style={{ transform: "translateZ(-30px) scale(1.2)" }}
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-25 transition-all duration-700 ease-out"
          />

          {/* CONTENT LAYER */}
          <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
            <div className="flex justify-between items-start" style={{ transform: "translateZ(50px)" }}>
              <div className="bg-violet-500/10 backdrop-blur-xl border border-violet-500/20 px-3 md:px-4 py-1 rounded-lg">
                <span className="text-[9px] md:text-[10px] font-mono text-violet-400 font-black uppercase tracking-tighter">
                  {p.category}
                </span>
              </div>
              <Terminal size={14} className="text-white/20 hidden md:block" />
            </div>

            <div className="space-y-4 md:space-y-6" style={{ transform: "translateZ(80px)" }}>
              <h3 className="text-2xl md:text-4xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                {p.title.split(' ').map((word: string, i: number) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h3>

              {/* TECH CHIPS (Floating) */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {p.tech.slice(0, 3).map((t: string) => (
                  <span key={t} className="text-[8px] md:text-[9px] text-white/60 bg-white/5 backdrop-blur-md px-2 py-1 rounded border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* POP-OUT ACTION BUTTONS */}
          <div 
            className="absolute bottom-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0 z-30"
            style={{ transform: "translateZ(100px)" }}
          >
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white text-black flex items-center justify-center hover:bg-violet-600 hover:text-white transition-colors">
              <Plus size={22} />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <ExternalLink size={18} />
            </button>
          </div>
        </div>

        {/* SCANLINE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,2px_100%] z-40 opacity-30" />
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PROJECTS SECTION ---
const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const allProjects = [
    { id: 1, title: "Human Resource", category: "Full Stack", image: "/img-projects/hris4.jpg", tech: ["React.js", "Node.js", "MySql"] },
    { id: 2, title: "Mall Management", category: "Full Stack", image: "/img-projects/mall1.jpg", tech: ["HTML5/CSS3", "PHP", "MySql"] },
    { id: 3, title: "Dealer Management", category: "Full Stack", image: "/img-projects/dms4.jpg", tech: ["HTML5/CSS3", "PHP", "MySQL"] },
    { id: 4, title: "Employee Management", category: "Full Stack", image: "/img-projects/portal1.jpg", tech: ["React.js", "Node.js", "MySQL"] },
    { id: 5, title: "Mobius Wix Website", category: "Frontend", image: "/img-projects/mobius1.jpg", tech: ["Wix", "HTML5", "CSS3"] },
    { id: 6, title: "Disciple Network", category: "Full Stack", image: "/img-projects/disciple2.jpg", tech: ["Vue.js", "Laravel", "Firebase"] },
    { id: 7, title: "FPMI Marina", category: "Full Stack", image: "/img-projects/marina8.jpg", tech: ["Wix", "HTML5", "CSS3"] },
    { id: 8, title: "City Portal", category: "Full Stack", image: "/img-projects/cityportal1.jpg", tech: ["HTML", "PHP", "MySql"] },
    { id: 9, title: "A.I Course Generator", category: "Full Stack", image: "/img-projects/coursegenerator7.jpg", tech: ["Wix", "HTML5", "CSS3"] },
    { id: 10, title: "Neflix Clone", category: "Full Stack", image: "/img-projects/netflix1.jpg", tech: ["HTML5", "React", "MongoDB"] },
    { id: 11, title: "Online Store", category: "Full Stack", image: "/img-projects/store1.png", tech: ["HTML", "Laravel", "MySql"] },
    { id: 12, title: "Ford Autos", category: "Frontend", image: "/img-projects/ford1.jpg", tech: ["HTML5", "CSS3", "JavaScript"] },
    { id: 13, title: "Visitors Management", category: "Full Stack", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["HTML", "PHP", "MySql"] },
    { id: 14, title: "Contact Tracing", category: "Full Stack", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["HTML", "PHP", "MySql"] },
    { id: 15, title: "Equicom API", category: "Backend", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["HTML", "PHP", "MySql"] },
    { id: 16, title: "Car Rental Website", category: "Frontend", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["HTML", "CSS", "JavaScript"] },
    { id: 17, title: "Hotel APIs", category: "Full Stack", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["HTML", "PHP", "MySql"] },
    { id: 18, title: "SMS APIs", category: "Backend", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["JavaScript", "PHP", "MySql"] },
    { id: 19, title: "Siteminder APIs", category: "Backend", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["JavaScript", "PHP", "MySql"] },
    { id: 20, title: "LG-TV APIs", category: "Backend", image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", tech: ["JavaScript", "PHP", "MySql"] },
    { id: 21, title: "My Portfolio v.1", category: "Frontend", image: "/img-projects/portfolio1.jpg", tech: ["HTML", "JavaScript", "CSS"] },
  ];

  const filteredProjects = allProjects.filter(p => filter === "All" || p.category === filter);
  const projectsToDisplay = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-[#030014] overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 md:mb-20 gap-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 md:w-12 bg-violet-500" />
              <span className="text-violet-500 font-mono text-[10px] font-black tracking-[0.4em] uppercase">Archive</span>
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600">Projects</span>
            </h2>
          </div>

          <div className="flex w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
            <div className="flex p-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl whitespace-nowrap">
              {["All", "Full Stack", "Frontend", "Backend"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => { setFilter(cat); setShowAll(false); }}
                  className={`px-5 py-2 rounded-xl text-[10px] md:text-[11px] font-bold font-mono tracking-widest uppercase transition-all duration-300 ${
                    filter === cat ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {projectsToDisplay.map((p, index) => (
              <ProjectCard key={p.id} p={p} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && filteredProjects.length > 6 && (
          <div className="mt-16 text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="w-full md:w-auto px-10 py-5 bg-transparent border border-violet-500/30 rounded-2xl text-white font-mono text-[10px] tracking-[0.4em] uppercase hover:bg-violet-600 transition-all duration-300"
            >
              See All {filteredProjects.length} Projects
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;