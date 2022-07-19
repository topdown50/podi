import React from 'react'
import MaterialTable from 'material-table';
import Swal from 'sweetalert2'
import { IdopContext } from '../../context/IdopProvider';
import { DataStore } from '@aws-amplify/datastore';
import { Customer } from '../../models';
import { User } from '../../models';
import { useNavigate } from 'react-router-dom';


export default function CustomerReport() {

  const {
    user
  } = React.useContext(IdopContext)

  const [customers, setCustomers] = React.useState([])

  const navigate = useNavigate();

  const columnsStyle = {fontWeight: 'bold'}

  const getCustomers = async () => {
    //Get Users
    let userModels = await DataStore.query(User);
    userModels = JSON.stringify(userModels, null, 2)
    userModels = JSON.parse(userModels)
    const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
    //Get Customers
    let models = (await DataStore.query(Customer)).filter(customer => customer.companyID === currentUser[0].companyID);
    models = JSON.stringify(models, null, 2)
    models = JSON.parse(models)
    setCustomers(models)
  }

  const deleteCustomer = async (supplierID) => {
    const modelToDelete = await DataStore.query(Customer, supplierID);
    DataStore.delete(modelToDelete);
  }

  const deleteCustomers = (data) => {
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
          deleteCustomer(user.id)
        ))

        Swal.fire(
        'Deleted!',
        `The Companies were successfully deleted`,
        'success'
        ).then(() => {
          getCustomers()
        })

      }
    })    
  }

  React.useEffect(() => {
    getCustomers()
    const subscription = DataStore.observe(Customer).subscribe(() => getCustomers())
    return () => subscription.unsubscribe()
  },[]);

  return (
    <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
      <MaterialTable
          columns={[
              { title: 'Company Name', field: 'company_name', headerStyle: columnsStyle},
              { title: 'Name', field: 'name', headerStyle: columnsStyle },
              { title: 'Phone', field: 'phone', headerStyle: columnsStyle },
              { title: 'Email', field: 'email', headerStyle: columnsStyle}
          ]}
          data={customers}
          title="All Customers"
          actions={[
              {
                  icon: 'delete',
                  tooltip: 'Delete User',
                  onClick: (event, data) => deleteCustomers(data),
              },
              {
                  icon: 'edit',
                  tooltip: 'Edit User',
                  onClick: (event, rowData) => navigate('/EditCustomer', { state: {id: rowData[0].id} })
              },
              {
                  icon: 'visibility',
                  tooltip: 'View Company',
                  onClick: (event, rowData) => navigate('/ViewCustomer', { state: {id: rowData[0].id} })
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
