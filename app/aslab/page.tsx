import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import { unique } from "@/lib/utils";
import { Metadata } from "next";
import Credit from "@/components/credit";
import Modul from "@/components/modul";
import Pekan from "@/components/pekan";
import ThisWeek from "@/components/this-week";
import TabelAslab from "@/components/tabel-aslab";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard Asisten | Praktikum Fisika Laboratorium",
  description:
    "Dashboard Asisten Pada Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export const dynamic = "force-dynamic";

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

  if (!user || !roles.find((element: any) => element === "aslab")) {
    redirect("/");
  }

  const { data } = await supabase
    .from("user_praktikum_linker")
    .select("*,praktikum(id,judul,matkul(id,modul_link))")
    .eq("id", user?.id)
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
        <div className="divider pt-6 pb-4 font-bold md:px-10 opacity-80 infodash ">
          KELOMPOK PRAKTIKUM
        </div>
        <TabelAslab data={data} />
      </div>
      <Credit />
    </div>
  );
}
