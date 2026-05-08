"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const events = [
  {
    title: "Senior Software Developer",
    company: "All in One, Inc.",
    date: "2022 - PRESENT",
    desc: "Developed and maintained full-stack web applications using HTML, CSS, Bootstrap, JavaScript, jQuery, AJAX, PHP, MySQL, React, Vue, Laravel, and Node.js. Handled frontend and backend development, database management, API integrations (SOAP/REST), UI/UX design, testing, client presentations, technical support, and system maintenance.",
  },
  {
    title: "Software Engineer",
    company: "QBE Insurance",
    date: "2021 - 2022",
    desc: "Maintained and enhanced company applications using Java, resolved user-reported issues, managed deployments through SourceTree and Jenkins, created technical documentation, and participated in Agile Scrum activities.",
  },
  {
    title: "Web Developer",
    company: "Gatessoft Corp",
    date: "2016 - 2021",
    desc: "Built and maintained web applications using PHP, MySQL, HTML, CSS, JavaScript, jQuery, AJAX, and Bootstrap. Created custom software solutions, managed databases, integrated REST/SOAP APIs, led a programming team, and connected systems such as Clinic and Hotel Management Systems with third-party platforms.",
  },
  {
    title: "BS in Computer Science",
    company: "Pamantasan ng Lungsod ng Muntinlupa",
    date: "2012 - 2016",
    desc: "Focused on advanced data structures, algorithm optimization, and full-stack technologies.",
  },
];

const Experience = () => {
  const scrollRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="careers" className="relative py-20 md:py-32 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- HEADER --- */}
        <div className="mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-8 bg-violet-500" />
              <span className="text-violet-500 font-mono text-[10px] tracking-[0.6em] uppercase font-bold">Timeline</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600">Path</span>
            </h2>
          </motion.div>
        </div>

        <div ref={scrollRef} style={{ position: 'relative' }} className="relative">
          {/* --- THE PROGRESSIVE LINE (Responsive Fix) --- */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-1 md:left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-violet-600 via-fuchsia-500 to-transparent origin-top transform md:-translate-x-1/2 z-0"
          />

          <div className="space-y-12 md:space-y-20 relative z-10">
            {events.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center justify-between ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* --- CENTER DOT (Responsive Fix: Left on Mobile, Center on Desktop) --- */}
                <div className="absolute left-1 md:left-1/2 w-3 h-3 bg-[#030014] border border-violet-500 rounded-full transform -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(139,92,246,0.5)] mt-8 md:mt-0" />

                {/* --- CONTENT CARD --- */}
                <div className="w-full md:w-[45%] pl-8 md:pl-0">
                  <div className="group relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl hover:bg-white/[0.05] hover:border-violet-500/50 transition-all duration-700 shadow-2xl">
                    
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[1.5rem] md:rounded-[2.5rem] opacity-0 group-hover:opacity-10 blur-xl transition duration-700" />

                    <div className="relative z-10">
                      <span className="text-violet-400 font-mono text-[9px] tracking-[0.3em] font-black uppercase">
                        {e.date}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mt-2 group-hover:text-violet-300 transition-colors duration-500">
                        {e.title}
                      </h3>
                      <p className="text-slate-300 font-semibold text-[10px] md:text-xs mt-1 mb-4 tracking-wide uppercase">
                        {e.company}
                      </p>
                      <p className="text-slate-500 text-xs md:text-sm font-light leading-relaxed">
                        {e.desc}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spacer for structure */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;