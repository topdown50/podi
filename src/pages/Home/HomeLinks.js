import React from 'react'
import Papa from 'papaparse';
import { DataStore } from '@aws-amplify/datastore';
import { PurchaseOrder } from '../../models';
import { Supplier } from '../../models';
import { PurchaseOrderItems } from '../../models';
import { Item } from '../../models';

export default function HomeLinks() {

    const import_suppliers = async (results) => {
        Promise.all(results.data.map( async row => {
            let company = row.Company.trim()
    
            if(company === 'TSI Tropicals'){
                
            }
        }))
    }

    const changeHandler = async (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {

                console.log(results.data)

                // import_po_items(results)
                
                console.log("Terminado")
            },
        });
    };
    
    return (
        <div className="container-fluid p-4 m-4 border">
            <div className="row">
                <div className="col">
                    <h4>Purchasing & Receiving</h4>
                </div>
                <div className="col">
                    <h4>Sales & Shipping</h4>
                </div>
                <div className="col">
                    <h4>Products & Locations</h4>
                </div>
                <div className="col">
                    <h4>Companies & People</h4>
                </div>
            </div>
            <div>
            {/* File Uploader */}
            <input
                type="file"
                name="file"
                accept=".csv"
                onChange={changeHandler}
                style={{ display: "block", margin: "10px auto" }}
            />
            </div>
        </div>
    )
}
