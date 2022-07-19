import React from 'react'
import SupplierForm from '../../components/AddSupplierForm/SupplierForm'
import { DataStore } from '@aws-amplify/datastore';
import { Supplier } from '../../models';
import useCompanyID from '../../hooks/useCompanyID';
import { BillingAddress } from '../../models';
import { ShippingAddress } from '../../models';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/Supplier/SupplierValidations';
import { sendSupplierZB } from '../../utils/Supplier/SupplierZB';

export default function AddSupplier() {

  const [supplier,setSupplier] = React.useState({})
  const [companyID] = useCompanyID('')  
  const [billAdd, setBillAdd] = React.useState([])
  const [shippAdd, setShippAdd] = React.useState([])
  const [deletedBill, setDeletedBill] = React.useState([])
  const [deleteShipp, setDeleteShipp] = React.useState([])

  const handleChangeBill = (i,name,value) => {
    let newFormValues = [...billAdd];
    newFormValues[i][name] = value;
    setBillAdd(newFormValues);
  }

  const handleChangeShipp = (i,name,value) => {
    let newFormValues = [...shippAdd];
    newFormValues[i][name] = value;
    setShippAdd(newFormValues);
  }

  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setSupplier({})
    setBillAdd([])
    setShippAdd([])
    setDeletedBill([])
    setDeleteShipp([])
  }

  const saveSupplier = async () => {
    //Deleting empty fields
    Object.keys(supplier).forEach(key => {
      if (supplier[key] === '') {
        delete supplier[key];
      }
    });

    Swal.fire({
      title: 'Please Wait',
      allowOutsideClick: false
    })
    
    Swal.showLoading()

    //Validations
    if(await onSubmitValidation(supplier)){
      return
    }

    try{
      //Save supplier
      let editedSupplier = {...supplier, companyID: [companyID].toString()}

      let contact_id = await sendSupplierZB(editedSupplier)
      editedSupplier.zb_contact_id = contact_id

      const savedSupplier = await DataStore.save(
        new Supplier(editedSupplier)
      );

      //Save Billing Address
      let editedBillAdd = [...billAdd];
      editedBillAdd.map(billAdd => (delete billAdd.id))
      editedBillAdd.map(async billAdd => {
        billAdd.supplierID = savedSupplier.id
        await DataStore.save(
          new BillingAddress(billAdd)
        )
      })
      
      //Save Shipping Address
      let editedShippAdd = [...shippAdd]
      editedShippAdd.map(shippAdd =>  (delete shippAdd.id))
      editedShippAdd.map(async shippAdd => {
        shippAdd.supplierID = savedSupplier.id
        await DataStore.save(
          new ShippingAddress(shippAdd)
        )
      })
      
      Swal.fire(
        'Form Sent!',
        'Form Submit Success',
        'success'
      )

      resetForm()

    }catch(error){
      Swal.fire(
        'Error, please try again.',
        error,
        'error'
      )
    }
    
    
  }

  return (
    <SupplierForm
      title="Add Supplier"
      button_title="Reset"
      supplier={supplier}
      setSupplier={setSupplier}
      billAdd={billAdd}
      setBillAdd={setBillAdd}
      shippAdd={shippAdd}
      setShippAdd={setShippAdd}
      handleChangeBill={handleChangeBill}
      handleChangeShipp={handleChangeShipp}
      saveSuppData={saveSupplier}
      resetForm={resetForm}
      deletedBill={deletedBill}
      setDeletedBill={setDeletedBill}
      deleteShipp={deleteShipp}
      setDeleteShipp={setDeleteShipp}
    />
  )
}
