import { BsPenFill } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";
import { SiLinkedin } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

const tech = [
  {
    name: "GitHub Profile",
    link: "https://github.com/jhagas",
    logo: IoLogoGithub,
  },
  {
    name: "LinkedIn Profile",
    link: "https://www.linkedin.com/in/jhagas",
    logo: SiLinkedin,
  },
  {
    name: "Personal Blog",
    link: "https://www.jhagas.space",
    logo: BsPenFill,
  },
];

export default function About() {
  return (
    <div className="relative bg-white dark:bg-zinc-800 rounded-2xl p-9 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-xl min-w-min shadow-md">
      <Image
        src="/assets/profiles.jpeg"
        alt="Jhagas's Photo of Himself"
        width="200"
        height="200"
        className="rounded-full shadow-md mx-auto mb-1"
      />
      <div className="mt-5">
        <span className="text-gray-800 dark:text-slate-200">
          <p className="text-center font-black text-lg mb-1">
            Jhagas Hana Winaya
          </p>
          <p className="text-center mb-2">
            Website ini dibuat dengan Supabase (Database), Next.js (Backend dan
            Frontend) serta dengan pustaka Tailwind CSS dan DaisyUI.
          </p>
          <div className="w-full flex justify-center mb-2 gap-2">
            <Link
              href="https://github.com/jhagas/web-praktikum-fislab"
              className="btn btn-sm"
            >
              <IoLogoGithub />
              Open-Source (MIT License)
            </Link>
          </div>
          <p className="text-center">
            Bila ada kendala yang berkaitan dengan website ini, seperti lupa
            password dan sebagainya. Silahkan hubungi saya melalui WhatsApp
          </p>
        </span>
        <div className="text-gray-600 dark:text-zinc-400 mt-4 block text-sm text-center">
          <p>Portofolio Saya</p>
          <div className="flex flex-row w-full justify-center items-center mt-2">
            {tech.map((item) => {
              return (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  title={item.name}
                  className="relative mx-2 transition duration-200 focus:scale-125 hover:scale-125 hover:text-slate-800 dark:hover:text-zinc-100 focus:text-slate-800"
                >
                  <item.logo size="28px" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
