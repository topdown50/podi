import React from 'react'
import InputFloating from '../FormComponents/InputFloating';
import TextArea from '../FormComponents/TextArea';

export default function MoreInfo({
    saleOrder,
    setSaleOrder,
    setDisable
}) {
    return (
        <div className="container-fluid">
            <div className="row px-4">
                <div className="col-md p-1 align-self-end">
                    <TextArea onChange={(e) => setSaleOrder({...saleOrder,sale_comments: e.target.value})} value={saleOrder.sale_comments || ''} text="Sales Order Comments" type="text" style={{height: '150px'}} disabled={setDisable}/>
                </div>
            </div>
            <div className="row px-4">
                <div className="col-md p-1 align-self-end">
                <InputFloating onChange={(e) => setSaleOrder({...saleOrder,items_total: e.target.value})} value={saleOrder.items_total || ''} text="Items/Products Total" type="number" disabled={true}/>
                </div>
            </div>
        </div>
    )
}
