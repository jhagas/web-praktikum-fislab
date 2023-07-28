import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { unique } from "@/lib/utils";
import { cookies } from "next/headers";
import Redirect from "@/components/redirect";

export default async function Main() {
  let roles;
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <Redirect to="/login" />;
  } else {
    let { data } = await supabase
      .from("user_praktikum_linker")
      .select("praktikum_role")
      .eq("id", session.user.id);
    roles = data?.map((data) => data.praktikum_role).filter(unique);
  }

  if (roles) {
    if (
      roles.find((element) => element === "aslab") &&
      roles.find((element) => element === "praktikan")
    ) {
      return <Redirect to="/aslab" />;
    } else if (roles.find((element) => element === "aslab")) {
      return <Redirect to="/aslab" />;
    } else if (roles.find((element) => element === "praktikan")) {
      <Redirect to="/praktikan" />;
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-slate-50">
      <span className="loading loading-dots loading-lg"></span>
      <p>Memuat..</p>
    </div>
  );
}
