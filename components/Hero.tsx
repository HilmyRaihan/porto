// components/Hero.tsx
export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {/* Box Kiri: Info & Tag */}
      <div className="bg-white rounded-[2.5rem] p-8 flex flex-col justify-between border border-gray-200">
        <div className="text-5xl font-bold">↘</div>
        <div className="space-y-2 mt-10">
          <div className="flex gap-2 text-sm font-medium text-gray-500">
            <span>#Branding</span> <span>#Logo</span>
          </div>
          <div className="flex gap-2 text-sm font-medium text-gray-500">
            <span>#Social_Media</span> <span>#Poster</span>
          </div>
          <div className="text-sm font-medium text-gray-400">#Packaging #Illustration</div>
          <div className="text-sm font-medium text-gray-400">#3D_&_Motion_Graphic</div>
        </div>
      </div>

      {/* Box Kanan: Foto & Title (Biru) */}
      <div className="md:col-span-2 bg-[#1a56ff] rounded-[2.5rem] p-8 relative overflow-hidden min-h-[300px]">
        <div className="absolute bottom-8 left-8">
          <h1 className="text-white text-6xl font-black italic tracking-tighter">2026</h1>
        </div>
        {/* Placeholder untuk grafis "PORTFOLIO" yang miring */}
        <div className="absolute right-[-20px] top-10 transform rotate-12 opacity-90">
           <div className="text-white text-8xl font-black leading-none text-right">
             PORT<br/>FO<br/>LIO
           </div>
        </div>
      </div>
    </section>
  );
}