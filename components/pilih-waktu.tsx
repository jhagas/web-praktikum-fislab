"use-client";

import Datetime from "react-datetime";
import "./react-datetime.css";
import { Dispatch, SetStateAction, useState } from "react";
import { changeTimeZone, convertTime, saturday, weekdays } from "@/lib/utils";
import Loading from "./loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DateFormatter from "./date-formatter";
import { format, subDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ImSpinner2 } from "react-icons/im";

const dateFormat = (date: Date) =>
  changeTimeZone(
    new Date(format(date, "yyyy-MM-dd'T00:00:00-0000'")),
    "Africa/Dakar"
  );

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
    ? new Date(data.jadwal + "-0000")
    : new Date();

  const timeSelected = data?.jadwal
    ? formatInTimeZone(
        new Date(data.jadwal + "-0000"),
        "Africa/Abidjan",
        "HH:mm"
      )
    : "11:30";

  const [selected, setSelected] = useState(currentDate);
  const [hours, setHours] = useState(timeSelected);
  const [restrict, setRestrict] = useState(false);
  const [loading, setLoading] = useState(false);

  const send = format(selected, "yyyy-MM-dd'T'" + hours + "':00'");

  async function onSetJadwal() {
    setLoading(true);
    const { data } = await supabase.rpc("dup_jadwal");
    const fire = data.find((d: string) => d === send);
    if (!fire) {
      await supabase
        .from("user_praktikum_linker")
        .update({ jadwal: send })
        .eq("kelompok", kelompok)
        .eq("kode_praktikum", praktikum);
      setRestrict(false);
      trigger((state) => !state);
    } else {
      setRestrict(true);
    }
    document.getElementById("aturJadwal")?.click();
    setLoading(false);
  }

  async function onHapusJadwal() {
    setLoading(true);
    await supabase
      .from("user_praktikum_linker")
      .update({ jadwal: null })
      .eq("kelompok", kelompok)
      .eq("kode_praktikum", praktikum);

    trigger((state) => !state);
    document.getElementById("aturJadwal")?.click();
    setLoading(false);
  }

  const yesterday = subDays(changeTimeZone(new Date(), "Asia/Jakarta"), 1);
  const end = changeTimeZone(new Date("2023-12-03"), "Asia/Jakarta");
  const valid = function (current: any) {
    return (
      current.day() !== 0 && current.isAfter(yesterday) && current.isBefore(end)
    );
  };

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
          {restrict && (
            <>
              <p className="text-center text-red-500 mt-2">
                Lab penuh pada waktu yang anda pilih!!
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <p className="text-center font-semibold text-xl">
            Jadwal Belum Diatur
          </p>
          {restrict && (
            <>
              <p className="text-center text-red-500 mt-2">
                Lab penuh pada waktu yang anda pilih!!
              </p>
            </>
          )}
        </>
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
              onChange={(e: any) => setSelected(dateFormat(e._d))}
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
                    {convertTime(data + 7)}
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
                    {convertTime(data + 7)}
                  </div>
                ))}
          </div>
          <div className="modal-action">
            {loading ? (
              <button className="btn">
                <ImSpinner2 className="animate-spin" />
              </button>
            ) : (
              <>
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
                <button type="submit" className="btn" onClick={onSetJadwal}>
                  Selesai
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
