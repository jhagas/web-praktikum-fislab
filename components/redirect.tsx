'use client'

import { useRouter } from "next/navigation";

export default function Redirect({ to }: { to: string }) {
  const router = useRouter();
  router.push(to);
  router.refresh();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-slate-50">
      <span className="loading loading-dots loading-lg"></span>
      <p>Memuat..</p>
    </div>
  );
}
