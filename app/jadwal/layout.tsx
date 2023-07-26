import Credit from "@/components/credit";
import Navbar from "@/components/navbar";
import Redirect from "@/components/redirect";
import { unique } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Jadwal Okupansi | Praktikum Fisika Laboratorium",
  description:
    "Halaman Untuk melihat jadwal yang terisi pada laman web Praktikum Fisika Laboratorium",
};

export const dynamic = 'force-dynamic'

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

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

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="min-h-screen dark:bg-zinc-900">
      <Navbar
        nama={user?.user_metadata.full_name}
        nrp={user?.user_metadata.nrp}
        user={user}
        roles={roles}
      />
      <div className="px-3 py-6">{children}</div>
      <Credit />
    </div>
  );
}
