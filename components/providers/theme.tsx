"use client";

import { useDark } from "@/lib/dark";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark] = useDark();

  return <div className={`${dark ? "dark" : ""}`}>{children}</div>;
}
