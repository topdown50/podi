import Swal from 'sweetalert2'

export async function onSubmitValidation(purchaseOrder,items){
    //Main Fields
    if(purchaseOrder.supplierID === undefined || purchaseOrder.supplierID === ''){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Supplier Field </b>`,
            'warning'
        )
        return true;
    }
    if(purchaseOrder.flag_complete === undefined || purchaseOrder.flag_complete === ''){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Draft Section </b>`,
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
        if(item.quantityorder === undefined || item.quantityorder === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Order Count </b>`,
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
        if(item.quantityPallets === undefined || item.quantityPallets === ''){
            Swal.fire(
                'Field Required!',
                `Please fill the <b> Pallets </b>`,
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