import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "./navbar";
import AvatarComp from "@/components/avatar";
import { AvatarChange } from "@/components/avatar-crop";
import { GoPencil } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import "./main.css";
import Password from "@/components/password";
import Dark from "./dark";

export const metadata: Metadata = {
  title: "Pengaturan Akun | Praktikum Fisika Laboratorium",
  description:
    "Pengaturan akun pengguna Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
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
    .select("nrp, avatar_url")
    .eq("id", user?.id)
    .single();

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <Navbar />
      <div className="flex flex-col items-center max-w-lg py-6 px-2 mx-auto">
        <div>
          <AvatarComp
            url={data?.avatar_url}
            name={user?.user_metadata.full_name}
            size={150}
          />
          <label htmlFor="ppChange" className="pen">
            <GoPencil />
          </label>
        </div>
        <div className="join join-vertical gap-[2px] rounded-2xl  w-full shadow-md">
          <div className="join-item data">
            <p className="font-bold">Nama</p>
            <p className="text-center">{user?.user_metadata.full_name}</p>
          </div>
          <div className="join-item data">
            <p className="font-bold">NRP</p>
            <p className="text-center">{data?.nrp}</p>
          </div>
          <div className="join-item data">
            <p className="font-bold">User ID</p>
            <p className="text-center">{user?.id}</p>
          </div>
          <label className="join-item data2 hover" htmlFor="passwordChange">
            <div className="pass">
              <p className="font-bold">Password</p>
              <p className="text-center">•••••••</p>
            </div>
            <IoIosArrowForward className="w-5 sm:ml-2" />
          </label>
          <Dark />
        </div>
      </div>
      <AvatarChange />
      <Password user={user} />
    </div>
  );
}
