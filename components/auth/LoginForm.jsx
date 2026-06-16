import Link from "next/link";

export default function LoginForm() {
  return (
    <section className="min-h-[80vh] bg-slate-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-2xl font-bold text-blue-700 tracking-tight mb-4">
            Medi<span className="text-cyan-500">Time</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Admin prijava</h1>
          <p className="text-slate-500 text-sm mt-2">
            Unesite vaše kredencijale za pristup administratorskom panelu.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                E-mail adresa
              </label>
              <input
                type="email"
                placeholder="admin@meditime.rs"
                autoComplete="email"
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Lozinka
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  Zaboravili ste?
                </a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow mt-2"
            >
              Prijavite se
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            ← Povratak na sajt
          </Link>
        </p>
      </div>
    </section>
  );
}
