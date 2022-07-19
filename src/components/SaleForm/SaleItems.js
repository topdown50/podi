import React from 'react'
import Swal from 'sweetalert2'
import Select from 'react-select'
import NormalSelectInput from '../FormComponents/NormalSelectInput'
import Input from '../FormComponents/Input'
import InputAddOns from '../FormComponents/InputAddOns'
import CheckInput from '../FormComponents/CheckInput'
import useItem from '../../hooks/useItem'
import ReactTooltip from 'react-tooltip';
import useItemStock from '../../hooks/useItemStock'

export default function SaleItems({
    id,
    index,
    saleItem,
    saleItems,
    setSaleItems,
    deletedItems,
    setDeletedItems,
    handleChangeItems,
    onClose,
    saleOrder,
    setDisable
}) {

    const [items, setItems] = useItem([])
    const [onHand, booked, picked, onOrder, onOrderAvailable, available] = useItemStock(saleItem.itemID,saleOrder.id)

    //Item calcs
    React.useEffect(() => {
        if(saleOrder.status === 'Draft'){
            //Total Price
            if(!isNaN(saleItem.sell_count) && !isNaN(saleItem.unit_price)){
                handleChangeItems(index,'total_price',parseFloat(parseFloat(saleItem.sell_count * saleItem.unit_price).toFixed(2)))
            }else{
                handleChangeItems(index,'total_price',parseFloat(0))
            }
        }
        
    },[
        saleItem.sell_count,
        saleItem.unit_price
    ]);
    //Stock Validation
    React.useEffect(() => {
        if(available !== '' && saleOrder.status === 'Draft'){
            //Total item quantity
            let total_item_quantity = 0
            saleItems.forEach((item) => {
                if(item.itemID === saleItem.itemID && item.typeMeasure === saleItem.typeMeasure && !isNaN(item.sell_count)){
                    total_item_quantity += item.sell_count
                }
            })
            //Validation
            if(saleItem.typeMeasure === 'case'){
                let cases_available = available.split(' C')[0]
                let cases_order_available = onOrderAvailable.split(' C')[0]
                if(total_item_quantity > cases_available){
                    if(cases_order_available >= total_item_quantity){
                        Swal.fire(
                            'On Order Available',
                            `You are going to do a sell with the on order items`,
                            'warning'
                        )
                        handleChangeItems(index,'ooa',true)
                    }else if(cases_order_available > 0 && total_item_quantity > cases_order_available && saleItem.ooa){
                        Swal.fire(
                            'Stock Warning',
                            `You cannot sell more <b> ${total_item_quantity} </b> than what's on order available <b> ${cases_order_available} </b>`,
                            'warning'
                        )
                        handleChangeItems(index,'sell_count',null)
                    }else{
                        Swal.fire(
                            'Stock Warning',
                            `You cannot sell more <b> ${total_item_quantity} </b> than what's available <b> ${cases_available} </b>`,
                            'warning'
                        )
                        handleChangeItems(index,'sell_count',null)
                    }
                }else{
                    handleChangeItems(index,'ooa',false)
                }
            }
        }
        
    },[
        saleItem.sell_count,
        saleItem.ooa,
        onHand,
        booked,
        picked,
        onOrder,
        onOrderAvailable,
        available
    ]);


    let itemInfo = `On Hand: ${onHand}<br/> Booked: ${booked} <br/> Picked: ${[picked]} <br/> Available: ${available} <br/> On Order: ${onOrder} <br/> On Order Available: ${onOrderAvailable} `

    return (
        <div className="mb-4">
            <div className="container-fluid border bg-light">
                <div className={setDisable ? 'close-button d-flex justify-content-end visually-hidden':'close-button d-flex justify-content-end'}>
                    <span className='icon-click' style={{fontSize: '1.7em', color: 'tomato'}} onClick={() => onClose(id)}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                </div>
                <div className={setDisable ? "row g-2 ps-4 pe-4 pb-4 mt-4" : "row g-2 ps-4 pe-4 pb-4"}>
                    <div className="col-md-1 align-self-center">
                        <CheckInput itsCheked={saleItem.ooa} onChange={(e) => handleChangeItems(index,'ooa',!saleItem.ooa)} text="OOA" id="ooa" value={true} disabled={setDisable}/>
                    </div>
                    <div className="col-md align-self-end d-inline">
                        <h6 data-tip={itemInfo}>Item/Product - SKU#</h6>
                        <ReactTooltip multiline={true}/>
                        <Select onChange={(e) => handleChangeItems(index,'itemID',e.value)} value={items.filter(myItem => myItem.value === saleItem.itemID) || ''} options={items} placeholder="Item/Product - SKU#" isDisabled={setDisable}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <NormalSelectInput onChange={(e) => handleChangeItems(index,'typeMeasure',e.target.value)} value={saleItem.typeMeasure || ''} text="Type of measure" setDisable={setDisable}>
                            <option value="case">Case</option>
                            <option value="unit">Unit</option>
                            <option value="weight">Weight</option>
                        </NormalSelectInput>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChangeItems(index,'sell_count',parseFloat(e.target.value))} value={saleItem.sell_count || ''} text='Sell Count' type='number' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md-2 align-self-end">
                        <h6>Unit Price</h6>
                        <InputAddOns onChange={(e) => handleChangeItems(index,'unit_price',parseFloat(e.target.value))} value={saleItem.unit_price || ''} text="Unit Price" type="number" addOn="$" disabled={setDisable}/>
                    </div>
                    <div className="col-md-2 align-self-end">
                        <h6>Total Price</h6>
                        <InputAddOns onChange={(e) => handleChangeItems(index,'total_price',parseFloat(e.target.value))} value={saleItem.total_price || ''} text="Total Price" type="number" addOn="$" disabled={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
