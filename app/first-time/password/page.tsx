import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Password  from "./password-first-time";
import AvatarComp from "@/components/avatar";

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

  let { data } = await supabase
    .from("profiles")
    .select("ischanged, avatar_url")
    .eq("id", user?.id)
    .single();

  return (
    <div className="hero min-h-screen bg-base-200 dark:bg-zinc-900">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <div className="py-4 w-full flex flex-col justify-center">
            <div className="mx-auto">
              <AvatarComp
                name={user.user_metadata.full_name}
                size={100}
                url={data?.avatar_url}
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold infodash">
            Ubah Kata Sandi
          </h1>
          <p className="py-3 infodash">
            Buat setidaknya 8 karakter dengan kombinasi huruf besar, kecil,
            angka dan tanda baca
          </p>
          <div className="py-4 w-full flex flex-col justify-center">
            <Password user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
