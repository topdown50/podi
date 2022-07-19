import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import CompanyForm from '../../components/AddCompanyForm/CompanyForm'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { onSubmitValidation } from '../../utils/Company/CompanyValidations';

export default function EditCompany() {

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

    const saveCompanyData = async () => {
        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false
        })
          
        Swal.showLoading()

        //Validations
        if(await onSubmitValidation(company)){
            return
        }

        try {
            let older_item = await DataStore.query(Company,id);
            await DataStore.save(Company.copyOf(older_item, item => {
                item.company_code = company.company_code
                item.company_name = company.company_name
                item.company_address = [companyAddress]
                item.company_email = company.company_email
                item.company_phone = company.company_phone
                item.purchasing_count = company.purchasing_count
                item.invoice_count = company.invoice_count
                item.scrap_count = company.scrap_count
                item.serial_reference = company.serial_reference
                item.extension_digit = company.extension_digit
                item.zb_organization_id = company.zb_organization_id
                item.zb_refresh_token = company.zb_refresh_token
                item.zb_client_id = company.zb_client_id
                item.zb_client_secret = company.zb_client_secret
            }));

            Swal.fire(
                'Form Sent!',
                'Form Edit Success',
                'success',
            ).then(() => {
                navigate('/CompaniesReport')
            })

            

        }catch(error){

            Swal.fire(
                'Error, please try again.',
                error,
                'error'
            )
        }
       
    }

    useEffect(() => {
        getCompanies()
    },[]);

    return (
        <CompanyForm
            title="Edit Company"
            button_title = "Cancel"
            company = {company}
            setCompany = {setCompany}
            companyAddress = {companyAddress}
            setCompanyAddress = {setCompanyAddress}
            saveCompanyData = {saveCompanyData}
            resetForm = {() => navigate('/CompaniesReport')}
        />
    )
}
