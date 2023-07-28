import Redirect from "@/components/redirect";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Tentang Admin | Praktikum Fisika Laboratorium",
  description:
    "Bantuan Admin Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export const dynamic = "force-dynamic";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900 px-4 h-screen transition-colors duration-300">
      {children}
    </div>
  );
}
