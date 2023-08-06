"use client";

import { ChangeEventHandler, useEffect, useRef } from "react";
import { useState } from "react";
import { useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../lib/crop-image";
import FileResizer from "react-image-file-resizer";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

function usePPUpdate() {
  const router = useRouter();
  const [user, setUser] = useState<Session["user"] | null>();
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function session() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);
    }
    session();
  }, []);

  async function upload(img: any) {
    const blob = await fetch(img).then((r) => r.blob());
    const resizeFile = (file: any) =>
      new Promise((resolve) => {
        FileResizer.imageFileResizer(
          file,
          300,
          300,
          "PNG",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "blob"
        );
      });

    const image: any = await resizeFile(blob);
    await supabase.storage.from("avatars").upload(`${user?.id}.png`, image, {
      contentType: "image/png",
      upsert: true,
    });

    await supabase
      .from("profiles")
      .update({ avatar_url: `${user?.id}.png` })
      .match({ id: user?.id });

    router.push("/first-time/password");
  }

  return upload;
}

function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export function AvatarChangeFT() {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imageSrc, setImageSrc] = useState<any>(null);
  const file: any = useRef();
  const upload = usePPUpdate();

  const onCropComplete = useCallback((a: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      await upload(croppedImage);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const onClose = () => {
    setImageSrc(null);
    file.current.value = null;
  };

  const onFileChange: ChangeEventHandler = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <>
      <input
        ref={file}
        type="file"
        onChange={onFileChange}
        accept="image/*"
        className="file-input w-full file-input-sm file mb-4 infodash"
      />

      {imageSrc && (
        <>
          <div className="relative h-[200px] w-[400px] rounded-t-lg overflow-clip">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1 / 1}
              onCropChange={setCrop}
              cropShape="round"
              showGrid={false}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className="btn rounded-t-none" onClick={showCroppedImage}>
            Selesai
          </div>
        </>
      )}
    </>
  );
}
