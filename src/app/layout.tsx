import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Yudha",
  title: "Yudha - Drilling Soal Dengan Cara Paling Seru",
  description:
    "Latihan tes kemampuan umum, duel PvP, analisis progres, dan simulasi wawancara AI untuk persiapan seleksi karier di Indonesia.",
  icons: {
    icon: "/icon-bar-yudha.svg",
    shortcut: "/icon-bar-yudha.svg",
    apple: "/icon-bar-yudha.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

