import DoctorCard from "@/components/doctors/DoctorCard";

const doctors = [
  {
    name: "Dr. Ana Petrović",
    specialty: "Kardiolog",
    experience: "12 godina iskustva",
    initials: "AP",
    color: "bg-blue-100 text-blue-700",
    tags: ["Srce", "EKG", "Holter"],
    bio: "Specijalista kardiovaskularne medicine sa dugogodišnjim iskustvom u dijagnostici i lečenju bolesti srca.",
  },
  {
    name: "Dr. Marko Nikolić",
    specialty: "Neurolog",
    experience: "9 godina iskustva",
    initials: "MN",
    color: "bg-cyan-100 text-cyan-700",
    tags: ["Migrena", "Epilepsija", "EEG"],
    bio: "Neurolog fokusiran na dijagnostiku i tretman neuroloških poremećaja, sa posebnim interesom za migrenu.",
  },
  {
    name: "Dr. Jelena Jović",
    specialty: "Dermatolog",
    experience: "7 godina iskustva",
    initials: "JJ",
    color: "bg-teal-100 text-teal-700",
    tags: ["Akne", "Ekcem", "Dermatoskopija"],
    bio: "Dermatolog sa specijalizacijom u oblasti kozmetičke dermatologije i lečenja hroničnih kožnih bolesti.",
  },
  {
    name: "Dr. Stefan Vuković",
    specialty: "Ortoped",
    experience: "11 godina iskustva",
    initials: "SV",
    color: "bg-indigo-100 text-indigo-700",
    tags: ["Kičma", "Koleno", "Sport"],
    bio: "Ortopedski hirurg specijalizovan za sportske povrede i degenerativne bolesti zglobova.",
  },
  {
    name: "Dr. Milica Đorđević",
    specialty: "Internista",
    experience: "14 godina iskustva",
    initials: "MĐ",
    color: "bg-rose-100 text-rose-700",
    tags: ["Dijabetes", "Hipertenzija", "Preventiva"],
    bio: "Internista sa fokusom na preventivnu medicinu, dijabetes i metaboličke poremećaje.",
  },
  {
    name: "Dr. Ivan Lazić",
    specialty: "Psihijatar",
    experience: "8 godina iskustva",
    initials: "IL",
    color: "bg-purple-100 text-purple-700",
    tags: ["Anksioznost", "Depresija", "Terapija"],
    bio: "Psihijatar sa integrativnim pristupom lečenju mentalnog zdravlja i dugogodišnjom kliničkom praksom.",
  },
];

export default function DoctorsList() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Svi lekari ({doctors.length})
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Pronađite pravog lekara za vaše potrebe
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}
