import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Supplier } from '../../models';
import { User } from '../../models';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import Swal from 'sweetalert2'
import { IdopContext } from '../../context/IdopProvider';


export default function SuppliersReport() {

    const {
        user
    } = React.useContext(IdopContext)

    const [suppliers, setSuppliers] = React.useState([])

    const navigate = useNavigate();

    const columnsStyle = {fontWeight: 'bold'}

    const getSuppliers = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Suppliers
        let models = (await DataStore.query(Supplier)).filter(supplier => supplier.companyID === currentUser[0].companyID);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        setSuppliers(models)
    }

    const deleteSupplier = async (supplierID) => {
        const modelToDelete = await DataStore.query(Supplier, supplierID);
        DataStore.delete(modelToDelete);
    }

    const deleteSuppliers = (data) => {
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
    
                data.map(user => (
                    deleteSupplier(user.id)
                ))
    
                Swal.fire(
                'Deleted!',
                `The Companies were successfully deleted`,
                'success'
                ).then(() => {
                    getSuppliers()
                })
    
            }
            })    
    }

    React.useEffect(() => {
        getSuppliers()
        const subscription = DataStore.observe(Supplier).subscribe(() => getSuppliers())
        return () => subscription.unsubscribe()
    },[]);

    return (
        <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={[
                    { title: 'Name', field: 'name', headerStyle: columnsStyle},
                    { title: 'Short Name', field: 'short_name', headerStyle: columnsStyle },
                    { title: 'Phone', field: 'phone', headerStyle: columnsStyle },
                    { title: 'Email', field: 'purchasing_email', headerStyle: columnsStyle}
                ]}
                data={suppliers}
                title="All Suppliers"
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, data) => deleteSuppliers(data),
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => navigate('/EditSupplier', { state: {id: rowData[0].id} })
                    },
                    {
                        icon: 'visibility',
                        tooltip: 'View Company',
                        onClick: (event, rowData) => navigate('/ViewSupplier', { state: {id: rowData[0].id} })
                    },
                ]}
                options={{
                    actionsColumnIndex: -1,
                    selection: true,
                }}
            />
        </div>
    )
}
