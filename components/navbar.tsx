"use client";

import { useEffect, useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import Loading from "./loading";
import { titleCase } from "@/lib/utils";
import { useRef } from "react";
import AvatarComp from "./avatar";
import AvatarSet from "./avatarSet";
import { AvatarChange } from "./avatarCrop";
import { useDark } from "@/lib/dark";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

type params = {
  user: Session["user"] | null;
  nama: string;
  nrp: string;
  roles: string[];
};

export default function Navbar({ user, nama, nrp, roles }: params) {
  const [dark, toogleDark] = useDark();
  const [pathname, setPathname] = useState<string>()

  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    setPathname(pathname);
  })

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const dropdown: any = useRef(null);

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

  const [data, setData] = useState<
    { ischanged: any; avatar_url: any }[] | null
  >();

  useEffect(() => {
    async function first() {
      let { data } = await client
        .from("profiles")
        .select("ischanged, avatar_url")
        .eq("id", user?.id);

      setData(data);
    }
    first()
  }, []);

  if (!data) return <Loading />;

  function handleFocus() {
    if (dropdown.current && clicked) dropdown.current.blur(); // removing focus
  }

  return (
    <>
      <div className="navbar bg-base-100/50 shadow-md shadow-slate-900/5 sticky top-0 z-50 backdrop-blur-md dark:bg-zinc-900/50">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn btn-ghost normal-case text-lg flex gap-3"
          >
            <div className="w-8 h-8 logo">
              <img src="/assets/icon.svg" alt="" />
            </div>
            <p>Fisika Laboratorium</p>
          </Link>
        </div>
        <div className="navbar-end">
          <div
            className="dropdown"
            onClick={() => {
              handleFocus();
              setClicked(!clicked);
            }}
            onBlur={() => setClicked(false)}
          >
            <label
              tabIndex={0}
              className="btn btn-ghost flex gap-3"
              ref={dropdown}
            >
              <div className="text-right hidden lg:block">
                <p>{nama}</p>
                <p className="font-normal">{nrp}</p>
              </div>
              <AvatarComp url={data[0].avatar_url} size={32} name={nama} />
            </label>
            <ul
              tabIndex={0}
              className="menu dark:bg-zinc-800 dark:text-zinc-50 menu-compact dropdown-content top-16 right-2 p-2 shadow bg-base-100 rounded-box w-52 gap-2 absolute"
            >
              <li>
                <div className="flex flex-col gap-1 cursor-default nav-item">
                  <AvatarSet url={data[0].avatar_url} size={100} name={nama} />
                  <p className="font-bold text-center">{nama}</p>
                  <p className="font-normal">{nrp}</p>
                </div>
              </li>
              {roles.length > 1 ? (
                <li>
                  <select
                    className="select infodash"
                    value={pathname}
                    onChange={(e) => {
                      router.push(`/${e.target.value}`);
                    }}
                  >
                    {roles.map((role, index) => (
                      <option value={role} key={index}>
                        {titleCase(role)}
                      </option>
                    ))}
                  </select>
                </li>
              ) : null}
              <li>
                <label
                  htmlFor="ppChange"
                  className="nav-item"
                >
                  Ubah Foto Profil
                </label>
              </li>
              <li>
                <label
                  htmlFor="passwordChange"
                  className="nav-item"
                >
                  Ubah Password
                </label>
              </li>
              <li>
                <Link
                  href="/jadwal"
                  className="nav-item"
                >
                  Jadwal Keseluruhan
                </Link>
              </li>
              <li>
                <div
                  className="flex justify-between nav-item"
                  onClick={toogleDark}
                >
                  <label>Mode Gelap</label>
                  <input
                    type="checkbox"
                    className="toggle"
                    checked={dark}
                    onChange={toogleDark}
                    onClick={toogleDark}
                  />
                </div>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        id="passwordChange"
        className="modal-toggle"
        defaultChecked={!data[0].ischanged}
      />
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
      <AvatarChange />
    </>
  );
}
