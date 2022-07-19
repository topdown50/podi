import React from 'react'
import CompanyForm from '../../components/AddCompanyForm/CompanyForm'
import Swal from 'sweetalert2'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { onSubmitValidation } from '../../utils/Company/CompanyValidations';

export default function AddCompany() {

  const [company, setCompany] = React.useState({
    purchasing_count: 0,
    invoice_count: 0,
    scrap_count: 0,
  })
  
  const [companyAddress, setCompanyAddress] = React.useState({})

  const resetForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
    setCompany({
      purchasing_count: 0,
      invoice_count: 0,
      scrap_count: 0,
    })
    setCompanyAddress({})
  }

  const saveCompanyData = async () => {

    //Adding Address
    const sentCompany = {...company, company_address: [companyAddress]}

    //Deleting empty fields
    Object.keys(sentCompany).forEach(key => {
      if (sentCompany[key] === '') {
        delete sentCompany[key];
      }
    });

    Swal.fire({
      title: 'Please Wait',
      allowOutsideClick: false
    })
    
    Swal.showLoading()

    //Validations
    if(await onSubmitValidation(sentCompany)){
      return
    }

    try{

      await DataStore.save(
        new Company(sentCompany)
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
    <CompanyForm
      title="Add Company"
      button_title = "Reset"
      company = {company}
      setCompany = {setCompany}
      companyAddress = {companyAddress}
      setCompanyAddress = {setCompanyAddress}
      saveCompanyData = {saveCompanyData}
      resetForm = {resetForm}
    />
  )
}
