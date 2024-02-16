import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

const OptionContext = createContext();

export const OptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [customData, setCustomData] = useState(null);
  const [formattedDescription, setFormattedDescription] = useState("");

  useEffect(() => {
    addDescription();
  }, [formattedDescription]);

  const addDescription = useMemo(() => {
    return () => {
      formattedDescription &&
        setCustomData((customData.description = formattedDescription));
    };
  }, [formattedDescription, selectedData]);

  useEffect(() => {
    addDescription();
  }, [selectedOption]);

  return (
    <OptionContext.Provider
      value={{
        opt: [selectedOption, setSelectedOption],
        dataSelect: [selectedData, setSelectedData],
        myData: [customData, setCustomData],
        format: [formattedDescription, setFormattedDescription],
      }}
    >
      {children}
    </OptionContext.Provider>
  );
};

export const useOptionContext = () => useContext(OptionContext);
