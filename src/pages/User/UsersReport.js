import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { User } from '../../models';

export default function UsersReport() {
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    const columnsStyle = {fontWeight: 'bold'}

    const getUsers = async () => {
      //Users
      let models = await DataStore.query(User);
      models = JSON.stringify(models, null, 2)
      models = JSON.parse(models)
      //Companies
      let companieModels = await DataStore.query(Company);
      companieModels = JSON.stringify(companieModels, null, 2)
      companieModels = JSON.parse(companieModels)
      //Change id for name
      models.map((user) => user.companyID = user.companyID ? companieModels.filter(comp => comp.id === user.companyID)[0].company_name : '')
      setUsers(models)
    }

    const deleteUser = async (userID) => {
      
      const modelToDelete = await DataStore.query(User, userID);
      DataStore.delete(modelToDelete);

    }

    const deleteUsers = (data) => {

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
                deleteUser(user.id)
            ))

            Swal.fire(
            'Deleted!',
            `The Companies were successfully deleted`,
            'success'
            ).then(() => {
                getUsers()
            })

        }
        })    
    }

    useEffect(() => {
        getUsers()
        const subscription = DataStore.observe(User).subscribe(() => getUsers())
        return () => subscription.unsubscribe()
    },[]);
    
  return (
    <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
      <MaterialTable
          columns={[
            { title: 'Company', field: 'companyID', headerStyle: columnsStyle},
            { title: 'Name', field: 'name', headerStyle: columnsStyle },
            { title: 'Last Name', field: 'last_name', headerStyle: columnsStyle },
            { title: 'Email', field: 'email', headerStyle: columnsStyle}
          ]}
          data={users}
          title="All Users"
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, data) => deleteUsers(data),
            },
            {
              icon: 'edit',
              tooltip: 'Edit User',
              onClick: (event, rowData) => navigate('/EditUser', { state: {id: rowData[0].id} })
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
