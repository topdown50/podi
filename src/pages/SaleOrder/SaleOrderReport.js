import React from 'react'
import { IdopContext } from '../../context/IdopProvider'
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';
import { Customer } from '../../models';
import { SaleOrder } from '../../models';
import SaleIOrderTable from '../../components/SaleOrder/SaleIOrderTable';


export default function SaleOrderReport() {

    const [status, setStatus] = React.useState('Draft')

    const [saleOrders, setSaleOrders] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState([])
    const [loading,setLoading] = React.useState(true)

    const {
        user,
        setSoStatus
    } = React.useContext(IdopContext)


    const getCurrentUser = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUserFilter = userModels.filter((userI) => userI.email === user.attributes.email)
        setCurrentUser(currentUserFilter)
    }

    const showReport = () => {
        if(status === 'Draft'){
            return(<SaleIOrderTable text="Sale Orders: Draft" saleOrder={saleOrders} loading={loading}/>)
        }else if(status === 'Picking'){
            return(<SaleIOrderTable text="Sale Orders: Picking" saleOrder={saleOrders} loading={loading}/>)
        }else if(status === 'Ready'){
            return(<SaleIOrderTable text="Sale Orders: Ready for Shipping" saleOrder={saleOrders} loading={loading}/>)
        }else if(status === 'Shipped'){
            return(<SaleIOrderTable text="Sale Orders: Shipped" saleOrder={saleOrders} loading={loading}/>)
        }
        return(null)
    }

    React.useEffect(() => {
        console.log('hola')
        const subscription = DataStore.observeQuery(SaleOrder,
            saleO => saleO.companyID('eq',currentUser[0].companyID).status('eq',status)
        ).subscribe(async (snapshot) => {
            //Customers
            const customerModels = await DataStore.query(Customer);
            //Get Purchase Order
            let models = snapshot.items
            models = JSON.stringify(models, null, 2)
            models = JSON.parse(models)
            models.map(async (purchaseO) => purchaseO.customerID = customerModels.filter(customer => customer.id === purchaseO.customerID)[0].company_name)
            setSaleOrders(models)
            setLoading(false)
        })
        return () => subscription.unsubscribe()
    },[currentUser,status]);

    React.useEffect(() => {
        getCurrentUser()
    },[])

    return (
        <div className="container-fluid">
            <div className="row text-center p-4 shadow bg-body rounded">
                <div className="col-md-3">
                    <button onClick={() => setStatus('Draft')} type="button" className="btn btn-outline-primary btn-lg">Draft</button>
                </div>
                <div className="col-md-3">
                    <button onClick={() => setStatus('Picking')} type="button" className="btn btn-outline-success btn-lg">Picking</button>
                </div>
                <div className="col-md-3">
                    <button onClick={() => setStatus('Ready')} type="button" className="btn btn-outline-secondary btn-lg">Ready for Shipping</button>
                </div>
                <div className="col-md-3">
                    <button onClick={() => setStatus('Shipped')} type="button" className="btn btn-outline-dark btn-lg">Shipped</button>
                </div>
            </div>
            <div className="row">
                {showReport()}
            </div>
        </div>
    )
}
