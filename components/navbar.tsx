import { Session } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { cookies } from "next/headers";
import Dropdown from "./dropdown-nav";

type params = {
  user: Session["user"] | null;
  nama: string;
  nrp: string;
  roles: string[];
};

export default async function Navbar({ user, nama, nrp, roles }: params) {
  const client = createServerComponentClient({ cookies });

  let { data } = await client
    .from("profiles")
    .select("avatar_url")
    .eq("id", user?.id)
    .single();

  return (
    <>
      <div className="navbar bg-base-100/50 sticky top-0 z-50 backdrop-blur-md dark:bg-zinc-900/50">
        <div className="navbar-start">
        <Link
            href="/"
            className="btn btn-ghost normal-case text-lg flex gap-3"
          >
            <div className="w-7 h-7 logo">
              <img src="/assets/icon.svg" alt="" />
            </div>
            <p className="text-[1rem]">Fisika Laboratorium</p>
          </Link>
        </div>
        <div className="navbar-end">
          <Dropdown data={data} nama={nama} nrp={nrp} roles={roles} />
        </div>
      </div>
    </>
  );
}
