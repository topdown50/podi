import React from 'react'
import Input from '../FormComponents/Input'
import Select from 'react-select'
import useItem from '../../hooks/useItem'
import NormalSelectInput from '../FormComponents/NormalSelectInput'
import useStorage from '../../hooks/useStorage'

export default function ReceiveItem({
    onClose,
    id,
    index,
    handleChangeItems,
    poItem,
    supplier
}) {
    const [items, setItems] = useItem([],supplier)
    const [storageLoc] = useStorage([])

    return (
        <div className="mb-4">
            <div className="container-fluid border bg-light pt-4">
                <div className="row g-2 ps-4 pe-4 pb-4">
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChangeItems(index,'lot_number',parseFloat(e.target.value))} value={poItem.lot_number || ''} text='Lot #' type='number'/>
                    </div>
                    <div className="col-md align-self-end">
                        <h6>Item/Product - SKU#</h6>
                        <Select onChange={(e) => handleChangeItems(index,'itemID',e.value)} value={items.filter(myItem => myItem.value === poItem.itemID) || ''} options={items} placeholder="Item/Product - SKU#" isDisabled={true}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChangeItems(index,'quantityorder',parseFloat(e.target.value))} value={poItem.quantityorder || ''} text='Ordered' type='number' setDisabled={true}/>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <NormalSelectInput onChange={(e) => handleChangeItems(index,'typeMeasure',e.target.value)} value={poItem.typeMeasure || ''} text="Type of measure" setDisable={true}>
                            <option value="case">Case</option>
                            <option value="unit">Unit</option>
                            <option value="weight">Weight</option>
                        </NormalSelectInput>
                    </div>
                    <div className="col-md-1 align-self-end">
                        <Input onChange={(e) => handleChangeItems(index,'quantityreceipt',parseFloat(e.target.value))} value={poItem.quantityreceipt || ''} text='Received' type='number'/>
                    </div>
                    <div className="col-md align-self-end">
                        <Select onChange={(e) => handleChangeItems(index,'storagelocationID',e.value)} value={storageLoc ? storageLoc.filter(storage => storage.value === poItem.storagelocationID) : ''} options={storageLoc} placeholder="Storage Location"/>
                    </div>
                </div>
            </div>
        </div> 
    )
}
