import { mingguKuliah } from "@/lib/utils";
import DateFormatter from "./date-formatter";

export default function ThisWeek({ linker }: { linker: any }) {
  const { minggu } = mingguKuliah();
  // const [minggu, mulai, selesai] = [1, true, false];

  const filtered = linker.filter(
    (d: any) => d.minggu === minggu || d.minggu === minggu + 1
  );

  return (
    <div className="w-full table-cell align-top py-6 px-8 bg-gradient-to-br bg-slate-50 dark:bg-zinc-800 rounded-xl mt-2 md:mt-0 shadow-md">
      {filtered.length > 0 ? (
        <div>
          <h1 className="font-bold text-center md:text-lg infodash">
            JADWAL PRAKTIKUM TERDEKAT
          </h1>
          <ol className="list-disc mt-2">
            {filtered.map((data: any, index: any) => {
              return (
                <li key={index} className="ml-5 infodash">
                  <div>
                    <div className="font-semibold inline">
                      {data.praktikum.judul}
                    </div>
                    <div className="whitespace-nowrap">
                      <div className="badge badge-ghost bg-purple-300 badge-sm dark:bg-purple-900">
                        {data.minggu === minggu ? "Pekan ini" : "Pekan depan"}
                      </div>{" "}
                      <div className="badge badge-ghost bg-orange-300 badge-sm dark:bg-orange-900">
                        {data.kelompok}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-light">
                    {!data.jadwal ? (
                      "Jadwal belum diatur"
                    ) : (
                      <DateFormatter
                        dateString={data.jadwal + "-0000"}
                        formatStr="iiii, dd MMMM 'Pukul' HH:mm"
                      />
                    )}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <>
          <p className="text-3xl text-center mb-2">✅️</p>
          <p className="text-center font-bold uppercase infodash">
            Tidak ada agenda terdekat
          </p>
        </>
      )}
    </div>
  );
}
