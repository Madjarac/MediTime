import { Geist } from "next/font/google";
import "./globals.css";
import PublicLayout from "@/components/PublicLayout";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_URL || "https://meditime.rs";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "MediTime — Zakazivanje lekarskih pregleda",
    template: "%s | MediTime",
  },
  description:
    "MediTime — brzo i jednostavno zakazivanje lekarskih pregleda online u Beogradu. Izaberite lekara, termin i zakažite za nekoliko sekundi.",
  keywords: [
    "zakazivanje pregleda",
    "lekar online",
    "meditime",
    "zdravlje",
    "beograd",
    "doktor",
    "ambulanta",
    "termin",
    "privatna klinika",
  ],
  authors: [{ name: "MediTime" }],
  creator: "MediTime",
  publisher: "MediTime",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: BASE_URL,
    siteName: "MediTime",
    title: "MediTime — Zakazivanje lekarskih pregleda",
    description:
      "Brzo i jednostavno zakazivanje lekarskih pregleda online u Beogradu.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MediTime — Zakazivanje lekarskih pregleda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediTime — Zakazivanje lekarskih pregleda",
    description:
      "Brzo i jednostavno zakazivanje lekarskih pregleda online u Beogradu.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sr" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800 font-sans">
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
