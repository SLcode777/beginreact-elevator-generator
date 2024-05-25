"use client";

export function FileUploader({ setImage }) {
  return (
    <div className="flex flex-col gap-2">
      <p>File</p>
      <input
        type="file"
        class="file-input file-input-warning file-input-sm w-full max-w-xs"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImage(file);
          }
        }}
      />
    </div>
  );
}
