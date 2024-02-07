import React, { useEffect, useState } from "react";
import { useOptionContext } from "../../context/Optioncontext";
import data from "../../data/data";
export default function Jenerator() {
  const { opt, dataSelect } = useOptionContext();
  const [selectedOption] = opt
  const [selectedData] = dataSelect
  return (
    <>
      {selectedData ? (
        <h2>Output: {selectedOption}</h2>
      ) : (
        <h2>Select a template!</h2>
      )}
      {selectedData && (
        <div>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(selectedData, null, 1)}
          </pre>
        </div>
      )}
    </>
  );
}
