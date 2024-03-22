import React, { createContext, useState, useContext } from "react";

const OptionContext = createContext();

export const OptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [customData, setCustomData] = useState(null);
  const [amountVariations, setAmountvariations] = useState(0);
  const [amountFailures, setAmountFailures] = useState(0)
  const [ready, setReady] = useState(false)
  return (
    <OptionContext.Provider
      value={{
        opt: [selectedOption, setSelectedOption],
        dataSelect: [selectedData, setSelectedData],
        myData: [customData, setCustomData],
        vars: [amountVariations, setAmountvariations],
        failures: [amountFailures, setAmountFailures],
        state: [ready, setReady],
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export const useOptionContext = () => useContext(OptionContext);
