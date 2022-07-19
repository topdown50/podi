import React, { useState } from 'react'
import CheckInput from '../FormComponents/CheckInput'
import AirCharges from './AirCharges'
import ChargesExchange from './ChargesExchange'
import CreateBill from './CreateBill'
import LandCharges from './LandCharges'
import POHeader from './POHeader'
import POItems from './POItems'

export default function PurchaseOrderForm({
    resetForm,
    button_title,
    purchaseOrder,
    setPurchaseOrder,
    orderItems,
    SetOrderItems,
    deletedItem,
    setDeletedItem,
    handleChangeItems,
    setDisable,
    orderNumber,
    rates,
    setRates,
    charges,
    setCharges,
    changeCurrency,
    setChangeCurrency,
    totals,
    setTotals,
    savePurchaseOrder,
    billInfo,
    setBillInfo
  }) {

  const addOrderItem = () => {
    let currentOrderItems = [...orderItems]
    let itemID = currentOrderItems.length
    currentOrderItems.push({
      id: itemID,
      typeMeasure: 'case'
    })
    SetOrderItems(currentOrderItems)
  }

  const onClose = (id,itemToDelete) => {
    const OrderItemIndex = orderItems.findIndex(orderItem => orderItem.id === id)
    const newOrderItems = [...orderItems]
    newOrderItems.splice(OrderItemIndex,1)
    setDeletedItem([...deletedItem,itemToDelete])
    SetOrderItems(newOrderItems)
  }

  const [hideFields, setHideFields] = React.useState(false);

  const changeFields = () => {
      if(purchaseOrder.transport_type === 'land'){
          setHideFields(false);
      }else{
          setHideFields(true);
      }
  }


  React.useEffect(() => {
    changeFields()
  },[purchaseOrder.transport_type]);

  const showBillFields = () => {
    if(purchaseOrder.status === 'Received' || purchaseOrder.status === 'Completed'){
      return(
        <div>
          <h4 className='ps-2 pt-3'>Create Bill</h4>
          <hr className="bg-secondary border-2 border-top border-secondary"/>
          <CreateBill
            billInfo={billInfo}
            setBillInfo={setBillInfo}
          />
        </div> 
      )
    }
  }

  return (
    <div className='p-0 p-md-4'>
      <h1 className='text-center pt-2'>Purchase Order</h1>
      <hr className="bg-secondary border-2 border-top border-secondary"/>
      <POHeader changeCurrency={changeCurrency} setChangeCurrency={setChangeCurrency} orderNumber={orderNumber} purchaseOrder={purchaseOrder} setPurchaseOrder={setPurchaseOrder}/>

      <h4 className='ps-2 pt-2'>Purchase Order Items</h4>
      <hr className="bg-secondary border-2 border-top border-secondary"/>

      {orderItems.map((orderItem,index) => (
        <POItems
          purchaseOrder = {purchaseOrder}
          supplier={purchaseOrder.supplierID}
          index = {index}
          key={orderItem.id}
          onClose={() => onClose(orderItem.id,orderItem)}
          poItem={orderItem}
          id={orderItem.id}
          handleChangeItems={handleChangeItems}
          charges = {charges}
          orderItems={orderItems}
          SetOrderItems={SetOrderItems}
          deletedItem={deletedItem}
          rates={rates}
        />
      ))}

      <div className={setDisable ? 'ps-2 visually-hidden' : 'ps-2'} >
        <span onClick={addOrderItem} className='icon-click' style={{fontSize: '1em', color: 'dodgerblue'}}>
          <i className="fa-solid fa-plus"></i> Add New
        </span>
      </div>

      <h4 className='ps-2 pt-5'>Charges Exchange Rate</h4>
      <hr className="bg-secondary border-2 border-top border-secondary"/>

      <ChargesExchange 
        rates={rates}
        setRates={setRates}
        changeCurrency={changeCurrency} 
        setChangeCurrency={setChangeCurrency}
      />

      <h4 className='ps-2 pt-3'>Charges</h4>
      <hr className="bg-secondary border-2 border-top border-secondary"/>

      {
        hideFields ? 
          <AirCharges
            charges={charges}
            setCharges={setCharges}
            changeCurrency={changeCurrency} 
            setChangeCurrency={setChangeCurrency}
            totals={totals}
            setTotals={setTotals}
          />
        :
          <LandCharges
            charges={charges}
            setCharges={setCharges}
            changeCurrency={changeCurrency} 
            setChangeCurrency={setChangeCurrency}
            totals={totals}
            setTotals={setTotals}
          />
      }

      <h4 className='ps-2 pt-3'>Draft Section</h4>
      <hr className="bg-secondary border-2 border-top border-secondary"/>

      <CheckInput onChange={(e) => setPurchaseOrder({...purchaseOrder, flag_complete: (e.target.value === 'true')})} itsCheked={purchaseOrder.flag_complete === true} text="Mark this order as completed" id="completedBox" value={true}/>
      <CheckInput onChange={(e) => setPurchaseOrder({...purchaseOrder, flag_complete: (e.target.value === 'true')})} itsCheked={purchaseOrder.flag_complete === false} text="Keep this order in draft" id="unCompleteBox" value={false}/>

      {showBillFields()}

      <div className='mx-auto d-flex justify-content-center mb-4'>
          <button onClick={savePurchaseOrder} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
          <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
      </div>
    </div>
    
  )
}
