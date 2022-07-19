import React from 'react'
import { Link } from "react-router-dom";

export default function SideNavItem({toggle,text,href,target,icon}) {
  return (
    <Link style={{ textDecoration: 'none' }} to={href}>
      <div className={`nav-link ${toggle && 'collapsed'}`} data-bs-toggle={`${toggle && 'collapse'}`} data-bs-target={`${toggle && '#' + target}`} aria-expanded="false" aria-controls={`${toggle && target}`}>
          {icon && <div className="sb-nav-link-icon"><i className={icon}></i></div>}
              {text}
          {toggle && <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>}
      </div>
    </Link>
  )
}
