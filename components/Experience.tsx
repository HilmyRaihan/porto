import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faChevronDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function Experience() {
  const experiences = [
    { period: "2022", company: "Nabrak Party Coach Nafari", role: "Marksman", status: "Inaktif" },
    { period: "2022", company: "Nabrak Party Koh Delwyn", role: "Roam", status: "Inaktif" },
    { period: "2022-Present", company: "Partyan Bubur Telkom", role: "Roam Jago", status: "Aktif" }
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBriefcase} className="text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">Experience</h3>
        </div>
        <FontAwesomeIcon icon={faChevronDown} className="text-gray-300 text-xs" />
      </div>

      <div className="space-y-4">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-[#f9f9f9] rounded-2xl p-4 border border-gray-50 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded-full font-semibold">{exp.period}</span>
              <FontAwesomeIcon icon={faCircleCheck} className="text-gray-200" />
            </div>
            <h4 className="font-bold text-gray-700 text-sm">{exp.company}</h4>
            <p className="text-gray-500 text-[11px] leading-relaxed">{exp.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}