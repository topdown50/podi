import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { BillingAddress } from '../../models';
import { ShippingAddress } from '../../models';
import { Customer } from '../../models';
import CustomerForm from '../../components/AddCustomer/CustomerForm';

export default function ViewCustomer() {

  const [customer, setCustomer] = React.useState({})
  const [billAdd, setBillAdd] = React.useState([])
  const [shippAdd, setShippAdd] = React.useState([])

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

  React.useEffect(() => {
      getCustomer()
  },[]);

  return (
    <CustomerForm
      title="View Supplier"
      button_title="Cancel"
      customer={customer}
      setCustomer={setCustomer}
      billAdd={billAdd}
      setBillAdd={setBillAdd}
      shippAdd={shippAdd}
      setShippAdd={setShippAdd}
      setDisable={true}
      resetForm={() => navigate('/CustomerReport')}
    />
  )
}
