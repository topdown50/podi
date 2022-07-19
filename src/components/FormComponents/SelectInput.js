import React from 'react'

export default function SelectInput({text,children,onChange,value,setDisable,customClass}) {
  return (
    <div className="form-floating">
        <select value={value} className={`form-select ${customClass}`}onChange={onChange} id={`${text.replace(" ", "")}Input`} aria-label={text} disabled={setDisable}>
            {children}
        </select>
        <label htmlFor={`${text.replace(" ", "")}Input`}>{text}</label>
    </div>
  )
}
