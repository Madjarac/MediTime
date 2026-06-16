"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { removeDoctorAction } from "@/actions/doctors";
import EditDoctorModal from "@/components/admin/EditDoctorModal";
import DoctorScheduleModal from "@/components/admin/DoctorScheduleModal";
import AdminPageBar from "@/components/admin/AdminPageBar";

function DeleteDoctorButton({ doctor }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    let toastId;
    toastId = toast(
      <div>
        <p className="font-semibold text-slate-800 text-sm">Obrisati {doctor.name}?</p>
        <p className="text-xs text-slate-500 mt-0.5">Ova akcija je nepovratna.</p>
        <div className="flex gap-2 mt-3">
          <button
            className="flex-1 py-1.5 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => {
              toast.dismiss(toastId);
              startTransition(async () => {
                await removeDoctorAction(doctor.id, doctor.isCustom);
                toast.success(`${doctor.name} je uspešno obrisan.`);
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
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Obriši lekara"
      className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
    >
      {isPending ? (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      )}
    </button>
  );
}

export default function AdminDoctorsList({ allDoctors, appointments }) {
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [schedulingDoctor, setSchedulingDoctor] = useState(null);
  const doctorStats = allDoctors.map((d) => {
    const aptList = appointments.filter((a) => a.doctorId === d.id);
    return {
      ...d,
      totalAppointments: aptList.length,
      pendingAppointments: aptList.filter((a) => a.status === "pending").length,
    };
  });

  const customCount = allDoctors.filter((d) => d.isCustom).length;

  return (
    <>
      <AdminPageBar title="Lekari" />
      <div className="px-8 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            {allDoctors.length} lekara ukupno
            {customCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                +{customCount} ručno dodato
              </span>
            )}
          </p>
        </div>
        <Link
          href="/admin/doctors/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Dodaj lekara
        </Link>
      </div>

      {/* Tabela */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Lekar</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Specijalnost</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Iskustvo</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Ocena</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Pregledi</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Akcije</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {doctorStats.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${doc.gradient} flex items-center justify-center text-sm font-bold text-white shrink-0`}>
                        {doc.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSchedulingDoctor(doc)}
                            className="font-semibold text-slate-800 hover:text-blue-700 hover:underline transition-colors text-left"
                            title="Prikaži kalendar lekara"
                          >
                            {doc.name}
                          </button>
                          {doc.isCustom && (
                            <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded font-medium">novo</span>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs">
                          {doc.tags && doc.tags.length > 0 ? doc.tags.slice(0, 2).join(", ") : "—"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{doc.specialty}</td>
                  <td className="px-6 py-4 text-slate-500">{doc.experience}</td>
                  <td className="px-6 py-4">
                    {doc.rating === "N/A" ? (
                      <span className="text-slate-400 text-xs">Nema ocena</span>
                    ) : (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="font-semibold text-slate-800">{doc.rating}</span>
                        <span className="text-slate-400 text-xs">({doc.reviews})</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800">{doc.totalAppointments}</span>
                      {doc.pendingAppointments > 0 && (
                        <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                          {doc.pendingAppointments} čeka
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      doc.available
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${doc.available ? "bg-green-500" : "bg-slate-400"}`} />
                      {doc.available ? "Aktivan" : "Neaktivan"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSchedulingDoctor(doc)}
                        title="Prikaži kalendar"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setEditingDoctor(doc)}
                        title="Izmeni lekara"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <DeleteDoctorButton doctor={doc} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingDoctor && (
        <EditDoctorModal
          doctor={editingDoctor}
          onClose={() => setEditingDoctor(null)}
        />
      )}

      {schedulingDoctor && (
        <DoctorScheduleModal
          doctor={schedulingDoctor}
          appointments={appointments}
          onClose={() => setSchedulingDoctor(null)}
        />
      )}
      </div>
    </>
  );
}
