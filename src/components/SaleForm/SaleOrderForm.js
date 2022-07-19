import React from 'react'
import CheckInput from '../FormComponents/CheckInput'
import FreightSection from './FreightSection'
import MoreInfo from './MoreInfo'
import SaleInfo from './SaleInfo'
import SaleItems from './SaleItems'

export default function SaleOrderForm({
    saleItems,
    setSaleItems,
    deletedItems,
    setDeletedItems,
    setDisable,
    handleChangeItems,
    saleNumber,
    saleOrder,
    setSaleOrder,
    customerSelected,
    setCustomerSelected,
    button_title,
    resetForm,
    saveSaleOrder,

}) {

    const addOrderItem = () => {
        let currentOrderItems = [...saleItems]
        let itemID = currentOrderItems.length
        currentOrderItems.push({
            id: itemID,
            typeMeasure: 'case'
        })
        setSaleItems(currentOrderItems)
    }
    
    const onClose = (id,itemToDelete) => {
        const OrderItemIndex = saleItems.findIndex(saleItem => saleItem.id === id)
        const newOrderItems = [...saleItems]
        newOrderItems.splice(OrderItemIndex,1)
        setDeletedItems([...deletedItems,itemToDelete])
        setSaleItems(newOrderItems)
    }

    return (
        <div className='p-0 p-md-4'>
            <h1 className='text-center pt-2'>Sale Order</h1>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <SaleInfo
                saleNumber={saleNumber}
                saleOrder={saleOrder}
                setSaleOrder={setSaleOrder}
                customerSelected={customerSelected}
                setCustomerSelected={setCustomerSelected}
                setDisable={setDisable}
            />
            <h4 className='ps-2 pt-2'>Sale Order Items</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            {saleItems.map((saleItem,index) => (
                <SaleItems
                    key={saleItem.id}
                    saleOrder={saleOrder}
                    saleItems={saleItems}
                    setSaleItems={setSaleItems}
                    deletedItems={deletedItems}
                    setDeletedItems={setDeletedItems}
                    onClose={() => onClose(saleItem.id,saleItem)}
                    handleChangeItems={handleChangeItems}
                    saleItem={saleItem}
                    index={index}
                    id={saleItem.id}
                    setDisable={setDisable}
                />
            ))}
            <div className={setDisable ? 'ps-2 visually-hidden' : 'ps-2'} >
                <span onClick={addOrderItem} className='icon-click' style={{fontSize: '1em', color: 'dodgerblue'}}>
                <i className="fa-solid fa-plus"></i> Add New
                </span>
            </div>
            <h4 className='ps-2 pt-2'>More Info</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <MoreInfo
                saleOrder={saleOrder}
                setSaleOrder={setSaleOrder}
                setDisable={setDisable}
            />
            <h4 className='ps-2 pt-2'>Freight section</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <FreightSection
                saleOrder={saleOrder}
                setSaleOrder={setSaleOrder}
                setDisable={setDisable}
            />
            <h4 className='ps-2 pt-4'>Draft Section</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <div className="p-3 p-md-0">
                <CheckInput itsCheked={saleOrder.flag_complete} onChange={() => setSaleOrder({...saleOrder, flag_complete: !saleOrder.flag_complete})} text={<h6>Make this sales order available for picking.</h6>} id="sale_complete" value={true} disabled={setDisable}/>
                <p>
                    Sales order line details need to be completed first to make it available for 'Picking'. <br />
                    You may opt to leave this unchecked to keep this order in 'Draft' status.
                </p>
            </div>
            <div className='mx-auto d-flex justify-content-center mb-4'>
                <button onClick={saveSaleOrder} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
                <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
            </div>
        </div>
    )
}
