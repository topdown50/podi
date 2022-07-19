import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../models';
import { User } from '../models';
import { IdopContext } from '../context/IdopProvider';

export default function useCompanyID(initialValue) {

    const {
        user
    } = React.useContext(IdopContext)

    const [companyID, setCompanyID] = React.useState(initialValue)

    const getCompanies = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Companies
        let models = await DataStore.query(Company);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        const id = models.filter(company => company.id === currentUser[0].companyID)
        setCompanyID(id[0].id)
    }

    React.useEffect(() => {
        getCompanies()
        const subscription = DataStore.observe(Company).subscribe(() => getCompanies())
        return () => subscription.unsubscribe()
    },[])

    return [
        companyID,
        setCompanyID
    ]
}
