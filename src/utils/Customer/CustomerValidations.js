import Swal from 'sweetalert2'

export async function onSubmitValidation(customer){
    if((customer.company_name === undefined || customer.company_name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Company Name </b>`,
            'warning'
        )
        return true;
    }
    return false
}