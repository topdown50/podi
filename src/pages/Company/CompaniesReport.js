import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function CompaniesReport() {

  const [companies, setCompanies] = useState([])

  const navigate = useNavigate();

  const columnsStyle = {fontWeight: 'bold'}

  const getCompanies = async () => {
    let models = await DataStore.query(Company);
    models = JSON.stringify(models, null, 2)
    models = JSON.parse(models)
    console.log(models)
    setCompanies(models)
  }

  const deleteCompany = async (companyID) => {

    const modelToDelete = await DataStore.query(Company, companyID);
    DataStore.delete(modelToDelete);

  }

  const deleteCompanies = (data) => {

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

        data.map(company => (
          deleteCompany(company.id)
        ))

        Swal.fire(
          'Deleted!',
          `The Companies were successfully deleted`,
          'success'
        ).then(() => {
          getCompanies()
        })

      }
    })    


  }

  useEffect(() => {
    getCompanies()
    const subscription = DataStore.observe(Company).subscribe(() => getCompanies())
    return () => subscription.unsubscribe()
  },[]);

  return (
    <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
      <MaterialTable
          columns={[
            { title: 'Company Code', field: 'company_code', headerStyle: columnsStyle},
            { title: 'Company Name', field: 'company_name', headerStyle: columnsStyle },
            { title: 'Company Email', field: 'company_email', headerStyle: columnsStyle },
            { title: 'Company Phone', field: 'company_phone', headerStyle: columnsStyle}
          ]}
          data={companies}
          title="All Companies"
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete Company',
              onClick: (event, data) => deleteCompanies(data),
            },
            {
              icon: 'edit',
              tooltip: 'Edit Company',
              onClick: (event, rowData) => navigate('/EditCompany', { state: {id: rowData[0].id} })
            },
            {
              icon: 'visibility',
              tooltip: 'View Company',
              onClick: (event, rowData) => navigate('/ViewCompany', { state: {id: rowData[0].id} })
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
