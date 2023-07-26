"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

export default function Password({ user }: { user: Session["user"] | null }) {
  const [password, setPassword] = useState("");
  const client = createClientComponentClient();

  async function handleChangePassword(event: { preventDefault: () => void }) {
    event.preventDefault();
    await client.auth.updateUser({ password: password });
    // update
    await client
      .from("profiles")
      .update({ ischanged: true })
      .eq("id", user?.id);
    setPassword("");
  }

  return (
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Ubah Kata Sandi</h3>
        <form className="mt-4" onSubmit={handleChangePassword}>
          <input
            type="text"
            placeholder="Kata Sandi Baru"
            className="login mb-3"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthBar password={password} />
          <div className="flex gap-2 justify-end mt-3">
            {password.length < 8 ? (
              <label
                htmlFor="passwordChange"
                className="btn"
                onClick={() => setPassword("")}
              >
                Batal
              </label>
            ) : (
              <>
                <label
                  htmlFor="passwordChange"
                  className="btn"
                  onClick={() => setPassword("")}
                >
                  Batal
                </label>
                <button type="submit">
                  <label htmlFor="passwordChange" className="btn">
                    Selesai
                  </label>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
