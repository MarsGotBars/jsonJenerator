import React from 'react'

export default function Btn({onClick, classes = "", children}) {
  return (
    <button onClick={onClick} className={`text-white hover:bg-white hover:text-slate-500 duration-200 rounded-sm ${classes}`}>{children}</button>
  )
}
