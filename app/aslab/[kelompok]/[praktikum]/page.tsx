"use client";

import { sortStringArray } from "@/lib/utils";
import PilihanWaktu from "@/components/pilih-waktu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PenilaianPraktikan from "@/components/penilaian-praktikan";

type Praktikan = {
  id: any;
  kelompok: any;
  kode_praktikum: any;
  nilai: any;
  profiles: {
    full_name: any;
    nrp: any;
    avatar_url: any;
  };
}[] | null;

type Data = {
  jadwal: any;
  kelompok: any;
  kode_praktikum: any;
  praktikum: {
    judul: any;
    matkul: any;
  };
} | null;

export default function Main() {
  const pathname = usePathname();
  const kelompok = pathname.split("/")[2];
  const praktikum = pathname.split("/")[3];

  const [data, setData] = useState<Data>(null);
  const [praktikan, setPraktikan] = useState<Praktikan>();
  const [trigger, setTrigger] = useState(false);
  const [triggerNilai, setTriggerNilai] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data }: { data: Data } = await supabase
        .from("user_praktikum_linker")
        .select("jadwal")
        .eq("id", user?.id)
        .eq("praktikum_role", "aslab")
        .eq("kelompok", kelompok)
        .eq("kode_praktikum", praktikum)
        .single();
      setData(data);
    }
    fetchData();
  }, [trigger]);

  useEffect(() => {
    async function fetchData() {
      const { data }: any = await supabase
        .from("user_praktikum_linker")
        .select(
          "id, kelompok, kode_praktikum, nilai, profiles(full_name, nrp, avatar_url)"
        )
        .order("nrp", { foreignTable: "profiles", ascending: false })
        .eq("praktikum_role", "praktikan")
        .eq("kelompok", kelompok)
        .eq("kode_praktikum", praktikum);

      setPraktikan(data);
    }
    fetchData();
  }, [triggerNilai]);

  praktikan?.sort(sortStringArray);

  return (
    <>
      <PilihanWaktu
        kelompok={kelompok}
        praktikum={praktikum}
        data={data}
        trigger={setTrigger}
      />
      <div className="divider pt-6 pb-4 md:px-10 font-bold text-slate-900 opacity-80 infodash">
        PENILAIAN PRAKTIKUM
      </div>
      <div className="flex gap-4 mt-7 flex-wrap justify-center items-center">
        {praktikan?.map((datas, index) => (
          <PenilaianPraktikan
            key={index}
            index={index}
            data={datas}
            info={data}
            reexecute={() => {
              setTriggerNilai((state) => !state);
            }}
          />
        ))}
      </div>
    </>
  );
}
