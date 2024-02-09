import React from "react";
import Input from "./Input";
export default function ({ formData, handleChange, handleSubmit, classes }) {
  return (
    <form className={classes}>
      <div className="grid grid-cols-2 gap-2 w-full">
        {Object.keys(formData).map((item) => {
          return (
            <Input
              key={item}
              inputName={item}
              handleChange={handleChange}
              data={formData[item]}
            />
          );
        })}
      </div>
      <button
        onClick={handleSubmit}
        className=" bg-slate-700 rounded-md w-1/2 h-10 hover:bg-slate-100 hover:text-black duration-200"
      >
        Submit
      </button>
    </form>
  );
}
