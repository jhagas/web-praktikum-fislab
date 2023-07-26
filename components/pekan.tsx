import { mingguKuliah } from "@/lib/utils";

export default function Pekan() {
  const { minggu, mulai, selesai } = mingguKuliah();
  // const [minggu, mulai, selesai] = [15, true, false];

  return (
    <>
      <div className="w-full md:table-cell py-6 px-8 bg-gradient-to-br bg-slate-50 rounded-xl shadow-md align-middle dark:bg-zinc-800">
        {mulai ? (
          selesai ? (
            <>
              <p className="text-3xl text-center mb-2">😄️😄️️</p>
              <p className="text-center font-bold uppercase infodash">
                Pekan perkuliahan telah usai
              </p>
            </>
          ) : (
            <div className="text-center md:flex infodash">
              <div className="hidden md:block items-center justify-center md:translate-y-1 md:pl-3 lg:pl-6">
                <p className="text-6xl mb-2 md:mb-0 h-full">📚️</p>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <p className="font-semibold">Minggu perkuliahan</p>
                <p className="text-6xl font-extrabold">{minggu}</p>
              </div>
              <div className="hidden md:block md:translate-y-1 md:pr-3 lg:pr-6">
                <p className="text-6xl text-center mb-2 md:mb-0 h-full">💡️</p>
              </div>
            </div>
          )
        ) : (
          <>
            <p className="text-3xl text-center mb-2">🫡️🫡️</p>
            <p className="text-center font-bold uppercase infodash">
              Pekan perkuliahan belum dimulai
            </p>
          </>
        )}
      </div>
    </>
  );
}