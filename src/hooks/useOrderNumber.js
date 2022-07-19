import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../models';
import { User } from '../models';
import { IdopContext } from '../context/IdopProvider';

export default function useOrderNumber(initialValue,submited) {

    const {
        user
    } = React.useContext(IdopContext)

    const [orderNumber, setOrderNumber] = React.useState(initialValue)


    const getOrderNumber = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Companies
        let models = await DataStore.query(Company);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        const currentCompany = models.filter(company => company.id === currentUser[0].companyID)
        let newOrderNumber = `${currentCompany[0].company_code}-PO-${(currentCompany[0].purchasing_count).toString().padStart(6, "0")}`
        setOrderNumber(newOrderNumber)
    }

    React.useEffect(() => {
        getOrderNumber()
        const subscription = DataStore.observe(Company).subscribe(() => getOrderNumber())
        return () => subscription.unsubscribe()
    },[submited])

    return[
        orderNumber
    ]
}
