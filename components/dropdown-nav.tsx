"use client";

import { useDark } from "@/lib/dark";
import Link from "next/link";
import { useRef, useState } from "react";
import LogoutButton from "./logout-button";
import AvatarComp from "./avatar";
import SelectRole from "./select-role";
import { BsCalendarWeek, BsGear, BsKey, BsMoonStars } from "react-icons/bs";

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
        <div className="text-right hidden md:block">
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
          <div className="flex flex-col gap-1 nav-item hover:!bg-transparent dark:hover:!bg-transparent !cursor-default">
            <AvatarComp url={data.avatar_url} size={100} name={nama} />
            <p className="font-extrabold text-center">{nama}</p>
            <p className="font-normal opacity-80">{nrp}</p>
          </div>
        </li>
        {roles.length > 1 ? (
          <li>
            <SelectRole roles={roles} />
          </li>
        ) : null}
        <li>
          <Link href="/settings" className="nav-item gap-3 focus:dark:text-zinc-50">
            <BsGear size={16} />
            <p>Pengaturan Akun</p>
          </Link>
        </li>
        <li>
          <Link href="/jadwal" className="nav-item gap-3 focus:dark:text-zinc-50">
            <BsCalendarWeek size={16} />
            <p>Okupansi Lab</p>
          </Link>
        </li>
        <li>
          <Link href="/about-dev" className="nav-item gap-3 focus:dark:text-zinc-50">
            <BsKey size={16} />
            <p>Tentang Developer</p>
          </Link>
        </li>
        <li>
          <div className="flex nav-item gap-3" onClick={toogleDark}>
            <BsMoonStars size={16} />
            <label>Mode Gelap</label>
            <input
              type="checkbox"
              className="toggle toggle-sm ml-auto"
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
