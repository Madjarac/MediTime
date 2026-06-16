import NotificationBell from "@/components/admin/NotificationBell";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminDashboardHeader({ appointments = [] }) {
  const today = new Date().toLocaleDateString("sr-RS", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-100 px-8 py-5">
      <div className="flex items-center justify-between">

        {/* Leva strana — pozdrav */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-bold text-slate-800">
            Dobro jutro, Admin 👋
          </h1>
          <p className="text-slate-400 text-sm capitalize">{today}</p>
        </div>

        {/* Desna strana — akcije */}
        <div className="flex items-center gap-3">
          {/* Pretraga */}
          <div className="relative hidden md:block">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder="Pretraži..."
              className="pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition w-56"
            />
          </div>

          {/* Obaveštenja */}
          <NotificationBell appointments={appointments} />

          {/* Profil i odjava */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-100">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-bold text-white">
                A
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-semibold text-slate-800 leading-none">
                  Administrator
                </span>
                <span className="text-xs text-slate-400 mt-0.5">
                  Super admin
                </span>
              </div>
            </div>
            <AdminLogoutButton variant="header" />
          </div>
        </div>
      </div>
    </header>
  );
}
