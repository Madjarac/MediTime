const team = [
  {
    name: "Dr. Ana Petrović",
    role: "Osnivač & CEO",
    bio: "Kardiolog sa 15 godina iskustva. Pokrenula MediTime iz lične frustracije sistemom zakazivanja.",
    initials: "AP",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    name: "Nikola Stanić",
    role: "CTO",
    bio: "Full-stack inženjer, specijalizovan za healthtech. Prethodno radio u e-zdravlje projektima EU.",
    initials: "NS",
    gradient: "from-cyan-500 to-cyan-700",
  },
  {
    name: "Dr. Milica Đorđević",
    role: "Medicinski direktor",
    bio: "Specijalista opšte medicine. Koordinira saradnju sa svim lekarima u mreži.",
    initials: "MĐ",
    gradient: "from-teal-500 to-teal-700",
  },
  {
    name: "Stefan Marković",
    role: "Head of Product",
    bio: "UX dizajner i product menadžer sa fokusom na zdravstvene platforme i korisničko iskustvo.",
    initials: "SM",
    gradient: "from-indigo-500 to-indigo-700",
  },
];

export default function VisionSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Vizija */}
        <div className="bg-gradient-to-br from-blue-700 to-cyan-600 rounded-3xl p-10 sm:p-14 mb-20 text-white text-center flex flex-col items-center gap-6">
          <span className="text-sm font-semibold text-cyan-200 uppercase tracking-widest">
            Naša vizija
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold max-w-3xl leading-tight">
            Svet u kome svaki čovek ima brz i lak pristup kvalitetnoj
            medicinskoj zaštiti
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Radimo ka budućnosti u kojoj geografija, vreme i birokratija više
            nisu prepreke između pacijenta i lekara. MediTime je naš doprinos
            toj budućnosti.
          </p>
        </div>

        {/* Tim */}
        <div className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-3">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              Naš tim
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Ljudi koji stoje iza MediTime
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Različiti profili, jedna zajednička misija — da poboljšamo
              zdravstveni sistem.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                <div
                  className={`bg-gradient-to-br ${member.gradient} p-8 flex items-center justify-center`}
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-extrabold text-white">
                    {member.initials}
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 text-sm font-medium">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
