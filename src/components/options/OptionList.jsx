import React from "react";
import Option from "./Option";
export default function OptionList({ options }) {
  return (
    <>
      {options.map((item, i) => {
        return <Option option={item} key={i} />;
      })}
    </>
  );
}
