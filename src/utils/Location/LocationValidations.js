import Swal from 'sweetalert2'

export async function onSubmitValidation(customer){
    if((customer.warehouseID === undefined || customer.warehouseID === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Warehouse </b>`,
            'warning'
        )
        return true;
    }
    if((customer.storage_type === undefined || customer.storage_type === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Storage Type </b>`,
            'warning'
        )
        return true;
    }
    if((customer.storage_name === undefined || customer.storage_name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Storage Name </b>`,
            'warning'
        )
        return true;
    }
    return false
}