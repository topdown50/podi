import React from 'react'
import InputFloating from '../FormComponents/InputFloating'
import DatePicker from 'react-date-picker';
import Select from 'react-select'
import { addDays } from '../../utils/CustomFunctions/customFunctions';
import useCustomer from '../../hooks/useCustomer';
import useShipTo from '../../hooks/useShipTo';
import useBillTo from '../../hooks/useBillTo';

export default function SaleInfo({
  saleNumber,
  saleOrder,
  setSaleOrder,
  customerSelected,
  setCustomerSelected,
  setDisable
}) {

  const [customers] = useCustomer()
  const [shippingAddress] = useShipTo(customerSelected)
  const [billingAddress] = useBillTo(customerSelected)

  return (
    <div className="container-fluid">
      <div className="row px-4">
        <div className="col-md p-1 align-self-end">
          <InputFloating value={saleNumber} text="Invoice #" type="text" disabled={true}/>
        </div>
        <div className="col-md p-1 align-self-end">
          <h6 className="mt-3">P.O. Date</h6>
          <DatePicker onChange={(value) => setSaleOrder({...saleOrder,invoice_date: value.toISOString().slice(0, 10)})} value={addDays(saleOrder.invoice_date,1) || ''} wrapperClassName="date-picker" format="dd/MMM/y" dayPlaceholder="day" monthPlaceholder="month" yearPlaceholder="year" disabled={setDisable}/>
        </div>
        <div className="col-md p-1 align-self-end">
          <h6 className="mt-3">Customer</h6>
          <Select options={customers} onChange={(e) => setCustomerSelected(e.value)} value={customers.filter(customer => customer.value === customerSelected) || ''} placeholder="Customer" isDisabled={setDisable}/>
        </div>
      </div>
      <div className="row px-4">
        <div className="col-md p-1 align-self-end">
          <h6 className="mt-3">Ship to</h6>
          <Select options={shippingAddress} onChange={(e) => setSaleOrder({...saleOrder,shippingaddressID: e.value})} value={shippingAddress.filter(shippingAdd => shippingAdd.value === saleOrder.shippingaddressID) || ''} placeholder="Ship to" isDisabled={setDisable}/>
        </div>
        <div className="col-md p-1 align-self-end">
          <h6 className="mt-3">Bill to</h6>
          <Select options={billingAddress} onChange={(e) => setSaleOrder({...saleOrder,billingaddressID: e.value})} value={billingAddress.filter(billingAdd => billingAdd.value === saleOrder.billingaddressID) || ''} placeholder="Bill to" isDisabled={setDisable}/>
        </div>
      </div>
      <div className="row p-4">
        <div className="col-md p-1 align-self-end">
          <InputFloating onChange={(e) => setSaleOrder({...saleOrder,status: e.target.value})} value={saleOrder.status || ''} text="Status" type="text" disabled={true}/>
        </div>
        <div className="col-md p-1 align-self-end">
          <InputFloating onChange={(e) => setSaleOrder({...saleOrder,purchase_number: e.target.value})} value={saleOrder.purchase_number || ''} text="Purchase Order #" type="text" disabled={setDisable}/>
        </div>
        <div className="col-md p-1 align-self-end">
          <InputFloating onChange={(e) => setSaleOrder({...saleOrder,confirmation_number: e.target.value})} value={saleOrder.confirmation_number || ''} text="Confirmation #" type="text" disabled={setDisable}/>
        </div>
      </div>
    </div>
  )
}
