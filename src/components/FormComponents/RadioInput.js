import React from 'react'

export default function RadioInput({text,id,name,disabled,value,onChange,itsCheked}) {
  return (
    <div className="form-check">
        <input onChange={onChange} value={value} className="form-check-input" type="radio" name={name} id={id} disabled={disabled} checked={itsCheked}/>
        <label className="form-check-label" htmlFor={id}>
          {text}
        </label>
    </div>
  )
}
