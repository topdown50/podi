import React, { useEffect } from 'react'
import CompanyForm from '../../components/AddCompanyForm/CompanyForm'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ViewCompany() {

  const [company, setCompany] = React.useState({})
  const [companyAddress, setCompanyAddress] = React.useState({})

  const navigate = useNavigate();

  const {state} = useLocation();
  const {id} = state

  const getCompanies = async () => {
    let models = await DataStore.query(Company,id);
    models = JSON.stringify(models, null, 2)
    models = JSON.parse(models)
    setCompany(models)
    setCompanyAddress(models.company_address[0])
  }

  useEffect(() => {
    getCompanies()
  },[]);

  return (
    <CompanyForm
      title="Company Details"
      button_title = "Exit"
      company = {company}
      setCompany = {setCompany}
      companyAddress = {companyAddress}
      setCompanyAddress = {setCompanyAddress}
      resetForm = {() => navigate('/CompaniesReport')}
      setDisable = {true}
    />
  )
}
