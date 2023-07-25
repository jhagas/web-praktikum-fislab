import ThemeProvider from "@/components/providers/theme";
import "./globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Praktikum Fisika Laboratorium",
  openGraph: {
    type: "website",
    url: "https://praktikum-fisika.site/",
    title: "Praktikum Fisika Laboratorium, Fisika ITS",
    description: "Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
    siteName: "Praktikum Fisika Laboratorium",
    images: [{
      url: "/assets/og.png",
    }],
  },
  description:
    "Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
  icons: "/assets/favicon.ico", 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          <ThemeProvider>{children}</ThemeProvider>
        </main>
      </body>
    </html>
  );
}
