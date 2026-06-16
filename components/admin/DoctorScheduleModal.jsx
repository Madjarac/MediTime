"use client";

import { useEffect, useState } from "react";

const statusConfig = {
  confirmed: { label: "Zakazano",   className: "bg-green-100 text-green-700",  dot: "bg-green-500"  },
  pending:   { label: "Na čekanju", className: "bg-amber-100 text-amber-700",  dot: "bg-amber-400"  },
  rejected:  { label: "Odbijen",    className: "bg-red-100 text-red-600",      dot: "bg-red-400"    },
  cancelled: { label: "Otkazan",    className: "bg-slate-100 text-slate-500",  dot: "bg-slate-300"  },
};

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("sr-RS", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function groupByDate(appointments) {
  const groups = {};
  appointments.forEach((a) => {
    if (!groups[a.date]) groups[a.date] = [];
    groups[a.date].push(a);
  });
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

const FILTERS = [
  { key: "all",       label: "Svi"         },
  { key: "confirmed", label: "Potvrđeni"   },
  { key: "pending",   label: "Na čekanju"  },
  { key: "rejected",  label: "Odbijeni"    },
];

export default function DoctorScheduleModal({ doctor, appointments, onClose }) {
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const doctorApts = appointments.filter((a) => a.doctorId === doctor.id);

  const stats = {
    total:     doctorApts.length,
    confirmed: doctorApts.filter((a) => a.status === "confirmed").length,
    pending:   doctorApts.filter((a) => a.status === "pending").length,
    rejected:  doctorApts.filter((a) => a.status === "rejected" || a.status === "cancelled").length,
  };

  const filtered = statusFilter === "all"
    ? doctorApts
    : doctorApts.filter((a) => {
        if (statusFilter === "rejected") return a.status === "rejected" || a.status === "cancelled";
        return a.status === statusFilter;
      });

  const grouped = groupByDate(
    [...filtered].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col overflow-hidden">

        {/* Zaglavlje */}
        <div className={`bg-gradient-to-br ${doctor.gradient} px-7 py-6 flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl font-extrabold text-white">
              {doctor.initials}
            </div>
            <div>
              <h2 className="font-bold text-white text-lg leading-tight">{doctor.name}</h2>
              <p className="text-white/75 text-sm">{doctor.specialty} · {doctor.experience} iskustva</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-yellow-300 text-xs">★</span>
                <span className="text-white/90 text-xs font-semibold">
                  {doctor.rating === "N/A" ? "Bez ocena" : `${doctor.rating} (${doctor.reviews})`}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            aria-label="Zatvori"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Statistike */}
        <div className="grid grid-cols-4 divide-x divide-slate-100 border-b border-slate-100 shrink-0">
          {[
            { key: "all",       label: "Ukupno",     value: stats.total,     color: "text-slate-800" },
            { key: "confirmed", label: "Potvrđeni",  value: stats.confirmed, color: "text-green-700" },
            { key: "pending",   label: "Na čekanju", value: stats.pending,   color: "text-amber-600" },
            { key: "rejected",  label: "Odbijeni",   value: stats.rejected,  color: "text-red-600"   },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key)}
              className={`flex flex-col items-center py-4 gap-0.5 transition-colors hover:bg-slate-50 ${
                statusFilter === s.key ? "bg-slate-50 border-b-2 border-blue-600" : ""
              }`}
            >
              <span className={`text-2xl font-extrabold leading-none ${s.color}`}>{s.value}</span>
              <span className="text-xs text-slate-400 font-medium">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Lista pregleda */}
        <div className="overflow-y-auto flex-1 p-5">
          {grouped.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <span className="text-4xl">📭</span>
              <p className="text-slate-600 font-semibold">
                {statusFilter === "all" ? "Nema zakazanih pregleda" : `Nema pregleda sa statusom "${FILTERS.find(f => f.key === statusFilter)?.label}"`}
              </p>
              {statusFilter !== "all" && (
                <button
                  onClick={() => setStatusFilter("all")}
                  className="mt-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold rounded-xl transition-colors"
                >
                  Prikaži sve
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {grouped.map(([date, dayApts]) => (
                <div key={date} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                  {/* Datum */}
                  <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-blue-700">
                        {new Date(date + "T00:00:00").getDate()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm capitalize">{formatDate(date)}</p>
                      <p className="text-slate-400 text-xs">
                        {dayApts.length} {dayApts.length === 1 ? "pregled" : "pregleda"}
                      </p>
                    </div>
                  </div>

                  {/* Redovi */}
                  <div className="divide-y divide-slate-50">
                    {[...dayApts].sort((a, b) => a.time.localeCompare(b.time)).map((apt) => {
                      const s = statusConfig[apt.status] || statusConfig.pending;
                      return (
                        <div key={apt.id} className="px-5 py-3.5 flex items-center gap-4 hover:bg-slate-50/60 transition-colors">
                          {/* Vreme */}
                          <div className="w-12 text-center shrink-0">
                            <p className="text-base font-bold text-slate-800 leading-none">{apt.time}</p>
                            <p className="text-xs text-slate-400">h</p>
                          </div>

                          <div className="w-px h-8 bg-slate-100 shrink-0" />

                          {/* Pacijent */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                              {apt.patientName?.[0]}{apt.patientSurname?.[0]}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-800 text-sm truncate">
                                {apt.patientName} {apt.patientSurname}
                              </p>
                              <p className="text-slate-400 text-xs truncate">{apt.email || apt.phone || "—"}</p>
                            </div>
                          </div>

                          {/* Status */}
                          <span className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.className}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
