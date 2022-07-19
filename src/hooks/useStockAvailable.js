import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { SaleOrder } from '../models';
import { SaleOrderItem } from '../models';
import { ItemLocation } from '../models';


export default function useStockAvailable(currentItemID,storageLocationID,saleID,item_lot) {

    const [available, setAvailable] = React.useState('')

    const getAvailable = async () => {
        //----------- Get Picked Items -----------
        let saleModels = (await DataStore.query(SaleOrder)).filter(sale => sale.id !== saleID && sale.status === "Ready");
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
        //----------- Get Available Items -----------
        let models = (await DataStore.query(ItemLocation)).filter(item => 
            item.itemID === currentItemID && 
            item.storagelocationID === storageLocationID && 
            item.lot_number  === item_lot
        );
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
        //----------- Available -----------
        if(
            currentItemID !== '' &&
            currentItemID !== undefined &&
            storageLocationID !== '' &&
            storageLocationID !== undefined &&
            item_lot !== '' &&
            item_lot !== undefined &&
            item_lot !== 0
        ){
            let caseAvailable = caseStock - total_picked_cases
            if(caseAvailable >= 0){
                setAvailable(`${caseAvailable} C`)
            }else{
                setAvailable(`${0} C`)
            }
            
        }else{
            setAvailable(`${0} C`)
        }
        
    }


    React.useEffect(() => {
        setAvailable('')
        getAvailable()
        const subscription = DataStore.observe(SaleOrder).subscribe(() => getAvailable())
        return () => subscription.unsubscribe()
    },[
        currentItemID,
        storageLocationID,
        item_lot
    ])

    React.useEffect(() => {
        setAvailable('')
        getAvailable()
        const subscription = DataStore.observe(ItemLocation).subscribe(() => getAvailable())
        return () => subscription.unsubscribe()
    },[
        currentItemID,
        storageLocationID,
        item_lot
    ])

    return [
        available
    ]
}
