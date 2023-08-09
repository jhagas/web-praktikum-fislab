import Link from "next/link";
import Dropdown from "./dropdown-nav";
import { BsArrowLeftShort } from "react-icons/bs";

export default async function Navbar() {
  return (
    <>
      <div className="navbar bg-base-100/50 sticky top-0 z-50 backdrop-blur-md dark:bg-zinc-900/50">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn btn-ghost normal-case text-lg flex gap-2"
          >
            <BsArrowLeftShort size={30} />
            <h1>Pengaturan Akun</h1>
          </Link>
        </div>
        <div className="navbar-end">
          <Dropdown />
        </div>
      </div>
    </>
  );
}
