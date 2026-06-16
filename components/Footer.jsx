import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "O nama" },
  { href: "/doctors", label: "Lekari" },
  { href: "/appointments", label: "Zakazivanje" },
  { href: "/contact", label: "Kontakt" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div className="flex flex-col gap-3">
            <span className="text-xl font-bold text-white tracking-tight">
              Medi<span className="text-cyan-400">Time</span>
            </span>
            <p className="text-sm leading-relaxed">
              Brzo i jednostavno zakazivanje lekarskih pregleda. Vaše zdravlje
              je naš prioritet.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Navigacija
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              Kontakt
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="mailto:info@meditime.rs"
                  className="hover:text-cyan-400 transition-colors"
                >
                  info@meditime.rs
                </a>
              </li>
              <li>
                <a
                  href="tel:+38111000000"
                  className="hover:text-cyan-400 transition-colors"
                >
                  +381 11 000 000
                </a>
              </li>
              <li>Beograd, Srbija</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} MediTime. Sva prava zadržana.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
              Politika privatnosti
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">
              Uslovi korišćenja
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
