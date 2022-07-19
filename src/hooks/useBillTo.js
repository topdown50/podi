import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { BillingAddress } from '../models';

export default function useBillTo(
    customerSelected,
) {

    const [billingAddress, setBillingAddress] = React.useState([])

    const getBillingAdd = async () => {
        //Get Shipping Address
        let models = (await DataStore.query(BillingAddress)).filter(billingAdd => billingAdd.customerID === customerSelected);
        models = JSON.stringify(models, null, 2)
        models = models.replaceAll("address_line1","label")
        models = models.replaceAll("id","value")
        models = JSON.parse(models)
        setBillingAddress(models)
    }

    React.useEffect(() => {
        getBillingAdd()
        const subscription = DataStore.observe(BillingAddress).subscribe(() => getBillingAdd())
        return () => subscription.unsubscribe()
    },[customerSelected])

    return[
        billingAddress
    ]
}
