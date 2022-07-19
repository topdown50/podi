import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import UserForm from '../../components/AddUserForm/UserForm';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/User/UserValidations';

export default function EditUser() {

    const [user,setUser] = React.useState({})

    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = state

    const getUsers = async () => {
        //Users
        let models = await DataStore.query(User,id);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        setUser(models)
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
            let older_item = await DataStore.query(User,id);
            await DataStore.save(User.copyOf(older_item, item => {
                item.name = user.name
                item.last_name = user.last_name
                item.phone = user.phone
                item.status = user.status
                item.email = user.email 
                item.companyID = user.companyID
            }));

            Swal.fire(
                'Form Sent!',
                'Form Edit Success',
                'success',
            ).then(() => {
                navigate('/UsersReport')
            })

        }catch(error){
            Swal.fire(
                'Error, please try again.',
                error,
                'error'
            )
        }
    }

    React.useEffect(() => {
        getUsers()
    },[]);

    return (
        <UserForm
            title="Edit User"
            user={user}
            setUser={setUser}
            button_title = "Cancel"
            saveUserData = {saveUserData}
            resetForm = {() => navigate('/UsersReport')}
        />
    )
}
