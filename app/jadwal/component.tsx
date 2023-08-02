import { mingguKuliah, rangeMinggu } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import TabelJadwal from "@/components/tabel-jadwal";
import ListMinggu from "@/components/minggu-list";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Jadwal({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const supabase = createServerComponentClient({ cookies });
  const { minggu } = mingguKuliah();

  const selected =
    typeof searchParams["week"] === "string"
      ? parseInt(searchParams["week"])
      : minggu;

  const { awalMinggu, akhirMinggu } = rangeMinggu(selected);
  const monday = awalMinggu.toISOString();
  const sunday = akhirMinggu.toISOString();

  const { data } = await supabase
    .from("user_praktikum_linker")
    .select("jadwal, kelompok, profiles(full_name)")
    .eq("praktikum_role", "aslab")
    .gt("jadwal", monday)
    .lt("jadwal", sunday);

  return (
    <>
      <ListMinggu state={selected} minggu={minggu} />
      <TabelJadwal data={data} awalMinggu={awalMinggu} />
    </>
  );
}
