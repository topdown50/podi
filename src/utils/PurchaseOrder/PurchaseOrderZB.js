import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { Supplier } from '../../models';
import { PurchaseOrderItems } from '../../models';
import { Item } from '../../models';
import { getAccessToken } from '../ZohoBooks/getAccessToken';

export async function sendPurchaseZB(purchaseOrder,bill_id_zb){
    const companyModel = await DataStore.query(Company,purchaseOrder.companyID)

    if(companyModel.zb_organization_id){
        if(Object.keys(purchaseOrder.bill_info).length !== 0){
            //--------- Create Bill ---------
            //Get the concatct Info
            let bill_supplierID = ""
            if(purchaseOrder.bill_info.supplierID === undefined || purchaseOrder.bill_info.supplierID === '' || purchaseOrder.bill_info.supplierID === null || purchaseOrder.bill_info.supplierID)
			{
                const supplierModels = await DataStore.query(Supplier,purchaseOrder.supplierID);
				bill_supplierID = supplierModels.zb_contact_id
			}
			else
			{
                const supplierModels = await DataStore.query(Supplier,purchaseOrder.bill_info.supplierID);
				bill_supplierID = supplierModels.zb_contact_id
			}
            let bill_number = purchaseOrder.bill_info.invoice_number
			let purchase_date = purchaseOrder.po_date
            //Set the Line Items
            let line_items_array = []
            const purchaseItemsModel = (await DataStore.query(PurchaseOrderItems)).filter(item => item.purchaseorderID === purchaseOrder.id)
            await Promise.all(purchaseItemsModel.map( async item =>{
                const itemModel = await DataStore.query(Item,item.itemID);
                let item_id = itemModel.zb_item_id
                let line_items ={
                    item_id: item_id,
                    name: itemModel.name,
                    quantity: item.quantityorder,
                    rate: item.landedCost
                }
                line_items_array.push(line_items)
            }))
            //Set the contact info
            let invoice_info = {
                vendor_id: bill_supplierID,
                bill_number: bill_number,
                payment_terms: 14,
                date: purchase_date,
                line_items: line_items_array
            }
            //Data to send
            let data = {
                JSONString: invoice_info
            }
            //Get Access Token
            let access_token = ''
            access_token = await getAccessToken(companyModel)

            let headerData = {
                Authorization: `Zoho-oauthtoken ${access_token}`,
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }

            if(bill_id_zb !== undefined || bill_id_zb !== '' || bill_id_zb !== null || bill_id_zb){
                return fetch(`https://books.zoho.com/api/v3/bills/${bill_id_zb}?organization_id=${companyModel.zb_organization_id}`,{
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: headerData
                }).then(response => response.json())
                .then(data => {
                    return(data.contact.bill_id_zb)
                });                        
            }else{
                return fetch(`https://books.zoho.com/api/v3/bills?organization_id="${companyModel.zb_organization_id}`,{
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: headerData
                }).then(response => response.json())
                .then(data => {
                    return(data.bill.bill_id)
                });
            }
        }
    }
}