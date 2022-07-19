import React from 'react'
import useSupplier from '../../hooks/useSupplier'
import InputFloating from '../FormComponents/InputFloating'
import Select from 'react-select'

export default function CreateBill({
    billInfo,
    setBillInfo
}) {

    const [suppliers] = useSupplier([])

    return (
        <div className="container-fluid">
            <div className="row p-4">
                <div className="col-md p-1 align-self-end">
                    <InputFloating onChange={(e) => setBillInfo({...billInfo, invoice_number: e.target.value})} value={billInfo.invoice_number || ''} text="Invoice Number" type="text"/>
                </div>
                <div className="col-md p-1 align-self-start">
                    <h6>Supplier</h6>
                    <Select options={suppliers} onChange={(e) => setBillInfo({...billInfo, supplierID: e.value})} value={suppliers.filter(sup => sup.value === billInfo.supplierID) || ''} placeholder="Supplier"/>
                </div>
            </div>
        </div>
    )
}
