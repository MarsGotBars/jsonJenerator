import React from "react";

export default function Input({ inputName, handleChange, data }) {
  return (
    <div>
      <label htmlFor={inputName}>{inputName}</label>
      <input
        onChange={handleChange}
        type="text"
        name={inputName}
        value={data.inputName}
        placeholder={inputName}
      />
    </div>
  );
}
