import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Supplier } from '../models';
import { User } from '../models';
import { IdopContext } from '../context/IdopProvider';

export default function useSupplier(initialValue) {

    const {
        user
    } = React.useContext(IdopContext)

    const [suppliers, setSuppliers] = React.useState(initialValue)

    const gerSuppliers = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Suppliers
        let models = (await DataStore.query(Supplier)).filter(supplier => supplier.companyID === currentUser[0].companyID);
        models = JSON.stringify(models, null, 2)
        models = models.replaceAll("name","label")
        models = models.replaceAll("id","value")
        models = JSON.parse(models)
        setSuppliers(models)
    }

    React.useEffect(() => {
        gerSuppliers()
        const subscription = DataStore.observe(Supplier).subscribe(() => gerSuppliers())
        return () => subscription.unsubscribe() 
    },[])

    return [
        suppliers,
        setSuppliers
    ]
}
