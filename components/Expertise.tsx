import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faWandMagicSparkles, faCubes } from "@fortawesome/free-solid-svg-icons";
import { faFigma } from "@fortawesome/free-brands-svg-icons";

export default function Expertise() {
  const hardSkills = [
    { icon: faFigma, color: "bg-[#0ACF83]", name: "Fi" },
    { icon: faCubes, color: "bg-[#31A8FF]", name: "Ps" }, // Placeholder Ps
    { icon: faWandMagicSparkles, color: "bg-[#FF9A00]", name: "Ai" } // Placeholder Ai
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm h-full flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Expertise</h3>
        <FontAwesomeIcon icon={faCubes} className="text-gray-300 text-xs" />
      </div>

      {/* Roamer Section */}
      <div className="bg-blue-600 rounded-2xl p-4 text-white relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-[10px] uppercase opacity-70 font-bold">Main Role</p>
          <p className="font-black text-2xl italic">ROAMER</p>
          <div className="flex items-center gap-2 mt-2">
            <FontAwesomeIcon icon={faShieldHalved} className="text-blue-200 animate-pulse" />
            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Utility & Vision</span>
          </div>
        </div>
        <FontAwesomeIcon icon={faShieldHalved} className="absolute right-[-10px] bottom-[-10px] text-7xl opacity-20 transform -rotate-12 group-hover:scale-110 transition-transform" />
      </div>

      {/* Software Skills */}
      <div className="grid grid-cols-3 gap-3">
        {hardSkills.map((skill, i) => (
          <div key={i} className={`${skill.color} aspect-square rounded-2xl flex items-center justify-center text-white text-xl shadow-inner`}>
            <FontAwesomeIcon icon={skill.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}