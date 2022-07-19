import Swal from 'sweetalert2'

export async function onSubmitValidation(user){
    if((user.companyID === undefined || user.companyID === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Company </b>`,
            'warning'
        )
        return true;
    }
    if((user.name === undefined || user.name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Name </b>`,
            'warning'
        )
        return true;
    }
    if((user.last_name === undefined || user.last_name === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Last Name </b>`,
            'warning'
        )
        return true;
    }
    if((user.email === undefined || user.email === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Email </b>`,
            'warning'
        )
        return true;
    }
    if((user.status === undefined || user.status === '')){
        Swal.fire(
            'Field Required!',
            `Please fill the <b> Status </b>`,
            'warning'
        )
        return true;
    }
    return false
}