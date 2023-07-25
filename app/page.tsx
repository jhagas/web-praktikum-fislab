"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { unique } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Main() {
  const supabase = createClientComponentClient();
  const [roles, setRoles] = useState<string[] | null>();
  const router = useRouter();

  useEffect(() => {
    async function firstLoad() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        router.refresh();
      } else {
        let { data } = await supabase
          .from("user_praktikum_linker")
          .select("praktikum_role")
          .eq("id", session.user.id);
        let roles = data?.map((data) => data.praktikum_role).filter(unique);
        setRoles(roles);
      }
    }
    firstLoad();
  }, []);

  if (roles) {
      if (
        roles.find((element) => element === "aslab") &&
        roles.find((element) => element === "praktikan")
      ) {
        router.push(`/aslab`);
        router.refresh();
      } else if (roles.find((element) => element === "aslab")) {
        router.push(`/aslab`);
        router.refresh();
      } else if (roles.find((element) => element === "praktikan")) {
        router.push(`/praktikan`);
        router.refresh();
      }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-slate-50">
      <span className="loading loading-dots loading-lg"></span>
      <p>Memuat..</p>
    </div>
  );
}