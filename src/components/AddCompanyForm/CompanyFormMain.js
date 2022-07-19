import React from 'react'
import InputFloating from '../FormComponents/InputFloating'

export default function CompanyFormMain({company,setCompany,companyAddress,setCompanyAddress,setDisable}) {
    
    return (
        <div className="container-fluid">
            <div className="row p-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCompany({...company, company_name: e.target.value})} value={company.company_name || ''} text="Company Name" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCompany({...company, company_code: e.target.value})} value={company.company_code || ''} text="Company Code" type="text" disabled={setDisable}/>
                </div>
            </div>

            <h4 className='ps-2 pt-2'>Address</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>

            <div className="row ps-4 pe-4 pb-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCompanyAddress({...companyAddress, address_line1: e.target.value})} value={companyAddress.address_line1 || ''} text="Address Line 1" type="text" disabled={setDisable}/>
                    <div className='mt-3'></div>
                    <InputFloating onChange={(e) => setCompanyAddress({...companyAddress, city_district: e.target.value})} value={companyAddress.city_district || ''} text="City / District" type="text" disabled={setDisable}/>
                    <div className='mt-3'></div>
                    <InputFloating onChange={(e) => setCompanyAddress({...companyAddress, postal_code: e.target.value})} value={companyAddress.postal_code || ''} text="Postal Code" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCompanyAddress({...companyAddress, address_line2: e.target.value})} value={companyAddress.address_line2 || ''} text="Address Line 2" type="text" disabled={setDisable}/>
                    <div className='mt-3'></div>
                    <InputFloating onChange={(e) => setCompanyAddress({...companyAddress, state_province: e.target.value})} value={companyAddress.state_province || ''} text="State / Province" type="text" disabled={setDisable}/>
                    <div className='mt-3'></div>
                    <InputFloating onChange={(e) => setCompanyAddress({...companyAddress, country: e.target.value})} value={companyAddress.country || ''} text="Country" type="text" disabled={setDisable}/>
                </div>
            </div>

            <h4 className='ps-2 pt-2'>Contact Section</h4>
            <hr className="bg-secondary border-2 border-top border-secondary"/>
            <div className="row p-4">
                <div className="col-md p-1">
                    <InputFloating text="Email" onChange={(e) => setCompany({...company, company_email: e.target.value})} value={company.company_email} type="email" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating text="Phone" onChange={(e) => setCompany({...company, company_phone: e.target.value})} value={company.company_phone} type="tel" disabled={setDisable}/>
                </div>
            </div>

        </div>
    )
}
