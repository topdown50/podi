import React from 'react'
import Select from 'react-select'
import InputAddOns from '../FormComponents/InputAddOns'
import Input from '../FormComponents/Input'
import NormalSelectInput from '../FormComponents/NormalSelectInput'
import useItem from '../../hooks/useItem'
//Datastore
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';
import { landedCostCalc } from '../../utils/PurchaseOrder/landedCostCalc'

export default function POItems({
    onClose,
    id,
    supplier,
    index,
    handleChangeItems,
    poItem,
    setDisable,
    purchaseOrder,
    //Landed Cost Calc
    charges,
    orderItems,
    SetOrderItems,
    deletedItem,
    rates
}) {

    const [items, setItems] = useItem([],supplier)

    //Item calcs
    React.useEffect(() => {
        //Total Price
        handleChangeItems(index,'pricetotal',parseFloat(poItem.quantityorder * poItem.unit_price * purchaseOrder.exchange_rate))
    },[
        poItem.quantityorder,
        poItem.unit_price,
        poItem.itemID,
        purchaseOrder.exchange_rate
    ]);

    //Pallets Quantity
    React.useEffect(() => {
        let abortController = new AbortController()
        //Pallets Quantity
        async function getItem(){
            if(poItem.itemID){
                const models = await DataStore.query(Item,poItem.itemID);
                let pallets = parseInt(poItem.quantityorder / models.cases_per_pallet)
                if(poItem.quantityorder % models.cases_per_pallet >= 1){
                    pallets += 1
                }
                handleChangeItems(index,'quantityPallets',pallets)
            }
        }
        getItem()
        return () => {  
            abortController.abort();
        }  
    },[poItem.quantityorder])

    //Item Landed Cost
    React.useEffect(() => {
        landedCostCalc(purchaseOrder,charges,orderItems,SetOrderItems,rates)
    },[
        poItem.quantityorder,
        poItem.unit_price,
        poItem.quantityPallets,
        purchaseOrder.exchange_rate,
        deletedItem,
        rates,
        charges
    ]);
 
  return (
    <div className="mb-4">
        <div className="container-fluid border bg-light"> 
            <div className="close-button d-flex justify-content-end">
                <span className='icon-click' style={{fontSize: '1.7em', color: 'tomato'}} onClick={() => onClose(id)}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </span>
            </div>       
            <div className="row g-2 ps-4 pe-4 pb-4">
                <div className="col-md align-self-end">
                    <h6>Item/Product - SKU#</h6>
                    <Select onChange={(e) => handleChangeItems(index,'itemID',e.value)} value={items.filter(myItem => myItem.value === poItem.itemID) || ''} options={items} placeholder="Item/Product - SKU#"/>
                </div>
                <div className="col-md-1 align-self-end">
                    <NormalSelectInput onChange={(e) => handleChangeItems(index,'typeMeasure',e.target.value)} value={poItem.typeMeasure || ''} text="Type of measure">
                        <option value="case">Case</option>
                        <option value="unit">Unit</option>
                        <option value="weight">Weight</option>
                    </NormalSelectInput>
                </div>
                <div className="col-md-1 align-self-end">
                    <Input onChange={(e) => handleChangeItems(index,'quantityorder',parseFloat(e.target.value))} value={poItem.quantityorder || ''} text='Order Count' type='number'/>
                </div>
                <div className="col-md-1 align-self-end">
                    <h6>Unit Price</h6>
                    <InputAddOns onChange={(e) => handleChangeItems(index,'unit_price',parseFloat(e.target.value))} value={poItem.unit_price || ''} text="Unit Price" type="number" addOn="$"/>
                </div>
                <div className="col-md-1 align-self-end">
                    <Input onChange={(e) => handleChangeItems(index,'grossWeight',parseFloat(e.target.value))} value={poItem.grossWeight || ''} text='Gross Weight' type='number'/>
                </div>
                <div className="col-md-1 align-self-end">
                    <Input onChange={(e) => handleChangeItems(index,'quantityPallets',parseFloat(e.target.value))} value={poItem.quantityPallets || ''} text='Pallets' type='number'/>
                </div>
                <div className="col-md-1 align-self-end">
                    <h6>Total Price</h6>
                    <InputAddOns onChange={(e) => handleChangeItems(index,'pricetotal',parseFloat(e.target.value))} value={poItem.pricetotal || ''} text="Total Price" type="number" addOn="$" disabled={true}/>
                </div>
                <div className="col-md-1 align-self-end">
                    <h6>Landed Cost</h6>
                    <InputAddOns onChange={(e) => handleChangeItems(index,'landedCost',parseFloat(e.target.value))} value={poItem.landedCost || ''} text="Landed Cost" type="number" addOn="$" disabled={true}/>
                </div>
            </div>
        </div>
    </div>
  )
}
