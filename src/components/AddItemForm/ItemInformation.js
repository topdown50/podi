import React from 'react'
import useSupplier from '../../hooks/useSupplier'
import InputFloating from '../FormComponents/InputFloating'
import Select from 'react-select'
import TextArea from '../FormComponents/TextArea'
import RadioInput from '../FormComponents/RadioInput'

export default function ItemInformation({item,setItem,setDisable}) {

    const [suppliers] = useSupplier([])

    return (
        <div className="container-flud">
            <div className="row px-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setItem({...item, sku: (e.target.value).replaceAll(/\s/g,'')})} value={item.sku || ''} text="Item/Product SKU" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setItem({...item, name: e.target.value})} value={item.name || ''} text="Item/Product Name" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <h6>Type:</h6>
                    <div className='ms-4'>
                        <RadioInput itsCheked={item.type === 'rawMaterial'} onChange={(e) => setItem({...item, type: e.target.value})} value={'rawMaterial'} text="Raw Materials" id="itemType1" name="itemType" disabled={setDisable}/>
                        <RadioInput itsCheked={item.type === 'finishedGoods'} onChange={(e) => setItem({...item, type: e.target.value})} value={'finishedGoods'} text="Finished Goods" id="itemType3" name="itemType" disabled={setDisable}/>
                        <RadioInput itsCheked={item.type === 'productResale'} onChange={(e) => setItem({...item, type: e.target.value})} value={'productResale'} text="Products for Resale" id="itemType2" name="itemType" disabled={setDisable}/>
                    </div>
                </div>
            </div>
            <div className="row px-4">
                <div className="col-md p-1 align-self-end">
                <h6>Supplier</h6>
                    <Select options={suppliers} onChange={(e) => setItem({...item, supplierID: e.value})} value={suppliers.filter(supp => supp.value === item.supplierID)} placeholder="Supplier Information" isDisabled={setDisable}/>
                </div>
                <div className="col-md p-1 align-self-end">
                    <InputFloating onChange={(e) => setItem({...item, cost: parseFloat(e.target.value)})} value={item.cost || ''} text="Item Cost" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1 align-self-end">
                    <InputFloating onChange={(e) => setItem({...item, supplier_code: (e.target.value).replaceAll(/\s/g,'')})} value={item.supplier_code || ''} text="Supplier Item Code" type="text" disabled={setDisable}/>
                </div>
            </div>
            <div className="row px-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setItem({...item, zb_item_id: e.target.value})} value={item.zb_item_id || ''} text="item ID ZB" type="text" disabled={true}/>
                </div>
                <div className="col-md p-1">
                    <TextArea onChange={(e) => setItem({...item, description: e.target.value})} value={item.description || ''} text="Item Description" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                </div>
            </div>
        </div>
    )
}
