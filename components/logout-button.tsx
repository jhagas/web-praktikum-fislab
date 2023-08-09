"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const router = useRouter();

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div
      className="btn flex items-center justify-center !bg-red-500 !border-none !text-white"
      onClick={signOut}
    >
        <FiLogOut className="h-full"/>
        <p>Keluar</p>
    </div>
  );
}
