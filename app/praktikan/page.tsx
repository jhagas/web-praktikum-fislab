import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import { unique } from "@/lib/utils";
import Pekan from "../../components/pekan";
import ThisWeek from "../../components/this-week";
import Modul from "../../components/modul";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Credit from "../../components/credit";
import TabelPraktikan from "../../components/tabel-praktikan";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard Praktikan | Praktikum Fisika Laboratorium",
  description:
    "Dashboard Praktikan Pada Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const roleFetch = await supabase
    .from("user_praktikum_linker")
    .select("praktikum_role")
    .eq("id", user?.id);
  const roles: any = roleFetch.data
    ?.map((data) => data.praktikum_role)
    .filter(unique);

  if (!user || !roles.find((element: any) => element === "praktikan")) {
    redirect("/")
  }

  const { data } = await supabase
    .from("user_praktikum_linker")
    .select("*,praktikum(id,judul,matkul(id,modul_link))")
    .eq("id", user?.id)
    .eq("praktikum_role", "praktikan")
    .order("minggu", { ascending: true });

  const values: any = data?.map((data) => data.kelompok).filter(unique);

  const aslab = await supabase
    .from("user_praktikum_linker")
    .select("profiles(full_name,nrp,contact,avatar_url)")
    .in("kelompok", values)
    .eq("praktikum_role", "aslab")
    .order("minggu", { ascending: true });

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <Navbar
        nama={user?.user_metadata.full_name}
        nrp={user?.user_metadata.nrp}
        user={user}
        roles={roles}
      />
      <div className="px-3 py-6">
        <div className="md:table w-full flex flex-col gap-2 md:table-fixed md:border-separate md:border-spacing-x-4">
          <Pekan />
          <ThisWeek linker={data} />
        </div>
        <Modul data={data} />
        <div className="divider pt-6 pb-4 md:px-10 font-bold text-slate-900 opacity-80 infodash">
          DATA PRAKTIKUM
        </div>
        <div className="flex justify-center items-center rounded-xl gap-3 opacity-95 border-slate-400 border-solid mt-2">
          <AiOutlineInfoCircle className="text-blue-800 dark:text-blue-600" />
          <span className="text-sm infodash opacity-90">
            Klik hasil nilai untuk melihat detail nilai anda.
          </span>
        </div>
        <TabelPraktikan data={data} aslab={aslab} />
      </div>
      <Credit />
    </div>
  );
}
