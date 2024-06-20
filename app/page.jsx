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
    </main>
  );
}
