import React from "react";
import Jenerator from "../jenerator/Jenerator";
import Selector from "../selector/Selector";
export default function Grid() {
  return (
    <main className="grid grid-rows-2 grid-cols-2 gap-4 p-4 pt-0 flex-grow">
      <div>
        <label htmlFor="name">product name</label>
        <input
          name="name"
          type="text"
          className="bg-red-500 max-w-[12.5vw] border-2"
        />
      </div>
      <div className="row-span-2">
        <Jenerator />
      </div>
      <div className="grid grid-cols-3 grid-rows-3 place-items-center">
        <Selector />
      </div>
    </main>
  );
}
