"use client";

import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateDoctorAction } from "@/actions/doctors";

const specialties = [
  "Kardiolog", "Neurolog", "Dermatolog", "Ortoped", "Internista",
  "Psihijatar", "Oftalmolog", "Ginekolog", "Urolog", "Endokrinolog",
  "Pulmolog", "Reumatolog", "Gastroenterolog", "Pedijatar", "Hirurg", "Ostalo",
];

export default function EditDoctorModal({ doctor, onClose }) {
  const [state, formAction, isPending] = useActionState(updateDoctorAction, null);

  useEffect(() => {
    if (!state) return;
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Podaci lekara su sačuvani.");
      onClose();
    }
  }, [state, onClose]);

  // Zatvori na Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

        {/* Zaglavlje */}
        <div className="bg-slate-800 px-8 py-5 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${doctor.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
              {doctor.initials}
            </div>
            <div>
              <h2 className="font-bold text-white leading-tight">Izmeni lekara</h2>
              <p className="text-slate-400 text-xs mt-0.5">{doctor.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Zatvori"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <form action={formAction} className="flex flex-col gap-5">
            {/* Skrivena polja */}
            <input type="hidden" name="id" value={doctor.id} />
            <input type="hidden" name="isCustom" value={String(!!doctor.isCustom)} />

            {/* Ime */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-name" className="text-sm font-medium text-slate-700">
                Puno ime <span className="text-red-500">*</span>
              </label>
              <input
                id="edit-name"
                name="name"
                type="text"
                defaultValue={doctor.name}
                required
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
            </div>

            {/* Specijalnost + Iskustvo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-specialty" className="text-sm font-medium text-slate-700">
                  Specijalnost <span className="text-red-500">*</span>
                </label>
                <select
                  id="edit-specialty"
                  name="specialty"
                  defaultValue={doctor.specialty}
                  required
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                >
                  <option value="">— Izaberite —</option>
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-experience" className="text-sm font-medium text-slate-700">
                  Iskustvo <span className="text-red-500">*</span>
                </label>
                <input
                  id="edit-experience"
                  name="experience"
                  type="text"
                  defaultValue={doctor.experience}
                  required
                  placeholder="npr. 8 god."
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-bio" className="text-sm font-medium text-slate-700">
                Kratka biografija <span className="text-red-500">*</span>
              </label>
              <textarea
                id="edit-bio"
                name="bio"
                rows={3}
                defaultValue={doctor.bio}
                required
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm"
              />
            </div>

            {/* Ocena + Recenzije */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-rating" className="text-sm font-medium text-slate-700">
                  Ocena <span className="text-slate-400 font-normal">(1.0 – 5.0)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 text-sm pointer-events-none">★</span>
                  <input
                    id="edit-rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    defaultValue={doctor.rating === "N/A" ? "" : doctor.rating}
                    placeholder="npr. 4.8"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="edit-reviews" className="text-sm font-medium text-slate-700">
                  Broj recenzija
                </label>
                <input
                  id="edit-reviews"
                  name="reviews"
                  type="number"
                  min="0"
                  defaultValue={doctor.reviews ?? 0}
                  placeholder="npr. 142"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                />
              </div>
            </div>

            {/* Tagovi */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="edit-tags" className="text-sm font-medium text-slate-700">
                Oblasti rada{" "}
                <span className="text-slate-400 font-normal">(odvojite zarezom)</span>
              </label>
              <input
                id="edit-tags"
                name="tags"
                type="text"
                defaultValue={doctor.tags?.join(", ") || ""}
                placeholder="npr. EKG, Holter, Ehokardiografija"
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
            </div>

            {/* Dostupnost */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-slate-700">Dostupnost</p>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="available"
                    value="true"
                    defaultChecked={doctor.available}
                    className="w-4 h-4 accent-blue-700"
                  />
                  <span className="text-sm text-slate-700">
                    <span className="text-green-600 font-semibold">● Dostupan</span>
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="radio"
                    name="available"
                    value="false"
                    defaultChecked={!doctor.available}
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
                    Čuvanje...
                  </>
                ) : (
                  "Sačuvaj izmene"
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm"
              >
                Otkaži
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
