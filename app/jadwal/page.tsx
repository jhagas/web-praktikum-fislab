"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/loading";
import { mingguKuliah, rangeMinggu } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import TabelJadwal from "@/components/tabel-jadwal";
import ListMinggu from "@/components/minggu-list";

type Data =
  | {
      jadwal: any;
    }[]
  | null;

export default function Jadwal() {
  const supabase = createClientComponentClient();
  const { minggu } = mingguKuliah();
  const [selected, setSelected] = useState(minggu);

  const { awalMinggu, akhirMinggu } = rangeMinggu(selected);
  const monday = awalMinggu.toISOString();
  const sunday = akhirMinggu.toISOString();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("user_praktikum_linker")
        .select("jadwal, kelompok, profiles(full_name)")
        .eq("praktikum_role", "aslab")
        .gt("jadwal", monday)
        .lt("jadwal", sunday);
      setData(data);
    }
    fetchData();
  }, [monday, sunday]);

  if (!data) return <Loading />;

  return (
    <>
      <ListMinggu state={selected} setState={setSelected} minggu={minggu} />
      <TabelJadwal data={data} awalMinggu={awalMinggu} />
    </>
  );
}
