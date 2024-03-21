import React, { useCallback, useEffect, useState } from "react";
import { useSendProduct } from "hooks/usePost";
import text from "../../data/text";
import { useOptionContext } from "context/Optioncontext";
import Form from "components/form/Form";
import Title from "components/layout/Title";
export default function Customizer() {
  const { dataSelect, opt, myData, state } = useOptionContext();
  const [ready, setReady] = state;
  const [selectedOption] = opt;
  const [selectedData] = dataSelect;
  const [customData, setCustomData] = myData;

  const [inputValues, setInputValues] = useState({
    naam: "",
    SKUs: "",
    afwerking: "",
    "keukenblad dikte": "",
    prijzen: "",
    gewichten: "",
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setInputValues]
  );

  useEffect(() => {
    let allValuesFilled = true;
    Object.values(inputValues).forEach((val) => {
      if (val.trim() === "") {
        allValuesFilled = false;
      }
    });

    // Set ready based on allValuesFilled
    setReady(allValuesFilled);
  }, [inputValues, setReady]);

  const handleGeneration = useCallback(
    (inputValues, inputData) => {
      const variants = [];
      const {
        naam,
        SKUs,
        ["keukenblad dikte"]: keukenbladDikte,
        ...variationData
      } = inputValues;
      // SKU data
      let splitSKU = SKUs.toUpperCase().split(" ");
      let productSKU = splitSKU[0] + "a";
      inputData.sku = productSKU;
      // ! SKU data
      // format thickness
      const splitRegex = /(\d+(?:,\d+)?(?:-\d+(?:,\d+)?)?)\s*(\w+)/g;
      const dikteObj = {};
      let match;
      let index = 0;

      while ((match = splitRegex.exec(keukenbladDikte)) !== null) {
        dikteObj[index] = `${match[1]} ${match[2]}`;
        if (
          dikteObj[index] === "3,2-8,2 cm" ||
          dikteObj[index] === "2,9-7,9 cm" ||
          dikteObj[index] === "4-8 cm" ||
          dikteObj[index] === "3-8 cm"
        ) {
          dikteObj[index] += " opgedikt in verstek";
        } else dikteObj[index] += " massief";
        index++;
      }
      // ! format thickness
      const attributes = inputData.attributes;
      attributes[0].options = dikteObj;
      // attributes and variation generation
      const prijzen = variationData.prijzen.split(" ");
      const gewichten = variationData.gewichten.split(" ");
      const afwerkingen = variationData.afwerking.split(" ");

      // refactor this, as it shouldn't be a loop
      afwerkingen.forEach((afwerking, index) => {
        if (
          (!afwerking ||
            !dikteObj[index] ||
            !splitSKU[index] ||
            !prijzen[index] ||
            !gewichten[index]) &&
          index !== 0
        ) {
          return; // Skip this iteration
        }
        let variation = {
          menu_order: index,
          attributes: [
            {
              id: 18,
              name: "Keukenblad dikte",
              option: dikteObj[index],
            },
            {
              id: 1,
              name: "Afwerking",
              option: afwerking,
            },
          ],
          sku: splitSKU[index],
          regular_price: prijzen[index],
          weight: gewichten[index],
        };
        variants.push(variation);
      });
      const variantAttributes = variants[0]["attributes"];
      const hasValues = variantAttributes.every(
        (attribute) => attribute.option !== "" && attribute.option !== undefined
      );
      inputData.default_attributes = hasValues ? variants[0]["attributes"] : [];
      inputData.variations = variants;
      // data iteration | Iterate over each key available in variationData
      for (const key in variationData) {
        const uppercaseKey = key.charAt(0).toUpperCase() + key.slice(1);
        // scope current incoming VarData
        let updatedVarData = {};
        // split data
        let data = variationData[key].trim().split(" ");
        // could possibly put variations into here
        for (let j = 0; j < data.length; j++) {
          // create number keys for each instance of data
          updatedVarData[j] = data[j];
        }

        // set attribute specifications
        if (Object.keys(updatedVarData[0]).length !== 0) {
          for (const attr in attributes) {
            const number = attributes[attr];
            if (number.name === uppercaseKey) number.options = updatedVarData;
          }
        }
      }
      // ! data iteration
      // lastly format the correct description!
      inputData.description = changeCurrentDescription();
      inputData.slug =
        inputData.name && inputData.name.toLowerCase().split(" ").join("-");
      return inputData;
    },
    [inputValues, selectedOption]
  );

  const changeCurrentDescription = useCallback(() => {
    let description = "";
    const name = inputValues.naam
          .toLowerCase()
          .split(/\s+/)
          .filter((word, index, array) => array.indexOf(word) === index)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    const keys = Object.keys(text);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (selectedOption === key) {
        description = text[key].replace(/to-replace/g, name);
        break;
      }
    }
    return description;
  }, [inputValues.naam, selectedOption]);

  useEffect(() => {
    changeCurrentDescription();
  }, [inputValues.naam, selectedOption, changeCurrentDescription]);

  const findOccurrences = (str, replacement, toReplace) => {
    const regex = new RegExp(toReplace, "gi");
    return str.replace(regex, () => {
      // Capitalize the first letter of the replacement string
      const capitalizedReplacement =
        replacement.charAt(0).toUpperCase() + replacement.slice(1);
      return capitalizedReplacement;
    });
  };

  const findStrInObj = (obj, name, toReplace) => {
    const updatedObj = { ...obj };
    for (const key in updatedObj) {
      if (typeof updatedObj[key] === "string") {
        updatedObj[key] = findOccurrences(
          updatedObj[key],
          name.trim(),
          toReplace
        );
      } else if (
        typeof updatedObj[key] === "object" &&
        updatedObj[key] !== null
      ) {
        updatedObj[key] = findStrInObj(updatedObj[key], name, toReplace); // Recursively traverse nested objects
      }
    }
    return updatedObj;
  };

  const handleFind = useCallback(
    (inputValues) => {
      if (inputValues.naam.trim() !== "") {
        // Remove duplicate words from the "naam" field
        const uniqueName = inputValues.naam
          .toLowerCase()
          .split(/\s+/)
          .filter((word, index, array) => array.indexOf(word) === index)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      const updatedData = findStrInObj(
        selectedData,
        uniqueName,
        "Replace-me"
      );
      // Generate custom data
      const customData = handleGeneration(inputValues, updatedData);

      // Update the customData state only once at the end
      setCustomData(customData);
      }
    },
    [selectedData, handleGeneration, findStrInObj, setCustomData]
  );

  useEffect(() => {
    if (selectedOption) {
      handleFind(inputValues);
    }
  }, [inputValues, selectedOption]);
  return (
    <>
      <Title classes={"font-bold text-lg text-center"}>
        Submit your data here
      </Title>
      <Form
        formData={inputValues}
        handleChange={handleChange}
        classes={"flex flex-col items-center gap-6"}
      />
      <div></div>
    </>
  );
}
