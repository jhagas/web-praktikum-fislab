import ThemeProvider from "@/components/providers/theme";
import "./globals.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memuat...",
  description:
    "Halaman Loading laman web Praktikum Fisika Laboratorium",
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
