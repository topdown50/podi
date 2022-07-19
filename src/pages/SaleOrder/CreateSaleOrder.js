import React from 'react'
import Swal from 'sweetalert2'
import SaleOrderForm from '../../components/SaleForm/SaleOrderForm'
import { IdopContext } from '../../context/IdopProvider'
import useCompanyID from '../../hooks/useCompanyID'
import useSaleNumber from '../../hooks/useSaleNumber'
import { saleOrderVal } from '../../utils/SaleOrder/onSubmit'
import { onSubmitValidation } from '../../utils/SaleOrder/SaleOrderValidations'
import { DataStore } from '@aws-amplify/datastore';
import { SaleOrder } from '../../models';
import { SaleOrderItem } from '../../models';

export default function CreateSaleOrder() {

  const {
    user,
    amplifyUser
  } = React.useContext(IdopContext)

  const [saleItems, setSaleItems] = React.useState([])
  const [deletedItems, setDeletedItems] = React.useState([])
  const [saleOrder, setSaleOrder] = React.useState({
    invoice_date: new Date().toISOString().slice(0, 10),
    status: 'Draft',
    delivery_type: "local"
  })
  const [submitted, setSubmitted] = React.useState(false)

  const [companyID] = useCompanyID('')
  const [saleNumber] = useSaleNumber('',submitted)
  const [customerSelected, setCustomerSelected] = React.useState('')

  const handleChangeItems = (i,name,value) => {
    let newFormValues = [...saleItems];
    newFormValues[i][name] = value;
    setSaleItems(newFormValues);
  }

  React.useEffect(() => {
    let items_total = 0
    saleItems.forEach((saleItem) => {
      if(!isNaN(saleItem.total_price)){
        items_total += parseFloat(saleItem.total_price)
      }
    })
    setSaleOrder({...saleOrder,items_total: items_total})
  },[
    saleItems,
    deletedItems,
  ])

  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setSaleItems([])
    setDeletedItems([])
    setSaleOrder({
      invoice_date: new Date().toISOString().slice(0, 10),
      status: 'Draft',
      delivery_type: "local"
    })
    setSubmitted(false)
    setCustomerSelected('')
  }

  const saveSaleOrder = async () => {
    //Adding Company ID
    let sentSaleOrder = {
      ...saleOrder,
      userID: amplifyUser.id,
      companyID: [companyID].toString(),
      invoice_number: [saleNumber].toString(),
      customerID: customerSelected,
    }

    Swal.fire({
      title: 'Please Wait',
      allowOutsideClick: false
    })
    
    Swal.showLoading()

    //---------------------- Validations ----------------------
    if(await onSubmitValidation(sentSaleOrder,saleItems)){
      return
    }

    saleOrderVal(user,sentSaleOrder)

    try{
      //Save Purchase Order
      const savedSale = await DataStore.save(
        new SaleOrder(sentSaleOrder)
      );

      //Save Purchase Order Items
      let editedSaleItems = [...saleItems];
      editedSaleItems.map(saleItem => (delete saleItem.id))
      editedSaleItems.map(async saleItem => {
        saleItem.saleorderID = savedSale.id
        saleItem.companyID = [companyID].toString()
        await DataStore.save(
          new SaleOrderItem(saleItem)
        )
      })

      Swal.fire(
        'Form Sent!',
        'Form Submit Success',
        'success'
      ).then(async () => {
        setSubmitted(true)
      })
      
      resetForm()
      
    } catch(err){
      console.log(err)
    }
  }

  return (
    <SaleOrderForm
      saleItems={saleItems}
      setSaleItems={setSaleItems}
      deletedItems={deletedItems}
      setDeletedItems={setDeletedItems}
      handleChangeItems={handleChangeItems}
      saleNumber={saleNumber}
      saleOrder={saleOrder}
      setSaleOrder={setSaleOrder}
      customerSelected={customerSelected}
      setCustomerSelected={setCustomerSelected}
      button_title={"Reset"}
      resetForm={resetForm}
      saveSaleOrder={saveSaleOrder}
    />
  )
}
