"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus } from "lucide-react";

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ p, index }: { p: any; index: number }) => {
  if (!p) return null;

  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // 3D Rotations - Mas nuanced kaysa sa 12deg para sa landscape
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
      viewport={{ once: false, amount: 0.2 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: (index % 3) * 0.1 }}
      className="relative group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-video rounded-[2.5rem] bg-[#0a0a0a] overflow-hidden cursor-pointer border border-white/5 shadow-2xl transition-shadow hover:shadow-violet-500/10"
      >
        {/* Interactive Spotlight Cursor (Inside Card) */}
        <motion.div 
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]) => `radial-gradient(450px circle at ${(mx + 0.5) * 100}% ${(my + 0.5) * 100}%, rgba(139, 92, 246, 0.2), transparent 80%)`
            )
          }}
        />

        {/* Background Image with Parallax Zoom */}
        <motion.img
          src={p?.image || "/img/gates.jpg"}
          alt={p?.title}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.5] group-hover:scale-110 group-hover:brightness-[0.4] transition-all duration-1000 ease-out"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-20">
          {/* Top Bar - Floating Tag */}
          <div className="flex [transform:translateZ(40px)]">
            <span className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[9px] font-black font-mono text-violet-400 uppercase tracking-[0.3em]">
              {p?.category}
            </span>
          </div>

          {/* Bottom Info - Parallax Depth */}
          <div className="space-y-4">
            <motion.h3 
              style={{ transform: "translateZ(60px)" }}
              className="text-3xl md:text-4xl font-bold text-white tracking-tighter leading-none"
            >
              {p?.title}
            </motion.h3>

            {/* Hidden details that slide up and fade in on hover */}
            <div className="overflow-hidden">
              <div className="flex justify-between items-end gap-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="flex flex-wrap gap-2 pt-2">
                  {p?.tech?.map((t: string) => (
                    <span key={t} className="text-[10px] text-slate-400 font-mono bg-white/5 px-3 py-1 rounded-md border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* View Project Interactive Button */}
                <motion.div className="flex items-center gap-2 text-white font-mono text-[9px] tracking-[0.3em] uppercase">
                  <div className="w-9 h-9 rounded-full bg-violet-600 flex items-center justify-center">
                    <Plus size={20} />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Outer Glow on Hover */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/0 group-hover:border-violet-500/50 transition-all duration-500 pointer-events-none z-30 shadow-[inset_0_0_100px_rgba(139,92,246,0.1)]" />
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
    // ...Array.from({ length: 9 }, (_, i) => ({
    //     id: i + 4,
    //     title: `Digital Solution ${i + 4}`,
    //     category: i % 2 === 0 ? "Full Stack" : "Frontend",
    //     image: "/img/hero.png",
    //     tech: ["TypeScript", "Framer", "Git"]
    // }))
  ];

  const filteredProjects = allProjects.filter(p => filter === "All" || p.category === filter);
  const projectsToDisplay = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="relative py-32 bg-[#030014] overflow-hidden">
      {/* Background Lighting decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section - Custom Design Based on your previous sections */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl px-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-12 bg-violet-500" />
              <span className="text-violet-500 font-mono text-xs font-black tracking-[0.4em] uppercase">Archive</span>
            </motion.div>
            {/* Header solid White, Offered only is gradient */}
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600">Projects</span>
            </h2>
          </div>

          {/* Minimalist Glass Tabs */}
          <div className="flex p-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem]">
            {["All", "Full Stack", "Frontend", "Backend"].map((cat) => (
              <button 
                key={cat}
                onClick={() => { setFilter(cat); setShowAll(false); }}
                className={`px-6 py-2.5 rounded-full text-[11px] font-bold font-mono tracking-widest uppercase transition-all duration-300 ${
                  filter === cat ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Landscape Grid System */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {projectsToDisplay.map((p, index) => (
              <ProjectCard key={p.id} p={p} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LOAD MORE BUTTON - Binalik natin */}
        {!showAll && filteredProjects.length > 6 && (
          <div className="mt-20 text-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(true)}
              className="px-12 py-5 bg-transparent border border-violet-500/30 rounded-2xl text-white font-mono text-[11px] tracking-[0.4em] uppercase hover:bg-violet-600 hover:border-violet-600 transition-all duration-300 shadow-violet-500/10 hover:shadow-lg hover:shadow-violet-500/20"
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