import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info traka */}
      <div className="hidden sm:block bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <p className="text-xs text-blue-100">
            🏥 Zakazivanje pregleda online — brzo i jednostavno
          </p>
          <div className="flex items-center gap-5">
            <a
              href="tel:+38111000000"
              className="flex items-center gap-1.5 text-xs text-blue-100 hover:text-white transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.338c0 7.518 6.884 13.41 14.4 14.088a.75.75 0 0 0 .808-.52l1.528-4.084a.75.75 0 0 0-.43-.922l-2.25-.938a.75.75 0 0 0-.88.294l-.692 1.021C12.5 14 9.625 11 8.23 8.469l1.02-.692a.75.75 0 0 0 .295-.88l-.938-2.25a.75.75 0 0 0-.921-.43L3.6 5.745a.75.75 0 0 0-.52.808c.02.263.046.525.077.785Z" />
              </svg>
              +381 11 000 000
            </a>
            <a
              href="mailto:info@meditime.rs"
              className="flex items-center gap-1.5 text-xs text-blue-100 hover:text-white transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              info@meditime.rs
            </a>
            <span className="text-xs text-blue-200">
              Pon–Pet 08–20h
            </span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="bg-white border-b border-slate-100 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <Navbar />
        </div>
      </div>
    </header>
  );
}
