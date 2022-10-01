import React from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; text: string }[];
}

export default function Select({ options, onChange }: Props) {
  return (
    <div>
      <select
        onChange={onChange}
        style={{ borderRadius: "10px", padding: "10px" }}
      >
        {options.map((option) => {
          return <option value={option.value}>{option.text}</option>;
        })}
      </select>
    </div>
  );
}
