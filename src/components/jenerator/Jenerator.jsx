import React, { useEffect, useState } from "react";
import { useOptionContext } from "../../context/Optioncontext";
import Title from "../layout/Title";
import data from "../../data/data";
export default function Jenerator() {
  const { opt, dataSelect } = useOptionContext();
  const [selectedOption] = opt
  const [selectedData] = dataSelect
  return (
    <>
      {selectedData ? (
        <Title>Output: {selectedOption}</Title>
      ) : (
        <Title>Select a template!</Title>
      )}
      {selectedData && (
        <>
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(selectedData, null, 1)}
          </pre>
        </>
      )}
    </>
  );
}
