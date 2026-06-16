const stats = [
  {
    label: "Ukupno pregleda",
    value: "1,248",
    change: "+12%",
    positive: true,
    icon: "📅",
  },
  {
    label: "Pregledi danas",
    value: "24",
    change: "+3 od juče",
    positive: true,
    icon: "🗓️",
  },
  {
    label: "Aktivni lekari",
    value: "18",
    change: "od 50 ukupno",
    positive: null,
    icon: "👨‍⚕️",
  },
  {
    label: "Na čekanju",
    value: "7",
    change: "-2 od juče",
    positive: false,
    icon: "⏳",
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Pregled aktivnosti sistema — danas
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-3xl font-extrabold text-slate-800">
              {stat.value}
            </p>
            <p
              className={`text-xs font-medium ${
                stat.positive === true
                  ? "text-green-600"
                  : stat.positive === false
                  ? "text-red-500"
                  : "text-slate-400"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
