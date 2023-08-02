import { changeTimeZone, inRangeMinggu } from "@/lib/utils";
import DateFormatter from "./date-formatter";

type Params = {
  data:
    | {
        jadwal: any;
        kelompok: any;
        profiles: {
          full_name: any;
        }[];
      }[]
    | null;
  awalMinggu: Date;
};

export default function TabelJadwal({ data, awalMinggu }: Params) {
  const rangePekan = inRangeMinggu(awalMinggu);

  return (
    <div>
      <div className="rounded-2xl overflow-clip shadow-md mt-8 md:mx-3 tablecon">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <td>Jadwal</td>
                  <td>Kelompok dan Aslab</td>
                </tr>
              </thead>
              <tbody>
                {rangePekan.map((d, i) => {
                  const inTime = data?.filter(
                    (time) =>
                      new Date(time.jadwal + "-0000").getTime() === d.getTime()
                  );

                  return (
                    <tr key={i}>
                      <td className="whitespace-nowrap">
                        <DateFormatter
                          dateString={d.toISOString()}
                          formatStr="iiii, dd MMMM yyyy"
                        />
                        <br />
                        <div className="badge badge-ghost bg-primary/20 dark:bg-primary/60">
                          <DateFormatter
                            dateString={d.toISOString()}
                            formatStr="HH:mm"
                          />
                        </div>
                      </td>
                      <td>
                        <ul>
                          {inTime?.map((dd: any, ii) => (
                            <li key={ii} className="whitespace-nowrap">
                              <p className="inline">{dd.profiles.full_name}</p>{" "}
                              <p className="inline font-bold">
                                ({dd.kelompok})
                              </p>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
