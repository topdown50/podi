import React from 'react'
import SideNavContainer from '../SideNav/SideNavContainer';
import SideNavContent from '../SideNav/SideNavContent';
import SideNavItem from '../SideNav/SideNavItem';
import SideNavSubItem from '../SideNav/SideNavSubItem';
import { Link } from "react-router-dom";
import { IdopContext } from '../../context/IdopProvider';

export default function SideNav() {

  const {
    user_group
  } = React.useContext(IdopContext)

  console.log(user_group)
  return (
    <SideNavContainer>
        <div className="sb-sidenav-menu-heading">Main</div>
        <SideNavItem text="Home" toggle={false} href="/" icon="fa-solid fa-house-chimney"/>

        <div className="sb-sidenav-menu-heading">Orders</div>
        <SideNavItem text="Purchasing" toggle={true} href="#" icon="fa-solid fa-cart-shopping" target="collapsePurchasing"/>

        <SideNavContent id="collapsePurchasing" aria="headingOne" parent='sidenavAccordion'>
            <SideNavSubItem href="/PurchaseOrder" text="Purchase Order"/>
            <SideNavSubItem href="/LandedCost" text="Landed Cost"/>          
        </SideNavContent>

        <SideNavItem text="Receiving" toggle={true} href="#" icon="fa-solid fa-square-check" target="collapseReceiving"/>

        <SideNavContent id="collapseReceiving" aria="headingOne" parent='sidenavAccordion'>
          <a className="nav-link" href="layout-sidenav-light.html">Landed Cost by Lot #</a>
          <a className="nav-link" href="layout-sidenav-light.html">Historical Receiving</a>
        </SideNavContent>

        <SideNavItem text="Sales" toggle={true} href="#" icon="fa-solid fa-receipt" target="collapseSales"/>

        <SideNavContent id="collapseSales" aria="headingOne" parent='sidenavAccordion'>
          <SideNavSubItem href="/SaleOrder" text="Sales Order Information"/>
          <SideNavSubItem href="/SaleOrder" text="Historical Sale Report"/>
        </SideNavContent>

        <div className="sb-sidenav-menu-heading">Add</div>
        <SideNavItem text="Item" toggle={false} href="/AddItem" icon="fa-solid fa-box"/>
        <SideNavItem text="Supplier" toggle={false} href="/AddSupplier" icon="fa-solid fa-people-carry-box"/>
        {/* Admin Features */}
        {user_group === "Administrator" ?
        <div>
          <SideNavItem text="User" toggle={false} href="/AddUser" icon="fa-solid fa-user-check"/>
          <SideNavItem text="Company" toggle={false} href="/AddCompany" icon="fa-solid fa-building"/>
        </div>
        :
        ''
        }
        {/*End Admin Features */}
        <SideNavItem text="Customer" toggle={false} href="/AddCustomer" icon="fa-solid fa-user"/>

        {/* Admin Features */}
        {user_group === "Administrator" ?
        <div>
          <div className="sb-sidenav-menu-heading">Add Locations</div>
          <SideNavItem text="Warehouse" toggle={false} href="/AddWarehouse" icon="fa-solid fa-warehouse"/>
          <SideNavItem text="Storage Location" toggle={false} href="/AddStorageLocation" icon="fa-solid fa-location-pin"/>
        </div>
        :
        ''
        }
        {/* End Admin Features */}

        <div className="sb-sidenav-menu-heading">Reports</div>
        <SideNavItem text="All Companies" toggle={false} href="/CompaniesReport" icon="fa-solid fa-city"/>
        <SideNavItem text="All Users" toggle={false} href="/UsersReport" icon="fa-solid fa-users"/>
        <SideNavItem text="All Suppliers" toggle={false} href="/SuppliersReport" icon="fa-solid fa-people-group"/>
        <SideNavItem text="All Customers" toggle={false} href="/CustomerReport" icon="fa-solid fa-people-roof"/>

        <div className="sb-sidenav-menu-heading">Purchasing and Sales</div>
        <SideNavItem text="Purchase Orders" toggle={false} href="/PurchaseOrderReport" icon="fa-solid fa-basket-shopping"/>
        <SideNavItem text="Sale Orders" toggle={false} href="/SaleOrderReport" icon="fa-solid fa-file-invoice"/>
        <SideNavItem text="Products Stock" toggle={false} href="/ProductsStock" icon="fa-solid fa-arrow-up-1-9"/>

        <div className="sb-sidenav-menu-heading">Products & Locations</div>
        <SideNavItem text="All Storage Locations" toggle={false} href="/StorageLocationReport" icon="fa-solid fa-map-location-dot"/>
        <SideNavItem text="All Items" toggle={false} href="/ItemsReport" icon="fa-solid fa-boxes-stacked"/>

    </SideNavContainer>
  )
}
