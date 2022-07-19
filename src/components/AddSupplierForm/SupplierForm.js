import React from 'react'
import BillingAdd from '../ShippingBillingAdd/BillingAdd'
import ShippingAdd from '../ShippingBillingAdd/ShippingAdd'
import SupplerFormMain from './SupplerFormMain'

export default function SupplierForm({
    title,
    supplier,
    setSupplier,
    billAdd,
    setBillAdd,
    shippAdd,
    setShippAdd,
    handleChangeBill,
    handleChangeShipp,
    button_title,
    setDisable,
    saveSuppData,
    resetForm,
    setDeletedBill,
    setDeleteShipp,
    deletedBill,
    deleteShipp
}) {

    const addSubform = (array, setArray) => {
        let currentItem = [...array]
        let itemID = currentItem.length
        currentItem.push({id: itemID})
        setArray(currentItem)
    }

    const onClose = (array, setArray, id, deletedBillA, setDeletedBillA, item) => {
        const itemIndex = array.findIndex(item => item.id === id)
        const newArray = [...array]
        newArray.splice(itemIndex,1)
        setDeletedBillA([...deletedBillA,item])
        setArray(newArray)
    }

    return (
        <div className='p-0 p-md-4'>
            <h1 className='text-center pt-2'>{title}</h1>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <SupplerFormMain supplier={supplier} setSupplier={setSupplier} setDisable={setDisable}/>
            <h4 className='ps-2 pt-2'>Billing Address</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            {billAdd.map((billAddItem, index) =>(
                <BillingAdd
                    index={index}
                    key={billAddItem.id}
                    billAddItem = {billAddItem}
                    handleChange = {handleChangeBill}
                    onClose={ ()=> onClose(billAdd,setBillAdd,billAddItem.id,deletedBill,setDeletedBill,billAddItem)}
                    setDisable={setDisable}
                />
            ))}
            <div className={setDisable ? 'ps-2 visually-hidden' : 'ps-2'}>
                <span onClick={() => addSubform(billAdd,setBillAdd)} className='icon-click' style={{fontSize: '1em', color: 'dodgerblue'}}>
                <i className="fa-solid fa-plus"></i> Add New
                </span>
            </div>
            <h4 className='ps-2 pt-4'>Shipping Address</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            {shippAdd.map((shippAddItem,index) =>(
                <ShippingAdd
                    key={shippAddItem.id}
                    index = {index}
                    onClose={() => onClose(shippAdd,setShippAdd,shippAddItem.id,deleteShipp,setDeleteShipp,shippAddItem)}
                    shippAddItem={shippAddItem}
                    handleChangeShipp={handleChangeShipp}
                    setDisable={setDisable}
                />
            ))}           
            <div className={setDisable ? 'ps-2 visually-hidden' : 'ps-2'}>
                <span onClick={() => addSubform(shippAdd,setShippAdd)} className='icon-click' style={{fontSize: '1em', color: 'dodgerblue'}}>
                    <i className="fa-solid fa-plus"></i> Add New
                </span>
            </div>
            <div className='mx-auto d-flex justify-content-center mb-4'>
                <button onClick={saveSuppData} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
                <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
            </div>
        </div>
    )
}
