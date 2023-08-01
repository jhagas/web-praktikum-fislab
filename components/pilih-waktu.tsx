"use-client";

import Datetime from "react-datetime";
import "./react-datetime.css";
import { Dispatch, SetStateAction, useState } from "react";
import { changeTimeZone, convertTime, saturday, weekdays } from "@/lib/utils";
import Loading from "./loading";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DateFormatter from "./date-formatter";
import { formatInTimeZone } from "date-fns-tz";
import { subDays } from "date-fns";

type Params = {
  kelompok: string;
  praktikum: string;
  data: Data;
  trigger: Dispatch<SetStateAction<boolean>>;
};

type Data = {
  jadwal: any;
  kelompok: any;
  kode_praktikum: any;
  praktikum: {
    judul: any;
    matkul: any;
  };
} | null;

export default function PilihanWaktu({
  kelompok,
  praktikum,
  data,
  trigger,
}: Params) {
  const supabase = createClientComponentClient();

  const currentDate = data?.jadwal
    ? changeTimeZone(new Date(data?.jadwal + "-0000"), "Asia/Jakarta")
    : changeTimeZone(new Date(), "Asia/Jakarta");

  const timeSelected = data?.jadwal
    ? formatInTimeZone(data?.jadwal + "-0000", "Asia/Jakarta", "HH:mm")
    : "23:00";

  const [selected, setSelected] = useState(currentDate);
  const [hours, setHours] = useState(timeSelected);
  const [restrict, setRestrict] = useState<any>();

  useEffect(() => {
    async function getRestricted() {
      const { data } = await supabase.rpc("dup_jadwal");
      setRestrict(data);
    }
    getRestricted();
  }, [data, supabase]);

  const send = changeTimeZone(
    new Date(
      formatInTimeZone(
        selected,
        "Asia/Jakarta",
        "yyyy-MM-dd'T'" + hours + "':00'"
      )
    ),
    "Asia/Jakarta"
  ).toISOString();

  async function onSetJadwal() {
    await supabase
      .from("user_praktikum_linker")
      .update({ jadwal: send })
      .eq("kelompok", kelompok)
      .eq("kode_praktikum", praktikum);

    trigger((state) => !state);
  }

  async function onHapusJadwal() {
    await supabase
      .from("user_praktikum_linker")
      .update({ jadwal: null })
      .eq("kelompok", kelompok)
      .eq("kode_praktikum", praktikum);

    trigger((state) => !state);
  }

  const yesterday = subDays(changeTimeZone(new Date(), "Asia/Jakarta"), 1);
  const end = changeTimeZone(new Date("2023-12-03"), "Asia/Jakarta");
  const valid = function (current: any) {
    return (
      current.day() !== 0 && current.isAfter(yesterday) && current.isBefore(end)
    );
  };

  if (!restrict) return <Loading />;

  return (
    <div className="bg-slate-50 dark:bg-zinc-800 infodash rounded-lg shadow-md p-3 mt-5 max-w-lg mx-auto flex flex-col justify-center">
      {data?.jadwal ? (
        <>
          <p className="text-center font-semibold text-xl">Jadwal</p>
          <DateFormatter
            dateString={data?.jadwal + "-0000"}
            formatStr="iiii, dd MMMM yyyy 'Pukul' HH:mm"
            className="text-sm text-center"
          />
        </>
      ) : (
        <p className="text-center font-semibold text-xl">Jadwal Belum Diatur</p>
      )}
      <label htmlFor="aturJadwal" className="btn btn-sm mt-3 mx-auto">
        Atur Jadwal
      </label>
      <input type="checkbox" id="aturJadwal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Kelompok {data?.kelompok}</h3>
          <div className="mt-3 overflow-x-scroll scrollbar-hide rounded-xl">
            <Datetime
              input={false}
              isValidDate={valid}
              timeFormat={false}
              value={selected}
              onChange={(e: any) => setSelected(e._d)}
            />
          </div>
          <div className="flex gap-3 justify-center mt-3">
            {selected.getDay() === 6
              ? saturday.map((data, i) => (
                  <div
                    key={i}
                    onClick={() => setHours(convertTime(data))}
                    className={`btn btn-sm dark:hover:!bg-orange-700 ${
                      hours === convertTime(data)
                        ? "dark:!bg-orange-600"
                        : "!btn-outline dark:!border-orange-500 dark:!text-zinc-100"
                    }`}
                  >
                    {convertTime(data)}
                  </div>
                ))
              : weekdays.map((data, i) => (
                  <div
                    key={i}
                    onClick={() => setHours(convertTime(data))}
                    className={`btn btn-sm dark:hover:!bg-orange-700 ${
                      hours === convertTime(data)
                        ? "dark:!bg-orange-600"
                        : "!btn-outline !border-orange-500 dark:!text-zinc-100"
                    }`}
                  >
                    {convertTime(data)}
                  </div>
                ))}
          </div>
          {restrict
            .map((data: any) =>
              changeTimeZone(
                new Date(data + "-0000"),
                "Asia/Jakarta"
              ).toISOString()
            )
            .find((d: any) => d === send) ? (
            <>
              <p className="text-center text-red-500 mt-2">
                Lab penuh pada waktu yang anda pilih!!
              </p>
              <div className="modal-action">
                <label htmlFor="aturJadwal" className="btn">
                  Batal
                </label>
              </div>
            </>
          ) : (
            <div className="modal-action">
              <label htmlFor="aturJadwal" className="btn">
                Batal
              </label>
              <label
                htmlFor="aturJadwal"
                className="btn"
                onClick={onHapusJadwal}
              >
                Hapus Jadwal
              </label>
              <label htmlFor="aturJadwal" className="btn" onClick={onSetJadwal}>
                Selesai
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
