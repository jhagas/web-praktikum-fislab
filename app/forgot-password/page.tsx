"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImSpinner2 } from "react-icons/im";
import { useDark } from "@/lib/dark";
import { useState } from "react";

export default function Index() {
  const [dark, toogleDark] = useDark();
  const supabase = createClientComponentClient();
  const [credentials, setCredentials] = useState("");
  const [data, setData] = useState<string | undefined>();
  const [error, setError] = useState<any>();
  const [fetching, setFetching] = useState(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetching(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(
      credentials + "@student.its.ac.id",
      {
        redirectTo: `${window.location.origin}/new-password`,
      }
    );

    setFetching(false);

    if (error) {
      setError(error);
    } else {
      setData("Email berhasil dikirimkan");
    }
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    setCredentials(event.target.value);
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center dark:bg-zinc-900">
        <div className="card w-full max-w-md bg-base-100 shadow-sm border border-gray-300 dark:bg-zinc-800">
          <div className="card-body">
            <div className="flex gap-3 justify-center items-center">
              <img src="/assets/icon.svg" alt="" className="w-11 h-11 logo" />
              <div className="leading-[1.25] dark:text-zinc-200">
                <p className="font-bold uppercase">
                  <span className="hidden sm:inline">Praktikum</span> Fisika
                  Laboratorium
                </p>
                <p className="uppercase text-sm sm:text-base">
                  Departemen Fisika ITS
                </p>
              </div>
            </div>
            <p className="text-center font-semibold mt-4 dark:text-gray-50">
              Lupa Kata Sandi, ketikkan NRP anda
            </p>
            <p className="text-center">
              Tautan reset akun akan dikirimkan ke email ITS anda, cek folder
              spam/junk email di <b>NRP@student.its.ac.id</b>
            </p>
            <p className="text-center">
              Tautan dari email anda berlaku selama 5 menit
            </p>
            {error ? (
              <div className="text-center text-red-500 dark:text-red-400 mt-2">
                Error signing in, {error.message}
              </div>
            ) : null}
            <form
              onSubmit={handleSignIn}
              action=""
              className="flex flex-col gap-2 mt-4"
            >
              <input
                type="number"
                name="email"
                placeholder="NRP"
                className="login"
                value={credentials}
                onChange={handleChange}
              />
              {fetching ? (
                <button className="btn mt-4" disabled>
                  <ImSpinner2 className="animate-spin" />
                </button>
              ) : (
                <button className="btn mt-4" type="submit">
                  {data ? data : "Reset Akun"}
                </button>
              )}
            </form>
          </div>
        </div>
        {!dark ? (
          <button
            onClick={toogleDark}
            className="text-slate-800 dark:text-zinc-300"
            suppressHydrationWarning
          >
            Mode gelap untuk si burung hantu 🦉
          </button>
        ) : (
          <button
            onClick={toogleDark}
            className="text-slate-800 dark:text-zinc-300"
            suppressHydrationWarning
          >
            Mode terang untuk si elang pemangsa 🦅️
          </button>
        )}
      </div>
    </>
  );
}
