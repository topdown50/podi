import React from 'react'
import Input from '../FormComponents/Input'

export default function BillingAdd({onClose,billAddItem,handleChange,index,setDisable}) {

    return (
        <div className="mb-4">
            <div className="container-fluid border bg-light">
                <div className="close-button d-flex justify-content-end">
                    <span className='icon-click' style={{fontSize: '1.7em', color: 'tomato'}} onClick={onClose}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                </div>
                <div className="row g-2 ps-4 pe-4 pb-4">
                    <div className="col-md align-self-end">
                        <Input onChange={(e) => handleChange(index,'address_line1',e.target.value)} value={billAddItem.address_line1} text='Address Line 1' type='text' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md align-self-end">
                        <Input onChange={(e) => handleChange(index,'address_line2',e.target.value)} value={billAddItem.address_line2} text='Address Line 2' type='text' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChange(index,'city_district',e.target.value)} value={billAddItem.city_district} text='City / District' type='text' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChange(index,'state_province',e.target.value)} value={billAddItem.state_province} text='State / Province' type='text' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChange(index,'postal_code',e.target.value)} value={billAddItem.postal_code} text='Postal Code' type='text' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChange(index,'country',e.target.value)} value={billAddItem.country} text='Country' type='text' setDisabled={setDisable}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
