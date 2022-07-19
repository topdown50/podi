import React from 'react'
import { IdopContext } from '../context/IdopProvider'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../models';
import { User } from '../models';

export default function useSaleNumber(initalValue,submited) {

    const {
        user
    } = React.useContext(IdopContext)

    const [saleNumber, setSaleNumber] = React.useState(initalValue)

    const getSaleNumber = async () => {
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
        let newSaleNumber = `${(currentCompany[0].invoice_count).toString().padStart(6, "0")}`
        setSaleNumber(newSaleNumber)
    }

    React.useEffect(() => {
        getSaleNumber()
        const subscription = DataStore.observe(Company).subscribe(() => getSaleNumber())
        return () => subscription.unsubscribe()
    },[submited])

    return[
        saleNumber
    ]
}
