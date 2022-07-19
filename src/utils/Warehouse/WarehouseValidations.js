import Swal from 'sweetalert2'

export async function onSubmitValidation(warehouse){
    if((warehouse.warehouse_name === undefined || warehouse.warehouse_name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Warehouse Name </b>`,
            'warning'
        )
        return true;
    }
    return false
}