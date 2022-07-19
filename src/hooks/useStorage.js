import React from 'react'
import { IdopContext } from '../context/IdopProvider'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { StorageLocation } from '../models';

export default function useStorage({initialValue}) {

    const {
        user
    } = React.useContext(IdopContext)

    const [storageLoc, setStorageLoc] = React.useState(initialValue)

    const getStorages = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Items
        let models = (await DataStore.query(StorageLocation)).filter(storage => storage.companyID === currentUser[0].companyID);
        models = JSON.stringify(models, null, 2)
        models = models.replaceAll("storage_name","label")
        models = models.replaceAll("id","value")
        models = JSON.parse(models)
        setStorageLoc(models)
    }

    React.useEffect(() => {
        getStorages()
        const subscription = DataStore.observe(StorageLocation).subscribe(() => getStorages())
        return () => subscription.unsubscribe() 
    },[])

    return[
        storageLoc
    ]
}
