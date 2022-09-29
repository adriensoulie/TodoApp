import React from "react";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; text: string }[];
}

export default function Select({ options, onChange }: Props) {
  return (
    <div>
      <select onChange={onChange}>
        {options.map((option) => {
          return <option value={option.value}>{option.text}</option>;
        })}
      </select>
    </div>
  );
}
