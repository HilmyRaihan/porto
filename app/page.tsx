"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import GetInTouch from "@/components/GetInTouch";
import Education from "@/components/Education";

// Konfigurasi Animasi agar konsisten
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("About me");
  const menus = ["About me", "Resume"];

  const handleScroll = (id: string) => {
    setActiveTab(id);
    const targetId = id.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Offset agar tidak tertutup navbar sticky
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f3f3] p-4 sm:p-6 md:p-10 font-sans text-slate-900 selection:bg-blue-100">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        
        {/* --- NAVBAR --- */}
        <motion.nav 
          variants={fadeInUp}
          className="flex justify-between items-center mb-8 md:mb-12 px-2 md:px-4 sticky top-4 z-50 pointer-events-none"
        >
          <div className="font-bold hidden lg:block text-lg italic tracking-tighter text-slate-800">
            Hilmy Raihan Alhifari
          </div>

          <div className="flex mx-auto lg:mx-0 gap-1 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-xl shadow-blue-900/5 border border-white/50 pointer-events-auto">
            {menus.map((menu) => (
              <button
                key={menu}
                onClick={() => handleScroll(menu)}
                className={`px-6 md:px-8 py-2.5 transition-all duration-300 rounded-full relative text-xs md:text-sm font-bold uppercase tracking-wider ${
                  activeTab === menu ? "text-blue-600" : "text-gray-400 hover:text-slate-900"
                }`}
              >
                {activeTab === menu && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 rounded-full -z-10 shadow-inner"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {menu}
              </button>
            ))}
          </div>

          <div className="font-bold hidden sm:block text-[10px] md:text-xs uppercase tracking-[0.3em] text-blue-600/40">
             Roam Jago Portfolio
          </div>
        </motion.nav>

        {/* --- SECTION: ABOUT ME --- */}
        <motion.section 
          variants={fadeInUp} 
          id="about-me" 
          className="space-y-4 mb-10 scroll-mt-28"
        >
          <Hero />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Intro Box */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 flex flex-col justify-center shadow-sm"
            >
              <h2 className="text-2xl md:text-3xl font-black mb-4 italic tracking-tight text-slate-800">
                Hello, I'm Hilmy
              </h2>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed font-medium">
                A Roamer player who can design UI/UX at the same time. 
                Focusing on vision, utility, and clean interfaces.
              </p>
            </motion.div>

            {/* GetInTouch Box */}
            <div className="lg:col-span-2">
              <GetInTouch />
            </div>
          </div>
        </motion.section>

        {/* --- SECTION: RESUME --- */}
        <motion.section 
          variants={fadeInUp} 
          id="resume" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 scroll-mt-28"
        >
          <Experience />
          <Expertise />
          <Education />
        </motion.section>

        {/* --- FOOTER --- */}
        <motion.footer 
          variants={fadeInUp}
          className="mt-20 pb-12 border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[9px] md:text-[10px] uppercase tracking-[0.3em] gap-8 px-4"
        >
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-500 mb-1">© 2026 Hilmy Raihan Alhifari</p>
            <p className="opacity-60 italic lowercase tracking-normal">Yogyakarta, Indonesia</p>
          </div>
          
          <div className="flex gap-6 italic lowercase font-medium text-slate-500">
            <span className="hover:text-blue-500 transition-colors cursor-default">next.js</span>
            <span className="hover:text-blue-400 transition-colors cursor-default">tailwind</span>
            <span className="hover:text-purple-500 transition-colors cursor-default">framer motion</span>
          </div>
        </motion.footer>

      </motion.div>
    </main>
  );
}