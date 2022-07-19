import React from 'react'
import { IdopContext } from '../context/IdopProvider'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../models';
import { User } from '../models';

export default function useCompanyName({initialValue}) {

    const {
        user
    } = React.useContext(IdopContext)


    const [companyName, setCompanyName] = React.useState(initialValue)

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
        setCompanyName(id.length === 0 ? '': id[0].company_name)
    }

    React.useEffect(() => {
        getCompanies()
        const subscription = DataStore.observe(Company).subscribe(() => getCompanies())
        return () => subscription.unsubscribe()
    },[])

    React.useEffect(() => {
        getCompanies()
        const subscription = DataStore.observe(User).subscribe(() => getCompanies())
        return () => subscription.unsubscribe()
    },[])

    return [
        companyName,
        setCompanyName
    ]
}
