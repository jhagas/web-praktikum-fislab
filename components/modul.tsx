import { titleCase } from "@/lib/utils";

export default function Modul({ data }: { data: any }) {
  const matkul = data.map((data: any) => data.praktikum.matkul);
  const arrayUniqueByKey = [
    ...new Map(
      matkul.map((item: { [x: string]: any }) => [item["id"], item])
    ).values(),
  ];

  return (
    <>
      <div className="md:mx-3">
        <div className="w-full py-4 px-6 bg-gradient-to-br bg-slate-50 dark:bg-zinc-800 rounded-xl mt-4 md:mt-3 shadow-md">
          <p className="uppercase font-bold text-xl text-center mb-2 infodash">
            MODUL ANDA
          </p>
          <div className="flex gap-2 justify-center items-center flex-wrap">
            {arrayUniqueByKey.map((data: any, index) => (
              <a
                key={index}
                href={data.modul_link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm shadow"
              >
                {titleCase(data.id)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
