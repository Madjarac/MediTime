import { getAppointments } from "@/lib/db";

const statusConfig = {
  confirmed: { label: "Zakazano",   className: "bg-green-100 text-green-700",  dot: "bg-green-500" },
  pending:   { label: "Na čekanju", className: "bg-amber-100 text-amber-700",  dot: "bg-amber-400" },
  rejected:  { label: "Odbijen",    className: "bg-red-100 text-red-600",      dot: "bg-red-400" },
  cancelled: { label: "Otkazan",    className: "bg-slate-100 text-slate-500",  dot: "bg-slate-300" },
};

export default function RecentAppointments() {
  const all = getAppointments();
  const recent = [...all]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="px-8 py-4">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-800">Nedavni pregledi</h2>
            <p className="text-slate-400 text-xs mt-0.5">
              Poslednjih {recent.length} zakazanih pregleda · {all.length} ukupno
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/appointments"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              Vidi sve →
            </a>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/70">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Pacijent</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Lekar</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Vreme</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recent.map((a) => {
                const s = statusConfig[a.status] || statusConfig.pending;
                const initials = `${a.patientName?.[0] || "?"}${a.patientSurname?.[0] || ""}`;
                const dateFormatted = new Date(a.date + "T00:00:00").toLocaleDateString("sr-RS", {
                  day: "numeric", month: "numeric", year: "numeric",
                });
                return (
                  <tr key={a.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono text-slate-400">{a.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {initials}
                        </div>
                        <span className="font-medium text-slate-800">
                          {a.patientName} {a.patientSurname}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-700 text-sm">{a.doctorName}</p>
                      <p className="text-slate-400 text-xs">{a.specialty}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{dateFormatted}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-700 text-sm">{a.time}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.className}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Prikazano {recent.length} od {all.length} pregleda
          </p>
          <a
            href="/admin/appointments"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Kompletan kalendar →
          </a>
        </div>
      </div>
    </div>
  );
}
