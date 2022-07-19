import React from 'react'
import SelectInput from '../FormComponents/SelectInput'

export default function UserFormAdmin({user,setUser}) {
    return (
        <div className="container-flud">
            <div className="row p-4">
                <div className="col-md p-1">
                    <SelectInput value={user.status} onChange={(e) => setUser({...user, status: e.target.value})} text="Status">
                        <option value="invited">Invited</option>
                        <option value="activated">Activated</option>
                        <option value="desactivated">Desactivated</option>
                    </SelectInput>
                </div>
            </div>
        </div>
    )
}
