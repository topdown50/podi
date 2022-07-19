import React from 'react'
import MaterialTable from 'material-table';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import { Item } from '../../models';
import { IdopContext } from '../../context/IdopProvider';
import { Supplier } from '../../models';

export default function ItemsReport() {

  const {
    user
  } = React.useContext(IdopContext)

  const [items, setItems] = React.useState([])

  const navigate = useNavigate();

  const columnsStyle = {fontWeight: 'bold'}

  const getItems = async () => {
    //Get Users
    let userModels = await DataStore.query(User);
    userModels = JSON.stringify(userModels, null, 2)
    userModels = JSON.parse(userModels)
    const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
    //Get Suppliers
    let supplierModel = (await DataStore.query(Supplier)).filter(mySupplier => mySupplier.companyID === currentUser[0].companyID);
    supplierModel = JSON.stringify(supplierModel, null, 2)
    supplierModel = JSON.parse(supplierModel)
    //Get Items
    let models = (await DataStore.query(Item)).filter(myItem => myItem.companyID === currentUser[0].companyID);
    models = JSON.stringify(models, null, 2)
    models = JSON.parse(models)
    //Change id for supplier
    models.map((item) => item.supplierID = item.supplierID ? supplierModel.filter(supp => supp.id === item.supplierID)[0].name : '')
    setItems(models)
  }

  const deleteItem = async (itemID) => {
      
    const modelToDelete = await DataStore.query(Item, itemID);
    DataStore.delete(modelToDelete);

  }

  const deleteItems = (data) => {

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

        data.map(item => (
          deleteItem(item.id)
        ))

        Swal.fire(
        'Deleted!',
        `The Companies were successfully deleted`,
        'success'
        ).then(() => {
          getItems()
        })

    }
    })    
  }

  React.useEffect(() => {
    getItems()
    const subscription = DataStore.observe(Item).subscribe(() => getItems())
    return () => subscription.unsubscribe()
  },[]);

  return (
    <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
      <MaterialTable
          columns={[
              { title: 'Item SKU', field: 'sku', headerStyle: columnsStyle },
              { title: 'Name', field: 'name', headerStyle: columnsStyle},
              { title: 'Supplier', field: 'supplierID', headerStyle: columnsStyle },
          ]}
          data={items}
          title="All Items"
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, data) => deleteItems(data),
            },
            {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => navigate('/EditItem', { state: {id: rowData[0].id} })
            },
            {
                icon: 'visibility',
                tooltip: 'View Company',
                onClick: (event, rowData) => navigate('/ViewItem', { state: {id: rowData[0].id} })
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
