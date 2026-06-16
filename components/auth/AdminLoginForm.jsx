"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { loginAction } from "@/actions/auth";

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <div className="flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-0 w-full max-w-md mx-auto lg:mx-0">
      {/* Mobile logo */}
      <div className="lg:hidden mb-10">
        <Link href="/" className="text-2xl font-extrabold text-blue-700 tracking-tight">
          Medi<span className="text-cyan-500">Time</span>
          <span className="ml-2 text-sm text-slate-400 font-normal">Admin</span>
        </Link>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Dobrodošli nazad
        </h2>
        <p className="text-slate-500 text-sm">
          Prijavite se kako biste pristupili administratorskom panelu.
        </p>
      </div>

      <form action={formAction} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            E-mail adresa
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@meditime.rs"
            autoComplete="email"
            required
            className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-slate-700">
            Lozinka
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 active:scale-[0.98] transition-all shadow-md shadow-blue-200 text-sm mt-1 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Prijava u toku...
            </>
          ) : (
            "Prijavite se"
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
        <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
          <span className="text-amber-500 text-sm mt-0.5">⚠️</span>
          <p className="text-amber-700 text-xs leading-relaxed">
            Pristup je dozvoljen isključivo ovlašćenim administratorima. Svi
            pokušaji neovlašćenog pristupa se beleže.
          </p>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-blue-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Povratak na sajt
        </Link>
      </div>
    </div>
  );
}
