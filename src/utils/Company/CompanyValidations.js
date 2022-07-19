import Swal from 'sweetalert2'

export async function onSubmitValidation(company){
    if((company.company_name === undefined || company.company_name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Company Name </b>`,
            'warning'
        )
        return true;
    }
    if((company.company_code === undefined || company.company_code === '')){
        Swal.fire(
            'Field Required!',
            'Please fill the <b> Company Code </b>',
            'warning'
        )
        return true;
    }
    return false
}