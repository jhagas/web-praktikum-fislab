import Redirect from "@/components/redirect";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Masuk | Praktikum Fisika Laboratorium",
  description:
    "Halaman otentikasi untuk masuk pada laman web Praktikum Fisika Laboratorium",
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

  if (user) {
    return <Redirect to="/" />;
  }

  return <section className="min-h-screen">{children}</section>;
}
