import React from 'react'
import { IdopContext } from '../../context/IdopProvider'

export default function SideNavContainer({children}) {

  const {
    amplifyUser
  } = React.useContext(IdopContext)

  // console.log(user.signInUserSession.accessToken.payload['cognito:groups'])

  const setUserName = () => {
    if(amplifyUser !== undefined && amplifyUser !== '' && Object.keys(amplifyUser).length !== 0){
      return `${amplifyUser.name} ${amplifyUser.last_name}`
    }

    return ''
  }
  
  return (
    <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    {children}
                </div>
            </div>
            <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
              {setUserName()}
            </div>
        </nav>
    </div>
  )
}
