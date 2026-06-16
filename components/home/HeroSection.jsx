import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col items-center text-center gap-8">
        <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-medium tracking-wide backdrop-blur-sm">
          🏥 Online zakazivanje pregleda
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-3xl">
          Vaše zdravlje, naša{" "}
          <span className="text-cyan-200">briga</span>
        </h1>

        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">
          Zakažite pregled kod stručnih lekara za nekoliko sekundi. Bez čekanja
          u redu — jednostavno, brzo i pouzdano.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/appointments"
            className="px-8 py-3.5 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-colors text-base"
          >
            Zakažite pregled
          </Link>
          <Link
            href="/doctors"
            className="px-8 py-3.5 border-2 border-white/70 text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-base"
          >
            Naši lekari
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-8 text-sm text-blue-100">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white">20+</span>
            <span>Stručnih lekara</span>
          </div>
          <div className="w-px bg-white/20 hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white">10k+</span>
            <span>Zadovoljnih pacijenata</span>
          </div>
          <div className="w-px bg-white/20 hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold text-white">10+</span>
            <span>Specijalnosti</span>
          </div>
        </div>
      </div>
    </section>
  );
}
