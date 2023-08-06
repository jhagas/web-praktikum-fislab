"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ImSpinner2 } from "react-icons/im";
import { useDark } from "@/lib/dark";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";

export default function Index() {
  const [dark, toogleDark] = useDark();
  const supabase = createClientComponentClient();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState<AuthError | null>();
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetching(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email + "@praktikum.its.ac.id",
      password: credentials.password,
    });

    setFetching(false);

    if (error) {
      setError(error);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setCredentials((values) => ({ ...values, [name]: value }));
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center dark:bg-zinc-900">
        <div className="card w-full max-w-md bg-base-100 shadow-xl dark:bg-zinc-800">
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
                value={credentials.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login"
                value={credentials.password}
                onChange={handleChange}
              />
              {fetching ? (
                <button className="btn mt-4" disabled>
                  <ImSpinner2 className="animate-spin" />
                </button>
              ) : (
                <button className="btn mt-4" type="submit">
                  Masuk
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
            For Night Owl 🦉
          </button>
        ) : (
          <button
            onClick={toogleDark}
            className="text-slate-800 dark:text-zinc-300"
            suppressHydrationWarning
          >
            For Day Eagle 🦅️
          </button>
        )}
      </div>
    </>
  );
}
