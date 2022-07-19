import React from 'react'
import Navbar from '../Navbar/Navbar';
import UserNav from '../Navbar/UserNav';
import SideNav from '../SideNav/SideNav';


export default function Page({children}) {
  return (
    <React.Fragment>
      <Navbar>
        <UserNav/>
      </Navbar>
    <div id="layoutSidenav">
        <SideNav/>
        <div id="layoutSidenav_content">
          <main>
            {children}
          </main>
        </div>
    </div>
    </React.Fragment>
  )
}
