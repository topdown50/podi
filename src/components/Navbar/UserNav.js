import React from 'react'
import { IdopContext } from '../../context/IdopProvider'


export default function UserNav() {

  const {
    signOut
  } = React.useContext(IdopContext)

  return (
    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                {/* <li><a className="dropdown-item" href="#!">Settings</a></li>
                <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr className="dropdown-divider" /></li> */}
                <li><div className="dropdown-item icon-click" onClick={signOut}>Logout</div></li>
            </ul>
        </li>
    </ul>
  )
}
