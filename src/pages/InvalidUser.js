import React from 'react'

export default function InvalidUser() {
  return (
    <div className='container-fluid invalid-user'>
        <div className='row'>
            <div className="col d-flex justify-content-center align-items-center">
                <img style={{width: '15rem'}} className='' src="/images/alert_icon.png" alt="" />
                
            </div>
        </div>
        <div className='row text-center mt-4'>
            <div className="col">
                <h1>You are not allowed to access this app.</h1>
                <h1>Please contact the administrator to activate your user.</h1>
            </div>
            
        </div>
    </div>
  )
}
