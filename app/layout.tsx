import ThemeProvider from "@/components/providers/theme";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

const font = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://praktikum-fisika.site"),
  title: "Praktikum Fisika Laboratorium",
  openGraph: {
    type: "website",
    url: "https://praktikum-fisika.site",
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
    <html lang="id" className={font.className}>
      <body>
        <main className="min-h-screen">
          <ThemeProvider>{children}</ThemeProvider>
          <Analytics />
        </main>
      </body>
    </html>
  );
}
