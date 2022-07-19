import React from 'react'
import WarehouseForm from '../../components/AddWarehouse/WarehouseForm'
import { DataStore } from '@aws-amplify/datastore';
import { Warehouse } from '../../models';
import Swal from 'sweetalert2'
import useCompanyID from '../../hooks/useCompanyID';
import { onSubmitValidation } from '../../utils/Warehouse/WarehouseValidations';

export default function AddWarehouse() {

    const [companyID] = useCompanyID('')  
    const [warehouse, setWarehouse] = React.useState({})
    const [address, setAddress] = React.useState({})

    const resetForm = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        setWarehouse({})
        setAddress({})
    }

    const saveWarehouseData = async () => {
        //Adding Address
        const sentWarehouse = {...warehouse, address: [address], companyID: [companyID].toString()}

        //Deleting empty fields
        Object.keys(sentWarehouse).forEach(key => {
            if (sentWarehouse[key] === '') {
                delete sentWarehouse[key];
            }
        });

        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false
        })
          
        Swal.showLoading()

        //Validations
        if(await onSubmitValidation(sentWarehouse)){
            return
        }

        try{
            await DataStore.save(
              new Warehouse(sentWarehouse)
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
        <WarehouseForm
            title={"Add Warehouse"}
            button_title={"Reset"}
            warehouse={warehouse}
            setWarehouse={setWarehouse}
            address={address}
            setAddress={setAddress}
            resetForm={resetForm}
            saveWarehouse={saveWarehouseData}
        />
    )
}
