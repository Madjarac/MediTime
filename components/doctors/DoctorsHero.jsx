export default function DoctorsHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 text-white overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col items-center text-center gap-7">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
          <span className="w-2 h-2 bg-cyan-300 rounded-full" />
          Naši lekari
        </span>

        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight max-w-3xl">
          Stručni lekari na{" "}
          <span className="text-cyan-300">jednom mestu</span>
        </h1>

        <p className="text-blue-100 text-lg sm:text-xl max-w-xl leading-relaxed">
          Pronađite pravog specijaliste za vaše potrebe. Svi lekari su
          verifikovani, licencirani i ocenjeni od strane pacijenata.
        </p>

        <div className="flex flex-wrap justify-center gap-10 mt-4 pt-8 border-t border-white/15 w-full max-w-2xl">
          {[
            { value: "20+", label: "Lekara" },
            { value: "10+", label: "Specijalnosti" },
            { value: "4.8★", label: "Prosek ocena" },
            { value: "10k+", label: "Pregleda mesečno" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-extrabold text-white">
                {stat.value}
              </span>
              <span className="text-sm text-blue-200">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
