import React from "react";
import OptionList from "../options/OptionList";
export default function Selector({ param }) {
  const CurrentSelection = () => {
    switch (param) {
      case "dekton":
        return;
    }
  };
  return <OptionList />;
}
