import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yudha - Drilling Soal Dengan Cara Paling Seru",
  description:
    "Jawab soal, serang lawan, menang duel—semua bisa kamu lakukan kapan pun dan di mana pun.",
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

