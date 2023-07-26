import ThemeProvider from "@/components/providers/theme";
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Praktikum Fisika Laboratorium",
  openGraph: {
    type: "website",
    url: "https://fislab-its.site/",
    title: "Praktikum Fisika Laboratorium, Fisika ITS",
    description:
      "Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
    siteName: "Praktikum Fisika Laboratorium",
  },
  description:
    "Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={inter.className}>
      <body>
        <main className="min-h-screen">
          <ThemeProvider>{children}</ThemeProvider>
          <Analytics />
        </main>
      </body>
    </html>
  );
}
