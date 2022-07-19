import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { StorageLocation } from '../../models';
import StorageLocForm from '../../components/AddStorage/StorageLocForm';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/Location/LocationValidations';

export default function EditStorageLoc() {

    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = state

    const [storageLoc,setStorageLoc] = React.useState({})

    const getLocations = async () => {
        //Storage Location
        let models = await DataStore.query(StorageLocation,id);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        setStorageLoc(models)
    }

    const saveLocData = async () => {
        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false
        })
          
        Swal.showLoading()

        //Validations
        if(await onSubmitValidation(storageLoc)){
            return
        }

        try{
            let older_item = await DataStore.query(StorageLocation,id);
            await DataStore.save(StorageLocation.copyOf(older_item, item => {
                item.storage_type = storageLoc.storage_type
                item.storage_name = storageLoc.storage_name
                item.rack = parseInt(storageLoc.rack)
                item.row = parseInt(storageLoc.row)
                item.position = parseInt(storageLoc.position)
                item.warehouseID = storageLoc.warehouseID
                item.companyID = storageLoc.companyID
            }));

            Swal.fire(
                'Form Sent!',
                'Form Edit Success',
                'success',
            ).then(() => {
                navigate('/StorageLocationReport')
            })

        }catch(error){
            console.log(error)
        }
    }

    React.useEffect(() => {
        getLocations()
    },[]);

    return (
        <StorageLocForm
            title={"Edit Storage Location"}
            storageLoc={storageLoc}
            setStorageLoc={setStorageLoc}
            resetForm={() => navigate('/StorageLocationReport')}
            saveStorageLoc={saveLocData}
            button_title="Cancel"
        />
    )
}
