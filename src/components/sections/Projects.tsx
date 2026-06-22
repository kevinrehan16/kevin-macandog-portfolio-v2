"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus, Terminal, ExternalLink, X, Cpu, ChevronLeft, ChevronRight } from "lucide-react";

// --- 1. PROJECT MODAL COMPONENT (WITH IMAGE CAROUSEL & PRIVATE ALERT MODAL) ---
const ProjectModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [showPrivateModal, setShowPrivateModal] = useState(false); // NEW STATE FOR PRIVATE MODAL
  const images = project.images || [project.image]; // Fallback kung isa lang ang image

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] flex items-center justify-center p-2 md:p-6 bg-[#030014]/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[95vh] overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl flex flex-col"
      >
        {/* Header / Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            </div>
            <span className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden md:inline">
              Project_Vault / {project.title.replace(/\s+/g, '_').toLowerCase()}.System
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
          {/* LEFT: Image Theater (Kita buong pic) */}
          <div className="w-full lg:w-[65%] bg-black/50 relative flex items-center justify-center p-4 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={images[imgIndex]}
                alt={`${project.category} Web ${project.title} System - Kevin Macandog`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-[400px] lg:max-h-[600px] object-contain shadow-2xl rounded-lg"
              />
            </AnimatePresence>

            {/* Navigation Arrows (Visible kung > 1 image) */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImg}
                  className="absolute left-4 p-3 bg-black/40 hover:bg-violet-600 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImg}
                  className="absolute right-4 p-3 bg-black/40 hover:bg-violet-600 backdrop-blur-md rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>
                
                {/* Counter Tag */}
                <div className="absolute bottom-6 px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono text-white/70">
                  IMAGE {imgIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* RIGHT: Metadata & Specs */}
          <div className="w-full lg:w-[35%] p-6 md:p-10 overflow-y-auto bg-[#0a0a0a] border-l border-white/5">
            <div className="space-y-8">
              <div>
                <span className="text-violet-400 font-mono text-[10px] tracking-[0.4em] uppercase font-black">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mt-2 leading-none">
                  {project.title}
                </h2>
              </div>

              <div className="space-y-4">
                <h4 className="text-white/40 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={14} /> System Description
                </h4>
                <p className="text-slate-400 leading-relaxed text-sm font-light">
                  Project implementation for {project.title}. This architecture focuses on scalable data processing and seamless user integration.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-white/40 font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={14} /> Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t: string) => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-3">
                <button 
                  onClick={() => setShowPrivateModal(true)} // TRIGGER THE MODAL HERE
                  className="w-full py-4 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-mono text-[10px] tracking-[0.3em] uppercase transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={14} /> Launch Site
                </button>
                <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-mono text-[10px] tracking-[0.3em] uppercase transition-all">
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- PRIVATE ACCESS MODAL OVERLAY --- */}
        <AnimatePresence>
          {showPrivateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[150] flex items-center justify-center p-4 bg-[#030014]/80 backdrop-blur-sm md:rounded-[2.5rem] rounded-[1.5rem]"
              onClick={() => setShowPrivateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl flex flex-col text-center items-center"
              >
                {/* Modal Icon */}
                <div className="w-12 h-12 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center mb-4">
                  <X className="text-violet-400" size={24} />
                </div>
                
                <h3 className="text-white font-black text-xl tracking-wide uppercase mb-2">Access Restricted</h3>
                
                <div className="h-[1px] w-12 bg-violet-500/50 mb-4" />
                
                <p className="text-slate-400 text-sm leading-relaxed font-light mb-8">
                  This project is privately owned by the client and is not publicly accessible. Due to confidentiality and ownership agreements, a live demo cannot be provided. Please review the project details and screenshots instead.
                </p>
                
                <button
                  onClick={() => setShowPrivateModal(false)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-mono text-[10px] tracking-[0.3em] uppercase transition-all"
                >
                  Close Message
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* --- END OF PRIVATE ACCESS MODAL --- */}

      </motion.div>
    </motion.div>
  );
};

// --- 2. PROJECT CARD COMPONENT ---
const ProjectCard = ({ p, index, onOpen }: { p: any; index: number; onOpen: (p: any) => void }) => {
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
      className="relative group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => onOpen(p)}
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-[380px] md:h-[450px] w-full rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-2 overflow-hidden cursor-pointer"
      >
        {/* Terminal Strip */}
        <div className="absolute left-0 top-0 bottom-0 w-10 border-r border-white/5 bg-white/[0.02] flex flex-col items-center py-6 gap-4 z-30">
          <div className="w-2 h-2 rounded-full bg-red-500/40" />
          <div className="w-2 h-2 rounded-full bg-amber-500/40" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
        </div>

        <div className="relative ml-10 h-full rounded-[2rem] overflow-hidden bg-[#030014]">
          <motion.img 
            src={p.image} 
            alt={`Kevin Macandog - ${p.category} Web ${p.title} System`}
            style={{ transform: "translateZ(-30px) scale(1.2)" }} 
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-all duration-700" 
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
            <div style={{ transform: "translateZ(50px)" }}>
              <div className="bg-violet-500/20 backdrop-blur-md border border-violet-500/30 px-4 py-1 rounded-lg w-fit">
                <span className="text-[10px] font-mono text-violet-400 font-bold uppercase tracking-tighter">{p.category}</span>
              </div>
            </div>
            <div className="space-y-4" style={{ transform: "translateZ(80px)" }}>
              <h3 className="text-3xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                {p.title.split(' ').map((word: string, i: number) => (<span key={i} className="block">{word}</span>))}
              </h3>
              <div className="flex flex-wrap gap-2">
                {p.tech.slice(0, 3).map((t: string) => (
                  <span key={t} className="text-[9px] text-white/60 bg-white/5 px-2 py-1 rounded border border-white/5 uppercase">{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-10 group-hover:translate-x-0 z-30" style={{ transform: "translateZ(100px)" }}>
            <button 
              onClick={(e) => { e.stopPropagation(); onOpen(p); }} 
              className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-violet-600 hover:text-white transition-colors"
            >
              <Plus size={24} />
            </button>
            <button className="w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors">
              <ExternalLink size={20} />
            </button>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_3px,2px_100%] z-40 opacity-20" />
      </motion.div>
    </motion.div>
  );
};

// --- 3. MAIN PROJECTS SECTION ---
const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const allProjects = [
    { 
      id: 1, 
      title: "Human Resource", 
      category: "Fullstack", 
      image: "/img-projects/hris4.jpg", 
      images: [
        "/img-projects/hris1.jpg",
        "/img-projects/hris2.jpg",
        "/img-projects/hris3.jpg",
        "/img-projects/hris4.jpg",
        "/img-projects/hris5.jpg",
        "/img-projects/hris6.jpg",
      ],
      tech: ["React.js", "Node.js", "MySql", "Prisma", "Express.js", "HTML5", "Tailwind", "JavaScript", "Typescript"]
    },
    { 
      id: 2, 
      title: "Mall Management", 
      category: "Fullstack", 
      image: "/img-projects/mall1.jpg", 
      images: [
        "/img-projects/mall1.jpg",
        "/img-projects/mall2.jpg",
        "/img-projects/mall3.jpg",
        "/img-projects/mall4.jpg",
        
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 3, 
      title: "Dealer Management", 
      category: "Fullstack", 
      image: "/img-projects/dms4.jpg", 
      images: [
        "/img-projects/dms1.jpg",
        "/img-projects/dms2.jpg",
        "/img-projects/dms3.jpg",
        "/img-projects/dms4.jpg",
        "/img-projects/dms5.jpg",
        "/img-projects/dms6.jpg",
        "/img-projects/dms7.jpg",
        "/img-projects/dms8.jpg",
        "/img-projects/dms9.jpg",
        "/img-projects/dms10.jpg",
        "/img-projects/dms11.jpg",
        "/img-projects/dms12.jpg",
        "/img-projects/dms13.jpg",
        "/img-projects/dms14.jpg",
        "/img-projects/dms15.jpg",
        "/img-projects/dms16.jpg",
      ],
      tech: ["React.js", "Laravel", "PostgreSQL", "React-bootstrap", "JavaScript", "HTML5", "Axios"]
    },
    { 
      id: 4, 
      title: "Employee Management", 
      category: "Fullstack", 
      image: "/img-projects/portal1.jpg", 
      images: [
        "/img-projects/portal1.jpg",
        "/img-projects/portal2.jpg",
        "/img-projects/portal3.jpg",
        
      ],
      tech: ["React.js", "Node.js", "MySql", "Prisma", "Express.js", "HTML5", "Tailwind", "JavaScript", "Typescript"]
    },
    { 
      id: 5, 
      title: "Mobius Wix Website", 
      category: "Frontend", 
      image: "/img-projects/mobius1.jpg", 
      images: [
        "/img-projects/mobius1.jpg",
        "/img-projects/mobius2.jpg",
        "/img-projects/mobius3.jpg",
        "/img-projects/mobius4.jpg",
      ],
      tech: ["Wix", "HTML5", "CSS3"]
    },
    { 
      id: 6, 
      title: "Disciple Network", 
      category: "Fullstack", 
      image: "/img-projects/disciple2.jpg", 
      images: [
        "/img-projects/disciple1.jpg",
        "/img-projects/disciple2.jpg",
        "/img-projects/disciple3.jpg",
        "/img-projects/disciple4.jpg",
        "/img-projects/disciple5.jpg",
      ],
      tech: ["Vue.js", "Laravel", "Firebase", "HTML5", "CSS3", "JavaScript", "Typescript"]
    },
    { 
      id: 7, 
      title: "FPMI Marina", 
      category: "Fullstack", 
      image: "/img-projects/marina8.jpg", 
      images: [
        "/img-projects/marina1.jpg",
        "/img-projects/marina2.jpg",
        "/img-projects/marina3.jpg",
        "/img-projects/marina4.jpg",
        "/img-projects/marina5.jpg",
        "/img-projects/marina6.jpg",
        "/img-projects/marina7.jpg",
        "/img-projects/marina8.jpg", 
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 8, 
      title: "City Portal", 
      category: "Fullstack", 
      image: "/img-projects/cityportal1.jpg", 
      images: [
        "/img-projects/cityportal1.jpg",
        "/img-projects/cityportal2.jpg",
        "/img-projects/cityportal3.jpg",
        "/img-projects/cityportal4.jpg",
        "/img-projects/cityportal5.jpg",
        "/img-projects/cityportal6.jpg",
        "/img-projects/cityportal7.jpg",
        "/img-projects/cityportal8.jpg",
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 9, 
      title: "A.I Course Generator", 
      category: "Fullstack", 
      image: "/img-projects/coursegenerator7.jpg", 
      images: [
        "/img-projects/coursegenerator1.jpg",
        "/img-projects/coursegenerator2.jpg",
        "/img-projects/coursegenerator3.jpg",
        "/img-projects/coursegenerator4.jpg",
        "/img-projects/coursegenerator5.jpg",
        "/img-projects/coursegenerator6.jpg",
        "/img-projects/coursegenerator7.jpg",
        "/img-projects/coursegenerator8.jpg",
      ],
      tech: ["Next.js", "React.js", "Bootstrap", "Gemini API", "HTML5", "JavaScript", "MongoDB", "Mongoose", "Prisma"] 
    },
    { 
      id: 10, 
      title: "Neflix Clone", 
      category: "Fullstack", 
      image: "/img-projects/netflix1.jpg", 
      images: [
        "/img-projects/netflix1.jpg",
        "/img-projects/netflix2.jpg",
        "/img-projects/netflix3.jpg",
      ],
      tech: ["React.js", "HTML5", "Bootstrap", "The Movie DB API", "JavaScript"] 
    },
    { 
      id: 11, 
      title: "Online Store", 
      category: "Fullstack", 
      image: "/img-projects/store1.png", 
      images: [
        "/img-projects/store1.png",
        "/img-projects/store2.png",
        "/img-projects/store3.png",
        "/img-projects/store4.png"

      ],
      tech: ["HTML", "Laravel", "MySql", "React.js"] 
    },
    { 
      id: 12, 
      title: "Ford Autos", 
      category: "Frontend", 
      image: "/img-projects/ford1.jpg", 
      images: [
        "/img-projects/ford1.jpg",
        "/img-projects/ford2.jpg",
        "/img-projects/ford3.jpg"
      ],
      tech: ["HTML5", "CSS3", "JavaScript"] 
    },
    { 
      id: 13, 
      title: "Visitors Management", 
      category: "Fullstack", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 14, 
      title: "Contact Tracing", 
      category: "Fullstack", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 15, 
      title: "Equicom API", 
      category: "Backend", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 16, 
      title: "Car Rental Website", 
      category: "Frontend", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["HTML", "CSS", "JavaScript"]
    },
    { 
      id: 17, 
      title: "Hotel APIs", 
      category: "Fullstack", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 18, 
      title: "SMS APIs", 
      category: "Backend", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 19, 
      title: "Siteminder APIs", 
      category: "Backend", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["HTML5", "PHP", "MySql", "CSS3", "JavaScript", "JQuery", "Bootstrap", "Ajax"]
    },
    { 
      id: 20, 
      title: "LG-TV APIs", 
      category: "Backend", 
      image: "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg", 
      images: [
        "https://kevinrehan16.github.io/kevin-portfolio/assets/error/maintenancejpg.jpg",
      ],
      tech: ["Vue.js", "Laravel", "MySql", "CSS3", "HTML5", "Bootstrap"]
    },
    { 
      id: 21, 
      title: "My Portfolio v.1", 
      category: "Frontend", 
      image: "/img-projects/portfolio1.jpg", 
      images: [
        "/img-projects/portfolio1.jpg",
        "/img-projects/portfolio2.jpg",
        "/img-projects/portfolio3.jpg",
        "/img-projects/portfolio4.jpg",
        "/img-projects/portfolio5.jpg",
        "/img-projects/portfolio6.jpg",
        "/img-projects/portfolio7.jpg",
      ],
      tech: ["HTML", "JavaScript", "CSS", "SCSS"]
    },
  ];

  const filteredProjects = allProjects.filter(p => filter === "All" || p.category === filter);
  const projectsToDisplay = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="relative py-20 md:py-32 bg-[#030014] overflow-hidden">
      {/* --- HIGH-TECH BACKGROUND LAYER --- */}
      {/* 1. Grid Mesh Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10" 
        style={{ 
          backgroundImage: `linear-gradient(to right, #4f46e5 1px, transparent 1px), linear-gradient(to bottom, #4f46e5 1px, transparent 1px)`, 
          backgroundSize: '45px 45px' 
        }} 
      />
      {/* 2. Radial Gradient Fade (Para sa gitna lang yung focus ng grid) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030014_70%)]" />
      {/* 3. Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full pointer-events-none" />
      {/* --- END OF BACKGROUND --- */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 md:mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* SUB-HEADER */}
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-violet-500" />
              <span className="text-violet-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
                Archive
              </span>
            </div>

            {/* MAIN HEADER - Fixed casing (removed uppercase) & "s" cut fix */}
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight tracking-tighter uppercase">
              Selected <span className="inline-block px-1 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Projects</span>
            </h2>
            
            {/* <p className="text-slate-400 text-sm md:text-base font-light tracking-wide max-w-xl">
              Get to know the person behind the code. Here's a quick overview of my background and core details.
            </p> */}
          </motion.div>

          {/* TABS */}
          <div className="flex w-full md:w-auto p-1 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full relative">
            {["All", "Fullstack", "Frontend", "Backend"].map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setShowAll(false); }}
                className={`relative flex-1 md:flex-initial px-3 sm:px-6 py-3 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase transition-colors duration-300 z-10 ${
                  filter === cat ? 'text-white' : 'text-slate-500 hover:text-white'
                }`}
              >
                {/* 1. Eto yung text label */}
                <span className="relative z-20 block text-center w-full">{cat}</span>

                {/* 2. Eto yung moving background pill */}
                {filter === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-violet-600 rounded-full shadow-lg shadow-violet-600/40 z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {projectsToDisplay.map((p, index) => (
              <ProjectCard key={p.id} p={p} index={index} onOpen={setSelectedProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && filteredProjects.length > 6 && (
          <div className="mt-20 text-center">
            <button onClick={() => setShowAll(true)} className="px-12 py-5 border border-violet-500/30 rounded-2xl text-white font-mono text-[10px] tracking-[0.4em] uppercase hover:bg-violet-600 transition-all">
              See All {filteredProjects.length} Projects
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;