import React from 'react'
import CompanyFormAdmin from './CompanyFormAdmin'
import CompanyFormMain from './CompanyFormMain'
import CompanyFormZB from './CompanyFormZB'

export default function CompanyForm({company,setCompany,companyAddress,setCompanyAddress,saveCompanyData,resetForm,title,button_title,setDisable}) {

  return (
    <div className='p-0 p-md-4'>
      <h1 className='text-center pt-2'>{title}</h1>
      <hr className="bg-secondary border-2 border-top border-secondary"/>
      <CompanyFormMain company={company} setCompany={setCompany} companyAddress={companyAddress} setCompanyAddress={setCompanyAddress} setDisable={setDisable}/>
      <h4 className='ps-2 pt-2'>Administration</h4>
      <hr className="bg-secondary border-2 border-top border-secondary"/>
      <CompanyFormAdmin company={company} setCompany={setCompany} setDisable={setDisable}/>
      <h4 className='ps-2 pt-2'>Zoho Books Information</h4>
      <hr className="bg-secondary border-2 border-top border-secondary"/>
      <CompanyFormZB company={company} setCompany={setCompany} setDisable={setDisable}/>
      <hr className="bg-secondary border-2 border-top border-secondary"/>
      <div className='mx-auto d-flex justify-content-center mb-4'>
        <button onClick={saveCompanyData} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
        <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
      </div>
    </div >
  )
}
