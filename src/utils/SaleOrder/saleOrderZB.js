import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { Customer } from '../../models';
import { SaleOrderItem } from '../../models';
import { Item } from '../../models';
import { getAccessToken } from '../ZohoBooks/getAccessToken';

export async function sendSaleZB(saleOrder,invoice_id_zb){

    const companyModel = await DataStore.query(Company,saleOrder.companyID)


    if(companyModel.zb_organization_id){
        if(saleOrder.shipment_info.flag_complete){
            const customerModel = await DataStore.query(Customer,saleOrder.customerID);
            //--------- Create Invoice ---------
		    //Get the concatct Info
            let customer_id = customerModel.zb_contact_id;
            let invoice_number = saleOrder.invoice_number;
            let sale_date = saleOrder.invoice_date;
            let shipping_charge = saleOrder.charge;
            //Set the Line Items
            let line_items_array = []
            const saleItemModels = (await DataStore.query(SaleOrderItem)).filter(item => item.saleorderID === saleOrder.id)
            await Promise.all(saleItemModels.map( async item =>{
                const itemModel = await DataStore.query(Item,item.itemID)
                let item_id = itemModel.zb_item_id
                let line_items = {
                    item_id: item_id,
                    name: itemModel.name,
                    quantity: item.sell_count,
                    rate: item.unit_price
                }
                line_items_array.push(line_items)
            }))

            //Set the Invoice info
            let invoice_info = {
                customer_id: customer_id,
                invoice_number: invoice_number,
                payment_terms: 30,
                date: saleOrder.shipment_info.ship_date,
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

            if(invoice_id_zb !== undefined || invoice_id_zb !== '' || invoice_id_zb !== null || invoice_id_zb){
                return fetch(`https://books.zoho.com/api/v3/invoices/${invoice_id_zb}?organization_id=${companyModel.zb_organization_id}`,{
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: headerData
                }).then(response => response.json())
                .then(data => {
                    return(data.invoice.invoice_id)
                });                        
            }else{
                return fetch(`https://books.zoho.com/api/v3/invoices?organization_id="${companyModel.zb_organization_id}`,{
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: headerData
                }).then(response => response.json())
                .then(data => {
                    return(data.invoice.invoice_id)
                });
            }

        }
    }

    
}