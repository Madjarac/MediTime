"use client";

import Link from "next/link";
import { useState, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { bookAppointment } from "@/actions/appointments";
import { doctors as staticDoctors } from "@/lib/doctors";

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "13:00", "13:30", "14:00",
  "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
  "17:30", "18:00",
];

const today = new Date().toISOString().split("T")[0];

export default function BookingForm({ allDoctors = staticDoctors, takenSlots = {} }) {
  const [state, formAction, isPending] = useActionState(bookAppointment, null);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (!state) return;
    if (state.error) toast.error(state.error);
  }, [state]);

  const availableDoctors = allDoctors.filter((d) => d.available);

  // Pronađi zauzete termine za odabranog lekara + datum
  const takenTimes =
    selectedDoctorId && selectedDate
      ? takenSlots[`${selectedDoctorId}_${selectedDate}`] || []
      : [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-md overflow-hidden">
          {/* Zaglavlje forme */}
          <div className="bg-blue-700 px-8 py-6">
            <h2 className="text-xl font-bold text-white">
              Podaci za zakazivanje
            </h2>
            <p className="text-blue-200 text-sm mt-1">
              Sva polja označena sa * su obavezna
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <form action={formAction} className="flex flex-col gap-7">

              {/* Sekcija 1 — Lekar */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">1</div>
                  <h3 className="font-bold text-slate-800">Izbor lekara</h3>
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
                    onChange={(e) => {
                      setSelectedDoctorId(e.target.value);
                    }}
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  >
                    <option value="">— Izaberite lekara —</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} — {doc.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sekcija 2 — Termin */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">2</div>
                  <h3 className="font-bold text-slate-800">Datum i vreme</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="date" className="text-sm font-medium text-slate-700">
                      Datum pregleda <span className="text-red-500">*</span>
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
                          ({takenTimes.length} zauzetih termina)
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

                    {/* Info o zauzetim terminima */}
                    {takenTimes.length > 0 && (
                      <div className="flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-100 rounded-lg mt-1">
                        <span className="text-amber-500 text-sm shrink-0">⚠️</span>
                        <p className="text-amber-700 text-xs">
                          Zauzeti termini za ovog lekara na izabrani datum:{" "}
                          <span className="font-semibold">{takenTimes.join(", ")}h</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sekcija 3 — Lični podaci */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">3</div>
                  <h3 className="font-bold text-slate-800">Vaši podaci</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                      Ime <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName" name="firstName" type="text"
                      placeholder="Vaše ime" required
                      className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                      Prezime <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName" name="lastName" type="text"
                      placeholder="Vaše prezime" required
                      className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email" name="email" type="email"
                      placeholder="vas@email.com" required
                      className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone" name="phone" type="tel"
                      placeholder="+381 6x xxx xxxx" required
                      className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="note" className="text-sm font-medium text-slate-700">
                    Napomena za lekara{" "}
                    <span className="text-slate-400 font-normal">(opciono)</span>
                  </label>
                  <textarea
                    id="note" name="note" rows={4}
                    placeholder="Opišite razlog posete, simptome ili pitanja za lekara..."
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm"
                  />
                </div>
              </div>

              {/* Saglasnost */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded accent-blue-700" />
                <label htmlFor="terms" className="text-slate-500 text-sm leading-relaxed">
                  Prihvatam{" "}
                  <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">uslove korišćenja</Link>{" "}
                  i saglasan/na sam sa obradom ličnih podataka u skladu sa{" "}
                  <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline">politikom privatnosti</Link>.{" "}
                  <span className="text-red-500">*</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 bg-blue-700 text-white font-bold rounded-2xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-200 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Slanje zahteva...
                  </>
                ) : (
                  "Zakažite pregled"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
