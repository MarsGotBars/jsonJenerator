import React from "react";

export default function Input({ inputName, handleChange, data }) {
  return (
    <div>
      <label className="text-lg font-semibold" htmlFor={inputName}>{inputName}</label>
      <input
      className="rounded-lg rounded-tl-none rounded-br-none"
        onChange={handleChange}
        type="text"
        name={inputName}
        value={data.inputName}
        placeholder={inputName}
      />
    </div>
  );
}
