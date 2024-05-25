"use client";

import Image from "next/image";
// import React, { useEffect, useState } from "react";

export function ImageGeneratorStatic({ imageUrl, settings }) {
  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   if (image instanceof File) {
  //     const url = URL.createObjectURL(image);
  //     setImageUrl(url);

  //     return () => {
  //       URL.revokeObjectURL(url);
  //     };
  //   }
  // }, [image]);

  return (
    <div
      style={{ padding: `${settings.padding}` }}
      className="flex flex-col size-[400px] border border-zinc-300 rounded-xl items-center justify-center text-zinc-300"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="uploaded-image"
          width={400}
          height={400}
          style={{
            borderRadius: `${settings.radius}`,
            boxShadow: `0 0 ${settings.shadow} rgba(0,0,0,.${settings.shadow})`,
          }}
        />
      ) : (
        "Upload an image first"
      )}
    </div>
  );
}