import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AvatarChangeFT } from "./avatar-first-time";

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
            Ubah Foto Profil
          </h1>
          <p className="py-3 infodash">Gunakan foto formal</p>
          <div className="py-4 w-full flex flex-col justify-center">
            <AvatarChangeFT />
          </div>
        </div>
      </div>
    </div>
  );
}
