"use client";

import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminPageBar({ title }) {
  return (
    <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between gap-4">
      <h1 className="text-lg font-bold text-slate-800">{title}</h1>
      <AdminLogoutButton variant="header" />
    </header>
  );
}
