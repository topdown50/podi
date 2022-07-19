import React from 'react'
import { IdopContext } from '../context/IdopProvider';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { Customer } from '../models';

export default function useCustomer() {

    const {
        user
    } = React.useContext(IdopContext)


    const [customers, setCustomers] = React.useState([])
    
    const getCustomers = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Suppliers
        let models = (await DataStore.query(Customer)).filter(customer => customer.companyID === currentUser[0].companyID);
        models = JSON.stringify(models, null, 2)
        models = models.replaceAll("company_name","label")
        models = models.replaceAll("id","value")
        models = JSON.parse(models)
        setCustomers(models)
    }

    React.useEffect(() => {
        getCustomers()
        const subscription = DataStore.observe(Customer).subscribe(() => getCustomers())
        return () => subscription.unsubscribe()
    },[])

    return [
        customers
    ]
}
