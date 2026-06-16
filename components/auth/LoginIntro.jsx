const features = [
  {
    icon: "📊",
    title: "Pregled statistike",
    desc: "Pratite broj pregleda, aktivnih lekara i pacijenata u realnom vremenu.",
  },
  {
    icon: "📅",
    title: "Upravljanje terminima",
    desc: "Potvrđujte, otkazujte i premeštajte zakazane preglede na jednom mestu.",
  },
  {
    icon: "👨‍⚕️",
    title: "Tim lekara",
    desc: "Dodajte, uređujte i deaktivirajte profile lekara unutar sistema.",
  },
  {
    icon: "🔔",
    title: "Obaveštenja",
    desc: "Automatsko slanje potvrda i podsetnika pacijentima putem e-maila.",
  },
];

export default function LoginIntro() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 text-white p-12 relative overflow-hidden">
      {/* Dekoracija */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <span className="text-2xl font-extrabold tracking-tight">
          Medi<span className="text-cyan-300">Time</span>
          <span className="ml-2 text-sm text-blue-300 font-normal">
            Admin Panel
          </span>
        </span>
      </div>

      {/* Sredina — headline */}
      <div className="relative z-10 flex flex-col gap-5">
        <h1 className="text-3xl font-extrabold leading-tight">
          Sve što vam treba za
          <br />
          upravljanje ordinacijom
        </h1>
        <p className="text-blue-100 text-base leading-relaxed">
          Administratorski panel koji vam daje potpunu kontrolu nad
          zakazivanjima, lekarima i pacijentima.
        </p>

        <div className="flex flex-col gap-4 mt-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-lg shrink-0">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{f.title}</p>
                <p className="text-blue-200 text-xs leading-relaxed mt-0.5">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <p className="text-blue-300 text-xs">
          © {new Date().getFullYear()} MediTime · Sva prava zadržana
        </p>
      </div>
    </div>
  );
}
