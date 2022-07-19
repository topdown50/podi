import React from 'react'

export default function CheckInput({id,text,value,itsCheked,onChange,disabled}) {
  return (
    <div className="form-check">
        <input onChange={onChange} className="form-check-input" type="checkbox" value={value} id={id} checked={itsCheked} disabled={disabled}/>
        <label className="form-check-label" htmlFor={id}>
            {text}
        </label>
    </div>
  )
}
