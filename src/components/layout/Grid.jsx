import React, { useEffect, useState } from "react";
import Jenerator from "components/jenerator/Jenerator";
import OptionList from "components/options/OptionList";
import { OptionProvider } from "context/Optioncontext";
import Customizer from "components/customizer/Customizer";
import data from "data/data";
export default function Grid({ classes }) {
  const [variation, setVariation] = useState();
  const [options, setOptions] = useState([]);
  const bool = false;
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
        <div className="row-span-2 col-span-3">
          <Jenerator />
        </div>
        <div className="grid col-span-2 grid-cols-3 grid-rows-3 gap-2">
          {!bool ? <OptionList options={options} /> : <>hi</>}
        </div>
      </main>
    </OptionProvider>
  );
}
