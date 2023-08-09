"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import PasswordStrengthBar from "react-password-strength-bar";

export default function Password({ user }: { user: Session["user"] | null }) {
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const client = createClientComponentClient();

  async function handleChangePassword(event: { preventDefault: () => void }) {
    event.preventDefault();
    setFetching(true);
    const { data } = await client.auth.updateUser({ password: password });
    // update
    await client
      .from("profiles")
      .update({ ischanged: true })
      .eq("id", user?.id);

    if (data.user) {
      setPassword("");
      setFetching(false);
    }
    router.push("/");
  }

  return (
    <>
      <form className="mt-4" onSubmit={handleChangePassword} action="">
        <input
          type="password"
          placeholder="Kata Sandi Baru"
          className="login mb-3"
          value={password}
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrengthBar password={password} />
        <div className="flex gap-2 justify-center mt-3">
          {password.length >= 8 && (
            <>
              {fetching ? (
                <button className="btn">
                  <ImSpinner2 className="animate-spin" />
                </button>
              ) : (
                <button type="submit" className="btn">
                  Selesai
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </>
  );
}
