import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { IdopContext } from '../context/IdopProvider';
import { User } from '../models';


export async function GetCurrentUser(){
    
    const {
        user
    } = React.useContext(IdopContext)

    //Get Users
    let userModels = await DataStore.query(User);
    userModels = JSON.stringify(userModels, null, 2)
    userModels = JSON.parse(userModels)
    const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)

    return currentUser[0]
}
