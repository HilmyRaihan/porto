"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons"; // Ganti faBehance ke faInstagram

export default function GetInTouch() {
  return (
    <div className="mt-4">
      {/* Judul kecil di atas grid */}
      <h4 className="font-bold text-sm mb-4 text-gray-800 ml-2 uppercase tracking-widest">Get In Touch</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
       {/* Tombol Email */}
<a 
  href="mailto:hilmyraihan2312v2@gmail.com" 
  className="bg-zinc-900 text-white p-6 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-all group min-w-0" // Tambahkan min-w-0
>
  <div className="flex items-center gap-4 overflow-hidden"> {/* Tambahkan overflow-hidden */}
    <div className="bg-white/10 w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
      <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
    </div>
    <div className="overflow-hidden"> {/* Bungkus teks dengan overflow-hidden */}
      <p className="text-[10px] uppercase opacity-50 font-bold">Email</p>
      {/* Gunakan truncate agar teks yang kepanjangan jadi ... */}
      <p className="text-sm font-medium truncate">
        hilmyraihan2312v2@gmail.com
      </p>
    </div>
  </div>
  <div className="text-xs opacity-30 italic flex-shrink-0 ml-2">Send ↗</div>
</a>

        {/* Tombol LinkedIn */}
        <a 
          href="https://linkedin.com/in/yourusername" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#0077b5] text-white p-6 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-50 font-bold">LinkedIn</p>
              <p className="text-sm font-medium">Belom ada</p>
            </div>
          </div>
          <div className="text-xs opacity-30 italic">View ↗</div>
        </a>

        {/* Tombol Behance */}
        {/* Tombol Instagram */}
        <a 
          href="https://instagram.com/r.alhifarii" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white border border-gray-200 text-black p-6 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-all group"
        >
          <div className="flex items-center gap-4">
            {/* Pakai gradasi text Instagram pas di-hover biar keren */}
            <div className="bg-black/5 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-tr group-hover:from-[#f9ce34] group-hover:via-[#ee2a7b] group-hover:to-[#6228d7] transition-all duration-500">
              <FontAwesomeIcon icon={faInstagram} className="text-xl text-black group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Instagram</p>
              <p className="text-sm font-medium text-black">@r.alhifarii</p>
            </div>
          </div>
          <div className="text-xs text-gray-300 italic">Follow ↗</div>
        </a>

      </div>
    </div>
  );
}