import logo from "./logo.svg";
import Grid from "./components/layout/Grid";
import Btn from "./components/Btn/Btn";
import React, { useState } from "react";
function App() {
  const maxCols = 9
  const minCols = 4
  const [cols, setCols] = useState(7);
  const handleClick = (action) => {
    if (action === "reduce" && cols > minCols) {
      // Reduce cols by 1 if it's greater than the minimum value
      setCols(cols - 1);
    } else if (action === "increase" && cols < maxCols) {
      // Increase cols by 1 if it's less than the maximum value
      setCols(cols + 1);
    } else console.log("error");
  };
  return (
    <div className="content flex flex-col max-h-screen">
      <aside className="flex max-h-[10%] justify-center py-2">
        <Btn disabled={cols <= minCols} onClick={() => handleClick("reduce")} classes={`enabled:bg-red bg-slate-400 px-2 mx-3`}>
          reduce
        </Btn>
        <h1 className="w-fit text-white text-xl font-bold">JSON Jenerator</h1>
        <Btn
          disabled={cols >= maxCols}
          onClick={() => handleClick("increase")}
          classes="enabled:bg-lime-500 bg-slate-400 px-2 mx-3"
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
