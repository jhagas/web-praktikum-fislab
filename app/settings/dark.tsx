"use client";

import { useDark } from "@/lib/dark";

export default function Dark() {
  const [dark, toogleDark] = useDark();
  return (
    <div className="join-item data hover gap-2" onClick={toogleDark}>
      <label className="font-bold">Mode Gelap</label>
      <input
        type="checkbox"
        className="toggle toggle-sm"
        checked={dark}
        onChange={toogleDark}
        onClick={toogleDark}
      />
    </div>
  );
}
