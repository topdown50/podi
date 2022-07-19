import React from 'react'
import { Link } from "react-router-dom";

export default function SideNavSubItem({href,text}) {

  const toggleSideNav = () => {
    if(window.screen.width <= 991){
      document.body.classList.toggle('sb-sidenav-toggled');
    }
  }

  return (
    <Link style={{ textDecoration: 'none' }} to={href} onClick={toggleSideNav}>
        <div className="nav-link">{text}</div>
    </Link>
  )
}
