import React from 'react'
import UserForm from '../../components/AddUserForm/UserForm'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/User/UserValidations';

export default function AddUser() {

  const [user, setUser] = React.useState({status:'invited'})

  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setUser({status:'invited'})
  }

  const saveUserData = async () => {
    
    Swal.fire({
      title: 'Please Wait',
      allowOutsideClick: false
    })
    
    Swal.showLoading()

    //Validations
    if(await onSubmitValidation(user)){
      return
    }

    try{
      await DataStore.save(
        new User(user)
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
    <UserForm
      title="Add User"
      button_title = "Reset"
      user={user}
      setUser={setUser}
      saveUserData = {saveUserData}
      resetForm = {resetForm}
    />
  )
}
