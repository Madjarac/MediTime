export default function PrivacyHero() {
  return (
    <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full text-sm font-medium mb-6">
          🔒 Zaštita podataka
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5">
          Politika privatnosti
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
          Vaša privatnost nam je prioritet. Saznajte kako prikupljamo, čuvamo i
          koristimo vaše lične podatke u skladu sa GDPR regulativom i
          zakonodavstvom Republike Srbije.
        </p>
        <p className="text-blue-300 text-sm mt-6">
          Poslednje ažuriranje: 1. januar 2026.
        </p>
      </div>
    </section>
  );
}
