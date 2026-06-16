"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

const menuItems = [
  { href: "/admin", icon: "📊", label: "Dashboard", exact: true },
  { href: "/admin/appointments", icon: "📅", label: "Pregledi" },
  { href: "/admin/doctors", icon: "👨‍⚕️", label: "Lekari" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href, exact) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-64 shrink-0 bg-slate-900 min-h-screen flex flex-col">
      <div className="px-6 py-6 border-b border-slate-800">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Medi<span className="text-cyan-400">Time</span>
          <span className="ml-2 text-xs text-slate-400 font-normal">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-6 flex flex-col gap-1">
        {menuItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-5 border-t border-slate-800">
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
