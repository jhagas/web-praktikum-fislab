import { AvatarChange } from "./avatar-crop";
import { Session } from "@supabase/supabase-js";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Password from "./password";
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
    .select("ischanged, avatar_url")
    .eq("id", user?.id)
    .single();

  return (
    <>
      <div className="navbar bg-base-100/50 shadow-md shadow-slate-900/5 sticky top-0 z-50 backdrop-blur-md dark:bg-zinc-900/50">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn btn-ghost normal-case text-lg flex gap-3"
          >
            <div className="w-8 h-8 logo">
              <img src="/assets/icon.svg" alt="" />
            </div>
            <p>Fisika Laboratorium</p>
          </Link>
        </div>
        <div className="navbar-end">
          <Dropdown data={data} nama={nama} nrp={nrp} roles={roles} />
        </div>
      </div>
      <input
        type="checkbox"
        id="passwordChange"
        className="modal-toggle"
        defaultChecked={!data?.ischanged}
      />
      <Password user={user} />
      <AvatarChange />
    </>
  );
}
