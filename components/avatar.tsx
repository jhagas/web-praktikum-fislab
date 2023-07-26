"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Avatar from "react-avatar";

type params = {
  url: string;
  size: number;
  name: string;
};

export default function AvatarComp({ url, size, name }: params) {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>();

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ");
    }
  }
  useEffect(() => {
    if (url) downloadImage(url);
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ width: size }} aria-live="polite">
      <div className="rounded-full overflow-clip max-w-fit mx-auto">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={"Avatar"}
            style={{ height: size, width: size }}
          />
        ) : (
          <Avatar name={name} size={`${size}`} />
        )}
      </div>
    </div>
  );
}
