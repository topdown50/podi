import React from 'react'
import { Link } from "react-router-dom";
import useCompanyName from '../../hooks/useCompanyName';

export default function Navbar({children}) {

    const [companyName, setComanyName] = useCompanyName("")

    const toggleSideNav = () => {
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link style={{ textDecoration: 'none' }} to='/'>
                <div className="navbar-brand ps-3">{companyName}</div>
            </Link>
            <button onClick={toggleSideNav} className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            </form>
            {children}
        </nav>
    )
}
