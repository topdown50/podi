import Swal from 'sweetalert2'
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';
import { ItemLocation } from '../../models';

export async function stockIncrease(
    lot_number,
    item_id,
    storage_id,
    stock_adjustment,
    typeMeasure,
    //IDs
    companyID
){
    const models = await DataStore.query(Item,item_id);
    if(models.id){
        if(typeMeasure === 'case'){
            const itemLocationModels = (await DataStore.query(ItemLocation)).filter((location) => (location.itemID === item_id && location.storagelocationID === storage_id && location.lot_number === lot_number));
            if(itemLocationModels.length > 0){
                try{
                    let copy_itemLocation = await DataStore.query(ItemLocation,itemLocationModels[0].id);
                    await DataStore.save(ItemLocation.copyOf(copy_itemLocation, itemLocation => {
                        itemLocation.cases += stock_adjustment
                    }));
                }catch(e){
                    console.log(e)
                    Swal.fire(
                        'Error, please try again.',
                        'Error when trying to increase the stock',
                        'error'
                    )
                }
                
            }else{
                try{
                    await DataStore.save(
                        new ItemLocation({
                            "lot_number": lot_number,
                            "cases": stock_adjustment,
                            "companyID": companyID,
                            "itemID": item_id,
                            "storagelocationID": storage_id,
                            "default": true
                        })
                    );
                }catch(e){
                    console.log(e)
                    Swal.fire(
                        'Error, please try again.',
                        'Error when trying to increase the stock',
                        'error'
                    )
                }
                
            }
        }
    }
}