import React from 'react'
import ItemInformation from './ItemInformation'
import ItemMeasurement from './ItemMeasurement'

export default function ItemForm({item,setItem,title,saveItem,resetForm,button_title,setDisable}) {
  return (
    <div className='p-0 p-md-4'>
        <h1 className='text-center pt-2'>{title}</h1>
        <hr className="bg-secondary border-2 border-top border-secondary"/>
        <ItemInformation item={item} setItem={setItem} setDisable={setDisable}/>
        <h4 className='px-2 pt-4'>Measurement</h4>
        <hr className="bg-secondary border-2 border-top border-secondary"/>
        <ItemMeasurement item={item} setItem={setItem} setDisable={setDisable}/>
        <div className='mx-auto d-flex justify-content-center mb-4'>
            <button onClick={saveItem} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
            <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
        </div>
    </div>
  )
}
