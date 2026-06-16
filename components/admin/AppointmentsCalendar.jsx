"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { removeAppointment } from "@/actions/appointments";

const statusConfig = {
  confirmed: { label: "Zakazano",   className: "bg-green-100 text-green-700",  dot: "bg-green-500" },
  pending:   { label: "Na čekanju", className: "bg-amber-100 text-amber-700",  dot: "bg-amber-400" },
  rejected:  { label: "Odbijen",    className: "bg-red-100 text-red-600",      dot: "bg-red-400" },
  cancelled: { label: "Otkazan",    className: "bg-slate-100 text-slate-500",  dot: "bg-slate-300" },
};

function AppointmentRow({ apt, showDoctor }) {
  const [isPending, startTransition] = useTransition();
  const s = statusConfig[apt.status] || statusConfig.pending;

  const handleDelete = () => {
    let toastId;
    toastId = toast(
      <div>
        <p className="font-semibold text-slate-800 text-sm">
          Obrisati pregled za {apt.patientName} {apt.patientSurname}?
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {apt.date} u {apt.time}h — ova akcija je nepovratna.
        </p>
        <div className="flex gap-2 mt-3">
          <button
            className="flex-1 py-1.5 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => {
              toast.dismiss(toastId);
              startTransition(async () => {
                await removeAppointment(apt.id);
                toast.success("Pregled je uspešno obrisan.");
              });
            }}
          >
            Obriši
          </button>
          <button
            className="flex-1 py-1.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            onClick={() => toast.dismiss(toastId)}
          >
            Otkaži
          </button>
        </div>
      </div>,
      { autoClose: false, closeButton: false, icon: "🗑️" }
    );
  };

  return (
    <div className={`px-6 py-4 flex items-center gap-5 hover:bg-slate-50/60 transition-colors ${isPending ? "opacity-40 pointer-events-none" : ""}`}>
      {/* Vreme */}
      <div className="w-16 shrink-0 text-center">
        <p className="text-lg font-bold text-slate-800 leading-none">{apt.time}</p>
        <p className="text-xs text-slate-400 mt-0.5">h</p>
      </div>

      <div className="w-px h-10 bg-slate-100 shrink-0" />

      {/* Pacijent */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
          {apt.patientName?.[0]}{apt.patientSurname?.[0]}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 text-sm truncate">
            {apt.patientName} {apt.patientSurname}
          </p>
          <p className="text-slate-400 text-xs truncate">{apt.email}</p>
        </div>
      </div>

      {/* Lekar (samo kada se vide svi) */}
      {showDoctor && (
        <div className="hidden sm:block min-w-0 w-40">
          <p className="text-slate-700 text-sm font-medium truncate">{apt.doctorName}</p>
          <p className="text-slate-400 text-xs">{apt.specialty}</p>
        </div>
      )}

      {/* Napomena */}
      {apt.note && (
        <div className="hidden lg:block max-w-xs">
          <p className="text-slate-400 text-xs line-clamp-2">{apt.note}</p>
        </div>
      )}

      {/* Status */}
      <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {s.label}
      </span>

      {/* ID */}
      <span className="hidden sm:block text-xs font-mono text-slate-300 shrink-0">
        {apt.id}
      </span>

      {/* Brisanje */}
      <button
        onClick={handleDelete}
        disabled={isPending}
        title="Obriši pregled"
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("sr-RS", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function groupByDate(appointments) {
  const groups = {};
  appointments.forEach((a) => {
    if (!groups[a.date]) groups[a.date] = [];
    groups[a.date].push(a);
  });
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
}

export default function AppointmentsCalendar({ appointments, doctors = [] }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const doctorsWithAppointments = doctors.filter((d) =>
    appointments.some((a) => a.doctorId === d.id)
  );

  const byDoctor =
    selectedDoctorId === "all"
      ? appointments
      : appointments.filter((a) => a.doctorId === parseInt(selectedDoctorId));

  const filtered =
    statusFilter === "all"
      ? byDoctor
      : byDoctor.filter((a) => a.status === statusFilter);

  const sorted = [...filtered].sort((a, b) =>
    a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
  );

  const grouped = groupByDate(sorted);

  const stats = {
    total: byDoctor.length,
    confirmed: byDoctor.filter((a) => a.status === "confirmed").length,
    pending: byDoctor.filter((a) => a.status === "pending").length,
    rejected: byDoctor.filter((a) => a.status === "rejected").length,
  };

  const selectedDoctor =
    selectedDoctorId !== "all"
      ? doctors.find((d) => d.id === parseInt(selectedDoctorId))
      : null;

  return (
    <div className="flex flex-col gap-6">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {selectedDoctor ? `Kalendar — ${selectedDoctor.name}` : "Svi pregledi"}
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {selectedDoctor ? selectedDoctor.specialty : "Pregled svih zakazanih termina"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/appointments/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Dodaj pregled
          </Link>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-w-64"
          >
          <option value="all">Svi lekari ({appointments.length} pregleda)</option>
          {doctorsWithAppointments.map((d) => {
            const count = appointments.filter((a) => a.doctorId === d.id).length;
            return (
              <option key={d.id} value={d.id}>
                {d.name} — {d.specialty} ({count})
              </option>
            );
          })}
          </select>
        </div>
      </div>

      {/* Statistike — klikabilni filteri */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { key: "all",       label: "Ukupno",     value: stats.total,     color: "text-slate-800", bg: "bg-slate-50",  border: "border-slate-200", ring: "ring-slate-400"  },
          { key: "confirmed", label: "Potvrđeni",  value: stats.confirmed, color: "text-green-700", bg: "bg-green-50",  border: "border-green-200", ring: "ring-green-500"  },
          { key: "pending",   label: "Na čekanju", value: stats.pending,   color: "text-amber-700", bg: "bg-amber-50",  border: "border-amber-200", ring: "ring-amber-400"  },
          { key: "rejected",  label: "Odbijeni",   value: stats.rejected,  color: "text-red-600",   bg: "bg-red-50",    border: "border-red-200",   ring: "ring-red-400"    },
        ].map((s) => {
          const isActive = statusFilter === s.key;
          return (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key)}
              className={`${s.bg} border-2 rounded-2xl p-4 flex flex-col gap-1 text-left transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer
                ${isActive ? `${s.border} ring-2 ${s.ring} shadow-sm` : "border-transparent"}`}
            >
              <p className="text-xs text-slate-400 font-medium">{s.label}</p>
              <p className={`text-3xl font-extrabold ${s.color}`}>{s.value}</p>
              {isActive && (
                <p className="text-xs font-semibold text-slate-400 mt-0.5">aktivni filter</p>
              )}
            </button>
          );
        })}
      </div>

      {/* Kalendar */}
      {grouped.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center">
          <span className="text-4xl block mb-3">📭</span>
          <p className="text-slate-600 font-semibold">Nema pregleda</p>
          <p className="text-slate-400 text-sm mt-1">
            {statusFilter !== "all"
              ? `Nema pregleda sa statusom "${statusFilter === "confirmed" ? "Potvrđeni" : statusFilter === "pending" ? "Na čekanju" : "Odbijeni"}".`
              : selectedDoctor
              ? `${selectedDoctor.name} nema pregleda.`
              : "Još uvek nema zakazanih pregleda."}
          </p>
          {statusFilter !== "all" && (
            <button
              onClick={() => setStatusFilter("all")}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold rounded-xl transition-colors"
            >
              Prikaži sve
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {grouped.map(([date, dayAppointments]) => (
            <div key={date} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              {/* Datum header */}
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-700">
                      {new Date(date + "T00:00:00").getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm capitalize">
                      {formatDate(date)}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {dayAppointments.length} {dayAppointments.length === 1 ? "pregled" : "pregleda"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Lista pregleda za taj dan */}
              <div className="divide-y divide-slate-50">
                {dayAppointments
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((apt) => (
                    <AppointmentRow
                      key={apt.id}
                      apt={apt}
                      showDoctor={selectedDoctorId === "all"}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
