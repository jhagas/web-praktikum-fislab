"use client"

import { useDark } from "@/lib/dark";
import Link from "next/link";
import { useRef, useState } from "react";
import LogoutButton from "./logout-button";
import AvatarComp from "./avatar";
import AvatarSet from "./avatar-set";
import SelectRole from "./select-role";

type params = {
  data: any;
  nama: string;
  nrp: string;
  roles: string[];
};

export default function Dropdown({ data, nama, nrp, roles }: params) {
  const [dark, toogleDark] = useDark();
  const [clicked, setClicked] = useState(false);

  const dropdown: any = useRef(null);

  function handleFocus() {
    if (dropdown.current && clicked) dropdown.current.blur(); // removing focus
  }

  return (
    <div
      className="dropdown"
      onClick={() => {
        handleFocus();
        setClicked(!clicked);
      }}
      onBlur={() => setClicked(false)}
    >
      <label tabIndex={0} className="btn btn-ghost flex gap-3" ref={dropdown}>
        <div className="text-right hidden lg:block">
          <p>{nama}</p>
          <p className="font-normal">{nrp}</p>
        </div>
        <AvatarComp url={data.avatar_url} size={32} name={nama} />
      </label>
      <ul
        tabIndex={0}
        className="menu dark:bg-zinc-800 dark:text-zinc-50 menu-compact dropdown-content top-16 right-2 p-2 shadow bg-base-100 rounded-box w-52 gap-2 absolute"
      >
        <li>
          <div className="flex flex-col gap-1 cursor-default nav-item">
            <AvatarSet url={data.avatar_url} size={100} name={nama} />
            <p className="font-bold text-center">{nama}</p>
            <p className="font-normal">{nrp}</p>
          </div>
        </li>
        {roles.length > 1 ? (
          <li>
            <SelectRole roles={roles} />
          </li>
        ) : null}
        <li>
          <label htmlFor="ppChange" className="nav-item">
            Ubah Foto Profil
          </label>
        </li>
        <li>
          <label htmlFor="passwordChange" className="nav-item">
            Ubah Password
          </label>
        </li>
        <li>
          <Link href="/jadwal" className="nav-item">
            Jadwal Keseluruhan
          </Link>
        </li>
        <li>
          <Link href="/about-admin" className="nav-item">
            Tentang Admin
          </Link>
        </li>
        <li>
          <div className="flex justify-between nav-item" onClick={toogleDark}>
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
  );
}
