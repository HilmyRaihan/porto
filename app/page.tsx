"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import GetInTouch from "@/components/GetInTouch";
import { motion } from "framer-motion";

// Varian animasi untuk efek masuk yang halus
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("About me");
  const menus = ["About me", "Resume"]; // Hanya dua menu karena Work dihapus

  const handleScroll = (id: string) => {
    setActiveTab(id);
    const targetId = id.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f3f3] p-4 md:p-10 font-sans text-slate-900 selection:bg-blue-100">
      {/* Container utama dengan stagger effect */}
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        
        {/* --- NAVBAR --- */}
        <motion.nav 
          variants={fadeInUp}
          className="flex justify-between items-center mb-10 px-4 sticky top-4 z-50"
        >
          <div className="font-bold hidden md:block text-lg italic tracking-tighter">
            Hilmy Raihan Alhifari
          </div>

          <div className="flex gap-2 bg-white/80 backdrop-blur-md px-2 py-2 rounded-full shadow-lg border border-gray-200/50 text-sm font-medium">
            {menus.map((menu) => (
              <button
                key={menu}
                onClick={() => handleScroll(menu)}
                className={`px-6 py-1.5 transition-all duration-300 rounded-full relative ${
                  activeTab === menu ? "text-blue-600" : "text-gray-500 hover:text-black"
                }`}
              >
                {activeTab === menu && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-50 rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {menu}
              </button>
            ))}
          </div>

          <div className="font-medium text-[10px] md:text-sm uppercase tracking-[0.2em] text-gray-400">
             Roam Jago Portfolio
          </div>
        </motion.nav>

        {/* --- SECTION: ABOUT ME --- */}
        <motion.section variants={fadeInUp} id="about-me" className="space-y-4 mb-8 scroll-mt-24">
          <Hero />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Box Intro */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="lg:col-span-1 bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center"
            >
              <h2 className="text-2xl font-bold mb-4 italic">Hello, I'm Hilmy</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                A Roamer player who can design UI/UX at the same time. 
                Focusing on vision, utility, and clean interfaces.
              </p>
            </motion.div>

            {/* Box GetInTouch */}
            <div className="lg:col-span-2">
              <GetInTouch />
            </div>
          </div>
        </motion.section>

        {/* --- SECTION: RESUME --- */}
        <motion.section 
          variants={fadeInUp} 
          id="resume" 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 scroll-mt-24"
        >
          {/* Kolom 1: Experience */}
          <Experience />
          
          {/* Kolom 2: Expertise (Figma & MLBB Role) */}
          <Expertise />

          {/* Kolom 3: Education */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2rem] p-6 border border-gray-100 flex flex-col"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Education</h3>
              <div className="bg-gray-100 px-2 py-1 rounded-md text-[10px] font-bold">GRADUATED</div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-zinc-900 text-white p-5 rounded-3xl group">
                <p className="text-[10px] opacity-60 font-mono">1955 - 6767</p>
                <p className="text-xs font-bold mt-1">UNIGA</p>
                <p className="text-[10px] mt-1 italic text-blue-300">Black People Engineering</p>
                <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                  <span className="text-[10px]">GPA Score</span>
                  <span className="font-bold text-sm text-blue-400 group-hover:scale-110 transition-transform tracking-wider">3.59 / 4.00</span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-5 rounded-3xl hover:bg-gray-100 transition-colors">
                <p className="text-[10px] text-gray-400 font-mono">2022</p>
                <p className="text-xs font-bold text-gray-800 mt-1">UI/UX Bootcamp Course</p>
                <p className="text-[10px] mt-1 text-gray-500">Skola Expert • Intensive Program</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* --- FOOTER --- */}
        <motion.footer 
          variants={fadeInUp}
          className="mt-20 pb-10 border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[10px] uppercase tracking-[0.3em] gap-4 px-4"
        >
          <p>© 2026 Hilmy Raihan Alhifari — All Rights Reserved</p>
          <div className="flex gap-6 italic lowercase">
            <span className="hover:text-blue-600 transition-colors cursor-default">next.js</span>
            <span className="hover:text-blue-600 transition-colors cursor-default">tailwind</span>
            <span className="hover:text-blue-600 transition-colors cursor-default">framer motion</span>
          </div>
        </motion.footer>

      </motion.div>
    </main>
  );
}