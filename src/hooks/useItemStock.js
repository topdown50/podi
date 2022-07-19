import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { ItemLocation } from '../models';
import { SaleOrder } from '../models';
import { SaleOrderItem } from '../models';
import { PurchaseOrder } from '../models';
import { PurchaseOrderItems } from '../models';

export default function useItemStock(currentItemID,saleID) {

    const [onHand, setOnHand] = React.useState('')
    const [booked, setBooked] = React.useState('')
    const [picked, setPicked] = React.useState('')
    const [available, setAvailable] = React.useState('')
    const [onOrder, setOnOrder] = React.useState('')
    const [onOrderAvailable, setOnOrderAvailable] = React.useState('')

    const getStocks = async () => {
        //----------- Get On Hand -----------
        let models = (await DataStore.query(ItemLocation)).filter(item => item.itemID === currentItemID);
        //Stocks
        let caseStock = 0
        let unitStock = 0
        let weightStock = 0
        //Searching for Items
        if(models.length > 0){
            models.forEach(item => {
                caseStock += parseFloat(item.cases)
            })
        }
        setOnHand(`${caseStock} C`)
        //----------- Get Booked -----------
        let saleModels = (await DataStore.query(SaleOrder)).filter(sale => sale.id !== saleID && sale.status !== "Shipped");
        //Booked Items
        let total_booked_units = 0
        let total_booked_cases = 0
        let total_booked_weight = 0
        //Searching for Cases
        await Promise.all(saleModels.map( async sale => {
            let OrderItemsModels = (await DataStore.query(SaleOrderItem)).filter(item => 
                item.saleorderID === sale.id && 
                item.itemID === currentItemID &&
                item.typeMeasure === "case"
            );
            OrderItemsModels.forEach(item => {
                total_booked_cases += parseFloat(item.sell_count)
            })
        }))

        setBooked(`${total_booked_cases} C`)
        //----------- Get Picked -----------
        saleModels = (await DataStore.query(SaleOrder)).filter(sale => sale.id !== saleID && sale.status === "Ready");
        let total_picked_cases = 0
        let total_picked_units = 0
        let total_picked_weight = 0
        //Searching for Cases
        await Promise.all(saleModels.map( async sale => {
            let OrderItemsModels = (await DataStore.query(SaleOrderItem)).filter(item => 
                item.saleorderID === sale.id && 
                item.itemID === currentItemID &&
                item.typeMeasure === "case"
            );
            OrderItemsModels.forEach(item => {
                total_picked_cases += parseFloat(item.sell_count)
            })
        }))

        setPicked(`${total_picked_cases} C`)
        //----------- Get on Order -----------
        let purchaseModels = (await DataStore.query(PurchaseOrder)).filter(purchase => purchase.status === "Ordered");
        let total_ordered_cases = 0;
        let total_ordered_units = 0;
        let total_ordered_weight = 0;
        //Searching for Cases
        await Promise.all(purchaseModels.map( async purchase => {
            let saleItemsModels = (await DataStore.query(PurchaseOrderItems)).filter(item => 
                item.purchaseorderID === purchase.id && 
                item.itemID === currentItemID &&
                item.typeMeasure === "case"
            )
            saleItemsModels.forEach(item => {
                total_ordered_cases += parseFloat(item.quantityorder)
            })
        }))
        
        setOnOrder(`${total_ordered_cases} C`)
        //----------- Get the Available -----------
        let newCases = caseStock - total_booked_cases
        let newUnits = unitStock - total_booked_units
        //----------- Booked for sales with no Stock -----------
        saleModels = (await DataStore.query(SaleOrder)).filter(sale => sale.id !== saleID && sale.status !== "Shipped")
        let booked_units = 0
        let booked_cases = 0
        let booked_weight = 0
        //Searching for Cases
        await Promise.all(saleModels.map( async sale => {
            let OrderItemsModels = (await DataStore.query(SaleOrderItem)).filter(item => 
                item.saleorderID === sale.id && 
                item.itemID === currentItemID &&
                item.typeMeasure === "case" &&
                item.ooa === true
            );
            OrderItemsModels.forEach(item => {
                booked_cases += parseFloat(item.sell_count)
            })
        }))
        //----------- Recalculate the available -----------
        newUnits = newUnits + booked_units
        newCases = newCases + booked_cases
        if(newCases < 0){
            newCases = 0;
        }
        if(newUnits < 0){
            newUnits = 0;
        }
        //----------- calculate the on order available -----------
        let cases_order_available = total_ordered_cases - booked_cases;
        setOnOrderAvailable(`${cases_order_available} C`)
        // ----------- set the available -----------
        setAvailable(`${newCases} C`)
    }

    React.useEffect(() => {
        setOnHand('')
        setBooked('')
        setPicked('')
        setOnOrder('')
        setOnOrderAvailable('')
        setAvailable('')
        getStocks()
        const subscription = DataStore.observe(ItemLocation).subscribe(() => getStocks())
        return () => subscription.unsubscribe()
    },[currentItemID])

    React.useEffect(() => {
        setOnHand('')
        setBooked('')
        setPicked('')
        setOnOrder('')
        setOnOrderAvailable('')
        setAvailable('')
        getStocks()
        const subscription = DataStore.observe(SaleOrder).subscribe(() => getStocks())
        return () => subscription.unsubscribe()
    },[currentItemID])

    React.useEffect(() => {
        setOnHand('')
        setBooked('')
        setPicked('')
        setOnOrder('')
        setOnOrderAvailable('')
        setAvailable('')
        getStocks()
        const subscription = DataStore.observe(PurchaseOrder).subscribe(() => getStocks())
        return () => subscription.unsubscribe()
    },[currentItemID])

    return [
        onHand,
        booked,
        picked,
        onOrder,
        onOrderAvailable,
        available
    ]
}
