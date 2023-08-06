import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = {
  title: "First Time Setup | Praktikum Fisika Laboratorium",
  description:
    "Setelan awal pengguna Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-zinc-900">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold dark:text-fuchsia-500 text-fuchsia-800">
            Pengaturan Akun
          </h1>
          <p className="py-6 infodash">
            Selamat datang di aplikasi web penjadwalan dan penilaian praktikum
            Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh
            Nopember
          </p>
          <Link href="/first-time/pp" className="btn btn-primary">Mulai Penyetelan</Link>
        </div>
      </div>
    </div>
  );
}
