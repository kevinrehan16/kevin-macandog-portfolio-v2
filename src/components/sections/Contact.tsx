"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";

interface AnimatedFieldProps {
  type?: string;
  placeholder: string;
  isTextArea?: boolean;
}

const AnimatedField = ({ type = "text", placeholder, isTextArea = false }: AnimatedFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const baseStyles = "w-full bg-transparent py-4 text-white outline-none font-mono text-xs tracking-widest uppercase placeholder:text-slate-700 transition-all";

  return (
    <div className="relative w-full">
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
          rows={4}
          className={`${baseStyles} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
          className={baseStyles}
        />
      )}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
      <motion.div
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-violet-500 to-fuchsia-500 z-10"
      />
    </div>
  );
};

const Contact = () => {
  const contactRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"],
  });

  // Responsive Parallax: Mas maliit ang movement sa mobile para hindi nakakahilo
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative py-20 md:py-32 bg-transparent overflow-hidden"
    >
      {/* --- PARALLAX BG TEXT (Responsive Size) --- */}
      <motion.div
        style={{ y: yParallax }}
        className="absolute top-1/4 md:top-1/2 right-[-10%] md:right-[-5%] opacity-[0.03] select-none pointer-events-none z-0"
      >
        <h2 className="text-[30vw] md:text-[22vw] font-black uppercase leading-none text-[#d946ef]">
          Contact
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-20">
          
          {/* --- LEFT SIDE: INFO --- */}
          <div className="w-full lg:w-1/3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                Let's <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600">Build</span> <br />
                Next.
              </h2>
              <p className="text-slate-500 mt-6 font-mono text-xs md:text-sm uppercase tracking-widest leading-relaxed max-w-sm">
                Open for collaborations, freelance opportunities, or just a coffee chat.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 pt-10 border-t border-white/10">
              {[
                { icon: <Mail size={16} />, label: "kevinrehan16@gmail.com", href: "mailto:kevinrehan16@gmail.com" },
                { icon: <Phone size={16} />, label: "+63 915 316 9518", href: "tel:+639153169518" },
                { icon: <MapPin size={16} />, label: "Muntinlupa, PH", href: "#" }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-slate-400 hover:text-violet-500 transition-colors group"
                >
                  <span className="p-3 md:p-4 rounded-lg bg-white/5 group-hover:bg-violet-500/10 transition-colors">
                    {item.icon}
                  </span>
                  <span className="text-sm md:text-md font-medium tracking-tight group-hover:translate-x-1 transition-transform truncate">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <div className="w-full lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-[#d946ef]/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

              <form className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                <div className="md:col-span-2">
                  <AnimatedField type="text" placeholder="SUBJECT" />
                </div>
                <AnimatedField placeholder="YOUR NAME" />
                <AnimatedField type="email" placeholder="EMAIL ADDRESS" />
                <div className="md:col-span-2">
                  <AnimatedField placeholder="TELL ME ABOUT YOUR VISION" isTextArea={true} />
                </div>

                <div className="md:col-span-2 pt-6 md:pt-10">
                  <button type="submit" className="group flex items-center gap-4 md:gap-6 text-white outline-none">
                    <div className="relative h-16 w-16 md:h-20 md:w-20 flex items-center justify-center rounded-full border border-white/20 group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all duration-700">
                      <ArrowUpRight
                        size={24}
                        className="group-hover:rotate-45 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xl md:text-2xl font-bold uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-500 group-hover:text-violet-500">
                        Send Message
                      </span>
                      <span className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
                        Click to transmit
                      </span>
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;