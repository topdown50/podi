import React from 'react'
import ItemForm from '../../components/AddItemForm/ItemForm'
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';
import useCompanyID from '../../hooks/useCompanyID';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/Item/ItemValidations';
import { sendItemZB } from '../../utils/Item/ItemZB';

export default function AddItem() {

  const [item, setItem] = React.useState({})
  const [companyID] = useCompanyID('')
  
  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setItem({})
  }

  const saveItem = async () => {

    //Adding Company ID
    const sentItem = {...item, companyID: [companyID].toString()}
    let item_id = await sendItemZB(sentItem)
    sentItem.zb_item_id = item_id
    
    Swal.fire({
      title: 'Please Wait',
      allowOutsideClick: false
    })
    
    Swal.showLoading()

    //Validations
    if(await onSubmitValidation(sentItem)){
      return
    }
  
    try{
      await DataStore.save(
        new Item(sentItem)
      );

      Swal.fire(
        'Form Sent!',
        'Form Submit Success',
        'success'
      )

      resetForm()
    } catch(err){

      Swal.fire(
        'Error, please try again.',
        err,
        'error'
      )
    }

  }

  return (
    <ItemForm
      title={"Add Item"}
      button_title="Reset"
      item={item}
      setItem={setItem}
      resetForm={resetForm}
      saveItem={saveItem}
    />
  )
}
