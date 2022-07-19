import React from 'react'
import { DataStore } from '@aws-amplify/datastore';
import { IdopContext } from '../../context/IdopProvider'
import { User } from '../../models';
import { PurchaseOrder } from '../../models';
import { Supplier } from '../../models';
import StatusTable from '../../components/PurchaseOrder/StatusTable';

export default function PurchaseOrderReport() {

    const [status, setStatus] = React.useState('Draft')

    const [purchaseOrder, setPurchaseOrder] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState([])

    const {
        user
    } = React.useContext(IdopContext)

    const getCurrentUser = async () => {
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUserFilter = userModels.filter((userI) => userI.email === user.attributes.email)
        setCurrentUser(currentUserFilter)
        // //Suppliers
        // const supplierModels = await DataStore.query(Supplier);
        // //Get Purchase Order
        // let models = (await DataStore.query(PurchaseOrder)).filter(purchaseO => purchaseO.companyID === currentUser[0].companyID && purchaseO.status === status);
        // models = JSON.stringify(models, null, 2)
        // models = JSON.parse(models)
        // models.map((purchaseO) => purchaseO.supplierID = supplierModels.filter(supp => supp.id === purchaseO.supplierID)[0].name)
        // setPurchaseOrder(models)
    }

    const showReport = () => {
        if(status === 'Draft'){
            return(<StatusTable text="Purchase Order: Draft" purchaseOrder={purchaseOrder}/>)
        }else if(status === 'Ordered'){
            return(<StatusTable text="Purchase Order: Ordered" purchaseOrder={purchaseOrder}/>)
        }else if(status === 'Received'){
            return(<StatusTable text="Purchase Order: Received" purchaseOrder={purchaseOrder}/>)
        }else if(status === 'Completed'){
            return(<StatusTable text="Purchase Order: Completed" purchaseOrder={purchaseOrder}/>)
        }
        return(null)
    }
    

    React.useEffect(() => {
        const subscription = DataStore.observeQuery(PurchaseOrder,
            purchaseO => purchaseO.companyID('eq',currentUser[0].companyID).status('eq',status)
        ).subscribe(async (snapshot) => {
            //Suppliers
            const supplierModels = await DataStore.query(Supplier);
            //Get Purchase Order
            let models = snapshot.items
            models = JSON.stringify(models, null, 2)
            models = JSON.parse(models)
            models.map((purchaseO) => purchaseO.supplierID = supplierModels.filter(supp => supp.id === purchaseO.supplierID)[0].name)
            setPurchaseOrder(models)
        })
        return () => subscription.unsubscribe()
    },[status,currentUser]);

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
                    <button onClick={() => setStatus('Ordered')} type="button" className="btn btn-outline-success btn-lg">Ordered</button>
                </div>
                <div className="col-md-3">
                    <button onClick={() => setStatus('Received')} type="button" className="btn btn-outline-secondary btn-lg">Received</button>
                </div>
                <div className="col-md-3">
                    <button onClick={() => setStatus('Completed')} type="button" className="btn btn-outline-dark btn-lg">Completed</button>
                </div>
            </div>
            <div className="row">
                {showReport()}
            </div>
        </div>
    )
}
