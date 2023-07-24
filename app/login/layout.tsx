import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | Praktikum Fisika Laboratorium",
  description:
    "Halaman otentikasi untuk masuk pada laman web Praktikum Fisika Laboratorium",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="min-h-screen">{children}</section>;
}
