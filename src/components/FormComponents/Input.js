import React from 'react'

export default function Input({text,type,onChange,value,setDisabled}) {
  return (
    <>
        <h6>{text}</h6>
        <input value={value} onChange={onChange} type={type} className="form-control input-size" id={`${text.replace(" ", "")}Input`} aria-describedby={`${text.replace(" ", "")}Help`} disabled={setDisabled}/>
    </>
  )
}
