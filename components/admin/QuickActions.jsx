import Link from "next/link";
import { getAppointments } from "@/lib/db";

const alerts = [
  {
    type: "info",
    icon: "📅",
    message: "Kalendar pregleda po lekaru",
    action: "Otvori",
    href: "/admin/appointments",
    style: "bg-blue-50 border-blue-200 text-blue-800",
    btnStyle: "text-blue-700 hover:bg-blue-100",
  },
  {
    type: "success",
    icon: "✅",
    message: "Svi sistemi rade normalno",
    action: null,
    href: null,
    style: "bg-green-50 border-green-200 text-green-800",
    btnStyle: "",
  },
];

export default function QuickActions() {
  const appointments = getAppointments();
  const pending = appointments.filter((a) => a.status === "pending");
  const today = new Date().toISOString().split("T")[0];
  const todayApts = appointments.filter((a) => a.date === today);

  const dynamicAlerts = [
    ...(pending.length > 0
      ? [{
          type: "warning",
          icon: "⏳",
          message: `${pending.length} ${pending.length === 1 ? "pregled čeka potvrdu" : "pregleda čekaju potvrdu"}`,
          action: "Pregledaj",
          href: "/admin/appointments",
          style: "bg-amber-50 border-amber-200 text-amber-800",
          btnStyle: "text-amber-700 hover:bg-amber-100",
        }]
      : []),
    ...alerts,
  ];

  return (
    <div className="px-8 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Brze akcije */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 mb-5">Brze akcije</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/appointments"
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all bg-blue-700 hover:bg-blue-800 text-white shadow-md shadow-blue-200"
            >
              <span className="text-2xl shrink-0">📅</span>
              <div>
                <p className="font-semibold text-sm leading-none">Pregledi</p>
                <p className="text-xs mt-1 text-blue-200">Kalendar termina po lekaru</p>
              </div>
            </Link>

            <Link
              href="/admin/doctors"
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
            >
              <span className="text-2xl shrink-0">👨‍⚕️</span>
              <div>
                <p className="font-semibold text-sm leading-none">Lekari</p>
                <p className="text-xs mt-1 text-slate-400">Pregled svih lekara</p>
              </div>
            </Link>

            <Link
              href="/appointments"
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
            >
              <span className="text-2xl shrink-0">➕</span>
              <div>
                <p className="font-semibold text-sm leading-none">Novi pregled</p>
                <p className="text-xs mt-1 text-slate-400">Otvori stranicu zakazivanja</p>
              </div>
            </Link>

            <Link
              href="/doctors"
              className="flex items-center gap-4 px-5 py-4 rounded-xl transition-all bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm"
            >
              <span className="text-2xl shrink-0">🔍</span>
              <div>
                <p className="font-semibold text-sm leading-none">Pretraga lekara</p>
                <p className="text-xs mt-1 text-slate-400">Javna stranica sa lekarima</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sistemska obaveštenja */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="font-bold text-slate-800 mb-5">Obaveštenja</h2>
          <div className="flex flex-col gap-3">
            {dynamicAlerts.map((alert) => (
              <div
                key={alert.message}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-sm ${alert.style}`}
              >
                <span className="text-base shrink-0 mt-0.5">{alert.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm leading-snug">{alert.message}</p>
                  {alert.action && alert.href && (
                    <Link
                      href={alert.href}
                      className={`text-xs font-semibold mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg transition-colors ${alert.btnStyle}`}
                    >
                      {alert.action} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Pregledi danas
              </p>
              <span className="text-xs font-bold text-blue-700">{todayApts.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                style={{ width: todayApts.length > 0 ? `${Math.min((todayApts.length / 20) * 100, 100)}%` : "0%" }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {todayApts.length} {todayApts.length === 1 ? "zakazani pregled" : "zakazanih pregleda"} danas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
