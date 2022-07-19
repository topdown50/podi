import Swal from 'sweetalert2'
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';

export async function onSubmitValidation(saleOrder,items){
    //Main Fields
    if(saleOrder.customerID === undefined || saleOrder.customerID === ''){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Customer </b> field`,
            'warning'
        )
        return true;
    }
    if(items.length === 0){
        Swal.fire(
            'Field Required!',
            `Please Add <b> Items </b>`,
            'warning'
        )
        return true;
    }
    //Items
    const itemValidate = items.map((item) => {
        if(item.itemID === undefined || item.itemID === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Item/Product - SKU# </b>`,
                'warning'
            )
            return true;
        }
        if(item.sell_count === undefined || item.sell_count === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Sell Count </b>`,
                'warning'
            )
            return true;
        }
        if(item.unit_price === undefined || item.unit_price === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Unit Price </b>`,
                'warning'
            )
            return true;
        }
        return false;
    })
    if(itemValidate.includes(true)){
        return true
    }
    return false
}

export async function onSubmitValidationPicking(saleOrder,items,saleItems){
    if(saleOrder.radio_picking_to === undefined || saleOrder.radio_picking_to === ''){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> What do you want to do? </b>`,
            'warning'
        )
        return true;
    }
    if(items.length === 0 && saleOrder.radio_picking_to === 'ready'){
        Swal.fire(
            'Field Required!',
            `Please Add <b> Items </b>`,
            'warning'
        )
        return true;
    }
    //Items
    if(saleOrder.radio_picking_to === 'ready'){
        const itemValidate = items.map((item) => {
            if(item.lot_number === undefined || item.lot_number === ''){
                Swal.fire(
                    'Field Required!',
                    `Please fill the <b> Lot number </b>`,
                    'warning'
                )
                return true;
            }
            if(item.itemID === undefined || item.itemID === ''){
                Swal.fire(
                    'Field Required!',
                    `Please fill the <b> Item/Product - SKU# </b>`,
                    'warning'
                )
                return true;
            }
            if(item.storagelocationID === undefined || item.storagelocationID === ''){
                Swal.fire(
                    'Field Required!',
                    `Please fill the <b> Storage Location </b>`,
                    'warning'
                )
                return true;
            }
            if(item.pick_count === undefined || item.pick_count === '' || item.pick_count === null){
                Swal.fire(
                    'Field Required!',
                    `Please fill the <b> Pick Count </b>`,
                    'warning'
                )
                return true;
            }
            return false;
        })
        if(itemValidate.includes(true)){
            return true
        }
        const pickValidate = saleItems.map(async (saleItem) => {
            let item_total = 0
            items.forEach((pickItem) => {
                if(pickItem.itemID === saleItem.itemID && pickItem.typeMeasure === saleItem.typeMeasure){
                    item_total += pickItem.pick_count
                }
            })
            if(saleItem.sell_count !== item_total){
                const models = await DataStore.query(Item,saleItem.itemID)
                Swal.fire(
                    'Total Items Picked does not match!',
                    `The total items picked <b> (${item_total}) </b> for <b> ${models.name} - SKU# ${models.sku} </b> does not match the number of required items <b> (${saleItem.sell_count}) </b> for this sale order!`,
                    'warning'
                )
                return true;
            }
            return false;
        })
        if(pickValidate.includes(true)){
            return true
        }
    }
    return false
}

