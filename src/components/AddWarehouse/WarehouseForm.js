import React from 'react'
import AddressForm from '../AddressForm'
import WarehouseMain from './WarehouseMain'

export default function WarehouseForm({button_title,warehouse,setWarehouse,address,setAddress,title,saveWarehouse,resetForm,setDisable}) {

    return (
        <div className='p-0 p-md-4'>
            <h1 className='text-center pt-2'>{title}</h1>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <WarehouseMain warehouse={warehouse} setWarehouse={setWarehouse} setDisable={setDisable}/>
            <AddressForm address={address} setAddress={setAddress} setDisable={setDisable}/>
            <div className='mx-auto d-flex justify-content-center mb-4'>
                <button onClick={saveWarehouse} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
                <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
            </div>
        </div>
    )
}
