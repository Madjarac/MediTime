const appointments = [
  {
    id: "001",
    patient: "Marko Petrović",
    doctor: "Dr. Ana Petrović",
    specialty: "Kardiolog",
    date: "23.04.2026.",
    time: "09:00",
    status: "confirmed",
  },
  {
    id: "002",
    patient: "Jovana Simić",
    doctor: "Dr. Marko Nikolić",
    specialty: "Neurolog",
    date: "23.04.2026.",
    time: "10:30",
    status: "pending",
  },
  {
    id: "003",
    patient: "Nikola Jovanović",
    doctor: "Dr. Jelena Jović",
    specialty: "Dermatolog",
    date: "23.04.2026.",
    time: "11:00",
    status: "confirmed",
  },
  {
    id: "004",
    patient: "Milena Đurić",
    doctor: "Dr. Ivan Lazić",
    specialty: "Psihijatar",
    date: "24.04.2026.",
    time: "14:00",
    status: "cancelled",
  },
  {
    id: "005",
    patient: "Stefan Ristić",
    doctor: "Dr. Stefan Vuković",
    specialty: "Ortoped",
    date: "24.04.2026.",
    time: "15:30",
    status: "pending",
  },
];

const statusConfig = {
  confirmed: { label: "Potvrđen", className: "bg-green-100 text-green-700" },
  pending: { label: "Na čekanju", className: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Otkazan", className: "bg-red-100 text-red-600" },
};

export default function AppointmentsTable() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">
          Nadolazeći pregledi
        </h2>
        <button className="text-sm text-blue-700 font-medium hover:underline">
          Vidi sve →
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Pacijent
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Lekar
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Vreme
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {appointments.map((a) => {
                const status = statusConfig[a.status];
                return (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {a.patient}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-700">{a.doctor}</div>
                      <div className="text-slate-400 text-xs">{a.specialty}</div>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{a.date}</td>
                    <td className="px-5 py-4 text-slate-600">{a.time}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                        Detalji
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
