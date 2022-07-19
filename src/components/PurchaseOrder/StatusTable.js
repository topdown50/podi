import React from 'react'
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import { DataStore } from '@aws-amplify/datastore';
import { PurchaseOrder } from '../../models';
import Swal from 'sweetalert2'
import { printPurchaseOrder } from '../../utils/Invoices/createPurchaseOrder';


export default function StatusTable({text,purchaseOrder}) {

    const columnsStyle = {fontWeight: 'bold'}
    const navigate = useNavigate();

    const deletePO = async (poID) => {
      
        const modelToDelete = await DataStore.query(PurchaseOrder, poID);
        DataStore.delete(modelToDelete);
  
    }

    const deletePOs = (data) => {

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

            data.map(purchaseOrder => (
                deletePO(purchaseOrder.id)
            ))

            Swal.fire(
            'Deleted!',
            `The Purchase Orders were successfully deleted`,
            'success'
            )
        }
        })    
    }
   
    return (
        <div className='pt-5 pb-5 p-md-5' style={{ maxWidth: '100%' }}>
            <h1 className="text-center">{text}</h1>
            <MaterialTable
                columns={[
                    { title: 'Purchase Order Date', field: 'po_date', headerStyle: columnsStyle},
                    { title: 'P.O. #', field: 'po_number', headerStyle: columnsStyle },
                    { title: 'BOL / Invoice #', field: 'bol_invoice_number', headerStyle: columnsStyle },
                    { title: 'Supplier', field: 'supplierID', headerStyle: columnsStyle}
                ]}
                data={purchaseOrder}
                title="All Purchase Orders"
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete Purchase',
                        onClick: (event, data) => deletePOs(data),
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit Purchase',
                        onClick: (event, rowData) => navigate('/EditPurchaseOrder', { state: {id: rowData[0].id} })
                    },
                    {
                        icon: 'description',
                        tooltip: 'Print Purchase Order',
                        onClick: (event, rowData) => printPurchaseOrder(rowData)
                    },
                    {
                        icon: 'article',
                        tooltip: 'Generate Spreadsheet',
                        onClick: (event, rowData) => printPurchaseOrder(rowData)
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
