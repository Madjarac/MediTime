"use client";

import { useState, useActionState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { adminAddAppointment } from "@/actions/appointments";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "13:00", "13:30", "14:00",
  "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
  "17:30", "18:00",
];

const today = new Date().toISOString().split("T")[0];

export default function AdminAddAppointmentForm({ takenSlots = {}, doctors = [] }) {
  const [state, formAction, isPending] = useActionState(adminAddAppointment, null);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (!state) return;
    if (state.error) toast.error(state.error);
    if (state.success) toast.success("Pregled je uspešno dodat!");
  }, [state]);

  const availableDoctors = doctors.filter((d) => d.available);

  const takenTimes =
    selectedDoctorId && selectedDate
      ? takenSlots[`${selectedDoctorId}_${selectedDate}`] || []
      : [];

  const selectedDoctor = availableDoctors.find((d) => d.id === parseInt(selectedDoctorId));

  return (
    <div className="px-8 py-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/appointments"
          className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Nazad na preglede
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Ručno dodavanje pregleda</h1>
        <p className="text-slate-400 text-sm mt-1">
          Pregled dodat od strane admina automatski dobija status <span className="font-semibold text-green-600">Zakazano</span>.
        </p>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Zaglavlje */}
        <div className="bg-slate-800 px-8 py-5 flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h2 className="font-bold text-white">Podaci o pregledu</h2>
            <p className="text-slate-400 text-xs mt-0.5">Polja označena sa * su obavezna</p>
          </div>
        </div>

        <div className="p-8">
          <form action={formAction} className="flex flex-col gap-7">

            {/* Sekcija 1 — Lekar i termin */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">1</div>
                <h3 className="font-semibold text-slate-800">Lekar i termin</h3>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="doctorId" className="text-sm font-medium text-slate-700">
                  Lekar <span className="text-red-500">*</span>
                </label>
                <select
                  id="doctorId"
                  name="doctorId"
                  required
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                >
                  <option value="">— Izaberite lekara —</option>
                  {availableDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty}
                    </option>
                  ))}
                </select>

                {/* Prikaz info o izabranom lekaru */}
                {selectedDoctor && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl mt-1">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${selectedDoctor.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                      {selectedDoctor.initials}
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold text-sm">{selectedDoctor.name}</p>
                      <p className="text-slate-500 text-xs">{selectedDoctor.specialty} · {selectedDoctor.experience} iskustva</p>
                    </div>
                    <span className={`ml-auto text-xs font-semibold px-2.5 py-1 rounded-full ${selectedDoctor.available ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                      {selectedDoctor.available ? "● Dostupan" : "● Nedostupan"}
                    </span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="date" className="text-sm font-medium text-slate-700">
                    Datum <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today}
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="time" className="text-sm font-medium text-slate-700">
                    Vreme <span className="text-red-500">*</span>
                    {takenTimes.length > 0 && (
                      <span className="ml-2 text-xs text-amber-600 font-normal">
                        ({takenTimes.length} zauzeto)
                      </span>
                    )}
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  >
                    <option value="">— Izaberite termin —</option>
                    {timeSlots.map((t) => {
                      const isTaken = takenTimes.includes(t);
                      return (
                        <option key={t} value={t} disabled={isTaken}>
                          {t}{isTaken ? " — zauzeto" : ""}
                        </option>
                      );
                    })}
                  </select>

                  {takenTimes.length > 0 && (
                    <div className="flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-lg mt-1">
                      <span className="text-amber-500 text-sm shrink-0">⚠️</span>
                      <p className="text-amber-700 text-xs">
                        Zauzeto: <span className="font-semibold">{takenTimes.join(", ")}h</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sekcija 2 — Podaci o pacijentu */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold">2</div>
                <h3 className="font-semibold text-slate-800">Podaci o pacijentu</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                    Ime <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName" name="firstName" type="text"
                    placeholder="Ime pacijenta" required
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                    Prezime <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName" name="lastName" type="text"
                    placeholder="Prezime pacijenta" required
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    E-mail <span className="text-slate-400 font-normal">(opciono)</span>
                  </label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="pacijent@email.com"
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Telefon <span className="text-slate-400 font-normal">(opciono)</span>
                  </label>
                  <input
                    id="phone" name="phone" type="tel"
                    placeholder="+381 6x xxx xxxx"
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="note" className="text-sm font-medium text-slate-700">
                  Napomena <span className="text-slate-400 font-normal">(opciono)</span>
                </label>
                <textarea
                  id="note" name="note" rows={3}
                  placeholder="Razlog posete, dijagnoza, napomena..."
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm"
                />
              </div>
            </div>

            {/* Info baner */}
            <div className="flex items-start gap-3 px-4 py-3 bg-green-50 border border-green-100 rounded-xl">
              <span className="text-green-600 text-lg shrink-0 mt-0.5">✅</span>
              <p className="text-green-700 text-sm">
                Pregled dodat od strane admina automatski se postavlja kao{" "}
                <span className="font-bold">Zakazano</span> — ne čeka potvrdu.
              </p>
            </div>

            {/* Dugmad */}
            <div className="flex items-center gap-3 pt-2">
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
                  "Dodaj pregled"
                )}
              </button>
              <Link
                href="/admin/appointments"
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
