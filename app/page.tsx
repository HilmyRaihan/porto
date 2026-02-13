"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Expertise from "@/components/Expertise";
import GetInTouch from "@/components/GetInTouch";
import Education from "@/components/Education";

// --- ANIMATION CONFIG ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 20 
    } as const, // Fix untuk error TypeScript saat build
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("About me");
  const menus = ["About me", "Resume"];
  
  // Progress bar tipis di bagian paling atas
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleScroll = (id: string) => {
    setActiveTab(id);
    const targetId = id.toLowerCase().replace(/\s+/g, "-");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f3f3] p-4 sm:p-6 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[100]" style={{ scaleX }} />

      <motion.div 
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* --- NAVBAR --- */}
        <motion.nav 
          variants={itemVariants}
          className="flex justify-between items-center mb-8 md:mb-12 px-2 sticky top-4 z-50 pointer-events-none"
        >
          <div className="font-bold hidden lg:block text-base italic tracking-tighter text-slate-800">
            Hilmy Raihan
          </div>

          <div className="flex mx-auto lg:mx-0 gap-1 bg-white/70 backdrop-blur-md p-1 rounded-full shadow-sm border border-white/40 pointer-events-auto">
            {menus.map((menu) => (
              <button
                key={menu}
                onClick={() => handleScroll(menu)}
                className={`px-6 py-2 transition-colors duration-300 rounded-full relative text-[11px] md:text-xs font-bold uppercase tracking-wider ${
                  activeTab === menu ? "text-blue-600" : "text-gray-400 hover:text-slate-900"
                }`}
              >
                {activeTab === menu && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                {menu}
              </button>
            ))}
          </div>

          <div className="font-bold hidden sm:block text-[9px] uppercase tracking-[0.3em] text-blue-600/30">
             Interactive Lab
          </div>
        </motion.nav>

        {/* --- SECTION: ABOUT ME --- */}
        <motion.section 
          id="about-me" 
          variants={itemVariants} 
          className="space-y-4 mb-12 scroll-mt-24"
        >
          <Hero />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Intro Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center shadow-sm"
            >
              <h2 className="text-xl md:text-2xl font-black mb-3 italic tracking-tight text-slate-800">
                Hello, I'm Hilmy
              </h2>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-medium">
                A Roamer player who can design UI/UX at the same time. 
                Focusing on <span className="text-blue-600">vision</span>, utility, and clean interfaces.
              </p>
            </motion.div>

            {/* GetInTouch Card */}
            <div className="lg:col-span-2">
              <GetInTouch />
            </div>
          </div>
        </motion.section>

        {/* --- SECTION: RESUME --- */}
        <motion.section 
          id="resume" 
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 scroll-mt-24"
        >
          <Experience />
          <Expertise />
          <Education />
        </motion.section>

        {/* --- FOOTER --- */}
        <motion.footer 
          variants={itemVariants}
          className="mt-20 pb-10 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-[9px] uppercase tracking-[0.2em] gap-6 px-4"
        >
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-500 mb-0.5">© 2026 Hilmy Raihan Alhifari</p>
            <p className="opacity-50 italic lowercase tracking-normal">Built with Next.js & Framer Motion</p>
          </div>
          
          <div className="flex gap-6 italic lowercase font-bold text-slate-400">
            <span className="hover:text-blue-500 transition-colors cursor-default">next.js</span>
            <span className="hover:text-blue-500 transition-colors cursor-default">tailwind</span>
            <span className="hover:text-blue-500 transition-colors cursor-default">framer motion</span>
          </div>
        </motion.footer>

      </motion.div>
    </main>
  );
}