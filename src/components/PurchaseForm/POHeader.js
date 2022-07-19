import React, { useState } from 'react'
import DatePicker from 'react-date-picker';
import Select from 'react-select'
import useSupplier from '../../hooks/useSupplier';
import { addDays } from '../../utils/CustomFunctions/customFunctions';
import InputAddOns from '../FormComponents/InputAddOns';
import InputFloating from '../FormComponents/InputFloating';
import SelectInput from '../FormComponents/SelectInput';

export default function POHeader({
    purchaseOrder, 
    setPurchaseOrder, 
    orderNumber,
    changeCurrency,
    setChangeCurrency
}) {

    const [suppliers] = useSupplier([])

    return (
        <div className="container-fluid">
            <div className="row p-4">
                <div className="col-md p-1 align-self-end">

                    <h6 className="mt-3">P.O. Date</h6>
                    <DatePicker wrapperClassName="date-picker" onChange={(value) => setPurchaseOrder({...purchaseOrder,po_date: value.toISOString().slice(0, 10)})} value={addDays(purchaseOrder.po_date,1) || ''} format="dd/MMM/y" dayPlaceholder="day" monthPlaceholder="month" yearPlaceholder="year"/>
                    
                    <h6 className="mt-3">Supplier</h6>
                    <Select options={suppliers} onChange={(e) => setPurchaseOrder({...purchaseOrder, supplierID: e.value})} value={suppliers.filter(sup => sup.value === purchaseOrder.supplierID) || ''} placeholder="Supplier"/>
                    
                    <div className="input-space"></div>
                    <SelectInput onChange={(e) => setPurchaseOrder({...purchaseOrder, transport_type: e.target.value})} value={purchaseOrder.transport_type || ''} text="Transport Type">
                        <option value="land">Land</option>
                        <option value="air">Air</option>
                    </SelectInput>
                </div>
                <div className="col-md p-1">
                    
                    <InputFloating value={orderNumber} text="P.O. #" type="text" disabled={true}/>

                    <div className="input-space"></div>
                    <InputFloating onChange={(e) => setPurchaseOrder({...purchaseOrder, status: e.target.value})} value={purchaseOrder.status || ''} text="Status" type="text" disabled={true}/>
                    
                    <div className="input-space"></div>
                    <InputFloating onChange={(e) => setPurchaseOrder({...purchaseOrder, exchange_rate: e.target.value})} value={purchaseOrder.exchange_rate || ''} text="Exchange Rate" type="text" disabled={true}/>

                    <h6 className="mt-3">Exchange Rate Date</h6>
                    <DatePicker wrapperClassName="date-picker" onChange={(value) => setPurchaseOrder({...purchaseOrder, exchange_rate_date: value.toISOString().slice(0, 10)})} value={addDays(purchaseOrder.exchange_rate_date,1) || ''} format="dd/MMM/y" dayPlaceholder="day" monthPlaceholder="month" yearPlaceholder="year" disabled={true}/>
                </div>
                <div className="col-md p-1">
                    <SelectInput customClass={'currencySelect'} onChange={(e) => setChangeCurrency({...changeCurrency, base_currency: e.target.value})} value={changeCurrency.base_currency || ''} text="Base Currency">
                        <option value="cad">CAD</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </SelectInput>

                    <div className="input-space"></div>
                    <SelectInput customClass={'currencySelect'} onChange={(e) => setChangeCurrency({...changeCurrency, convert_to_currency: e.target.value})} value={changeCurrency.convert_to_currency || ''} text="Convert to Currency">
                        <option value="cad">CAD</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </SelectInput>

                    <h6 className="mt-3">Exchange Rate Buffer</h6>
                    <InputAddOns onChange={(e) => setChangeCurrency({...changeCurrency, exchange_buffer: e.target.value})} value={changeCurrency.exchange_buffer || ''} text="Exchange Rate Buffer" type="number" addOn="%"/>

                    <div className="input-space"></div>
                    <SelectInput onChange={(e) => setPurchaseOrder({...purchaseOrder, order_type: e.target.value})} value={purchaseOrder.order_type || ''} text="Order Type">
                        <option value="purchaseOrder">Purchase Order</option>
                        <option value="consolidateShip">Consolidate Shipment</option>
                    </SelectInput>
                </div>
            </div>
            <div className="row ps-3 pe-3 pb-4">
                <div className="col-md">
                    <InputFloating onChange={(e) => setPurchaseOrder({...purchaseOrder, bol_invoice_number: e.target.value})} value={purchaseOrder.bol_invoice_number || ''} text="BOL / Invoice #" type="text"/>
                </div>
            </div>
        </div>
    )
}
