import React from 'react'

export default function NormalSelectInput({text,children,onChange,value,setDisable}) {
  return (
    <>
    <h6>{text}</h6>
    <select onChange={onChange} value={value} className="form-select input-size" aria-label={text} disabled={setDisable}>
        {children}
    </select>
    </>
  )
}
