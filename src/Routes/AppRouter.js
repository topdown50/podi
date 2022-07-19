import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandedCost from '../pages/LandedCost';
import Page from '../components/PageContent/Page';
import AddCompany from '../pages/Company/AddCompany';
import CompaniesReport from '../pages/Company/CompaniesReport';
import EditCompany from '../pages/Company/EditCompany';
import ViewCompany from '../pages/Company/ViewCompany';
import Home from '../pages/Home/Home';
import AddUser from '../pages/User/AddUser';
import UsersReport from '../pages/User/UsersReport';
import EditUser from '../pages/User/EditUser';
import ViewUser from '../pages/User/ViewUser';
import VerifyUser from '../components/VerifyUser';
import AddSupplier from '../pages/Supplier/AddSupplier';
import SuppliersReport from '../pages/Supplier/SuppliersReport';
import EditSupplier from '../pages/Supplier/EditSupplier';
import ViewSupplier from '../pages/Supplier/ViewSupplier';
import AddCustomer from '../pages/Customer/AddCustomer';
import CustomerReport from '../pages/Customer/CustomerReport';
import EditCustomer from '../pages/Customer/EditCustomer';
import ViewCustomer from '../pages/Customer/ViewCustomer';
import AddWarehouse from '../pages/Warehouse/AddWarehouse';
import AddStorageLoc from '../pages/StorageLocation/AddStorageLoc';
import StorageLocReport from '../pages/StorageLocation/StorageLocReport';
import EditStorageLoc from '../pages/StorageLocation/EditStorageLoc';
import ViewStorageLoc from '../pages/StorageLocation/ViewStorageLoc';
import AddItem from '../pages/Item/AddItem';
import ItemsReport from '../pages/Item/ItemsReport';
import EditItem from '../pages/Item/EditItem';
import ViewItem from '../pages/Item/ViewItem';
import CreatePurchaseOrder from '../pages/PurchaseOrder/CreatePurchaseOrder';
import PurchaseOrderReport from '../pages/PurchaseOrder/PurchaseOrderReport';
import EditPurchaseOrder from '../pages/PurchaseOrder/EditPurchaseOrder';
import ItemStockReport from '../pages/ItemStock/ItemStockReport';
import CreateSaleOrder from '../pages/SaleOrder/CreateSaleOrder';
import SaleOrderReport from '../pages/SaleOrder/SaleOrderReport';
import EditSaleOrder from '../pages/SaleOrder/EditSaleOrder';

export default function AppRouter() {

  return (
    <VerifyUser>
      <BrowserRouter>
        <Page>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="LandedCost" element={<LandedCost/>} />
            {/* Item Routes */}
            <Route path="AddItem" element={<AddItem/>} />
            <Route path="ItemsReport" element={<ItemsReport/>} />
            <Route path="EditItem" element={<EditItem/>} />
            <Route path="ViewItem" element={<ViewItem/>} />
            {/* Company Routes */}
            <Route path="AddCompany" element={<AddCompany/>} />
            <Route path="CompaniesReport" element={<CompaniesReport/>} />
            <Route path="EditCompany" element={<EditCompany/>} />
            <Route path="ViewCompany" element={<ViewCompany/>} />
            {/* User Routes */}
            <Route path="AddUser" element={<AddUser/>} />
            <Route path="UsersReport" element={<UsersReport/>} />
            <Route path="EditUser" element={<EditUser/>} />
            <Route path="ViewUser" element={<ViewUser/>} />
            {/* Supplier Routes */}
            <Route path="AddSupplier" element={<AddSupplier/>} />
            <Route path="SuppliersReport" element={<SuppliersReport/>} />
            <Route path="EditSupplier" element={<EditSupplier/>} />
            <Route path="ViewSupplier" element={<ViewSupplier/>} />
            {/* Customer Routes */}
            <Route path="AddCustomer" element={<AddCustomer/>} />
            <Route path="CustomerReport" element={<CustomerReport/>} />
            <Route path="EditCustomer" element={<EditCustomer/>} />
            <Route path="ViewCustomer" element={<ViewCustomer/>} />
            {/* Warehouse */}
            <Route path="AddWarehouse" element={<AddWarehouse/>} />
            {/* Storage Location */}
            <Route path="AddStorageLocation" element={<AddStorageLoc/>} />
            <Route path="StorageLocationReport" element={<StorageLocReport/>} />
            <Route path="EditStorageLocation" element={<EditStorageLoc/>} />
            <Route path="ViewStorageLocation" element={<ViewStorageLoc/>} />
            {/* purchase Order */}
            <Route path="PurchaseOrder" element={<CreatePurchaseOrder/>} />
            <Route path="PurchaseOrderReport" element={<PurchaseOrderReport/>} />
            <Route path="EditPurchaseOrder" element={<EditPurchaseOrder/>} />
            {/* Items Stock */}
            <Route path="ProductsStock" element={<ItemStockReport/>} />
            {/* Sale Order */}
            <Route path="SaleOrder" element={<CreateSaleOrder/>} />
            <Route path="SaleOrderReport" element={<SaleOrderReport/>} />
            <Route path="EditSaleOrder" element={<EditSaleOrder/>} />
          </Routes>
        </Page>
      </BrowserRouter>
    </VerifyUser>
  )
}
