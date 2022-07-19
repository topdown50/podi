import React from 'react'
import Swal from 'sweetalert2'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';
import ItemForm from '../../components/AddItemForm/ItemForm';
import { onSubmitValidation } from '../../utils/Item/ItemValidations';
import { sendItemZB } from '../../utils/Item/ItemZB';

export default function EditItem() {
    const [item, setItem] = React.useState({})

    const navigate = useNavigate();
    const {state} = useLocation();
    const {id} = state

    const getItems = async () => {
        //Items
        let models = await DataStore.query(Item,id);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        setItem(models)
    }

    const saveUserData = async () => {
        Swal.fire({
            title: 'Please Wait',
            allowOutsideClick: false
        })
          
        Swal.showLoading()

        //Validations
        if(await onSubmitValidation(item)){
            return
        }

        try{
            let older_item = await DataStore.query(Item,id);
            let item_id = await sendItemZB(older_item,older_item.zb_item_id)

            await DataStore.save(Item.copyOf(older_item, oldItem => {
                oldItem.sku = item.sku
                oldItem.name = item.name
                oldItem.supplier_code = item.supplier_code
                oldItem.description = item.description
                oldItem.cost = parseFloat(item.cost)
                oldItem.type = item.type
                oldItem.plu = item.plu
                oldItem.zb_item_id = item_id
                oldItem.units_per_case = parseInt(item.units_per_case)
                oldItem.cases_per_pallet = parseInt(item.cases_per_pallet)
                oldItem.item_weight = parseFloat(item.item_weight)
                oldItem.unity = item.unity
                oldItem.companyID = item.companyID
                oldItem.supplierID = item.supplierID
                oldItem.zb_convert_weight =item.zb_convert_weight 
            }));

            Swal.fire(
                'Form Sent!',
                'Form Edit Success',
                'success',
            ).then(() => {
                navigate('/ItemsReport')
            })

        }catch(error){
            Swal.fire(
                'Error, please try again.',
                error,
                'error'
            )
        }
    }

    React.useEffect(() => {
        getItems()
    },[]);

    return (
        <ItemForm
            title={"Edit Item"}
            button_title="Cancel"
            item={item}
            setItem={setItem}
            resetForm={() => navigate('/ItemsReport')}
            saveItem={saveUserData}
        />
    )
}