import React from "react";
import Input from "./Input";
export default function ({ cols, formData, handleChange, classes, children }) {
  return (
    <form className={classes} onSubmit={(e) => e.preventDefault()}>
      <div className={`grid grid-cols-${cols ? cols : 1} gap-4 w-full place-items-center`}>
        {Object.keys(formData).map((item) => (
          <Input
            key={item}
            inputName={item}
            handleChange={handleChange}
            data={formData[item]}
          />
        ))}
        {children}
      </div>
    </form>
  );
}
