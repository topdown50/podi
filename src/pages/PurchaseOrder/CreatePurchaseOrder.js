import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { PurchaseOrder, PurchaseOrderItems } from '../../models';
import useCompanyID from '../../hooks/useCompanyID';
import PurchaseOrderForm from '../../components/PurchaseForm/PurchaseOrderForm';
import useOrderNumber from '../../hooks/useOrderNumber';
import { getConversionRates } from '../../utils/ConversionRates/getConversionRates';
import useConvertionRates from '../../hooks/useConvertionRates';
import { totalsCalc } from '../../utils/PurchaseOrder/totalsCalc';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/PurchaseOrder/PurchaseOrderValidations';
import { purchaseOrderVal } from '../../utils/PurchaseOrder/onSubmit';
import { IdopContext } from '../../context/IdopProvider';

export default function CreatePurchaseOrder() {

  const {
    user,
    amplifyUser
  } = React.useContext(IdopContext)

  const [conversionRates] = useConvertionRates({})

  const [rates, setRates] = React.useState({
    exchange_rate_date: new Date().toISOString().slice(0, 10),
    exchange_rate_charges: 1.00
  })

  const [charges, setCharges] = React.useState({})
  const [totals, setTotals] = React.useState({})
  const [submited, setSubmited] = React.useState(false)

  const [orderNumber] = useOrderNumber('',submited)

  const [purchaseOrder,setPurchaseOrder] = React.useState({
    po_date: new Date().toISOString().slice(0, 10),
    exchange_rate_date: new Date().toISOString().slice(0, 10),
    transport_type: 'land',
    status: 'Draft',
    base_currency: 'cad',
    convert_to_currency: 'cad',
    order_type: 'purchaseOrder',
    exchange_rate: 1.00
  })
  
  const [changeCurrency, setChangeCurrency] = React.useState({
    base_currency: 'cad',
    convert_to_currency: 'cad',
    baseCurrencyCharges: 'cad',
    baseCurrencyBanking: 'cad',
    baseCurrencyCustoms: 'cad',
    baseCurrencyCommission: 'cad',
    baseCurrencyFreight: 'cad',
    baseCurrencyTrucking: 'cad',
    baseCurrencyUSA: 'cad',
    convert_to_charges: 'cad'
  })

  const [companyID] = useCompanyID('')
  const [orderItems, SetOrderItems] = React.useState([])
  const [deletedItem, setDeletedItem] = React.useState([])                                                                                                                                                                            

  const handleChangeItems = (i,name,value) => {
    let newFormValues = [...orderItems];
    newFormValues[i][name] = value;
    SetOrderItems(newFormValues);
  }

  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setPurchaseOrder({
      po_date: new Date().toISOString().slice(0, 10),
      exchange_rate_date: new Date().toISOString().slice(0, 10),
      transport_type: 'land',
      status: 'Draft',
      base_currency: 'cad',
      convert_to_currency: 'cad',
      order_type: 'purchaseOrder',
      exchange_rate: 1.00
    })
    setRates({
      exchange_rate_date: new Date().toISOString().slice(0, 10),
      exchange_rate_charges: 1.00
    })
    setCharges({})
    setTotals({})
    setChangeCurrency({
      base_currency: 'cad',
      convert_to_currency: 'cad',
      baseCurrencyCharges: 'cad',
      baseCurrencyBanking: 'cad',
      baseCurrencyCustoms: 'cad',
      baseCurrencyCommission: 'cad',
      baseCurrencyFreight: 'cad',
      baseCurrencyTrucking: 'cad',
      baseCurrencyUSA: 'cad',
      convert_to_charges: 'cad'
    })
    SetOrderItems([])
    setDeletedItem([])
  }

  //Save PO Form
  const savePurchaseOrder = async () => {
    //Adding Company ID
    let sentPO = {...purchaseOrder, 
      companyID: [companyID].toString(), 
      po_number: [orderNumber].toString(),
      userID: amplifyUser.id,
      PurchaseOrderRates: rates,
      PurchaseOrderCharges: charges,
      ChangeCurrency: changeCurrency,
      totals: totals
    }

    Swal.fire({
      title: 'Please Wait',
      allowOutsideClick: false
    })
    
    Swal.showLoading()

    //---------------------- Validations ----------------------
    if(await onSubmitValidation(sentPO,orderItems)){
      return
    }

    purchaseOrderVal(user,sentPO)

    try{
      //Save Purchase Order
      const savedPO = await DataStore.save(
        new PurchaseOrder(sentPO)
      );

      //Save Purchase Order Items
      let editedOrderItems = [...orderItems];
      editedOrderItems.map(orderItem => (delete orderItem.id))
      editedOrderItems.map(async orderItem => {
        orderItem.purchaseorderID = savedPO.id
        orderItem.companyID = [companyID].toString()
        await DataStore.save(
          new PurchaseOrderItems(orderItem)
        )
      })

      Swal.fire(
        'Form Sent!',
        'Form Submit Success',
        'success'
      ).then(async () => {
        setSubmited(true)
      })
      resetForm()
      
      
    } catch(err){
      console.log(err)
    }
  }

  //Get Conversions
  React.useEffect(() => {
    getConversionRates(
      conversionRates,
      changeCurrency.base_currency,
      changeCurrency.convert_to_currency,
      setPurchaseOrder,
      'exchange_rate',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'base_currency',
      'convert_to_currency'
    )
    
    //Transport Currency
    getConversionRates(
      conversionRates,
      changeCurrency.baseCurrencyCharges,
      changeCurrency.convert_to_charges,
      setRates,
      'exchange_rate_charges',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'baseCurrencyCharges',
      'convert_to_charges'
    )

    //Banking Currency
    getConversionRates(
      conversionRates,
      changeCurrency.baseCurrencyBanking,
      changeCurrency.convert_to_charges,
      setRates,
      'exchangeRateBanking',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'baseCurrencyBanking',
      'convert_to_charges'
    )

    //Customs Currency
    getConversionRates(
      conversionRates,
      changeCurrency.baseCurrencyCustoms,
      changeCurrency.convert_to_charges,
      setRates,
      'exchange_rate_customs',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'baseCurrencyCustoms',
      'convert_to_charges'
    )

    //Commission Currency
    getConversionRates(
      conversionRates,
      changeCurrency.baseCurrencyCommission,
      changeCurrency.convert_to_charges,
      setRates,
      'exchangeRateCommission',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'baseCurrencyCommission',
      'convert_to_charges'
    )
    
    //Freight Currency
    getConversionRates(
      conversionRates,
      changeCurrency.baseCurrencyFreight,
      changeCurrency.convert_to_charges,
      setRates,
      'exchangeRateFreight',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'baseCurrencyFreight',
      'convert_to_charges'
    )
    
    //Trucking Currency
    getConversionRates(
      conversionRates,
      changeCurrency.baseCurrencyTrucking,
      changeCurrency.convert_to_charges,
      setRates,
      'exchangeRateTrucking',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'baseCurrencyTrucking',
      'convert_to_charges'
    )

    //Customs USA
    getConversionRates(
      conversionRates,
      changeCurrency.baseCurrencyUSA,
      changeCurrency.convert_to_charges,
      setRates,
      'exchangeRateUSA',
      changeCurrency.exchange_buffer,
      setChangeCurrency,
      'baseCurrencyUSA',
      'convert_to_charges'
    )

  },[
    changeCurrency
  ])

  //Setting totals
  React.useEffect(() => {
    totalsCalc(purchaseOrder,charges,orderItems,rates,setTotals)   
  },[
    orderItems,
    deletedItem,
    charges,
    rates
  ])
  

  return (
    <PurchaseOrderForm
      button_title="Reset"
      orderNumber={orderNumber}
      purchaseOrder={purchaseOrder}
      setPurchaseOrder={setPurchaseOrder}
      orderItems={orderItems}
      SetOrderItems={SetOrderItems}
      deletedItem={deletedItem}
      setDeletedItem={setDeletedItem}
      handleChangeItems={handleChangeItems}
      rates={rates}
      setRates={setRates}
      charges={charges}
      setCharges={setCharges}
      changeCurrency={changeCurrency}
      setChangeCurrency={setChangeCurrency}
      totals = {totals}
      setTotals={setTotals}
      savePurchaseOrder={savePurchaseOrder}
      resetForm={resetForm}
    />
  )
}
