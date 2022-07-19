import React from 'react'
import CheckInput from '../FormComponents/CheckInput'
import SaleInfo from '../SaleForm/SaleInfo'
import SaleItems from '../SaleForm/SaleItems'
import PickItems from './PickItems'

export default function PickingForm({
    saleItems,
    pickItems,
    setPickItems,
    deletedPickItems,
    setDeletedPickItems,
    saleOrder,
    saleNumber,
    customerSelected,
    handleChangeItems,
    setDisable,
    button_title,
    resetForm,
    savePicking,
    setSaleOrder
}) {

    const addPickItem = () => {
        let currentPickItem = [...pickItems]
        let itemID = currentPickItem.length
        currentPickItem.push({
            id: itemID,
            typeMeasure: 'case'
        })
        setPickItems(currentPickItem)
    }

    const onClose = (id,itemToDelete) => {
        const pickItemIndex = pickItems.findIndex(pickItem => pickItem.id === id)
        const newPickItems = [...pickItems]
        newPickItems.splice(pickItemIndex,1)
        setDeletedPickItems([...deletedPickItems,itemToDelete])
        setPickItems(newPickItems)
    }

    return (
        <div className='p-0 p-md-4'>
            <h1 className='text-center pt-2'>Picking Form</h1>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <SaleInfo
                saleNumber={saleNumber}
                saleOrder={saleOrder}
                setDisable={true}
                customerSelected={customerSelected}
            />
            <h4 className='ps-2 pt-2'>Sale Order Items</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            {saleItems.map((saleItem,index) => (
                <SaleItems
                    key={saleItem.id}
                    saleOrder={saleOrder}
                    saleItems={saleItems}
                    saleItem={saleItem}
                    index={index}
                    id={saleItem.id}
                    setDisable={true}
                />
            ))}
            <h4 className='ps-2 pt-2'>Pick Items</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            {pickItems.map((pickItem,index) => (
                <PickItems
                    key={pickItem.id}
                    saleOrder={saleOrder}
                    pickItems={pickItems}
                    setPickItems={setPickItems}
                    deletedPickItems={deletedPickItems}
                    setDeletedPickItems={setDeletedPickItems}
                    onClose={() => onClose(pickItem.id,pickItem)}
                    handleChangeItems={handleChangeItems}
                    pickItem={pickItem}
                    index={index}
                    id={pickItem.id}
                    saleItems={saleItems}
                />
            ))}
            <div className={setDisable ? 'ps-2 visually-hidden' : 'ps-2'} >
                <span onClick={addPickItem} className='icon-click' style={{fontSize: '1em', color: 'dodgerblue'}}>
                    <i className="fa-solid fa-plus"></i> Add New
                </span>
            </div>

            <h4 className='ps-2 pt-3'>What do you want to do?</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>

            <CheckInput onChange={(e) => setSaleOrder({...saleOrder, radio_picking_to: e.target.value})} itsCheked={saleOrder.radio_picking_to === "picking"} text="Stay in 'Picking' status and save this form for now." id="pickingBox" value={"picking"}/>
            <CheckInput onChange={(e) => setSaleOrder({...saleOrder, radio_picking_to: e.target.value})} itsCheked={saleOrder.radio_picking_to === "draft"} text="Go back to 'Draft' status and edit the sales order item list." id="draftBox" value={"draft"}/>
            <CheckInput onChange={(e) => setSaleOrder({...saleOrder, radio_picking_to: e.target.value})} itsCheked={saleOrder.radio_picking_to === "ready"} text="Go to 'Ready' status and make this sales order available for shipping." id="readyBox" value={"ready"}/>

            <div className='mx-auto d-flex justify-content-center mb-4'>
                <button onClick={savePicking} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
                <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
            </div>

        </div>
    )
}