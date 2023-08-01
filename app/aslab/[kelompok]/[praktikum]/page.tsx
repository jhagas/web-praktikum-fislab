import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import { titleCase, unique } from "@/lib/utils";
import Redirect from "@/components/redirect";
import { Metadata } from "next";
import Credit from "@/components/credit";
import Main from "./component";

type Props = {
  params: { kelompok: string; praktikum: string };
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const kelompok = params.kelompok;
  const praktikum = params.praktikum;

  return {
    title: `Kelompok ${kelompok} Praktikum ${praktikum} | Fisika Laboratorium`,
    description:
      "Dashboard Penjadwalan dan Penilaian Kelompok Pada Laman Web Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
  };
}

export const dynamic = "force-dynamic";

export default async function Index({ params }: Props) {
  const supabase = createServerComponentClient({ cookies });
  const kelompok = params.kelompok;
  const praktikum = params.praktikum;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const roleFetch = await supabase
    .from("user_praktikum_linker")
    .select("praktikum_role")
    .eq("id", user?.id);
  const roles: any = roleFetch.data
    ?.map((data) => data.praktikum_role)
    .filter(unique);

  const { data }: { data: Data } = await supabase
    .from("user_praktikum_linker")
    .select("kelompok, kode_praktikum, praktikum(judul, matkul)")
    .eq("id", user?.id)
    .eq("praktikum_role", "aslab")
    .eq("kelompok", kelompok)
    .eq("kode_praktikum", praktikum)
    .single();

  if (!user || !roles.find((element: any) => element === "aslab")) {
    return <Redirect to="/" />;
  }
  if (!data) return <Redirect to="/404" />;

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <Navbar
        nama={user?.user_metadata.full_name}
        nrp={user?.user_metadata.nrp}
        user={user}
        roles={roles}
      />
      <div className="px-3 py-6">
        <h1 className="font-bold text-2xl text-center infodash">
          {data?.praktikum.judul}
        </h1>
        <div className="flex gap-1 justify-center items-center mt-2 flex-wrap">
          <span className="badge badge-ghost font-semibold badge-sm bg-green-100 dark:bg-green-900">
            Kode {data?.kode_praktikum}
          </span>{" "}
          <span className="badge badge-ghost font-semibold badge-sm bg-blue-100 dark:bg-blue-900">
            Mata Kuliah {titleCase(data?.praktikum.matkul)}
          </span>
          <span className="badge badge-ghost font-semibold badge-sm bg-fuchsia-100 dark:bg-fuchsia-900">
            Kelompok {data?.kelompok}
          </span>
        </div>
        <Main />
      </div>
      <Credit />
    </div>
  );
}
