// components/Hero.tsx
import PhysicsPortfolio from "@/components/PhysicsPortfolio";
export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Box Kiri: Info & Tag */}
      <div className="bg-white rounded-[2.5rem] border border-gray-200 overflow-hidden relative group flex flex-col justify-between min-h-[300px]">
  {/* 1. FOTO BACKGROUND */}
  <img 
    src="/asoy.webp" 
    alt="Background Decor" 
    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />

  {/* 2. OVERLAY (Agar teks tetap kontras) */}
  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

  {/* 3. KONTEN (Tanda Panah & Hashtags) - Tetap Dipertahankan */}
  <div className="relative p-8 flex flex-col justify-between h-full z-10 pointer-events-none">
    {/* Tanda Panah */}
    <div className="text-5xl font-bold text-white drop-shadow-lg">↘</div>

    {/* Hashtags Section */}
    <div className="space-y-2 mt-10">
      <div className="flex gap-2 text-sm font-medium text-white/90 drop-shadow-md">
        <span>#Branding</span> <span>#Logo</span>
      </div>
      <div className="flex gap-2 text-sm font-medium text-white/90 drop-shadow-md">
        <span>#Social_Media</span> <span>#Poster</span>
      </div>
      <div className="text-sm font-medium text-white/70 drop-shadow-md">
        #Packaging #Illustration
      </div>
    </div>
  </div>
</div>

      {/* Box Kanan: Foto & Title (Biru) */}
     <div className="md:col-span-2 bg-[#1a56ff] rounded-[2.5rem] p-8 relative overflow-hidden min-h-[400px] group">
  {/* Angka 2026 */}
  <div className="absolute bottom-8 left-8 z-20">
    <h1 className="text-white text-6xl font-black italic tracking-tighter">2026</h1>
  </div>

  {/* Simulasi Fisika PORTFOLIO */}
  <PhysicsPortfolio />

  {/* Dekorasi Tambahan */}
  <div className="absolute top-8 left-8 text-white/30 text-xs font-bold tracking-[0.5em] uppercase">
    Interactive Lab
  </div>
</div>
    </section>
  );
}