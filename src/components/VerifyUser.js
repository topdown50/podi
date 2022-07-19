import React from 'react'
import { IdopContext } from '../context/IdopProvider';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import InvalidUser from '../pages/InvalidUser';
import { SaleOrder } from '../models';


export default function VerifyUser({children}) {

    const [loggedUser, setLoggedUser] = React.useState({status: ''})
    const [isLoading,setIsLoading] = React.useState(true)

    const {
        user
    } = React.useContext(IdopContext)

    const getUsers = async () => {
        // Get users
        let models = await DataStore.query(User);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        if(models.length > 0) {
            //Search for users with the same email
            let userInvited = models.filter((userI) => userI.email === user.attributes.email)[0]
            //Create a user if it has not been created
            if(!userInvited){
                userInvited = {status: 'xd'}
            }
            setLoggedUser(userInvited)
            setIsLoading(false)
        }
        
    }

    React.useEffect(() => {
        getUsers()
        const subscription = DataStore.observe(User).subscribe(() => getUsers())
        return () => subscription.unsubscribe()
    },[])

    const loading = () => {
        if(isLoading){
            return(
                <div className="container-fluid d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
                    <div className="row">
                        <div className="col-md">
                            <div className="spinner-border" style={{width: '3rem',height: '3rem'}} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            )
        }else{
            return(loggedUser.status === "invited" || loggedUser.status === "desactivated" || loggedUser.status === "xd" ?  <InvalidUser/> : children)
        }
    }

    return (
        loading()
    )
}
