import React from 'react'
import InputFloating from '../FormComponents/InputFloating'

export default function CompanyFormZB({company,setCompany,setDisable}) {
    return (
        <div className="container-fluid">
            <div className="row p-4">
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCompany({...company, zb_organization_id: e.target.value})} value={company.zb_organization_id || ''} text="Organization ID ZB" type="text" disabled={setDisable}/>
                    <div className='mt-3'></div>
                    <InputFloating onChange={(e) => setCompany({...company, zb_client_id: e.target.value})} value={company.zb_client_id || ''} text="Client ID ZB" type="text" disabled={setDisable}/>
                </div>
                <div className="col-md p-1">
                    <InputFloating onChange={(e) => setCompany({...company, zb_refresh_token: e.target.value})} value={company.zb_refresh_token || ''} text="Refresh Token ZB" type="text" disabled={setDisable}/>
                    <div className='mt-3'></div>
                    <InputFloating onChange={(e) => setCompany({...company, zb_client_secret: e.target.value})} value={company.zb_client_secret || ''} text="Client Secret" type="text" disabled={setDisable}/>
                </div>
            </div>
        </div>
    )
}
