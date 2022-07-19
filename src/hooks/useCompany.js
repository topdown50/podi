import React from 'react'

import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../models';

export default function useCompany(initialValue) {

    const [companies, setCompanies] = React.useState(initialValue)

    const getCompanies = async () => {
        let models = await DataStore.query(Company);
        models = JSON.stringify(models, null, 2)
        models = models.replaceAll("company_name","label")
        models = models.replaceAll("id","value")
        models = JSON.parse(models)
        setCompanies(models)
    }

    React.useEffect(() => {
        getCompanies()
        const subscription = DataStore.observe(Company).subscribe(() => getCompanies())
        return () => subscription.unsubscribe()
    },[])

    return[
        companies,
        setCompanies
    ]
}
