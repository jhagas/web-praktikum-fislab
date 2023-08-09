import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import "./page.css";
import { BsArrowRightCircle } from "react-icons/bs";

export const metadata: Metadata = {
  title: "First Time Setup | Praktikum Fisika Laboratorium",
  description:
    "Setelan awal pengguna Laman Web Penjadwalan dan Penilaian Praktikum Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh Nopember",
};

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="hero min-h-screen anim_gradient">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            👋️👋️
          </h1>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            Halo {user.user_metadata.full_name}
          </h1>
          <p className="py-6 text-white">
            Selamat datang di aplikasi web penjadwalan dan penilaian praktikum
            Fisika Laboratorium Departemen Fisika Institut Teknologi Sepuluh
            Nopember
          </p>
          <Link
            href="/first-time/pp"
            className="btn !btn-outline !text-white hover:!bg-[#0f0c29] hover:!border-white"
          >
            Mulai Penyetelan
            <BsArrowRightCircle />
          </Link>
        </div>
      </div>
    </div>
  );
}
