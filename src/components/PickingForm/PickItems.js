import React from 'react'
import Swal from 'sweetalert2'
import useItemStock from '../../hooks/useItemStock'
import useStorage from '../../hooks/useStorage'
import Input from '../FormComponents/Input'
import Select from 'react-select'
import NormalSelectInput from '../FormComponents/NormalSelectInput'
import CheckInput from '../FormComponents/CheckInput'
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';
import useStockAvailable from '../../hooks/useStockAvailable'
import ReactTooltip from 'react-tooltip'

export default function PickItems({
    saleOrder,
    saleItems,
    pickItems,
    pickItem,
    onClose,
    handleChangeItems,
    index,
    id,
    setDisable
}) {

    const [items, setItems] = React.useState([])
    const [storageLoc] = useStorage([])
    const [available] = useStockAvailable(pickItem.itemID,pickItem.storagelocationID,saleOrder.id,pickItem.lot_number)

    React.useEffect(() => {
        saleItems.map(async (item) => {
            let models = await DataStore.query(Item,item.itemID)
            models = JSON.stringify(models, null, 2)
            models = JSON.parse(models)
            models.name = `${models.name} - SKU# ${models.sku}`
            models = JSON.stringify(models, null, 2)
            models = models.replaceAll("name","label")
            models = models.replaceAll("id","value")
            models = JSON.parse(models)
            setItems((prevState) => [...prevState,models])
        })
    },[]);
    
    //Stock Validation
    React.useEffect(() => {
        if(available !== '' && saleOrder.status === 'Picking'){
            //Total item quantity
            let total_item_quantity = 0
            pickItems.forEach((item) => {
                if(item.itemID === pickItem.itemID && item.typeMeasure === pickItem.typeMeasure && !isNaN(pickItem.pick_count)){
                    total_item_quantity += item.pick_count
                }
            })
            //Validation
            if(pickItem.typeMeasure === 'case' && pickItem.pick_count !== '' && pickItem.pick_count !== undefined && pickItem.pick_count !== 0){
                let cases_available = available.split(' C')[0]
                if(total_item_quantity > cases_available){
                    Swal.fire(
                        'Stock Warning',
                        `You cannot sell more <b> ${total_item_quantity} </b> than what's on order available <b> ${cases_available} </b>`,
                        'warning'
                    )
                    handleChangeItems(index,'pick_count',null)
                }
            }
        }
    },[
        available,
        pickItem.pick_count
    ]);

    let itemInfo = `Available: ${available}`

    return (
        <div className="mb-4">
            <div className="container-fluid border bg-light">
                <div className="close-button d-flex justify-content-end">
                    <span className='icon-click' style={{fontSize: '1.7em', color: 'tomato'}} onClick={() => onClose(id)}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </span>
                </div>
                <div className="row g-2 ps-4 pe-4 pb-4">
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChangeItems(index,'lot_number',parseFloat(e.target.value))} value={pickItem.lot_number || ''} text='Lot #' type='number' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md align-self-end d-inline">
                        <h6 data-tip={itemInfo}>Item/Product - SKU#</h6>
                        <ReactTooltip multiline={true}/>
                        <Select onChange={(e) => handleChangeItems(index,'itemID',e.value)} value={items.filter(myItem => myItem.value === pickItem.itemID) || ''} options={items} placeholder="Item/Product - SKU#" isDisabled={setDisable}/>
                    </div>
                    <div className="col-md align-self-end">
                        <Select onChange={(e) => handleChangeItems(index,'storagelocationID',e.value)} value={storageLoc ? storageLoc.filter(storage => storage.value === pickItem.storagelocationID) : ''} options={storageLoc} placeholder="Storage Location" isDisabled={setDisable}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <NormalSelectInput onChange={(e) => handleChangeItems(index,'typeMeasure',e.target.value)} value={pickItem.typeMeasure || ''} text="Type of measure" setDisable={setDisable}>
                            <option value="case">Case</option>
                            <option value="unit">Unit</option>
                            <option value="weight">Weight</option>
                        </NormalSelectInput>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChangeItems(index,'pick_count',parseFloat(e.target.value))} value={pickItem.pick_count || ''} text='Pick Count' type='number' setDisabled={setDisable}/>
                    </div>
                    <div className="col-md-1 align-self-center">
                        <CheckInput itsCheked={pickItem.take_pieces} onChange={(e) => handleChangeItems(index,'take_pieces',!pickItem.take_pieces)} text="Take from Pieces" id="takePieces" value={true} disabled={setDisable}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
