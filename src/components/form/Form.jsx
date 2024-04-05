import React from "react";
import Input from "./Input";
export default function Form ({ formData, handleChange, classes }) {
  return (
    <form className={classes}>
      <div className="grid grid-cols-2 gap-4 gap-y-6 w-full">
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
    </form>
  );
}
