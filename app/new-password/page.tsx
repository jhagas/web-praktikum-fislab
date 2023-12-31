"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";

export default function Index() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event: string, session: any) => {
      console.log(event);
      if (event == "SIGNED_IN") {
        router.push("/first-time/password");
        router.refresh();
      }
    });
  });

  return <Loading />;
}
