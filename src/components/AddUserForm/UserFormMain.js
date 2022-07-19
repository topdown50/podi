import InputFloating from '../FormComponents/InputFloating'
import Select from 'react-select'

import useCompany from '../../hooks/useCompany';

export default function UserFormMain({user, setUser}) {

  const [companies] = useCompany([])

  return (
    <div className="container-flud">
        <div className="row p-4">
            <div className="col-md p-1">
                <Select options={companies} onChange={(e) => setUser({...user, companyID: e.value})} value={companies.filter(company => company.value === user.companyID)} placeholder="Company"/>
            </div>
            <div className="col-md p-1">
              <InputFloating onChange={(e) => setUser({...user, name: e.target.value})} value={user.name || ''} text="Name" type="text"/>
            </div>
            <div className="col-md p-1">
              <InputFloating onChange={(e) => setUser({...user, last_name: e.target.value})} value={user.last_name || ''} text="Last name" type="text"/>
            </div>
        </div>
        <div className="row px-4">
          <div className="col-md p-1">
            <InputFloating onChange={(e) => setUser({...user, email: e.target.value})} value={user.email || ''} text="Email" type="text"/>
          </div>
          <div className="col-md p-1">
            <InputFloating onChange={(e) => setUser({...user, phone: e.target.value})} value={user.phone || ''} text="Phone" type="text"/>
          </div>
        </div>
    </div>
  )
}
