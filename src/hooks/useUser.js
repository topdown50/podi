import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { IdopContext } from '../context/IdopProvider';

export default function useUser(initalValue) {

    const {
        user
    } = React.useContext(IdopContext)

    const [loggedUser, setLoggedUser] = React.useState(initalValue)

    const getUsers = async () => {
        //Users
        let models = await DataStore.query(User);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        const currentUser = models.filter((userI) => userI.email === user.attributes.email)
        setLoggedUser(currentUser[0])
    }

    React.useEffect(() => {
        getUsers()
        const subscription = DataStore.observe(User).subscribe(() => getUsers())
        return () => subscription.unsubscribe()
    },[])

    return[
        loggedUser,
        setLoggedUser
    ]
}
