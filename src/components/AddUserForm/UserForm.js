import React from 'react'
import UserFormAdmin from './UserFormAdmin'
import UserFormMain from './UserFormMain'

export default function UserForm({title,user,setUser,saveUserData,resetForm,setDisable,button_title}) {
  return (
    <div className='p-0 p-md-4'>
        <h1 className='text-center pt-2'>{title}</h1>
        <hr className="bg-secondary border-2 border-top border-secondary"/>
        <UserFormMain user={user} setUser={setUser}/>
        <h4 className='px-2 pt-4'>Administration</h4>
        <hr className="bg-secondary border-2 border-top border-secondary"/>
        <UserFormAdmin user={user} setUser={setUser}/>
        <div className='mx-auto d-flex justify-content-center mb-4'>
          <button onClick={saveUserData} type="button" className="btn btn-success btn-lg" hidden={setDisable}>Submit</button>
          <button onClick={resetForm} type="button" className="btn btn-secondary ms-3 btn-lg">{button_title}</button>
        </div>
    </div>   
  )
}
