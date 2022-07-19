import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { BillingAddress } from '../../models';
import { ShippingAddress } from '../../models';
import { getAccessToken } from '../ZohoBooks/getAccessToken';

export async function sendCustomerZB(customer,contact_id){
    const companyModel = await DataStore.query(Company,customer.companyID)
    const billingModel = (await DataStore.query(BillingAddress)).filter((billAdd) => billAdd.customerID === customer.id)
    const shippingModel = (await DataStore.query(ShippingAddress)).filter((shippAdd) => shippAdd.customerID === customer.id)


    if(companyModel.zb_organization_id){
        //--------- Create Vendor Contact ---------
        //Get the concatct Info
        let contact_name = customer.company_name

        //Billing Address
        let billing_address_1 = ''
        let billing_address_2 = ''
        let billing_country = ''
        let billing_city = ''
        let billing_province = ''
        let billing_postalCode = ''

        if(billingModel.length > 0){
            billing_address_1 = billingModel[0].address_line1
            billing_address_2 = billingModel[1].address_line2
            billing_country = billingModel[0].country
            billing_city = billingModel[0].city_district
            billing_province = billingModel[0].state_province
            billing_postalCode = billingModel[0].postal_code
        }
        
        
        //Shipping Address
        let shipping_addres_1 = ''
        let shipping_addres_2 = ''
        let shipping_city = ''
        let shipping_province = ''
        let shipping_postalCode = ''

        if(shippingModel.length > 0){
            shipping_addres_1 = shippingModel[0].address_line1
            shipping_addres_2 = shippingModel[0].address_line1
            shipping_city = shippingModel[0].city_district
            shipping_province = shippingModel[0].state_province
            shipping_postalCode = shippingModel[0].postal_code
        }

        //Set the Billing Address
        let billing_address_info = {
            address: billing_address_1,
            street2: billing_address_2,
            city: billing_city,
            country: billing_country,
            state: billing_province,
            zip: billing_postalCode,
        }
        //Set the Shipping Address
        let shipping_address_info = {
            address: shipping_addres_1,
            street2: shipping_addres_2,
            city: shipping_city,
            state: shipping_province,
            zip: shipping_postalCode
        }

        //Set the contact info
        let contact_info = {
            contact_name: contact_name,
            company_name: contact_name,
            contact_type: "customer",
            phone: customer.phone,
            billing_address: billing_address_info,
            shipping_address: shipping_address_info
        }

        //Data to send
        let data = {
            JSONString: contact_info
        }

        let access_token = ''
        access_token = await getAccessToken(companyModel)

        //Header
        let header_data = {
            Authorization: `Zoho-oauthtoken ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }

        if(contact_id !== undefined || contact_id !== '' || contact_id !== null || contact_id){
            return fetch(`https://books.zoho.com/api/v3/contacts/${contact_id}?organization_id=${companyModel.zb_organization_id}`,{
                method: "PUT",
                body: JSON.stringify(data),
                headers: header_data
            }).then(response => response.json())
            .then(data => {
                return(data.contact.contact_id)
            });                        
        }else{
            return fetch(`https://books.zoho.com/api/v3/contacts?organization_id=${companyModel.zb_organization_id}`,{
                method: "POST",
                body: JSON.stringify(data),
                headers: header_data
            }).then(response => response.json())
            .then(data => {
                return(data.contact.contact_id)
            });
        }
    }
}