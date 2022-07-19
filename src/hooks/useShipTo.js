import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { ShippingAddress } from '../models';

export default function useShipTo(
    customerSelected,
) {

    const [shippingAddress, setShippingAddress] = React.useState([])

    const getShippingAdd = async () => {
        //Get Shipping Address
        let models = (await DataStore.query(ShippingAddress)).filter(shippingAdd => shippingAdd.customerID === customerSelected);
        models = JSON.stringify(models, null, 2)
        models = models.replaceAll("address_line1","label")
        models = models.replaceAll("id","value")
        models = JSON.parse(models)
        setShippingAddress(models)
    }

    React.useEffect(() => {
        getShippingAdd()
        const subscription = DataStore.observe(ShippingAddress).subscribe(() => getShippingAdd())
        return () => subscription.unsubscribe()
    },[customerSelected])

    return[
        shippingAddress
    ]
}
