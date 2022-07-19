import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { getAccessToken } from '../ZohoBooks/getAccessToken';

export async function sendItemZB(item,item_id){
    const companyModel = await DataStore.query(Company,item.companyID)
    if(companyModel.zb_organization_id){
        //--------- Create Item ---------
        //Get the item Info
        let item_name = item.name;
        let item_description = item.description;
        let item_sku = item.sku;
        //Set the contact info
        let item_info = {
            name: item_name,
            rate: 0,
            description: item_description,
            sku: item_sku,
            item_type: "sales_and_purchases"
        }
        //Data to send
        let data = {
            JSONString: item_info
        }
        //Get Access Token
        let access_token = ''
        access_token = await getAccessToken(companyModel)

        //Header
        let headerData = {
            Authorization: `Zoho-oauthtoken ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }

        if(item_id !== undefined || item_id !== '' || item_id !== null || item_id){
            return fetch(`https://books.zoho.com/api/v3/items/${item_id}?organization_id=${companyModel.zb_organization_id}`,{
                method: "PUT",
                body: JSON.stringify(data),
                headers: headerData
            }).then(response => response.json())
            .then(data => {
                return(data.item.item_id)
            });                        
        }else{
            return fetch(`https://books.zoho.com/api/v3/items?organization_id=${companyModel.zb_organization_id}`,{
                method: "POST",
                body: JSON.stringify(data),
                headers: headerData
            }).then(response => response.json())
            .then(data => {
                return(data.item.item_id)
            });
        }
    }
}