const team = [
  {
    name: "Dr. Ana Petrović",
    role: "Osnivač & Direktor",
    bio: "Kardiolog sa 15 godina iskustva. Vizionar koji je pokrenuo MediTime.",
    initials: "AP",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Nikola Stanić",
    role: "Tehnički direktor",
    bio: "Full-stack inženjer sa fokusom na zdravstvene informacione sisteme.",
    initials: "NS",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "Dr. Milica Đorđević",
    role: "Medicinski savetnik",
    bio: "Specijalista opšte medicine koji koordinira saradnju sa lekarima.",
    initials: "MĐ",
    color: "bg-teal-100 text-teal-700",
  },
  {
    name: "Stefan Marković",
    role: "Menadžer korisničke podrške",
    bio: "Brine o svakom pacijentu i osigurava vrhunsko korisničko iskustvo.",
    initials: "SM",
    color: "bg-indigo-100 text-indigo-700",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
            Naš tim
          </h2>
          <p className="text-slate-500 text-lg">
            Posvećeni profesionalci koji stoje iza MediTime platforme.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${member.color}`}
              >
                {member.initials}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">
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
          ))}
        </div>
      </div>
    </section>
  );
}
