import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import { unique } from "@/lib/utils";
import Redirect from "@/components/redirect";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penilaian | Praktikum Fisika Laboratorium",
  description:
    "Dashboard Asisten Pada Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("user_praktikum_linker")
    .select("praktikum_role")
    .eq("id", user?.id);
  const roles: any = data?.map((data) => data.praktikum_role).filter(unique);

  if (!user || !roles.find((element: any) => element === "aslab")) {
    return <Redirect to="/" />
  }

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <Navbar
        nama={user?.user_metadata.full_name}
        nrp={user?.user_metadata.nrp}
        user={user}
        roles={roles}
      />
    </div>
  );
}
