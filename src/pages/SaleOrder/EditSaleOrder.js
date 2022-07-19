import React from 'react'
import Swal from 'sweetalert2'
import SaleOrderForm from '../../components/SaleForm/SaleOrderForm'
import { DataStore } from '@aws-amplify/datastore';
import { SaleOrder } from '../../models';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { SaleOrderItem } from '../../models';
import { addDays } from '../../utils/CustomFunctions/customFunctions';
import useCompanyID from '../../hooks/useCompanyID';
import { onSubmitValidation, onSubmitValidationPicking } from '../../utils/SaleOrder/SaleOrderValidations';
import PickingForm from '../../components/PickingForm/PickingForm';
import { PickedItems } from '../../models';
import ShippingForm from '../../components/ShippingForm/ShippingForm';
import { stockIncrease } from '../../utils/Inventory/inventoryFunctions';
import { sendSaleZB } from '../../utils/SaleOrder/saleOrderZB';
import { IdopContext } from '../../context/IdopProvider';

export default function EditSaleOrder() {

    const [companyID] = useCompanyID('')

    const [saleItems, setSaleItems] = React.useState([])
    const [deletedItems, setDeletedItems] = React.useState([])

    const [pickItems, setPickItems] = React.useState([])
    const [deletedPickItems, setDeletedPickItems] = React.useState([])

    const [saleOrder, setSaleOrder] = React.useState({
        invoice_date: new Date().toISOString().slice(0, 10),
        status: 'Draft',
        delivery_type: "local"
    })
    const [shipmentInfo, setShipmentInfo] = React.useState({})
    const [productInfo, setProductInfo] = React.useState({})

    const [saleNumber,setSaleNumber] = React.useState('')

    const [customerSelected, setCustomerSelected] = React.useState('')

    const [quality, setQuality] = React.useState({
        truck_clean: true,
        free_pest: true,
        truck_door: true,
        driver: true
    })
    const [inspection,setInspection] = React.useState({
        inspection_date: new Date().toLocaleString(),
        ship_date: new Date().toLocaleString(),
        flag_complete: false
    })

    const handleChangeItems = (i,name,value) => {
        let newFormValues = [...saleItems];
        newFormValues[i][name] = value;
        setSaleItems(newFormValues);
    }

    const handleChangePickedItems = (i,name,value) => {
        let newFormValues = [...pickItems];
        newFormValues[i][name] = value;
        setPickItems(newFormValues);
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

    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = state

    const getSaleOrder = async () => {
        let models = await DataStore.query(SaleOrder,id);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        models.invoice_date = addDays(models.invoice_date,0)
        //Get Items
        let itemsModels = (await DataStore.query(SaleOrderItem)).filter((item) => item.saleorderID === models.id)
        itemsModels = JSON.stringify(itemsModels, null, 2)
        itemsModels = JSON.parse(itemsModels)
        //Get Shipment Info
        if(models.shipment_info){
            setInspection(models.shipment_info)
            setQuality(models.shipment_info.quality)
        }
        setSaleOrder(models)
        setSaleItems(itemsModels)
        setCustomerSelected(models.customerID)
        setSaleNumber(models.invoice_number)
        //Get Picked Items
        let pickModels = (await DataStore.query(PickedItems)).filter((item) => item.saleorderID === models.id)
        pickModels = JSON.stringify(pickModels, null, 2)
        pickModels = JSON.parse(pickModels)
        setPickItems(pickModels)
        //Set Picked Items
        if(pickModels.length === 0){
            let pickedItems = [...pickItems]
            itemsModels.map(async (item) => {
                let itemID = pickedItems.length
                pickedItems.push({
                    id: itemID,
                    itemID: item.itemID,
                    typeMeasure: 'case'
                })
            })
            setPickItems(pickedItems)
        }        
    }

    const saveSaleOrder = async () => {
        //Adding Company ID
        let sentSaleOrder = {
          ...saleOrder,
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
        if(sentSaleOrder.flag_complete){
            sentSaleOrder.status = 'Picking'                
        }
    
        try{
            //Save Sale Order
            let older_sale = await DataStore.query(SaleOrder,id);
            await DataStore.save(SaleOrder.copyOf(older_sale, older_so => {
                older_so.invoice_date = (new Date(sentSaleOrder.invoice_date)).toISOString().slice(0, 10)
                older_so.purchase_number = sentSaleOrder.purchase_number
                older_so.confirmation_number = sentSaleOrder.confirmation_number
                older_so.status = sentSaleOrder.status
                older_so.sale_comments = sentSaleOrder.sale_comments
                older_so.items_total = sentSaleOrder.items_total
                older_so.delivery_type = sentSaleOrder.delivery_type
                older_so.charge = sentSaleOrder.charge
                older_so.total = sentSaleOrder.total
                older_so.flag_complete = sentSaleOrder.flag_complete
                older_so.customerID = sentSaleOrder.customerID
                older_so.shippingaddressID = sentSaleOrder.shippingaddressID
                older_so.billingaddressID = sentSaleOrder.billingaddressID
            }));

            //Save Sale Order Item
            saleItems.map(async saleItem => {
                if(typeof saleItem.id === "string"){
                    let sale_item = await DataStore.query(SaleOrderItem,saleItem.id);
                    await DataStore.save(SaleOrderItem.copyOf(sale_item, item => {
                        item.ooa = saleItem.ooa
                        item.typeMeasure = saleItem.typeMeasure
                        item.sell_count = saleItem.sell_count
                        item.unit_price = saleItem.unit_price
                        item.total_price = saleItem.total_price
                        item.itemID = saleItem.itemID
                    }));
                }else{
                  delete saleItem.id
                  saleItem.saleorderID = sentSaleOrder.id
                  saleItem.companyID = [companyID].toString()
                  await DataStore.save(
                    new SaleOrderItem(saleItem)
                  )
                }
            })

            deletedItems.map(async deletedIt => {
                const modelToDelete = await DataStore.query(SaleOrderItem, deletedIt.id);
                DataStore.delete(modelToDelete);
            })

            Swal.fire(
                'Form Sent!',
                'Form Submit Success',
                'success'
            ).then(async () => {
                navigate('/SaleOrderReport')
            })      
          
        }catch(err){
            console.log(err)
        }
      }

    const savePicking = async () => {
        let sentSaleOrder = {
            ...saleOrder
        }

        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false
        })
          
        Swal.showLoading()
        
        //---------------------- Validations ----------------------
        if(await onSubmitValidationPicking(sentSaleOrder,pickItems,saleItems)){
            return
        }
        
        if(sentSaleOrder.radio_picking_to === 'draft'){
            sentSaleOrder.status = 'Draft'
            //Delete Pick Items
            pickItems.map(async deletedIt => {
                const modelToDelete = await DataStore.query(PickedItems, deletedIt.id);
                DataStore.delete(modelToDelete);
            })
        }else if(sentSaleOrder.radio_picking_to === 'ready'){
            sentSaleOrder.status = 'Ready'
        }

        try{
            //Save Sale Order
            let older_sale = await DataStore.query(SaleOrder,id);
            await DataStore.save(SaleOrder.copyOf(older_sale, older_so => {
                older_so.status = sentSaleOrder.status
                older_so.radio_picking_to = sentSaleOrder.radio_picking_to
            }));
            //Save Pick Order Items
            pickItems.map(async pickItem => {
                if(typeof pickItem.id === "string"){
                    let picked_item = await DataStore.query(PickedItems,pickItem.id);
                    await DataStore.save(PickedItems.copyOf(picked_item, item => {
                        item.lot_number = pickItems.lot_number
                        item.typeMeasure = pickItems.typeMeasure
                        item.pick_count = pickItems.pick_count
                        item.unity = pickItems.unity
                        item.take_pieces = pickItems.take_pieces
                        item.itemID = pickItems.itemID
                        item.storagelocationID = pickItems.storagelocationID
                    }));
                }else{
                    delete pickItem.id
                    pickItem.saleorderID = sentSaleOrder.id
                    pickItem.companyID = [companyID].toString()
                    await DataStore.save(
                        new PickedItems(pickItem)
                    )
                }
            })

            deletedPickItems.map(async deletedIt => {
                const modelToDelete = await DataStore.query(PickedItems, deletedIt.id);
                DataStore.delete(modelToDelete);
            })

            Swal.fire(
                'Form Sent!',
                'Form Submit Success',
                'success'
            ).then(() => {
                navigate('/SaleOrderReport')
            })

        }catch(e){
            console.log(e)
        }
    }

    React.useEffect(() => {
        getSaleOrder()
    },[])

    const saveShipping = async () => {
        let inspectionJSON = {
            ...inspection,
            quality: quality
        }
          
        let sentSaleOrder = {
            ...saleOrder,
            shipment_info:inspectionJSON 
        }

        let invoice_id = await sendSaleZB(sentSaleOrder,sentSaleOrder.bill_id_zb)
        sentSaleOrder.bill_id_zb = invoice_id

        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false
        })
          
        Swal.showLoading()

        //---------------------- Validations ----------------------
        if(sentSaleOrder.shipment_info.flag_complete){
            sentSaleOrder.status = 'Shipped'                
        }

        if(sentSaleOrder.radio_ready_to === 'picking'){
            sentSaleOrder.status = 'Picking'
        }else if(sentSaleOrder.radio_ready_to === 'draft'){
            sentSaleOrder.status = 'Draft'
            //Delete Pick Items
            pickItems.map(async deletedIt => {
                const modelToDelete = await DataStore.query(PickedItems, deletedIt.id);
                DataStore.delete(modelToDelete);
            })
        }

        try{
            //Save PO
            let older_sale = await DataStore.query(SaleOrder,id);
            await DataStore.save(SaleOrder.copyOf(older_sale, older_so => {
                older_so.status = sentSaleOrder.status
                older_so.shipment_info = sentSaleOrder.shipment_info
                older_so.bill_id_zb = sentSaleOrder.bill_id_zb
            }));

            pickItems.map(pickItem => {
                if(sentSaleOrder.shipment_info.flag_complete){
                    //Increase Stock
                    stockIncrease(
                      pickItem.lot_number,
                      pickItem.itemID,
                      pickItem.storagelocationID,
                      pickItem.pick_count * -1,
                      pickItem.typeMeasure,
                      pickItem.companyID
                    )
                } 
            })  
    
            Swal.fire(
              'Form Sent!',
              'Form Submit Success',
              'success'
            ).then(() => {
              navigate('/SaleOrderReport')
            })
    
        }catch(err){
            console.log(err)
        }
    }

    const showForms = () => {
        if(saleOrder.status === 'Draft'){
            return(
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
                    button_title={"Cancel"}
                    resetForm={() => navigate('/SaleOrderReport')}
                    saveSaleOrder={saveSaleOrder}
                />
            )
        }else if(saleOrder.status === 'Picking'){
            return(
                <PickingForm
                    pickItems={pickItems}
                    setPickItems={setPickItems}
                    deletedPickItems={deletedPickItems}
                    setDeletedPickItems={setDeletedPickItems}
                    saleOrder={saleOrder}
                    setSaleOrder={setSaleOrder}
                    saleNumber={saleNumber}
                    customerSelected={customerSelected}
                    saleItems={saleItems}
                    handleChangeItems={handleChangePickedItems}
                    button_title={'Cancel'}
                    resetForm={() => navigate('/SaleOrderReport')}
                    savePicking={savePicking}
                />
            )
        }else if(saleOrder.status === 'Ready'){
            return(
                <ShippingForm
                    saleNumber={saleNumber}
                    saleOrder={saleOrder}
                    customerSelected={customerSelected}
                    quality={quality}
                    setQuality={setQuality}
                    inspection={inspection}
                    setInspection={setInspection}
                    pickItems={pickItems}
                    saleItems={saleItems}
                    button_title={'Cancel'}
                    resetForm={() => navigate('/SaleOrderReport')}
                    saveShipping={saveShipping}
                    setSaleOrder={setSaleOrder}
                />
            )
        }else if(saleOrder.status === 'Shipped'){
            return(
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
                    button_title={"Cancel"}
                    resetForm={() => navigate('/SaleOrderReport')}
                    saveSaleOrder={saveSaleOrder}
                    setDisable={true}
                />
            )
        }
    }

    return (
        showForms()
    )
}
