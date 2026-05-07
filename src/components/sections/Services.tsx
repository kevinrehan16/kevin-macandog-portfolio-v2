"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Terminal, 
  Layers, 
  Cpu, 
  Globe, 
  Database 
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Front-end Development",
    description: "Creating responsive, high-performance, and visually stunning user interfaces using React, Next.js, and Tailwind CSS.",
    icon: <Code2 className="w-8 h-8 text-violet-400" />,
    color: "from-violet-500/10 to-fuchsia-500/10",
    glow: "group-hover:shadow-violet-500/20"
  },
  {
    title: "Back-end Architecture",
    description: "Building robust APIs and scalable server-side logic using Node.js, Express, and Laravel with a focus on security.",
    icon: <Terminal className="w-8 h-8 text-blue-400" />,
    color: "from-blue-500/10 to-cyan-500/10",
    glow: "group-hover:shadow-blue-500/20"
  },
  {
    title: "Database Management",
    description: "Designing efficient database schemas and managing data integrity with PostgreSQL, MongoDB, and MySQL.",
    icon: <Database className="w-8 h-8 text-emerald-400" />,
    color: "from-emerald-500/10 to-teal-500/10",
    glow: "group-hover:shadow-emerald-500/20"
  },
  {
    title: "Full-stack Solutions",
    description: "End-to-end web application development, bridging the gap between front-end aesthetics and back-end functionality.",
    icon: <Layers className="w-8 h-8 text-orange-400" />,
    color: "from-orange-500/10 to-yellow-500/10",
    glow: "group-hover:shadow-orange-500/20"
  },
  {
    title: "API Integration",
    description: "Seamlessly connecting third-party services and payment gateways to enhance application capabilities.",
    icon: <Cpu className="w-8 h-8 text-rose-400" />,
    color: "from-rose-500/10 to-red-500/20",
    glow: "group-hover:shadow-rose-500/20"
  },
  {
    title: "Deployment & Hosting",
    description: "Managing cloud infrastructure and CI/CD pipelines on Vercel, AWS, or DigitalOcean for seamless delivery.",
    icon: <Globe className="w-8 h-8 text-indigo-400" />,
    color: "from-indigo-500/10 to-purple-500/10",
    glow: "group-hover:shadow-indigo-500/20"
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#030014]">
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.07]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 px-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            // Binago: Inalis ang once: true para mag-animate ulit
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-violet-500" />
              <span className="text-violet-500 font-mono text-xs tracking-[0.5em] uppercase font-bold">Specializations</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">
              Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600">Offered</span>
            </h2>
          </motion.div>
        </div>

        {/* Rounded Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              // Binago: Para kada scroll up/down mag-trigger ang cards
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "group relative p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.03] backdrop-blur-xl transition-all duration-500",
                "hover:border-white/10 hover:bg-white/[0.05] hover:shadow-2xl",
                service.glow
              )}
            >
              {/* Subtle Gradient Inner Glow */}
              <div className={cn(
                "absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 bg-gradient-to-br",
                service.color
              )} />

              <div className="mb-8 p-5 w-fit rounded-3xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 transition-colors group-hover:text-violet-300">
                {service.title}
              </h3>
              
              <p className="text-slate-400 group-hover:text-slate-300 text-sm leading-relaxed mb-10 transition-colors">
                {service.description}
              </p>

              {/* Minimalist Action Indicator */}
              <div className="flex items-center text-[10px] font-black text-violet-400 uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-all duration-300">
                Service Details
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;