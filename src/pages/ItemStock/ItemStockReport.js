import React from 'react'
import MaterialTable from 'material-table'
import { IdopContext } from '../../context/IdopProvider';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import { ItemLocation } from '../../models';
import { Item } from '../../models';
import { StorageLocation } from '../../models';

export default function ItemStockReport() {
    const [itemLocations, setItemLocations] = React.useState([])

    const {
        user
    } = React.useContext(IdopContext)

    const columnsStyle = {fontWeight: 'bold'}

    const getLocations = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Item Locations
        let models = (await DataStore.query(ItemLocation)).filter(location => location.companyID === currentUser[0].companyID);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        //Items
        let itemModels = await DataStore.query(Item);
        itemModels = JSON.stringify(itemModels, null, 2)
        itemModels = JSON.parse(itemModels)
        //Storage Locations
        let storageModels = await DataStore.query(StorageLocation);
        storageModels = JSON.stringify(storageModels, null, 2)
        storageModels = JSON.parse(storageModels)
        //Change Item ID for name
        models.map((location) => location.itemID = location.itemID ? `${itemModels.filter(item => item.id === location.itemID)[0].name} - SKU# ${itemModels.filter(item => item.id === location.itemID)[0].sku}` : '')
        //Change Storage ID for name
        models.map((location) => location.storagelocationID = location.storagelocationID ? `${storageModels.filter(storage => storage.id === location.storagelocationID)[0].storage_name}` : '')
        setItemLocations(models)
    }

    React.useEffect(() => {
        getLocations()
        const subscription = DataStore.observe(ItemLocation).subscribe(() => getLocations())
        return () => subscription.unsubscribe()
    },[]);

    return (
        <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
            <MaterialTable
                columns={[
                    { title: 'Lot #', field: 'lot_number', headerStyle: columnsStyle},
                    { title: 'Item', field: 'itemID', headerStyle: columnsStyle },
                    { title: 'Storage Location', field: 'storagelocationID', headerStyle: columnsStyle },
                    { title: 'Cases', field: 'cases', headerStyle: columnsStyle },
                    { title: 'Cases (#2)', field: 'cases_2', headerStyle: columnsStyle },
                    { title: 'Units', field: 'units', headerStyle: columnsStyle},
                    { title: 'Pieces Weight', field: 'pieces_weight', headerStyle: columnsStyle}
                ]}
                data={itemLocations}
                title="Items Stock"
                actions={[
                    // {
                    // icon: 'delete',
                    // tooltip: 'Delete User',
                    // onClick: (event, data) => deleteUsers(data),
                    // },
                    // {
                    // icon: 'edit',
                    // tooltip: 'Edit User',
                    // onClick: (event, rowData) => navigate('/EditUser', { state: {id: rowData[0].id} })
                    // }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    selection: false    ,
                }}
            />
        </div>
    )
}
