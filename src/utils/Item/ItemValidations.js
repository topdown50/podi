import Swal from 'sweetalert2'
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';

export async function onSubmitValidation(item){
    if((item.name === undefined || item.name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Item Name </b>`,
            'warning'
        )
        return true;
    }
    if((item.sku === undefined || item.sku === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Item SKU </b>`,
            'warning'
        )
        return true;
    }
    if((item.type === undefined || item.type === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Item Type </b>`,
            'warning'
        )
        return true;
    }
    if((item.supplierID === undefined || item.supplierID === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Supplier </b>`,
            'warning'
        )
        return true;
    }
    //Check Item SKU
    if(!item.id){
        let models = (await DataStore.query(Item)).filter(myItem => myItem.sku === item.sku);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        if(models.length >= 1){
            Swal.fire(
                'Item SKU',
                `An Item with the same SKU already Exist`,
                'warning'
            )
            return true;
        }
        return false
    }
    
}