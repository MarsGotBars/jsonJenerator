import React, { useEffect, useState } from "react";
import data from "../../data/data";

export default function Option({ option, onClick }) {
  const [content, setContent] = useState();

  useEffect(() => {
    if(data){
        setContent(data);
    } else return
  }, [data]);
  return (
    <div onClick={(onClick)}>
      <h3 className="text-l font-bold">{option}</h3>
    </div>
  );
}
