import React from 'react'

export default function InputFloating({text,type,disabled,value,onChange}) {
  return (
    <div className="form-floating">
        <input onChange={onChange} value={value} type={type} className="form-control" id={`${text.replace(" ", "")}Input`} placeholder={text} disabled={disabled}/>
        <label htmlFor={`${text.replace("test", "success")}`}>{text}</label>
    </div>
  )
}
