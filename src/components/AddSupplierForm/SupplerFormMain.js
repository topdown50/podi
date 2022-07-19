import React from 'react'
import InputFloating from '../FormComponents/InputFloating'

export default function SupplerFormMain({supplier, setSupplier, setDisable}) {
    return (
        <div className="container-flud">
            <div className="row px-4 pt-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setSupplier({...supplier, name: e.target.value})} value={supplier.name || ''} text="Supplier Name" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setSupplier({...supplier, short_name: e.target.value})} value={supplier.short_name || ''} text="Supplier Short Name" type="text" disabled={setDisable}/>
                </div>
            </div>
             <div className="row px-4 pb-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setSupplier({...supplier, phone: e.target.value})} value={supplier.phone || ''} text="Phone" type="tel" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setSupplier({...supplier, purchasing_email: e.target.value})} value={supplier.purchasing_email || ''} text="Purchasing Email" type="email" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">                    
                    <InputFloating onChange={(e) => setSupplier({...supplier, zb_contact_i: e.target.value})} value={supplier.zb_contact_id || ''} text="Contact ID ZB" type="text" disabled={true}/>
                </div>
             </div>
        </div>
    )
}
