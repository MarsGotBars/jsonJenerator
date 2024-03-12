import React, { useState, useCallback } from "react";
import Form from "../form/Form";
import Btn from "../Btn/Btn";
export default function Login() {
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setInputValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setInputValues]
  );
  
  const handleClick = (e) => {
    e.preventDefault();
    setInputValues({ username: "", password: "" });
  };

  return (
    <div className="absolute w-full h-full grid place-items-center">
      <Form
        cols={"1"}
        formData={inputValues}
        classes={"bg-slate-800 text-white p-4 rounded-md"}
        handleChange={handleChange}
      >
        <Btn classes="w-fit py-1" onClick={handleClick}>
          Log in
        </Btn>
      </Form>
    </div>
  );
}
