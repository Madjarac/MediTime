"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { addDoctorAction } from "@/actions/doctors";

const specialties = [
  "Kardiolog", "Neurolog", "Dermatolog", "Ortoped", "Internista",
  "Psihijatar", "Oftalmolog", "Ginekolog", "Urolog", "Endokrinolog",
  "Pulmolog", "Reumatolog", "Gastroenterolog", "Pedijatar", "Hirurg", "Ostalo",
];

export default function AdminAddDoctorForm() {
  const [state, formAction, isPending] = useActionState(addDoctorAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.error) toast.error(state.error);
    if (state.success) toast.success("Lekar je uspešno dodat!");
  }, [state]);

  return (
    <div className="px-8 py-8 max-w-2xl">
      {/* Back */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/doctors"
          className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Nazad na lekare
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Dodaj novog lekara</h1>
        <p className="text-slate-400 text-sm mt-1">
          Lekar će biti vidljiv u sistemu i dostupan za zakazivanje pregleda.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-slate-800 px-8 py-5 flex items-center gap-3">
          <span className="text-2xl">👨‍⚕️</span>
          <div>
            <h2 className="font-bold text-white">Podaci o lekaru</h2>
            <p className="text-slate-400 text-xs mt-0.5">Polja označena sa * su obavezna</p>
          </div>
        </div>

        <div className="p-8">
          <form action={formAction} className="flex flex-col gap-6">

            {/* Ime */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Puno ime <span className="text-red-500">*</span>
              </label>
              <input
                id="name" name="name" type="text"
                placeholder="npr. Dr. Marija Nikolić"
                required
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
              <p className="text-slate-400 text-xs">Unesite ime u formatu "Dr. Ime Prezime"</p>
            </div>

            {/* Specijalnost + Iskustvo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="specialty" className="text-sm font-medium text-slate-700">
                  Specijalnost <span className="text-red-500">*</span>
                </label>
                <select
                  id="specialty" name="specialty" required
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                >
                  <option value="">— Izaberite —</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="experience" className="text-sm font-medium text-slate-700">
                  Iskustvo <span className="text-red-500">*</span>
                </label>
                <input
                  id="experience" name="experience" type="text"
                  placeholder="npr. 8 god."
                  required
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="bio" className="text-sm font-medium text-slate-700">
                Kratka biografija <span className="text-red-500">*</span>
              </label>
              <textarea
                id="bio" name="bio" rows={3}
                placeholder="Opis specijalnosti, iskustva i oblasti rada lekara..."
                required
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm"
              />
            </div>

            {/* Tagovi */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="tags" className="text-sm font-medium text-slate-700">
                Oblasti rada <span className="text-slate-400 font-normal">(opciono, odvojite zarezom)</span>
              </label>
              <input
                id="tags" name="tags" type="text"
                placeholder="npr. EKG, Holter, Ehokardiografija"
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
              <p className="text-slate-400 text-xs">Maksimalno 4 oblasti rada</p>
            </div>

            {/* Dostupnost */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-slate-700">Dostupnost</p>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio" name="available" value="true" defaultChecked
                    className="w-4 h-4 accent-blue-700"
                  />
                  <span className="text-sm text-slate-700">
                    <span className="text-green-600 font-semibold">● Dostupan</span> — prima pacijente
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio" name="available" value="false"
                    className="w-4 h-4 accent-blue-700"
                  />
                  <span className="text-sm text-slate-700">
                    <span className="text-slate-400 font-semibold">● Nedostupan</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Dugmad */}
            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 py-3.5 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors shadow-md shadow-blue-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Dodavanje...
                  </>
                ) : (
                  "Dodaj lekara"
                )}
              </button>
              <Link
                href="/admin/doctors"
                className="px-6 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm"
              >
                Otkaži
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
