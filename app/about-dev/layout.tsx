import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Admin | Praktikum Fisika Laboratorium",
  description:
    "Bantuan Admin Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 px-4 h-screen transition-colors duration-300">
      {children}
    </div>
  );
}
