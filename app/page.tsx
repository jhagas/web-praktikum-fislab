import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { unique } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Main() {
  let roles;
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  } else {
    let { data } = await supabase
      .from("user_praktikum_linker")
      .select("praktikum_role")
      .eq("id", session.user.id);
    roles = data?.map((data) => data.praktikum_role).filter(unique);
  }

  let { data } = await supabase
    .from("profiles")
    .select("ischanged")
    .eq("id", session.user.id)
    .single();

  if (data?.ischanged === false) {
    redirect("/first-time");
  }

  if (roles) {
    if (
      roles.find((element) => element === "aslab") &&
      roles.find((element) => element === "praktikan")
    ) {
      redirect("/aslab");
    } else if (roles.find((element) => element === "aslab")) {
      redirect("/aslab");
    } else if (roles.find((element) => element === "praktikan")) {
      redirect("/praktikan");
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-slate-50">
      <span className="loading loading-dots loading-lg"></span>
      <p>Memuat..</p>
    </div>
  );
}
