import React from 'react'

export default function InputAddOns({text,type,addOn,disabled,value,onChange}) {
  return (
    <div className="input-group input-size">
        <input onChange={onChange} value={value} type={type} className="form-control" aria-label={text} placeholder={text} disabled={disabled}/>
        <span className="input-group-text">{addOn}</span>
    </div>
  )
}
