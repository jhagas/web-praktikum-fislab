import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Laman Tidak Ditemukan | Praktikum Fisika Laboratorium',
  description:
    'Laman yang anda cari tidak ditemukan',
};

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-center infodash dark:bg-zinc-900">
      <p className="font-bold text-2xl text-red-700 dark:text-red-500">Oups!</p>
      <p className="font-black text-7xl text-red-700 dark:text-red-500">404</p>
      <div className="flex justify-center items-center gap-1 mt-2 flex-wrap">
        <p>Laman tidak ditemukan</p>
      </div>
    </div>
  );
}