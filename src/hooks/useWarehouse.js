import React from 'react'

import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../models';
import { User } from '../models';
import { Warehouse } from '../models';
import { IdopContext } from '../context/IdopProvider';

export default function useWarehouse(initialValue) {

    const {
        user
    } = React.useContext(IdopContext)

    const [warehouses, setWarehouses] = React.useState(initialValue)

    const getWarehouses = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Companies
        let models = await DataStore.query(Company);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        const current_company = models.filter(company => company.id === currentUser[0].companyID)
        //Get Warehouses
        let warehouseModels = await DataStore.query(Warehouse);
        warehouseModels = JSON.stringify(warehouseModels, null, 2)
        warehouseModels = JSON.parse(warehouseModels)
        let warehouses = warehouseModels.filter(ware => ware.companyID === current_company[0].id)
        warehouses = JSON.stringify(warehouses, null, 2)
        warehouses = warehouses.replaceAll("warehouse_name","label")
        warehouses = warehouses.replaceAll("id","value")
        warehouses = JSON.parse(warehouses)
        setWarehouses(warehouses)
    }

    React.useEffect(() => {
        getWarehouses()
        const subscription = DataStore.observe(Warehouse).subscribe(() => getWarehouses())
        return () => subscription.unsubscribe()
    },[])

    return[warehouses]
}
