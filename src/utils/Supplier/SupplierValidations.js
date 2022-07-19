import Swal from 'sweetalert2'

export async function onSubmitValidation(supplier){
    if((supplier.name === undefined || supplier.name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Supplier Name </b>`,
            'warning'
        )
        return true;
    }
    return false
}