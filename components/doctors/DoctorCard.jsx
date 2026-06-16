import Link from "next/link";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${doctor.color}`}
        >
          {doctor.initials}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 text-lg leading-tight">
            {doctor.name}
          </h3>
          <p className="text-blue-600 text-sm font-medium">{doctor.specialty}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {doctor.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-slate-500 text-sm leading-relaxed">{doctor.bio}</p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-400">{doctor.experience}</span>
        <Link
          href="/appointments"
          className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-full hover:bg-blue-800 transition-colors"
        >
          Zakaži
        </Link>
      </div>
    </div>
  );
}
