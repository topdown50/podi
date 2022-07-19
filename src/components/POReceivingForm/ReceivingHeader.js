import React from 'react'
import DatePicker from 'react-date-picker'
import { addDays } from '../../utils/CustomFunctions/customFunctions'
import InputFloating from '../FormComponents/InputFloating'

export default function ReceivingHeader({
    orderNumber,
    purchaseOrder,
    setPurchaseOrder
}) {
    return (
        <div className="container-fluid">
            <div className="row px-4">
                <div className="col-md p-1 align-self-end">
                    <InputFloating value={orderNumber} text="P.O. #" type="text" disabled={true}/>
                </div>
            
                <div className="col-md p-1 align-self-end">
                    <h6 className="mt-3">P.O. Date</h6>
                    <DatePicker wrapperClassName="date-picker" onChange={(value) => setPurchaseOrder({...purchaseOrder,po_date: value.toISOString().slice(0, 10)})} value={addDays(purchaseOrder.po_date,1) || ''} format="dd/MMM/y" dayPlaceholder="day" monthPlaceholder="month" yearPlaceholder="year" disabled={true}/>
                </div>
                <div className="col-md p-1 align-self-end">
                    <InputFloating onChange={(e) => setPurchaseOrder({...purchaseOrder, status: e.target.value})} value={purchaseOrder.status || ''} text="Status" type="text" disabled={true}/>
                </div>
            </div>
        </div>
    )
}
