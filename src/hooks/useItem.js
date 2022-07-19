import React from 'react'
import { IdopContext } from '../context/IdopProvider'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { Item } from '../models';

export default function useItem(initialValue,selectedSupplier) {

    const {
        user
    } = React.useContext(IdopContext)

    const [items, setItems] = React.useState(initialValue)

    const getItems = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Items
        let models = ''
        if(selectedSupplier){
            models = (await DataStore.query(Item)).filter(myItem => myItem.companyID === currentUser[0].companyID && myItem.supplierID === selectedSupplier);
        }else{
            models = (await DataStore.query(Item)).filter(myItem => myItem.companyID === currentUser[0].companyID);
        }
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        models.map((myItem) => myItem.name = `${myItem.name} - SKU# ${myItem.sku}`)
        models = JSON.stringify(models, null, 2)
        models = models.replaceAll("name","label")
        models = models.replaceAll("id","value")
        models = JSON.parse(models)
        setItems(models)
    }

    React.useEffect(() => {
        getItems()
        const subscription = DataStore.observe(Item).subscribe(() => getItems())
        return () => subscription.unsubscribe()
    },[selectedSupplier])

    return [
        items,
        setItems
    ]
}
