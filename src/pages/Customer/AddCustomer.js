import React from 'react'
import CustomerForm from '../../components/AddCustomer/CustomerForm'
import useCompanyID from '../../hooks/useCompanyID'
import Swal from 'sweetalert2'
import { DataStore } from '@aws-amplify/datastore';
import { Customer } from '../../models';
import { BillingAddress } from '../../models';
import { ShippingAddress } from '../../models';
import { onSubmitValidation } from '../../utils/Customer/CustomerValidations';
import { sendCustomerZB } from '../../utils/Customer/CustomerZB';

export default function AddCustomer() {

  const [customer,setCustomer] = React.useState({})
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
    setCustomer({})
    setBillAdd([])
    setShippAdd([])
    setDeletedBill([])
    setDeleteShipp([])
  }

  const saveCustomer = async () => {
    //Deleting empty fields
    Object.keys(customer).forEach(key => {
      if (customer[key] === '') {
        delete customer[key];
      }
    });

    Swal.fire({
      title: 'Please Wait',
      allowOutsideClick: false
    })
    
    Swal.showLoading()

    //Validations
    if(await onSubmitValidation(customer)){
      return
    }

    try{
      //Save Customer
      let editedCustomer = {...customer, companyID: [companyID].toString()}

      let contact_id = await sendCustomerZB(editedCustomer)
      editedCustomer.zb_contact_id = contact_id

      const savedCustomer = await DataStore.save(
        new Customer(editedCustomer)
      );

      //Save Billing Address
      let editedBillAdd = [...billAdd];
      editedBillAdd.map(billAdd => (delete billAdd.id))
      editedBillAdd.map(async billAdd => {
        billAdd.customerID = savedCustomer.id
        await DataStore.save(
          new BillingAddress(billAdd)
        )
      })

      //Save Shipping Address
      let editedShippAdd = [...shippAdd]
      editedShippAdd.map(shippAdd =>  (delete shippAdd.id))
      editedShippAdd.map(async shippAdd => {
        shippAdd.customerID = savedCustomer.id
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

    }catch(e) {
      console.log(e)
    }
  }

  return (
    <CustomerForm
      title="Add Customer"
      button_title="Reset"
      customer={customer}
      setCustomer={setCustomer}
      billAdd={billAdd}
      setBillAdd={setBillAdd}
      shippAdd={shippAdd}
      setShippAdd={setShippAdd}
      deletedBill={deletedBill}
      setDeletedBill={setDeletedBill}
      deleteShipp={deleteShipp}
      setDeleteShipp={setDeleteShipp}
      handleChangeBill={handleChangeBill}
      handleChangeShipp={handleChangeShipp}
      resetForm={resetForm}
      saveCustomer={saveCustomer}
    />
  )
}
