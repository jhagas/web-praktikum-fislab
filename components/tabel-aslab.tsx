import Link from "next/link";
import DateFormatter from "./date-formatter";

export default function TabelAslab({ data }: any) {
  return (
    <div className="rounded-2xl overflow-clip shadow-md mt-5 md:mx-3 tablecon">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="table w-full">
          <thead>
            <tr>
              <td>Praktikum</td>
              <td>Pekan</td>
              <td>Jadwal</td>
              <td>Detail</td>
            </tr>
          </thead>
          <tbody>
            {data.map((data: any, index: number) => {
              return (
                <tr key={index}>
                  <td className="font-semibold whitespace-nowrap">
                    {data.praktikum.judul}
                    <br />
                    <span className="badge badge-ghost badge-sm font-semibold bg-orange-100 dark:bg-orange-900 text-[0.7rem]">
                      {data.kode_praktikum} ({data.kelompok})
                    </span>
                  </td>
                  <td>{data.minggu}</td>
                  <td>
                    {data.jadwal ? (
                      <div className="whitespace-nowrap">
                        <DateFormatter
                          dateString={data.jadwal + "-0000"}
                          formatStr="iiii, dd MMMM yyyy"
                        />
                        <br />
                        <span className="badge bg-green-200 dark:bg-green-900 shadow-sm badge-ghost badge-sm font-semibold">
                          <DateFormatter
                            dateString={data.jadwal + "-0000"}
                            formatStr="HH:mm"
                          />
                        </span>
                      </div>
                    ) : (
                      "Belum Diatur"
                    )}
                  </td>
                  <td>
                    <Link
                      href={`/aslab/${data.kelompok}/${data.kode_praktikum}`}
                    >
                      <div className="btn btn-sm">Detail</div>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
