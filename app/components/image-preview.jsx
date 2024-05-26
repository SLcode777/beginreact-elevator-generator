"use client";

import Image from "next/image";

export function ImageGenerator({ imageUrl, settings, imageInfo }) {
  console.log(imageUrl);
  console.log(imageInfo);

  if (imageInfo) {
    console.log(imageInfo.src);
    console.log(imageInfo.width);
    console.log(imageInfo.height);
  }

  if (!imageInfo || !imageUrl || !settings) {
    return (
      <div className="flex flex-col size-[400px] border border-zinc-300 rounded-xl items-center justify-center text-zinc-300">
        Upload an image first
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", padding: `${settings.padding}px` }}
      className="flex flex-col size-[400px] border border-zinc-300 rounded-xl items-center justify-center text-zinc-300"
    >
      <Image
        src={imageInfo.src}
        alt="uploaded-image"
        width={imageInfo.width}
        height={imageInfo.height}
        style={{
          borderRadius: `${settings.radius}px`,
          boxShadow: `0 0 ${settings.shadow}px rgba(0,0,0,.${settings.shadow})`,
        }}
      />
    </div>
  );
}
