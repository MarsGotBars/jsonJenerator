import React, { useEffect, useState } from "react";
import Jenerator from "../jenerator/Jenerator";
import OptionList from "../options/OptionList";
import { OptionProvider } from "../../context/Optioncontext";
import Customizer from "../customizer/Customizer";
import data from "../../data/data";
export default function Grid({ classes }) {
  const [variation, setVariation] = useState();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    addToArray();
  }, []);
  const addToArray = () => {
    let ObjArray = [];
    for (const key in data) {
      ObjArray.push(key);
    }
    setOptions(ObjArray);
  };

  return (
    <OptionProvider>
      <main className={`${classes}`}>
        <div className="col-span-2 justify-evenly">
          <Customizer/>
        </div>
        <div className="row-span-2 col-span-3 overflow-y-scroll">
          <Jenerator />
        </div>
        <div className="grid col-span-2 grid-cols-3 grid-rows-3 gap-2">
          <OptionList options={options} />
        </div>
      </main>
    </OptionProvider>
  );
}
