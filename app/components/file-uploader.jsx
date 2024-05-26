"use client";

export function FileUploader({ setImage, setImageInfo }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setImageInfo({
            width: img.width,
            height: img.height,
            src: e.target.result,
          });
          setImage(file);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p>File</p>
      <input
        type="file"
        className="file-input file-input-warning file-input-sm w-full max-w-xs"
        onChange={handleFileChange}
      />
    </div>
  );
}
