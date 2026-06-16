"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

function formatDate(dateStr) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NotificationBell({ appointments = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const pending = appointments.filter((a) => a.status === "pending");
  const count = pending.length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-center text-slate-500"
        aria-label="Obaveštenja"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>

        {count > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] px-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden">
          {/* Zaglavlje */}
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 text-sm">Obaveštenja</span>
              {count > 0 && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                  {count} na čekanju
                </span>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Zatvori"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {count === 0 ? (
            <div className="py-10 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl">✅</span>
              <p className="text-slate-500 text-sm font-medium">Nema novih zahteva</p>
              <p className="text-slate-400 text-xs">Svi pregledi su obrađeni</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
              {pending.map((apt) => (
                <li key={apt.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                      {apt.patientName?.[0]}{apt.patientSurname?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {apt.patientName} {apt.patientSurname}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {apt.doctorName} · {apt.specialty}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatDate(apt.date)} u {apt.time}h
                      </p>
                    </div>
                    <span className="shrink-0 w-2 h-2 rounded-full bg-amber-400 mt-2" />
                  </div>
                </li>
              ))}
            </ul>
          )}

          {count > 0 && (
            <div className="px-4 py-3 border-t border-slate-100">
              <Link
                href="/admin/appointments"
                onClick={() => setOpen(false)}
                className="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                Prikaži sve preglede →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
