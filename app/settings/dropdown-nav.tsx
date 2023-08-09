"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import LogoutButton from "@/components/logout-button";
import { BsCalendarWeek, BsKey, BsThreeDotsVertical } from "react-icons/bs";
import { FiHome } from "react-icons/fi";

export default function Dropdown() {
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
        <BsThreeDotsVertical />
      </label>
      <ul
        tabIndex={0}
        className="menu dark:bg-zinc-800 dark:text-zinc-50 menu-compact dropdown-content top-16 right-2 p-2 shadow bg-base-100 rounded-box w-52 gap-2 absolute"
      >
        <li>
          <Link
            href="/"
            className="nav-item gap-3 focus:dark:text-zinc-50"
          >
            <FiHome size={16} />
            <p>Halaman Utama</p>
          </Link>
        </li>
        <li>
          <Link
            href="/jadwal"
            className="nav-item gap-3 focus:dark:text-zinc-50"
          >
            <BsCalendarWeek size={16} />
            <p>Okupansi Lab</p>
          </Link>
        </li>
        <li>
          <Link
            href="/about-admin"
            className="nav-item gap-3 focus:dark:text-zinc-50"
          >
            <BsKey size={16} />
            <p>Tentang Admin</p>
          </Link>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </div>
  );
}
