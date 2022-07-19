import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SupplierForm from '../../components/AddSupplierForm/SupplierForm'
import { DataStore } from '@aws-amplify/datastore';
import { Supplier } from '../../models';
import { BillingAddress } from '../../models';
import { ShippingAddress } from '../../models';

export default function ViewSupplier() {

    const [supplier, setSupplier] = React.useState({})
    const [billAdd, setBillAdd] = React.useState([])
    const [shippAdd, setShippAdd] = React.useState([])

    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = state

    const getSupplier = async() => {
        //Supplier
        let supplierModels = await DataStore.query(Supplier,id);
        supplierModels = JSON.stringify(supplierModels, null, 2)
        supplierModels = JSON.parse(supplierModels)
        setSupplier(supplierModels)
        //Bill Address
        let billModels = (await DataStore.query(BillingAddress)).filter(billAdd => billAdd.supplierID === supplierModels.id)
        billModels = JSON.stringify(billModels, null, 2)
        billModels = JSON.parse(billModels)
        setBillAdd(billModels)
        //Shipp Address
        let shippModels = (await DataStore.query(ShippingAddress)).filter(shippAdd => shippAdd.supplierID === supplierModels.id)
        shippModels = JSON.stringify(shippModels, null, 2)
        shippModels = JSON.parse(shippModels)
        setShippAdd(shippModels)
    }

    React.useEffect(() => {
        getSupplier()
    },[]);


    return (
        <SupplierForm
            title="View Supplier"
            button_title="Cancel"
            supplier={supplier}
            setSupplier={setSupplier}
            billAdd={billAdd}
            setBillAdd={setBillAdd}
            shippAdd={shippAdd}
            setShippAdd={setShippAdd}
            setDisable={true}
            resetForm={() => navigate('/SuppliersReport')}
        />
    )
}
