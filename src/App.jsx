import logo from "./logo.svg";
import Grid from "./components/layout/Grid";
import Btn from "./components/Btn/Btn";
import React, { useState } from "react";
function App() {
  let defaultCols = 7;
  const [cols, setCols] = useState(7);
  const handleClick = (action) => {
    if (action === "reduce" && cols > 4) {
      // Reduce cols by 1 if it's greater than the minimum value
      setCols(cols - 1);
    } else if (action === "increase" && cols < 10) {
      // Increase cols by 1 if it's less than the maximum value
      setCols(cols + 1);
    } else console.log("error");
  };
  console.log(cols);
  return (
    <div className="content flex flex-col max-h-screen">
      <aside className="flex max-h-[10%] justify-center py-2">
        <Btn onClick={() => handleClick("reduce")} classes="bg-red px-2 mx-3">
          reduce
        </Btn>
        <h1 className="w-fit text-white text-xl font-bold">JSON Jenerator</h1>
        <Btn
          onClick={() => handleClick("increase")}
          classes="bg-lime-500 px-2 mx-3"
        >
          increase
        </Btn>
      </aside>
      <Grid
        col={cols}
        classes="grid grid-rows-2 grid-cols-12 gap-4 p-4 pt-0 flex-grow h-[90%]"
      />
    </div>
  );
}

export default App;
