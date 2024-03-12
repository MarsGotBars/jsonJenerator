import React, { useState, useCallback } from 'react'
import Form from '../form/Form'
export default function Login() {
    const [inputValues, setInputValues] = useState({
        username: "",
        password: ""
    })
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
  return (
    <div className='absolute w-full h-full grid place-items-center'>
        <Form formData={inputValues} col={1} classes={"bg-slate-800 text-white p-4 rounded-md"} handleChange={handleChange}/>
    </div>
  )
}
