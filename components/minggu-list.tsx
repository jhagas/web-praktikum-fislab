import { mingguList } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

type Params = {
  minggu: number;
  state: number;
  setState: Dispatch<SetStateAction<number>>;
};

export default function ListMinggu({ minggu, state, setState }: Params) {
  return (
    <div className="justify-center items-center flex flex-col gap-1 infodash">
      <h1 className="text-lg font-semibold">Pilih Pekan Perkuliahan</h1>
      <div className="overflow-x-scroll rounded-lg overflow-clip w-full max-w-fit shadow-md scrollbar-hide">
        <div className="join">
          {mingguList.map((data, i) => {
            if (data >= minggu)
              return (
                <div
                  key={i}
                  data-title={data}
                  className={`btn join-item border-0 ${
                    data === state
                      ? "!bg-zinc-700 !font-extrabold !text-zinc-100 dark:!bg-zinc-700"
                      : "!bg-zinc-100 !text-zinc-500 hover:!bg-zinc-300 dark:!bg-zinc-800 hover:!text-zinc-600 dark:hover:!text-zinc-100 !font-normal"
                  }`}
                  onClick={() => setState(data)}
                >
                  {data}
                </div>
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
}