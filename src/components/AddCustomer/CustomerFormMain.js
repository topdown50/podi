import React from 'react'
import InputFloating from '../FormComponents/InputFloating'

export default function CustomerFormMain({customer, setCustomer, setDisable}) {
    return (
        <div className="container-flud">
            <div className="row px-4 pt-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCustomer({...customer, company_name: e.target.value})} value={customer.company_name || ''} text="Company Name" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCustomer({...customer, name: e.target.value})} value={customer.name || ''} text="Name" type="text" disabled={setDisable}/>
                </div>
            </div>
             <div className="row px-4 pb-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCustomer({...customer, phone: e.target.value})} value={customer.phone || ''} text="Phone" type="tel" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCustomer({...customer, email: e.target.value})} value={customer.email || ''} text="A/P Email" type="email" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">                    
                    <InputFloating onChange={(e) => setCustomer({...customer, zb_contact_id: e.target.value})} value={customer.zb_contact_id || ''} text="Contact ID ZB" type="text" disabled={true}/>
                </div>
             </div>
        </div>
    )
}
