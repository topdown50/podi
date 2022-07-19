import React from 'react'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Customer } from '../../models';
import { BillingAddress } from '../../models';
import { ShippingAddress } from '../../models';
import CustomerForm from '../../components/AddCustomer/CustomerForm';
import { onSubmitValidation } from '../../utils/Customer/CustomerValidations';
import { sendCustomerZB } from '../../utils/Customer/CustomerZB';

export default function EditCustomer() {

  const [customer, setCustomer] = React.useState({})
  const [billAdd, setBillAdd] = React.useState([])
  const [shippAdd, setShippAdd] = React.useState([])
  const [deletedBill, setDeletedBill] = React.useState([])
  const [deleteShipp, setDeleteShipp] = React.useState([])

  const navigate = useNavigate();
  const {state} = useLocation();
  const {id} = state

  const getCustomer = async() => {
    //Supplier
    let customerModels = await DataStore.query(Customer,id);
    customerModels = JSON.stringify(customerModels, null, 2)
    customerModels = JSON.parse(customerModels)
    setCustomer(customerModels)
    //Bill Address
    let billModels = (await DataStore.query(BillingAddress)).filter(billAdd => billAdd.customerID === customerModels.id)
    billModels = JSON.stringify(billModels, null, 2)
    billModels = JSON.parse(billModels)
    setBillAdd(billModels)
    //Shipp Address
    let shippModels = (await DataStore.query(ShippingAddress)).filter(shippAdd => shippAdd.customerID === customerModels.id)
    shippModels = JSON.stringify(shippModels, null, 2)
    shippModels = JSON.parse(shippModels)
    setShippAdd(shippModels)
  }

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

  const saveData = async() => {
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
        //Save Supplier
        let cust_older_item = await DataStore.query(Customer,id);

        let contact_id = await sendCustomerZB(cust_older_item,cust_older_item.zb_contact_id)
        
        await DataStore.save(Customer.copyOf(cust_older_item, item => {
            item.company_name = customer.company_name
            item.name = customer.name
            item.phone = customer.phone
            item.email = customer.email
            item.zb_contact_id = contact_id
        }));

        //Save Bill Address
        billAdd.map(async billingAdd => {
            if(typeof billingAdd.id === "string"){
                let bill_older_item = await DataStore.query(BillingAddress,billingAdd.id);
                await DataStore.save(BillingAddress.copyOf(bill_older_item, item => {
                    item.address_line1 = billingAdd.address_line1
                    item.address_line2 = billingAdd.address_line2
                    item.city_district = billingAdd.city_district
                    item.state_province = billingAdd.state_province
                    item.postal_code = billingAdd.postal_code
                    item.country = billingAdd.country
                }));
            }else{
                delete billingAdd.id
                billingAdd.customerID = customer.id
                await DataStore.save(
                    new BillingAddress(billingAdd)
                )
            }
        })

        deletedBill.map(async deleteBill => {
            const modelToDelete = await DataStore.query(BillingAddress, deleteBill.id);
            DataStore.delete(modelToDelete);
        })
        
        
        //Save Shipp Address
        shippAdd.map(async shippingAdd => {
            if(typeof shippingAdd.id === "string"){
                let shipp_older_item = await DataStore.query(ShippingAddress,shippingAdd.id);
                await DataStore.save(ShippingAddress.copyOf(shipp_older_item, item => {
                    item.address_line1 = shippingAdd.address_line1
                    item.address_line2 = shippingAdd.address_line2
                    item.city_district = shippingAdd.city_district
                    item.state_province = shippingAdd.state_province
                    item.postal_code = shippingAdd.postal_code
                    item.country = shippingAdd.country
                }));
            }else{
                delete shippingAdd.id
                shippingAdd.customerID = customer.id
                await DataStore.save(
                    new ShippingAddress(shippingAdd)
                )
            }
        })

        deleteShipp.map(async delteShipp => {
            const modelToDelete = await DataStore.query(ShippingAddress, delteShipp.id);
            DataStore.delete(modelToDelete);
        })
        
        

        Swal.fire(
            'Form Sent!',
            'Form Edit Success',
            'success',
        ).then(() => {
            navigate('/CustomerReport')
        })

    }catch(error){
        console.log(error)
    }
  }

  React.useEffect(() => {
    getCustomer()
  },[]);



  return (
    <CustomerForm
      title="Edit Customer"
      button_title="Cancel"
      customer={customer}
      setCustomer={setCustomer}
      billAdd={billAdd}
      setBillAdd={setBillAdd}
      shippAdd={shippAdd}
      setShippAdd={setShippAdd}
      handleChangeBill={handleChangeBill}
      handleChangeShipp={handleChangeShipp}
      saveCustomer={saveData}
      setDeletedBill={setDeletedBill}
      setDeleteShipp={setDeleteShipp}
      deletedBill = {deletedBill}
      deleteShipp = {deleteShipp}
      resetForm={() => navigate('/CustomerReport')}
    />
  )
}
