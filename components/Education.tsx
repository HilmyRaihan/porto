import React from 'react';
import { motion } from 'framer-motion';

interface EducationItem {
  year: string;
  title: string;
  subtitle?: string;
  gpa?: string;
  isDark?: boolean;
}

const Education = () => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] p-6 border border-gray-100 flex flex-col sm:col-span-2 lg:col-span-1"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Education</h3>
        <div className="bg-gray-100 px-2 py-1 rounded-md text-[10px] font-bold">
          GRADUATED
        </div>
      </div>

      <div className="space-y-4">
        {/* Item Utama (Dark Card) */}
        <div className="bg-zinc-900 text-white p-5 rounded-3xl group">
          <p className="text-[10px] opacity-60 font-mono">1955 - 6767</p>
          <p className="text-xs font-bold mt-1">UNIGA</p>
          <p className="text-[10px] mt-1 italic text-blue-300">
            Black People Engineering
          </p>
          <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
            <span className="text-[10px]">GPA</span>
            <span className="font-bold text-sm text-blue-400">3.59 / 4.00</span>
          </div>
        </div>

        {/* Item Tambahan (Light Card) */}
        <div className="bg-gray-50 border border-gray-200 p-5 rounded-3xl">
          <p className="text-[10px] text-gray-400 font-mono">2022</p>
          <p className="text-xs font-bold text-gray-800 mt-1">
            UI/UX Bootcamp
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Education;