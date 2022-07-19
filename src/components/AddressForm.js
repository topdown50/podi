import React from 'react'
import InputFloating from './FormComponents/InputFloating'

export default function AddressForm({address,setAddress,setDisable}) {
  return (
    <div className="container-fluid">
        <h4 className='ps-2 pt-2'>Address</h4>
        <hr className="bg-secondary border-2 border-top border-secondary"/>

        <div className="row ps-4 pe-4 pb-4">
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setAddress({...address, address_line1: e.target.value})} value={address.address_line1 || ''} text="Address Line 1" type="text" disabled={setDisable}/>
                <div className='mt-3'></div>
                <InputFloating onChange={(e) => setAddress({...address, city_district: e.target.value})} value={address.city_district || ''} text="City / District" type="text" disabled={setDisable}/>
                <div className='mt-3'></div>
                <InputFloating onChange={(e) => setAddress({...address, postal_code: e.target.value})} value={address.postal_code || ''} text="Postal Code" type="text" disabled={setDisable}/>
            </div>
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setAddress({...address, address_line2: e.target.value})} value={address.address_line2 || ''} text="Address Line 2" type="text" disabled={setDisable}/>
                <div className='mt-3'></div>
                <InputFloating onChange={(e) => setAddress({...address, state_province: e.target.value})} value={address.state_province || ''} text="State / Province" type="text" disabled={setDisable}/>
                <div className='mt-3'></div>
                <InputFloating onChange={(e) => setAddress({...address, country: e.target.value})} value={address.country || ''} text="Country" type="text" disabled={setDisable}/>
            </div>
        </div>
    </div>
  )
}
