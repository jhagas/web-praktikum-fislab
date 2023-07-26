"use client";

import { titleCase } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SelectRole({roles} : {roles: string[]}) {
  const [pathname, setPathname] = useState<string>();

  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    setPathname(pathname);
  });
  const router = useRouter();
  return (
    <select
      className="select infodash"
      value={pathname}
      onChange={(e) => {
        router.push(`/${e.target.value}`);
        router.refresh();
      }}
    >
      {roles.map((role, index) => (
        <option value={role} key={index}>
          {titleCase(role)}
        </option>
      ))}
    </select>
  );
}
