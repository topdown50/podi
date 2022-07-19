import React from 'react'
import StorageLocForm from '../../components/AddStorage/StorageLocForm'
import useCompanyID from '../../hooks/useCompanyID'
import { DataStore } from '@aws-amplify/datastore';
import { StorageLocation } from '../../models';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/Location/LocationValidations';

export default function AddStorageLoc() {

  const [companyID] = useCompanyID('')
  const [storageLoc,setStorageLoc] = React.useState({storage_type:'cooler'})
  

  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
    );
    setStorageLoc({})
  }

  const saveStorageLoc = async () => {

     //Adding Address
     const sentStorageLoc = {...storageLoc, companyID: [companyID].toString()}

    Swal.fire({
        title: 'Please Wait',
        allowOutsideClick: false
    })
      
    Swal.showLoading()

    //Validations
    if(await onSubmitValidation(sentStorageLoc)){
      return
    }

    try{
        await DataStore.save(
          new StorageLocation(sentStorageLoc)
        );
        
        Swal.fire(
          'Form Sent!',
          'Form Submit Success',
          'success'
        )
  
        resetForm()
  
      } catch(error){
          
        Swal.fire(
          'Error, please try again.',
          error,
          'error'
        )
    }
  }

  return (
    <StorageLocForm
      title="Add Storage Location"
      button_title={"Reset"}
      storageLoc={storageLoc}
      setStorageLoc={setStorageLoc}
      saveStorageLoc={saveStorageLoc}
    />
  )
}
