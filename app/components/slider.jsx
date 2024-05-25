"use client";


export function Slider({ title, value, setValue }) {
  const handleSliderChange = (e) => {
    setValue(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <p>
        {title} {value}
      </p>
      <input
        type="range"
        min={0}
        max="100"
        value={value}
        onChange={handleSliderChange}
        className="range range-warning range-sm"
      />
    </div>
  );
}
