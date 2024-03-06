import React from "react";

export default function Input({ inputName, handleChange, data }) {
  return (
    <div>
      <label className="text-lg font-semibold" htmlFor={inputName}>{inputName}</label>
      <input
      className="rounded-lg rounded-tl-none rounded-br-none focus:text-white hover:bg-slate-400 focus:bg-slate-400 duration-150 border-transparent border-2 hover:border-red focus:border-red focus:outline-red ease-in transition-all focus:placeholder:text-gray-300 hover:placeholder:text-gray-300"
        onChange={handleChange}
        type="text"
        name={inputName}
        id={inputName}
        value={data.inputName}
        placeholder={inputName}
      />
    </div>
  );
}
