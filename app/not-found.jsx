import Link from "next/link";

export const metadata = {
  title: "Stranica nije pronađena",
  description: "Stranica koju tražite ne postoji ili je premeštena.",
  robots: { index: false, follow: false },
};

const LINKS = [
  { href: "/",             label: "Početna"        },
  { href: "/doctors",      label: "Naši lekari"    },
  { href: "/appointments", label: "Zakaži pregled"  },
  { href: "/contact",      label: "Kontakt"         },
];

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 bg-white">
      <div className="max-w-xl w-full text-center flex flex-col items-center gap-8">

        {/* Big number */}
        <div className="relative select-none">
          <p className="text-[160px] sm:text-[200px] font-extrabold leading-none text-slate-100 tracking-tight">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-200">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Stranica nije pronađena
          </h1>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Stranica koju tražite ne postoji, možda je premeštena ili je link pogrešan.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Idi na početnu
          </Link>
          <Link
            href="/appointments"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors text-sm"
          >
            Zakaži pregled
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-4">
            Korisne stranice
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </section>
  );
}
