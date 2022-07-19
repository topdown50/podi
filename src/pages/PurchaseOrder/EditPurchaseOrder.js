import React from 'react'
import PurchaseOrderForm from '../../components/PurchaseForm/PurchaseOrderForm'
import { DataStore } from '@aws-amplify/datastore';
import { PurchaseOrder } from '../../models';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useConvertionRates from '../../hooks/useConvertionRates';
import { getConversionRates } from '../../utils/ConversionRates/getConversionRates';
import { totalsCalc } from '../../utils/PurchaseOrder/totalsCalc';
import { addDays } from '../../utils/CustomFunctions/customFunctions';
import { PurchaseOrderItems } from '../../models';
import { onSubmitValidation } from '../../utils/PurchaseOrder/PurchaseOrderValidations';
import Swal from 'sweetalert2'
import useCompanyID from '../../hooks/useCompanyID';
import ReceivingForm from '../../components/POReceivingForm/ReceivingForm';
import { onSubmitValidationReceipt } from '../../utils/PurchaseReceipt/ReceiptValidations';
import { stockIncrease } from '../../utils/Inventory/inventoryFunctions';
import { sendPurchaseZB } from '../../utils/PurchaseOrder/PurchaseOrderZB';


export default function EditPurchaseOrder() {

    const [conversionRates] = useConvertionRates({})
    const [companyID] = useCompanyID('')

    const [quality, setQuality] = React.useState({
      truck_clean: true,
      free_pest: true,
      truck_door: true,
      driver: true
    })
    const [inspection,setInspection] = React.useState({
      inspection_date: new Date().toLocaleString(),
      flag_complete: false
    })

    const [billInfo, setBillInfo] = React.useState({})

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
    const [orderNumber,setOrderNumber] = React.useState('')
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
    const [rates, setRates] = React.useState({
        exchange_rate_date: new Date().toISOString().slice(0, 10),
        exchange_rate_charges: 1.00
    })
    const [charges, setCharges] = React.useState({})
    const [totals, setTotals] = React.useState({})
    const [orderItems, SetOrderItems] = React.useState([])
    const [deletedItem, setDeletedItem] = React.useState([])

    const [submited, setSubmited] = React.useState(false)

    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = state

    const getPurchaseOrder = async () => {
        //Purchase Order
        let models = await DataStore.query(PurchaseOrder,id);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        //Convert the data
        models.po_date = addDays(models.po_date,0)
        models.exchange_rate_date = addDays(models.exchange_rate_date,1)
        models.PurchaseOrderRates.exchange_rate_date = addDays(models.PurchaseOrderRates.exchange_rate_date,1)
        //Get Items
        let itemsModels = (await DataStore.query(PurchaseOrderItems)).filter((item) => item.purchaseorderID === models.id)
        itemsModels = JSON.stringify(itemsModels, null, 2)
        itemsModels = JSON.parse(itemsModels)
        //set the data
        setCharges(models.PurchaseOrderCharges)
        setRates(models.PurchaseOrderRates)
        setOrderNumber(models.po_number)
        setTotals(models.totals)
        setPurchaseOrder(models)
        setChangeCurrency(models.ChangeCurrency)
        SetOrderItems(itemsModels)
        console.log(models)
        if(models.Inspection){
          setInspection(models.Inspection)
          setQuality(models.Inspection.quality)
        }
        if(models.bill_info){
          setBillInfo(models.bill_info)
        }
    }

    const handleChangeItems = (i,name,value) => {
        let newFormValues = [...orderItems];
        newFormValues[i][name] = value;
        SetOrderItems(newFormValues);
    }

    React.useEffect(() => {
        getPurchaseOrder()
    },[conversionRates])

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
    },[
        changeCurrency,
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

    const savePurchaseOrder = async () => {
        //Adding Company ID
        let sentPO = {...purchaseOrder, 
          PurchaseOrderRates: rates,
          PurchaseOrderCharges: charges,
          ChangeCurrency: changeCurrency,
          totals: totals,
          bill_info: billInfo
        }

        let bill_id = await sendPurchaseZB(purchaseOrder,purchaseOrder.bill_id_zb)

        sentPO.bill_id_zb = bill_id
    
        Swal.fire({
          title: 'Please Wait',
          allowOutsideClick: false
        })
        
        Swal.showLoading()
    
        //---------------------- Validations ----------------------
        if(await onSubmitValidation(sentPO,orderItems)){
          return
        }
        if(sentPO.flag_complete && sentPO.status === 'Draft'){
          sentPO.status = 'Ordered'                
        }else if(sentPO.flag_complete && sentPO.status === 'Received'){
          sentPO.status = 'Completed'
        }
    
        try{
          //Save PO
          let older_purchaseOrder = await DataStore.query(PurchaseOrder,id);
          await DataStore.save(PurchaseOrder.copyOf(older_purchaseOrder, older_po => {
            older_po.po_date = (new Date(sentPO.po_date)).toISOString().slice(0, 10)
            older_po.po_number = sentPO.po_number
            older_po.transport_type = sentPO.transport_type
            older_po.bol_invoice_number = sentPO.bol_invoice_number
            older_po.status = sentPO.status
            older_po.exchange_rate = sentPO.exchange_rate
            older_po.exchange_rate_date = sentPO.exchange_rate_date
            older_po.order_type = sentPO.order_type
            older_po.flag_complete = sentPO.flag_complete
            older_po.companyID = sentPO.companyID
            older_po.supplierID = sentPO.supplierID
            older_po.PurchaseOrderRates = sentPO.PurchaseOrderRates
            older_po.PurchaseOrderCharges = sentPO.PurchaseOrderCharges
            older_po.ChangeCurrency = sentPO.ChangeCurrency
            older_po.totals = sentPO.totals
            older_po.bill_id_zb = sentPO.bill_id_zb
            older_po.bill_info = sentPO.bill_info
          }));
          //Save Purchase Order Items
          orderItems.map(async orderItem => {
            if(typeof orderItem.id === "string"){
              let order_item = await DataStore.query(PurchaseOrderItems,orderItem.id);
              await DataStore.save(PurchaseOrderItems.copyOf(order_item, item => {
                item.lot_number =  orderItem.lot_number
                item.typeMeasure =  orderItem.typeMeasure
                item.quantityorder =  orderItem.quantityorder
                item.quantityreceipt =  orderItem.quantityreceipt
                item.unit_price =  orderItem.unit_price
                item.grossWeight =  orderItem.grossWeight
                item.quantityPallets =  orderItem.quantityPallets
                item.pricetotal =  orderItem.pricetotal
                item.landedCost =  orderItem.landedCost
                item.purchaseorderID =  orderItem.purchaseorderID
                item.itemID =  orderItem.itemID
                item.companyID =  orderItem.companyID
              }));
            }else{
              delete orderItem.id
              orderItem.purchaseorderID = purchaseOrder.id
              orderItem.companyID = [companyID].toString()
              await DataStore.save(
                new PurchaseOrderItems(orderItem)
              )
            }
          })

          deletedItem.map(async deletedIt => {
            const modelToDelete = await DataStore.query(PurchaseOrderItems, deletedIt.id);
            DataStore.delete(modelToDelete);
          })
          
          Swal.fire(
            'Form Sent!',
            'Form Submit Success',
            'success'
          ).then(() => {
            setSubmited(true)
            navigate('/PurchaseOrderReport')
          })
             
        } catch(err){
          console.log(err)
        }
      }
    
    const saveReceivingOrder = async () => {
      let inspectionJSON = {
        ...inspection,
        quality: quality
      }
      
      let sentPO = {
        ...purchaseOrder,
        Inspection:inspectionJSON 
      }

      Swal.fire({
        title: 'Please Wait',
        allowOutsideClick: false
      })
      
      Swal.showLoading()
      
      //---------------------- Validations ----------------------
      if(await onSubmitValidationReceipt(orderItems)){
        return
      }

      if(sentPO.Inspection.flag_complete){
        sentPO.status = 'Received'                
      }

      try{
        //Save PO
        let older_purchaseOrder = await DataStore.query(PurchaseOrder,id);
        await DataStore.save(PurchaseOrder.copyOf(older_purchaseOrder, older_po => {
          older_po.status = sentPO.status
          older_po.Inspection = sentPO.Inspection      
        }));
        //Save Purchase Order Items
        orderItems.map(async orderItem => {
          
          let order_item = await DataStore.query(PurchaseOrderItems,orderItem.id);
          await DataStore.save(PurchaseOrderItems.copyOf(order_item, item => {
            item.lot_number =  orderItem.lot_number
            item.quantityreceipt =  orderItem.quantityreceipt
            item.storagelocationID = orderItem.storagelocationID
          }));

          if(sentPO.Inspection.flag_complete){
            //Increase Stock
            stockIncrease(
              orderItem.lot_number,
              orderItem.itemID,
              orderItem.storagelocationID,
              orderItem.quantityreceipt,
              orderItem.typeMeasure,
              orderItem.companyID
            )
          }          
        })

        Swal.fire(
          'Form Sent!',
          'Form Submit Success',
          'success'
        ).then(() => {
          setSubmited(true)
          navigate('/PurchaseOrderReport')
        })

      }catch(err){
        console.log(err)
      }
      
    }

    const showForms = () => {
      if(purchaseOrder.status === 'Draft'){
        return(
          <PurchaseOrderForm
            button_title="Cancel"
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
            resetForm={() => navigate('/PurchaseOrderReport')}
          />
        )
      }else if(purchaseOrder.status === 'Ordered'){
        return(
          <ReceivingForm
            button_title="Cancel"
            orderNumber={orderNumber}
            purchaseOrder={purchaseOrder}
            setPurchaseOrder={setPurchaseOrder}
            orderItems={orderItems}
            handleChangeItems={handleChangeItems}
            SetOrderItems={SetOrderItems}
            deletedItem={deletedItem}
            setDeletedItem={setDeletedItem}
            inspection={inspection}
            setInspection={setInspection}
            quality={quality}
            setQuality={setQuality}
            resetForm={() => navigate('/PurchaseOrderReport')}
            saveReceivingOrder={saveReceivingOrder}
          />
        )
      }else if(purchaseOrder.status === 'Received'){
        return(
          <PurchaseOrderForm
            button_title="Cancel"
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
            resetForm={() => navigate('/PurchaseOrderReport')}
            billInfo={billInfo}
            setBillInfo={setBillInfo}
          />
        )
      }else if(purchaseOrder.status === 'Completed'){
        return(
          <PurchaseOrderForm
            button_title="Cancel"
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
            resetForm={() => navigate('/PurchaseOrderReport')}
            billInfo={billInfo}
            setBillInfo={setBillInfo}
          />
        )
      }
    }

    return (  
      showForms()
    )
}
