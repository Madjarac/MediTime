import { getAppointments, getActiveDoctors } from "@/lib/db";

export default function AdminStatsCards() {
  const appointments = getAppointments();
  const allDoctors = getActiveDoctors();

  const today = new Date().toISOString().split("T")[0];
  const todayApts = appointments.filter((a) => a.date === today);
  const pending = appointments.filter((a) => a.status === "pending");
  const cancelled = appointments.filter((a) => a.status === "rejected" || a.status === "cancelled");
  const activeDoctors = allDoctors.filter((d) => d.available).length;

  const stats = [
    {
      label: "Ukupno pregleda",
      value: appointments.length.toLocaleString("sr-RS"),
      change: "svi zakazani termini",
      positive: null,
      icon: "📅",
      iconBg: "bg-blue-100 text-blue-700",
      border: "border-blue-100",
    },
    {
      label: "Pregledi danas",
      value: String(todayApts.length),
      change: `${today}`,
      positive: todayApts.length > 0 ? true : null,
      icon: "🗓️",
      iconBg: "bg-cyan-100 text-cyan-700",
      border: "border-cyan-100",
    },
    {
      label: "Na čekanju",
      value: String(pending.length),
      change: "čekaju potvrdu",
      positive: null,
      icon: "⏳",
      iconBg: "bg-amber-100 text-amber-700",
      border: "border-amber-100",
    },
    {
      label: "Odbijeni",
      value: String(cancelled.length),
      change: "odbijeni zahtevi",
      positive: cancelled.length === 0 ? true : false,
      icon: "❌",
      iconBg: "bg-red-100 text-red-600",
      border: "border-red-100",
    },
    {
      label: "Aktivni lekari",
      value: String(activeDoctors),
      change: `od ${allDoctors.length} ukupno`,
      positive: null,
      icon: "👨‍⚕️",
      iconBg: "bg-teal-100 text-teal-700",
      border: "border-teal-100",
    },
    {
      label: "Lekari sa pregledima",
      value: String(new Set(appointments.map((a) => a.doctorId)).size),
      change: "imaju zakazane termine",
      positive: null,
      icon: "🩺",
      iconBg: "bg-indigo-100 text-indigo-700",
      border: "border-indigo-100",
    },
  ];

  return (
    <div className="px-8 pt-8 pb-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-slate-700">Pregled statistike</h2>
        <span className="text-xs text-slate-400">Podaci u realnom vremenu</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-white rounded-2xl border ${stat.border} shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${stat.iconBg}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-xs text-slate-400 font-medium truncate">{stat.label}</p>
              <p className="text-2xl font-extrabold text-slate-800 leading-none mt-0.5">
                {stat.value}
              </p>
              <p className={`text-xs font-medium mt-1 ${
                stat.positive === true
                  ? "text-green-600"
                  : stat.positive === false
                  ? "text-red-500"
                  : "text-slate-400"
              }`}>
                {stat.positive === true && "↑ "}
                {stat.positive === false && "↓ "}
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
