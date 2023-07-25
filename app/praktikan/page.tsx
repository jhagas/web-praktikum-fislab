"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import { unique } from "@/lib/utils";
import Redirect from "@/components/redirect";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("user_praktikum_linker")
    .select("praktikum_role")
    .eq("id", user?.id);
  const roles: any = data?.map((data) => data.praktikum_role).filter(unique);

  if (!user || !roles.find((element: any) => element === "praktikan") ) {
    return <Redirect to="/" />
  }

  return (
    <div className="min-h-screen dark:bg-zinc-700">
      <Navbar
        nama={user?.user_metadata.full_name}
        nrp={user?.user_metadata.nrp}
        user={user}
        roles={roles}
      />
    </div>
  );
}
