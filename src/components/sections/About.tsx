"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiCalendar, FiUser, FiMapPin, FiMessageSquare, FiHeart } from "react-icons/fi";
import { FaChurch } from "react-icons/fa";

const About = () => {
  const personalInfo = [
    { icon: <FiCalendar />, label: "Birthday", value: "July 06, 1995" },
    { icon: <FiUser />, label: "Age", value: "30 Years Old" },
    { icon: <FaChurch />, label: "Religion", value: "Christian" },
    { icon: <FiMapPin />, label: "From", value: "Sucat, Muntinlupa City" },
    { icon: <FiMessageSquare />, label: "Language", value: "English, Tagalog" },
    { icon: <FiHeart />, label: "Life-Stage", value: "Single" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden bg-[#030014]">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-600/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fuchsia-600/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-12 md:mb-16"
        >
          {/* SUB-HEADER */}
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-8 bg-violet-500" />
            <span className="text-violet-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">
              Discover
            </span>
          </div>

          {/* MAIN HEADER */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight uppercase">
            Personal <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">Information</span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base font-light tracking-wide max-w-xl">
            Get to know the person behind the code. Here's a quick overview of my background and core details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* LEFT: Profile Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group w-full max-w-md mx-auto lg:max-w-none"
          >
            {/* Glow Effect sa likod */}
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2.6rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000" />
            
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#030014] shadow-2xl">
              <Image 
                src="/img/about.webp" 
                alt="Kevin Macandog" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="
                  object-cover object-[center_20%] 
                  brightness-[0.7] contrast-110 saturate-[1.2] sepia-[0.2]
                  group-hover:sepia-0 group-hover:saturate-150 group-hover:brightness-90 
                  transition-all duration-700
                "
              />

              <div className="absolute inset-0 bg-violet-300/40 mix-blend-color pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#030014_100%)] opacity-70 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>
          </motion.div>

          {/* RIGHT: Detailed Info */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-3 text-center lg:text-left"
            >
              <h3 className="text-violet-500 font-mono tracking-[0.3em] uppercase text-xs md:text-sm font-bold">Biography</h3>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Kevin Macandog
              </h2>
              <p className="text-fuchsia-500 font-bold text-lg md:text-2xl tracking-wide">
                Software Developer
              </p>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light">
                I'm a Software Developer with a passion for building efficient, 
                scalable, and user-friendly applications. I specialize in both 
                front-end and back-end development. I'm always eager to solve 
                real-world problems through clean, maintainable code.
              </p>
            </motion.div>

            {/* Stats/Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalInfo.map((info, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold truncate">{info.label}</p>
                    <p className="text-slate-200 font-medium truncate">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;