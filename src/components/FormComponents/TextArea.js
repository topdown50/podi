import React from 'react'

export default function TextArea({text,type,disabled,value,onChange,style}) {
    return (
        <div className="form-floating">
            <textarea style={style} onChange={onChange} value={value} type={type} className="form-control" placeholder={text} id={`${text.replace(" ", "")}TextArea`} disabled={disabled}></textarea>
            <label htmlFor={`${text.replace(" ", "")}TextArea`}>{text}</label>
        </div>
    )
}
