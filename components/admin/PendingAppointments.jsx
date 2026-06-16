"use client";

import { useTransition } from "react";
import { toast } from "react-toastify";
import { confirmAppointment, rejectAppointment } from "@/actions/appointments";

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("sr-RS", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function AppointmentRow({ apt }) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await confirmAppointment(apt.id);
      toast.success(`Pregled za ${apt.patientName} ${apt.patientSurname} je potvrđen.`);
    });
  };

  const handleReject = () => {
    let toastId;
    toastId = toast(
      <div>
        <p className="font-semibold text-slate-800 text-sm">
          Odbiti pregled za {apt.patientName} {apt.patientSurname}?
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {apt.date} u {apt.time}h · pacijent će biti obavešten.
        </p>
        <div className="flex gap-2 mt-3">
          <button
            className="flex-1 py-1.5 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => {
              toast.dismiss(toastId);
              startTransition(async () => {
                await rejectAppointment(apt.id);
                toast.info(`Pregled za ${apt.patientName} ${apt.patientSurname} je odbijen.`);
              });
            }}
          >
            Odbij
          </button>
          <button
            className="flex-1 py-1.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            onClick={() => toast.dismiss(toastId)}
          >
            Otkaži
          </button>
        </div>
      </div>,
      { autoClose: false, closeButton: false, icon: "⚠️" }
    );
  };

  return (
    <div className={`p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-opacity ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
      {/* Avatar + pacijent */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
          {apt.patientName?.[0]}{apt.patientSurname?.[0]}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 text-sm truncate">
            {apt.patientName} {apt.patientSurname}
          </p>
          <p className="text-slate-400 text-xs truncate">{apt.email} · {apt.phone}</p>
        </div>
      </div>

      {/* Lekar */}
      <div className="sm:w-44 min-w-0">
        <p className="text-slate-700 text-sm font-medium truncate">{apt.doctorName}</p>
        <p className="text-slate-400 text-xs">{apt.specialty}</p>
      </div>

      {/* Termin */}
      <div className="sm:w-40 shrink-0">
        <p className="text-slate-700 text-sm font-semibold capitalize">{formatDate(apt.date)}</p>
        <p className="text-slate-400 text-xs">{apt.time} h · {apt.id}</p>
      </div>

      {/* Napomena */}
      {apt.note && (
        <div className="hidden lg:block sm:w-40 min-w-0">
          <p className="text-slate-400 text-xs line-clamp-2">{apt.note}</p>
        </div>
      )}

      {/* Dugmadi */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleConfirm}
          disabled={isPending}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
          Potvrdi
        </button>
        <button
          onClick={handleReject}
          disabled={isPending}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          Odbij
        </button>
      </div>
    </div>
  );
}

export default function PendingAppointments({ appointments }) {
  const pending = appointments.filter((a) => a.status === "pending");

  if (pending.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm">
        <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <h2 className="font-bold text-slate-800">Na čekanju</h2>
          <span className="ml-auto text-xs text-slate-400">Nema novih zahteva</span>
        </div>
        <div className="py-12 flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">✅</span>
          <p className="text-slate-500 font-medium text-sm">Svi zahtevi su obrađeni</p>
          <p className="text-slate-400 text-xs">Novi zahtevi će se pojaviti ovde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-amber-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        <h2 className="font-bold text-slate-800">Na čekanju</h2>
        <span className="ml-1 px-2.5 py-0.5 bg-amber-400 text-white text-xs font-bold rounded-full">
          {pending.length}
        </span>
        <span className="ml-auto text-xs text-slate-500">
          Zahtevi čekaju vašu potvrdu
        </span>
      </div>

      {/* Lista */}
      <div className="divide-y divide-slate-50">
        {pending.map((apt) => (
          <AppointmentRow key={apt.id} apt={apt} />
        ))}
      </div>
    </div>
  );
}
