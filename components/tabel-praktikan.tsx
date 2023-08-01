import { desc, hitungNilai, titleCase } from "@/lib/utils";
import AvatarComp from "./avatar";
import DateFormatter from "./date-formatter";

export default function TabelPraktikan({
  data,
  aslab,
}: {
  data: any;
  aslab: any;
}) {
  return (
    <div className="rounded-2xl overflow-clip shadow-md mt-5 md:mx-3 tablecon">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="table w-full">
          <thead>
            <tr>
              <td>Praktikum</td>
              <td>Pekan</td>
              <td>Asisten</td>
              <td>Jadwal</td>
              <td>Nilai</td>
            </tr>
          </thead>
          <tbody>
            {data.map((data: any, index: any) => {
              const options: any = {
                maximumFractionDigits: 2,
              };
              const penilaian = hitungNilai(data.nilai).toLocaleString(options);
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
                  <td className="flex gap-3 items-center">
                    <AvatarComp
                      url={aslab.data[index].profiles.avatar_url}
                      size={35}
                      name={aslab.data[index].profiles.full_name}
                    />
                    <div className="whitespace-nowrap">
                      {aslab.data[index].profiles.full_name}
                      <br />
                      <span className="badge badge-ghost badge-sm bg-blue-100 dark:bg-blue-900 shadow-sm font-semibold">
                        {aslab.data[index].profiles.contact}
                      </span>
                    </div>
                  </td>
                  <td>
                    {data.jadwal ? (
                      <div className="whitespace-nowrap">
                        <DateFormatter
                          dateString={data.jadwal + "-0000"}
                          formatStr="iiii, d MMMM yyyy"
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
                    {penilaian === "0" ? (
                      "Belum Dinilai"
                    ) : (
                      <div>
                        <label htmlFor={`nilai${index}`}>{penilaian}</label>
                        <input
                          type="checkbox"
                          id={`nilai${index}`}
                          className="modal-toggle"
                        />
                        <div className="modal">
                          <div className="modal-box">
                            <div className="font-bold text-xl">
                              {data.praktikum.judul}
                              <br />
                              <span className="badge badge-ghost font-semibold bg-green-100 dark:bg-green-900">
                                Kode {data.kode_praktikum}
                              </span>{" "}
                              <span className="badge badge-ghost font-semibold bg-blue-100 dark:bg-blue-900">
                                {titleCase(data.praktikum.matkul.id)}
                              </span>{" "}
                              <span className="badge badge-ghost font-semibold bg-fuchsia-100 dark:bg-fuchsia-900">
                                Kelompok {data.kelompok}
                              </span>
                            </div>
                            <div className="overflow-x-auto mt-5">
                              <table className="table table-compact w-full">
                                <tbody>
                                  {Object.keys(data.nilai).map((d, i) => (
                                    <tr key={i}>
                                      <td>
                                        <span className="badge badge-ghost badge-sm bg-yellow-50 dark:bg-yellow-800">
                                          {desc[d as keyof typeof desc].bobot}
                                        </span>{" "}
                                        <span className="badge badge-ghost badge-sm bg-orange-50 dark:bg-orange-900">
                                          {desc[d as keyof typeof desc].min}-{desc[d as keyof typeof desc].max}
                                        </span>{" "}
                                      </td>
                                      <td>{desc[d as keyof typeof desc].nama}</td>
                                      <td>{data.nilai[d]}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="modal-action">
                              <label htmlFor={`nilai${index}`} className="btn">
                                Oke
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
