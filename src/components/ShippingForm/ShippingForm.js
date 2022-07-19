import React from 'react'
import CheckInput from '../FormComponents/CheckInput'
import InputFloating from '../FormComponents/InputFloating'
import PickItems from '../PickingForm/PickItems'
import Inspection from '../POReceivingForm/Inspection'
import SaleInfo from '../SaleForm/SaleInfo'
import ShippingInfo from './ShippingInfo'

export default function ShippingForm({
    saleNumber,
    saleOrder,
    customerSelected,
    inspection,
    setInspection,
    quality,
    setQuality,
    pickItems,
    saleItems,
    resetForm,
    button_title,
    saveShipping,
    setSaleOrder
}) {

    React.useEffect(() => {
        let total_items = 0
        pickItems.map((pickItem) => {
           total_items += pickItem.pick_count
        })
        setInspection({...inspection, running_total: total_items})
    },[pickItems])


    return (
        <div className='p-0 p-md-4'>
            <h1 className='text-center pt-2'>Shipment Information</h1>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <SaleInfo
                saleNumber={saleNumber}
                saleOrder={saleOrder}
                setDisable={true}
                customerSelected={customerSelected}
            />
            <h4 className='ps-2 pt-2'>General Inspection</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <ShippingInfo
                inspection={inspection}
                setInspection={setInspection}
            />
            <Inspection
                inspection={inspection}
                setInspection={setInspection}
                quality={quality}
                setQuality={setQuality}
            />
            <h4 className='ps-2 pt-2'>Shipment Items</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            {pickItems.map((pickItem,index) => (
                <PickItems
                    key={pickItem.id}
                    saleOrder={saleOrder}
                    pickItems={pickItems}
                    pickItem={pickItem}
                    index={index}
                    id={pickItem.id}
                    saleItems={saleItems}
                    setDisable={true}
                />
            ))}
            <h4 className='ps-2 pt-2'>Running Total</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <InputFloating onChange={(e) => setInspection({...inspection, running_total: e.target.value})} value={inspection.running_total || ''} text="Running Total" type="text" disabled={true}/>
            <h4 className='ps-2 pt-4'>Draft Section</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <div className="p-3 p-md-0">
                <CheckInput itsCheked={inspection.flag_complete} onChange={() => setInspection({...inspection, flag_complete: !inspection.flag_complete})} text={<h6>Mark this shippment as fully shipped and completed.</h6>} id="shippment_complete" value={true}/>
                <p>Inspection details will be required in order to complete this shipment.<br /><br />

                Once a shipment is completed, inventory counts will be updated and
                line item information will no longer be editable.</p>
            </div>
            <h4 className='ps-2 pt-3'>What do you want to do?</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>

            <CheckInput onChange={(e) => setSaleOrder({...saleOrder, radio_ready_to: e.target.value})} itsCheked={saleOrder.radio_ready_to === "picking"} text="Go back to 'Picking' status and edit the picking list." id="goPicking" value={"picking"}/>
            <CheckInput onChange={(e) => setSaleOrder({...saleOrder, radio_ready_to: e.target.value})} itsCheked={saleOrder.radio_ready_to === "draft"} text="Go back to 'Draft' status and edit the sales order item list." id="goDraft" value={"draft"}/>

            <div className='mx-auto d-flex justify-content-center mb-4'>
                <button onClick={saveShipping} type="button" className="btn btn-success btn-lg">Submit</button>
                <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
            </div>
        </div>
    )
}
