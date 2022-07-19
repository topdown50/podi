import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import { DataStore } from '@aws-amplify/datastore';
import { SaleOrder } from '../../models';
import { createSaleInvoice } from '../../utils/Invoices/createSaleInvoice';
import { printPackingList } from '../../utils/Invoices/createPackingList';


export default function SaleIOrderTable({text,saleOrder,loading}) {

    const columnsStyle = {fontWeight: 'bold'}
    const navigate = useNavigate();

    const deleteSale = async (saleID) => {
        const modelToDelete = await DataStore.query(SaleOrder, saleID)
        DataStore.delete(modelToDelete)
    }

    const deleteSaleOrders = (data) => {

        Swal.fire({

        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

        }).then((result) => {
        if (result.isConfirmed) {

            data.map(saleOrder => (
                deleteSale(saleOrder.id)
            ))

            Swal.fire(
            'Deleted!',
            `The Sales Orders were successfully deleted`,
            'success'
            )

        }
        })    
    }
    
    return (
        loading ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
           : 
           <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
           <h1 className="text-center">{text}</h1>
           <MaterialTable
               columns={[
                   { title: 'Sale Order Date', field: 'invoice_date', headerStyle: columnsStyle},
                   { title: 'Invoice #', field: 'invoice_number', headerStyle: columnsStyle },
                   { title: 'Confirmation #', field: 'confirmation_number', headerStyle: columnsStyle },
                   { title: 'Customer', field: 'customerID', headerStyle: columnsStyle}
               ]}
               data={saleOrder}
               title="All Sales Orders"
               actions={[
                   {
                       icon: 'delete',
                       tooltip: 'Delete Sales',
                       onClick: (event, data) => deleteSaleOrders(data),
                   },
                   {
                       icon: 'edit',
                       tooltip: 'Edit Sale',
                       onClick: (event, rowData) => navigate('/EditSaleOrder', { state: {id: rowData[0].id} })
                   },
                   {
                       icon: 'article',
                       tooltip: 'Print Sale Invoice',
                       onClick: (event, rowData) => createSaleInvoice(rowData)
                   },
                   {
                       icon: 'summarize',
                       tooltip: 'Print Packing List',
                       onClick: (event, rowData) => printPackingList(rowData)
                   }
               ]}
               options={{
                   actionsColumnIndex: -1,
                   selection: true,
               }}
           />
       </div>        
    )
}
