import Link from "next/link";
import { getActiveDoctors } from "@/lib/db";

const serviceDefinitions = [
  {
    icon: "❤️",
    title: "Kardiologija",
    specialty: "Kardiolog",
    description:
      "Dijagnostika i lečenje bolesti srca i krvnih sudova. EKG, ehokardiografija, Holter monitoring.",
    color: "bg-red-50 border-red-100",
    iconBg: "bg-red-100 text-red-600",
  },
  {
    icon: "🧠",
    title: "Neurologija",
    specialty: "Neurolog",
    description:
      "Pregled i tretman neuroloških poremećaja — migrena, epilepsija, periferne neuropatije.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100 text-purple-600",
  },
  {
    icon: "🦷",
    title: "Dermatologija",
    specialty: "Dermatolog",
    description:
      "Lečenje kožnih oboljenja, dermatoskopija, kozmetička dermatologija i estetski tretmani.",
    color: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-100 text-pink-600",
  },
  {
    icon: "🦴",
    title: "Ortopedija",
    specialty: "Ortoped",
    description:
      "Lečenje povreda i oboljenja lokomotornog sistema, sportska medicina, rehabilitacija.",
    color: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100 text-orange-600",
  },
  {
    icon: "🔬",
    title: "Interna medicina",
    specialty: "Internista",
    description:
      "Opšti internistički pregledi, dijabetes, hipertenzija, metabolički poremećaji.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-600",
  },
  {
    icon: "🧬",
    title: "Psihijatrija",
    specialty: "Psihijatar",
    description:
      "Procena i tretman mentalnog zdravlja — anksioznost, depresija, poremećaji spavanja.",
    color: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-100 text-teal-600",
  },
];

export default function ServicesOverview() {
  const allDoctors = getActiveDoctors();

  const services = serviceDefinitions.map((s) => {
    const count = allDoctors.filter((d) => d.specialty === s.specialty).length;
    return { ...s, tag: `${count} ${count === 1 ? "lekar" : "lekara"}` };
  });
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              Specijalnosti
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
              Sve medicinske usluge na jednom mestu
            </h2>
            <p className="text-slate-500 text-lg">
              Pokrivamo sve glavne medicinske specijalnosti sa timom
              sertifikovanih stručnjaka.
            </p>
          </div>
          <Link
            href="/doctors"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all text-sm"
          >
            Sve specijalnosti
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group rounded-2xl border p-7 flex flex-col gap-4 hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer ${service.color}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${service.iconBg}`}
                >
                  {service.icon}
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-white/80 px-3 py-1 rounded-full border border-white">
                  {service.tag}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-slate-800">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <Link
                href="/appointments"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 group-hover:gap-2.5 transition-all"
              >
                Zakaži pregled
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
