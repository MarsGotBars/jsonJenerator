import React from 'react'

export default function Btn({disabled, onClick, classes = "", children}) {
  return (
    <button disabled={disabled} onClick={onClick} className={`text-white px-2 mx-3 enabled:hover:bg-white enabled:cursor-pointer cursor-not-allowed enabled:hover:text-slate-500 duration-200 rounded-sm ${classes}`}>{children}</button>
  )
}
