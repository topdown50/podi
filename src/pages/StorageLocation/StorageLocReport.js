import React from 'react'
import MaterialTable from 'material-table'
import { DataStore } from '@aws-amplify/datastore';
import { IdopContext } from '../../context/IdopProvider';
import { StorageLocation } from '../../models';
import { Warehouse } from '../../models';
import { useNavigate } from 'react-router-dom';
import { User } from '../../models';
import Swal from 'sweetalert2'

export default function StorageLocReport() {

    const {
        user
    } = React.useContext(IdopContext)

    const [storageLocations,setStorageLocations] = React.useState([])

    const navigate = useNavigate();

    const columnsStyle = {fontWeight: 'bold'}

    const getStorageLoc = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Storage Locations
        let models = (await DataStore.query(StorageLocation)).filter(location => location.companyID === currentUser[0].companyID);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        //Warehouses
        let warehouseModel = await DataStore.query(Warehouse);
        warehouseModel = JSON.stringify(warehouseModel, null, 2)
        warehouseModel = JSON.parse(warehouseModel)
        //Change id for name
        models.map((storage) => storage.warehouseID = storage.warehouseID ? warehouseModel.filter(warehouse => warehouse.id === storage.warehouseID)[0].warehouse_name : '')
        setStorageLocations(models)
    }

    const deleteStorage = async (storageID) => {
      
        const modelToDelete = await DataStore.query(StorageLocation, storageID);
        DataStore.delete(modelToDelete);
  
    }

    const deleteStorages = (data) => {

        Swal.fire({

        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
        if (result.isConfirmed) {

            data.map(storage => (
                deleteStorage(storage.id)
            ))

            Swal.fire(
            'Deleted!',
            `The Companies were successfully deleted`,
            'success'
            ).then(() => {
                getStorageLoc()
            })

        }
        })    
    }

    React.useEffect(() => {
        getStorageLoc()
        const subscription = DataStore.observe(StorageLocation).subscribe(() => getStorageLoc())
        return () => subscription.unsubscribe()
    },[]);

    return (
        <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={[
                { title: 'Storage Name', field: 'storage_name', headerStyle: columnsStyle},
                { title: 'Storage Type', field: 'storage_type', headerStyle: columnsStyle },
                { title: 'Warehouse', field: 'warehouseID', headerStyle: columnsStyle },
                ]}
                data={storageLocations}
                title="All Storage Locations"
                actions={[
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, data) => deleteStorages(data),
                },
                {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: (event, rowData) => navigate('/EditStorageLocation', { state: {id: rowData[0].id} })
                }
                ]}
                options={{
                actionsColumnIndex: -1,
                selection: true,
                }}
            />
        </div>
    )
}
