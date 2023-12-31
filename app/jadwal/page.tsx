import Credit from "@/components/credit";
import Navbar from "@/components/navbar";
import { mingguKuliah, unique } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Jadwal from "./component";
import { redirect } from "next/navigation";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const { minggu } = mingguKuliah();

  const selected =
    typeof searchParams["week"] === "string"
      ? parseInt(searchParams["week"])
      : minggu;

  return {
    title: `Okupansi Lab Minggu Perkuliahan Ke-${selected} | Praktikum Fisika Laboratorium`,
    description:
      "Halaman Untuk melihat keterisian laboratorium pada laman web Praktikum Fisika Laboratorium, Departemen Fisika, Institut Teknologi Sepuluh Nopember",
  };
}

export const dynamic = "force-dynamic";

export default async function Layout({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const roleFetch = await supabase
    .from("user_praktikum_linker")
    .select("praktikum_role")
    .eq("id", user?.id);
  const roles: any = roleFetch.data
    ?.map((data) => data.praktikum_role)
    .filter(unique);

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <Navbar
        nama={user?.user_metadata.full_name}
        nrp={user?.user_metadata.nrp}
        user={user}
        roles={roles}
      />
      <div className="px-3 py-6">
        <Jadwal searchParams={searchParams} />
      </div>
      <Credit />
    </div>
  );
}
