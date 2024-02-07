import React, { createContext, useState, useContext } from "react";

const OptionContext = createContext();

export const OptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  return (
    <OptionContext.Provider
      value={{
        opt: [selectedOption, setSelectedOption],
        dataSelect: [selectedData, setSelectedData],
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export const useOptionContext = () => useContext(OptionContext);
