"use client";

import { renderPNG } from "./render-png";
import { Slider } from "./components/slider";
import { FileUploader } from "./components/file-uploader";
import { ImageGenerator } from "./components/image-preview";
import { useState, useEffect } from "react";

export default function App() {
  const [value, setValue] = useState({
    padding: 50,
    shadow: 50,
    radius: 50,
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageInfo, setImageInfo] = useState(null);

  console.log(imageInfo);
  console.log(imageUrl);
  console.log(image);

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);

      // return () => {
      //   URL.revokeObjectURL(url);
      // };
    }
  }, [image]);

  // useEffect(() => {
  //   document.fonts.load('10pt "Inter"');
  // }, []);

  // console.log(imageUrl);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-700">
      <div className="flex flex-row min-w-screen  max-w-[864px] gap-[64px] fit-content">
        <div className="flex flex-col size-[400px] bg-zinc-800 rounded-xl p-8 drop-shadow-xl shadow-yellow-400 ">
          <div className="mb-4 text-xl font-bold">
            <h1>Settings</h1>
          </div>
          <div className="flex flex-col gap-4 font-light ">
            <FileUploader setImage={setImage} setImageInfo={setImageInfo} />
            <Slider
              title="Padding"
              value={value.padding}
              setValue={(newValue) =>
                setValue((prev) => ({ ...prev, padding: Number(newValue) }))
              }
            />
            <Slider
              title="Shadow"
              value={value.shadow}
              setValue={(newValue) =>
                setValue((prev) => ({ ...prev, shadow: Number(newValue) }))
              }
            />

            <Slider
              title="Radius"
              value={value.radius}
              setValue={(newValue) =>
                setValue((prev) => ({ ...prev, radius: Number(newValue) }))
              }
            />
          </div>
        </div>
        <ImageGenerator
          imageUrl={imageUrl}
          settings={value}
          imageInfo={imageInfo}
        />
      </div>
      <div className="mt-4  flex flex-row gap-4 justify-end min-w-screen max-w-[864px] w-full ">
        <button
          className="btn bg-warning hover:bg-primary text-zinc-800"
          disabled={!image}
          onClick={async () => {
            console.log(image);

            const { blob } = await renderPNG({
              image,
              settings: value,
              imageInfo,
            });
            console.log(image);
            const url = URL.createObjectURL(blob);

            // Fais en sorte de télécharger l'image ici
            const link = document.createElement("a");
            console.log(link);
            link.href = url;
            link.download = "image.png";
            link.click();
          }}
        >
          Download
        </button>
        <button className="btn bg-warning hover:bg-primary text-zinc-800">
          Copy
        </button>
      </div>
      <svg
        width="62"
        height="62"
        viewBox="0 0 62 62"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="satori_om-id">
          <rect x="0" y="0" width="62" height="62" fill="#fff" />
        </mask>
        <mask id="satori_ms-id-0-0" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
          <rect
            x="31"
            y="31"
            width="0"
            height="0"
            fill="#000"
            stroke-width="0"
          />
        </mask>
        <defs>
          <filter
            id="satori_s-id-0-0"
            x="-Infinity%"
            y="-Infinity%"
            width="Infinity%"
            height="Infinity%"
          >
            <feGaussianBlur stdDeviation="25" result="b" />
            <feFlood
              flood-color="rgba(0,0,0,.50)"
              in="SourceGraphic"
              result="f"
            />
            <feComposite in="f" in2="b" operator="in" />
          </filter>
        </defs>
        <g
          mask="url(#satori_ms-id-0-0)"
          filter="url(#satori_s-id-0-0)"
          opacity="1"
        >
          <rect
            x="31"
            y="31"
            width="0"
            height="0"
            fill="#fff"
            stroke="#fff"
            stroke-width="0"
          />
        </g>
        <mask id="satori_om-id-0">
          <rect x="31" y="31" width="0" height="0" fill="#fff" />
        </mask>
      </svg>
    </main>
  );
}
