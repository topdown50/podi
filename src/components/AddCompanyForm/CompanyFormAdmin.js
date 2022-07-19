import React from 'react'
import InputFloating from '../FormComponents/InputFloating'

export default function CompanyFormAdmin({company,setCompany,setDisable}) {
  return (
    <div className="container-fluid">
        <div className="row p-4">
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setCompany({...company, purchasing_count: parseInt(e.target.value)})} value={company.purchasing_count} text="Purchasing Count" type="number" disabled={setDisable}/>
            </div>
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setCompany({...company, invoice_count: parseInt(e.target.value)})} value={company.invoice_count} text="Invoice Count" type="number" disabled={setDisable}/>
            </div>
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setCompany({...company, scrap_count: parseInt(e.target.value)})} value={company.scrap_count} text="Scrap Count" type="number" disabled={setDisable}/>
            </div>
        </div>
        <div className="row ps-4 pe-4 pb-4">
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setCompany({...company, serial_reference: parseInt(e.target.value)})} value={company.serial_reference || ''} text="Serial Reference" type="number" disabled={setDisable}/>
            </div>
            <div className="col-md p-1">
                <InputFloating onChange={(e) => setCompany({...company, extension_digit: parseInt(e.target.value)})} value={company.extension_digit || ''} text="Extension Digit" type="number" disabled={setDisable}/>
            </div>
        </div>
    </div>
  )
}
