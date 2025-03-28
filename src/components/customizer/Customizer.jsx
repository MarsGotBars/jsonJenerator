import React, { useCallback, useEffect, useState } from "react";
import Btn from "../Btn/Btn";
import text from "../../data/text";
import { useOptionContext } from "context/Optioncontext";
import Form from "components/form/Form";
import Title from "components/layout/Title";
export default function Customizer() {
  const { dataSelect, opt, myData, state } = useOptionContext();
  // eslint-disable-next-line
  const [ready, setReady] = state;
  const [selectedOption] = opt;
  const [selectedData] = dataSelect;
  // eslint-disable-next-line
  const [customData, setCustomData] = myData;
  const [vars, setVars] = useState(0)
  const [inputValues, setInputValues] = useState({
    naam: "",
    SKUs: "",
    afwerking: "",
    // eslint-disable-next-line
    "keukenblad dikte": "",
    prijzen: "",
    gewichten: "",
    publish: false,
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

  const changeCurrentDescription = useCallback(() => {
    let description = "";
    const words = inputValues.naam.split(/\s+/);
    const uniqueWords = [];
    const uniqueLowercaseWords = [];

    words.forEach((word) => {
      const lowercaseWord = word.toLowerCase();
      if (!uniqueLowercaseWords.includes(lowercaseWord)) {
        uniqueWords.push(word);
        uniqueLowercaseWords.push(lowercaseWord);
      }
    });
    const name = uniqueWords.join(" ");
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
    let allValuesFilled = true;
    Object.values(inputValues).forEach((val) => {
      // Check if val is a string before calling trim()
      if (typeof val === "string" && val.trim() === "") {
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
        // eslint-disable-next-line
        ["keukenblad dikte"]: keukenbladDikte,
        publish,
        ...variationData
      } = inputValues;
      // SKU data
      let splitSKU = SKUs.toUpperCase().split(" ");
      let productSKU = splitSKU[0] + "a";
      inputData.sku = productSKU;
      // ! SKU data
      const diktes =
        keukenbladDikte.length !== 0
          ? /(\d+(?:,\d+)?(?:-\d+(?:,\d+)?)? cm(?: opgedikt)?(?: \(\d+(\s*)(?:\+\d+)?mm\))?)/g.test(
              keukenbladDikte
            )
            ? keukenbladDikte.match(
              /(\d+(?:,\d+)?(?:-\d+(?:,\d+)?)? cm(?: opgedikt)?(?: \(\d+(\s*)(?:\+\d+)?mm\))?)/g
              )
            : ""
          : "";

      inputData.status = publish ? "publish" : "draft";
      // ! format thickness
      const attributes = inputData.attributes;

      for (const atr in attributes) {
        if (attributes[atr].name === "Keukenblad dikte")
          attributes[atr].options = diktes;
      }

      // attributes and variation generation
      const prijzen = variationData.prijzen.split(" ");
      const gewichten = variationData.gewichten.split(" ");
      const afwerkingen = variationData.afwerking.split(" ");

      // refactor this, as it shouldn't be a loop
      afwerkingen.forEach((afwerking, index) => {
        if (
          (!afwerking ||
            !diktes[index] ||
            !splitSKU[index] ||
            !prijzen[index] ||
            !gewichten[index])
        ) {
          return; // Skip this iteration
        }
        let variation = {
          menu_order: index,
          attributes: [
            {
              id: 18,
              name: "Keukenblad dikte",
              option: diktes[index] ? diktes[index] : "empty",
            },
            {
              id: 1,
              name: "Afwerking",
              option: afwerking,
            },
          ],
          sku: splitSKU[index],
          regular_price: prijzen[index],
          sale_price: prijzen[index],
          weight: gewichten[index],
        };
        console.log(variation.attributes[0].option);
        variants.push(variation);
      });
      setVars(variants.length);
      const variantAttributes = variants.length > 0 && variants[0]["attributes"];
      const hasValues = variantAttributes && variantAttributes.every(
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
        inputData.name &&
        inputData.name
          .toLowerCase()
          .split(" ")
          .join("-")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      return inputData;
    },
    [changeCurrentDescription]
  );

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

  const findStrInObj = useCallback((obj, name, toReplace) => {
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
  }, []);

  const handleFind = useCallback(
    (inputValues) => {
      const words = inputValues.naam.split(/\s+/);
      const uniqueWords = [];
      const uniqueLowercaseWords = [];

      words.forEach((word) => {
        const lowercaseWord = word.toLowerCase();
        if (!uniqueLowercaseWords.includes(lowercaseWord)) {
          uniqueWords.push(word);
          uniqueLowercaseWords.push(lowercaseWord);
        }
      });
      const uniqueName = uniqueWords.join(" ");
      const updatedData = findStrInObj(selectedData, uniqueName, "Replace-me");
      // Generate custom data
      const customData = handleGeneration(inputValues, updatedData);

      // Update the customData state only once at the end
      setCustomData(customData);
    },
    [selectedData, handleGeneration, findStrInObj, setCustomData]
  );

  useEffect(() => {
    if (selectedOption) {
      handleFind(inputValues);
    }
  }, [inputValues, selectedOption, handleFind]);

  const filteredFormData = Object.keys(inputValues)
    .filter((key) => key !== "publish")
    .reduce((obj, key) => {
      obj[key] = inputValues[key];
      return obj;
    }, {});

  const swap = () => {
    setInputValues((prevState) => ({
      ...prevState,
      publish: !prevState.publish, // Toggling the value of publish
    }));
  };
  return (
    <>
      <Title classes={"font-bold text-lg text-center"}>
        Submit your data here
      </Title>
      <Form
        formData={filteredFormData}
        handleChange={handleChange}
        classes={"flex flex-col items-center gap-6"}
      />
      <div className="w-full flex justify-center relative">
        <Btn
          onClick={swap}
          classes={`${
            !inputValues.publish ? "bg-red" : "bg-lime-500"
          } w-fit place-self-center px-3 py-1`}
        >
          {inputValues.publish ? "public" : "draft"}
        </Btn>
        {vars > 0 && <div className="absolute right-0 top-1/2 -translate-y-1/2 text-center">
          <p>{vars}</p>
          <span>variation{vars > 1 ? 's' : ''}</span>
        </div>}
      </div>
    </>
  );
}
