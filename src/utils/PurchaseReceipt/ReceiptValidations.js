import Swal from 'sweetalert2'

export async function onSubmitValidationReceipt(items){
    //Items
    const itemValidate = items.map((item) => {
        if(item.lot_number === undefined || item.lot_number === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Item Lot # </b>`,
                'warning'
            )
            return true;
        }
        if(item.quantityreceipt === undefined || item.quantityreceipt === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Item Quantity Received </b>`,
                'warning'
            )
            return true;
        }
        if(item.storagelocationID === undefined || item.storagelocationID === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Item Storage Location </b>`,
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