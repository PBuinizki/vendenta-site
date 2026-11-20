import type { Metadata } from "next";
import { Manrope, Golos_Text, JetBrains_Mono } from "next/font/google";
import { getClinicData } from "@/lib/clinic";
import { BookingProvider } from "@/components/BookingContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const golos = Golos_Text({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-golos",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const clinic = await getClinicData();
  return {
    title: `${clinic.name} — ${clinic.legalSubtitle} в г. ${clinic.city}`,
    description: `${clinic.legalSubtitle} ${clinic.name}, ${clinic.contacts.addressShort}. КТ и ОПТГ на месте, взрослый и детский прием. Рейтинг ${clinic.rating.score} (${clinic.rating.votes} оценка). Тел: ${clinic.contacts.phone}.`,
    openGraph: {
      title: `${clinic.name} — ${clinic.legalSubtitle} (${clinic.city})`,
      description: clinic.heroLead,
      locale: "ru_RU",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clinic = await getClinicData();
  const serviceOptions = [
    ...clinic.services.map((s) => s.title),
    ...clinic.doctors.map((d) => `Прием у врача: ${d.name}`),
  ];

  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${golos.variable} ${jetbrains.variable} scroll-smooth`}
    >
      <body className="bg-[#FAF9F7] text-[#121212] antialiased selection:bg-[#C41625] selection:text-white">
        <BookingProvider
          phone={clinic.contacts.phone}
          phoneHref={clinic.contacts.phoneHref}
          whatsappHref={clinic.contacts.whatsappHref}
          address={clinic.contacts.addressShort}
          serviceOptions={serviceOptions}
        >
          {children}
        </BookingProvider>
      </body>
    </html>
  );
}
