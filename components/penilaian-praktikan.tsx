"use client";

import AvatarComp from "./avatar";
import { desc, hitungNilai } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";

type Props = {
  data: {
    id: any;
    kelompok: any;
    kode_praktikum: any;
    nilai: any;
    profiles: {
      full_name: any;
      nrp: any;
      avatar_url: any;
    };
  };
  index: number;
  info: {
    jadwal: any;
    kelompok: any;
    kode_praktikum: any;
    praktikum: {
      judul: any;
      matkul: any;
    };
  } | null;
  reexecute: () => void;
};

export default function PenilaianPraktikan({
  data,
  index,
  info,
  reexecute,
}: Props) {
  const [nilai, setNilai] = useState(data.nilai);
  const [safe, setSafe] = useState<boolean>();
  const [fetching, setFetching] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const aman = Object.keys(nilai)
      .map(
        (data) =>
          (nilai[data] < desc[data as keyof typeof desc].min ||
            nilai[data] > desc[data as keyof typeof desc].max) &&
          nilai[data as keyof typeof desc] !== 0
      )
      .find((d) => d === true);

    setSafe(aman);
  }, [nilai]);

  function handleChange(event: { target: { name: any; value: any } }) {
    const { name, value } = event.target;
    setNilai({ ...nilai, [name]: value });
  }

  async function onSetNilai(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFetching(true);
    const { error } = await supabase
      .from("user_praktikum_linker")
      .update({ nilai: nilai })
      .eq("id", data.id)
      .eq("kelompok", data.kelompok)
      .eq("kode_praktikum", data.kode_praktikum);

    if (!error) {
      setFetching(false);
      reexecute();
      document.getElementById(`penilaian${index}`)?.click();
    }
  }

  const options: any = {
    maximumFractionDigits: 2,
  };

  return (
    <div className="bg-slate-50 infodash dark:bg-zinc-800 shadow-md p-3 w-full rounded-lg min-w-min max-w-lg">
      <div className="flex flex-col items-center">
        <AvatarComp
          url={data.profiles.avatar_url}
          name={data.profiles.full_name}
          size={100}
        />
        <p className="font-bold mt-3">{data.profiles.full_name}</p>
        <p className="text-sm">{data.profiles.nrp}</p>
        <div className="divider opacity-60 mx-5 my-2 before:dark:bg-zinc-700 after:dark:bg-zinc-700"></div>
        <div className="stat text-center py-1">
          <div className="stat-title dark:text-zinc-300">Nilai Akhir</div>
          <div className="stat-value">
            {hitungNilai(data.nilai).toLocaleString(options)}
          </div>
        </div>
        <label
          htmlFor={`penilaian${index}`}
          className="btn btn-sm mt-3 btn-outline"
        >
          UBAH NILAI
        </label>
        <input
          type="checkbox"
          id={`penilaian${index}`}
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box max-w-2xl">
            <div>
              <h3 className="font-bold text-lg">{data.profiles.full_name}</h3>
              <span className="badge badge-ghost badge-sm font-semibold bg-orange-200 dark:bg-orange-900">
                {data.profiles.nrp}
              </span>{" "}
              <span className="badge badge-ghost font-semibold badge-sm bg-fuchsia-200 dark:bg-fuchsia-900">
                {info?.kelompok}
              </span>{" "}
              <span className="badge badge-ghost font-semibold badge-sm bg-green-200 dark:bg-green-900">
                Kode {info?.kode_praktikum}
              </span>
            </div>
            <p className="font-semibold text-lg mt-3">
              Nilai Akhir : {hitungNilai(nilai).toLocaleString(options)}
            </p>
            <form className="mt-4" onSubmit={onSetNilai}>
              <div className="flex gap-2 flex-wrap justify-center">
                {Object.keys(nilai).map((data, index) => {
                  const aman =
                    (nilai[data] < desc[data as keyof typeof desc].min ||
                      nilai[data] > desc[data as keyof typeof desc].max) &&
                    nilai[data as keyof typeof desc] !== 0;
                  return (
                    <div key={index} className="min-w-min max-w-[17rem] w-full">
                      <label className="label-text infodash">
                        {desc[data as keyof typeof desc].nama}{" "}
                        <div className="inline whitespace-nowrap">
                          <span className="badge badge-ghost badge-sm bg-green-200 dark:bg-teal-800">
                            {desc[data as keyof typeof desc].bobot}
                          </span>{" "}
                          <span className="badge badge-ghost badge-sm bg-fuchsia-200 dark:bg-fuchsia-800">
                            {desc[data as keyof typeof desc].min}-
                            {desc[data as keyof typeof desc].max}
                          </span>
                        </div>
                      </label>
                      <input
                        type="number"
                        min={desc[data as keyof typeof desc].min}
                        max={desc[data as keyof typeof desc].max}
                        name={data}
                        placeholder={data}
                        value={nilai[data]}
                        onChange={handleChange}
                        className="input input-bordered w-full border-slate-300 focus:border-slate-500 focus:outline-none dark:bg-zinc-700 dark:border-zinc-500 focus:dark:border-zinc-300 dark:text-zinc-100 input-sm"
                      />
                      <p className="text-red-600 text-sm font-medium">
                        {aman ? "Masukan tidak sesuai" : null}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="modal-action">
                {JSON.stringify(nilai) === JSON.stringify(data.nilai) ||
                safe ? (
                  <label htmlFor={`penilaian${index}`} className="btn">
                    Batal
                  </label>
                ) : (
                  <>
                    <label
                      htmlFor={`penilaian${index}`}
                      className="btn"
                      onClick={() => setNilai(data.nilai)}
                    >
                      Batal
                    </label>
                    {fetching ? (
                      <button className="btn">
                        <ImSpinner2 className="animate-spin" />
                      </button>
                    ) : (
                      <label htmlFor={`penilaian${index}`}>
                        <button type="submit" className="btn">
                          Selesai
                        </button>
                      </label>
                    )}
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
