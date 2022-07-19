import React from 'react'

export default function SideNavContent({id,aria,children,acordion,acordion_id,parent}) {

  return (
    <div className="collapse" id={id} aria-labelledby={aria} data-bs-parent={'#' + parent}>
        <nav className={`sb-sidenav-menu-nested nav ${acordion && 'accordion'}`} id={acordion_id}>
            {children}
        </nav>
    </div>
  )
}
