import React, { useEffect, useState } from "react";
import Jenerator from "components/jenerator/Jenerator";
import OptionList from "components/options/OptionList";
import { OptionProvider } from "context/Optioncontext";
import Customizer from "components/customizer/Customizer";
import data from "data/data";
export default function Grid({ col, classes }) {
  const [options, setOptions] = useState([]);
  const [cols, setCols] = useState({
    Large: 0,
    Rest: 12
  });

  const bool = false;
  useEffect(() => {
    addToArray();
    CalculateGrid(col);
  }, [col]);
  const addToArray = () => {
    let ObjArray = [];
    for (const key in data) {
      ObjArray.push(key);
    }
    setOptions(ObjArray);
  };

  const CalculateGrid = (span) => {
    const col = 12
    const largeCols = span
    const restCols = col - span
    setCols({
      Large: largeCols,
      Rest: restCols
    })
  };

  return (
    <OptionProvider>
      <main className={`${classes}`}>
        <div className={`row-span-1 col-span-${cols.Rest ? cols.Rest : "5"} justify-evenly`}>
          <Customizer/>
        </div>
        <div className={`row-span-2 col-span-${cols.Large ? cols.Large : "7"} pr-4 relative`}>
          <Jenerator />
        </div>
        <div className={`grid col-span-${cols.Rest ? cols.Rest : "5"} row-span-1 grid-cols-3 grid-rows-3 gap-2`}>
          {!bool && <OptionList options={options} />}
        </div>
      </main>
    </OptionProvider>
  );
};
