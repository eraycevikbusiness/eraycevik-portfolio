import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/lib/i18n";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Eray Kaan Cevik — Developer",
  description: "Portfolio von Eray Kaan Cevik — Lernender Informatiker EFZ bei Digitec, Full Stack Developer, Creator von MudForge.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="min-h-screen bg-black text-white">
        <LanguageProvider>
          {/* Fixed top violet glow */}
          <div
            className="pointer-events-none fixed inset-x-0 top-0 z-1 h-[60vh] opacity-60"
            style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(167,139,250,0.10), transparent 60%)" }}
          />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
