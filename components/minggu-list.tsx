import { mingguList } from "@/lib/utils";
import Link from "next/link";

type Params = {
  minggu: number;
  state: number;
};

export default function ListMinggu({ minggu, state }: Params) {
  return (
    <div className="justify-center items-center flex flex-col gap-1 infodash">
      <h1 className="text-lg font-semibold">Pilih Pekan Perkuliahan</h1>
      <div className="overflow-x-scroll rounded-lg overflow-clip w-full max-w-fit shadow-md scrollbar-hide">
        <div className="join">
          {mingguList.map((data, i) => {
            return (
              <Link
                key={i}
                href={`?week=${data}`}
                className={`btn join-item border-0 ${
                  data === state
                    ? "!bg-zinc-700 !font-extrabold !text-zinc-100 dark:!bg-zinc-700"
                    : "!bg-zinc-100 !text-zinc-500 hover:!bg-zinc-300 dark:!bg-zinc-800 hover:!text-zinc-600 dark:hover:!text-zinc-100 !font-normal"
                }`}
              >
                {data}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
