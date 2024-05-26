"use client";

import Image from "next/image";

export function ImageGenerator({ imageUrl, settings }) {
  console.log(imageUrl);

  return (
    <div
      style={{ display: "flex", padding: `${settings.padding}px` }}
      className="flex flex-col size-[400px] border border-zinc-300 rounded-xl items-center justify-center text-zinc-300"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="uploaded-image"
          width={400}
          height={400}
          style={{
            borderRadius: `${settings.radius}px`,
            boxShadow: `0 0 ${settings.shadow}px rgba(0,0,0,.${settings.shadow})`,
          }}
        />
      ) : (
        "Upload an image first"
      )}
    </div>
  );
}
