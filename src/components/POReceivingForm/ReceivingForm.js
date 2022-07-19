import React from 'react'
import CheckInput from '../FormComponents/CheckInput'
import Inspection from './Inspection'
import ReceiveItem from './ReceiveItem'
import ReceivingHeader from './ReceivingHeader'

export default function ReceivingForm({
    orderNumber,
    purchaseOrder,
    setPurchaseOrder,
    orderItems,
    SetOrderItems,
    handleChangeItems,
    deletedItem,
    setDeletedItem,
    inspection,
    setInspection,
    quality,
    setQuality,
    saveReceivingOrder,
    resetForm,
    button_title
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

    return (
        <div className='p-0 p-md-4'>
            <h1 className='text-center pt-2'>Purchase Order Receipt</h1>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <ReceivingHeader
                orderNumber={orderNumber}
                purchaseOrder={purchaseOrder}
                setPurchaseOrder={setPurchaseOrder}
            />
            <h4 className='ps-2 pt-4'>General Inspection</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <Inspection
                inspection={inspection}
                setInspection={setInspection}
                quality={quality}
                setQuality={setQuality}
            />
            <h4 className='ps-2 pt-4'>Receipt Items</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            {
                orderItems.map((orderItem,index) => (
                    <ReceiveItem
                        id={orderItem.id}
                        key={orderItem.id}
                        index = {index}
                        handleChangeItems={handleChangeItems}
                        onClose={onClose}
                        poItem={orderItem}
                        supplier={purchaseOrder.supplierID}
                    />
                ))
            }
            <h4 className='ps-2 pt-4'>Draft Section</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <div className="p-3 p-md-0">
                <CheckInput itsCheked={inspection.flag_complete} onChange={() => setInspection({...inspection, flag_complete: !inspection.flag_complete})} text={<h6>Mark this purchase order as fully received and completed.</h6>} id="receiving_complete" value={true}/>
                <p>Inspection details will be required in order to complete this receipt. <br /><br />

                Once a receipt is completed, inventory counts will be updated and <br />
                line item information will no longer be editable.</p>
            </div>
            <div className='mx-auto d-flex justify-content-center mb-4'>
                <button onClick={saveReceivingOrder} type="button" className="btn btn-success btn-lg">Submit</button>
                <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
            </div>
        </div>
    )
}
