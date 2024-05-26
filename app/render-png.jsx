import satori from "satori";
import { ImageGenerator } from "./components/image-preview";
// import { Inter } from "@next/font/google";

// const inter = Inter({
//   subsets: ["latin"],
//   weights: ["400"],
//   display: "swap",
// });

const convertSVGToPNG = (() => {
  if (typeof window === "undefined") {
    return;
  }

  console.log("Start worker", import.meta.url);

  const worker = new Worker(new URL("./resvg-worker.js", import.meta.url));

  const pending = new Map();

  worker.onmessage = (e) => {
    const resolve = pending.get(e.data._id);

    if (resolve) {
      resolve(e.data);
      pending.delete(e.data._id);
    }
  };

  return async ({ svg, width }) => {
    const message = {
      _id: Math.random(),
      svg,
      width,
    };

    worker.postMessage(message);

    return new Promise((resolve) => {
      pending.set(message._id, resolve);
    });
  };
})();

const CANVAS_SIZE = 400;

export async function renderPNG({ image, settings }) {
  console.log(image);

  const imageURL = URL.createObjectURL(image);
  console.log(imageURL);

  const scale = image.width / CANVAS_SIZE;
  // console.log(scale);

  const newSettings = {
    padding: settings.padding,
    shadow: settings.shadow,
    radius: settings.radius,
  };

  console.log(newSettings);

  // const fontPath = "/fonts/Inter-Regular.ttf";

  const svg = await satori(
    <ImageGenerator settings={newSettings} imageUrl={imageURL} />,
    {
      width: image.width,
      height: image.height,
      // fonts: [
      //   {
      //     name: "Inter",
      //     data: await fetch(fontPath).then((res) => res.arrayBuffer()),
      //     weight: 400,
      //     style: "normal",
      //   },
      // ],
    }
  );

  // URL.revokeObjectURL(imageURL);

  const messageData = await convertSVGToPNG?.({
    svg,
    width: image.width,
  });

  return messageData;
}
