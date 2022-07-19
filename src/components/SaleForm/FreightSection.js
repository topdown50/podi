import React from 'react'
import InputFloating from '../FormComponents/InputFloating'
import NormalSelectInput from '../FormComponents/NormalSelectInput'

export default function FreightSection({
  saleOrder,
  setSaleOrder,
  setDisable
}) {
  return (
    <div className="container-fluid">
      <div className="row px-4">
        <div className="col-md p-1 align-self-end">
          <NormalSelectInput onChange={(e) => setSaleOrder({...saleOrder,delivery_type: e.target.value})} value={saleOrder.delivery_type || ''} text="Delivery Type" setDisable={setDisable}>
              <option value="local">Local</option>
              <option value="pickup">Pickup</option>
              <option value="freight">Freight</option>
          </NormalSelectInput>
        </div>
        <div className="col-md p-1 align-self-end">
          <InputFloating onChange={(e) => setSaleOrder({...saleOrder,charge: parseFloat(e.target.value)})} value={saleOrder.charge || ''} text="Charge" type="number" disabled={setDisable}/>
        </div>
      </div>
    </div>
  )
}
