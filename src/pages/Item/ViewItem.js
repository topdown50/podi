import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Item } from '../../models';
import ItemForm from '../../components/AddItemForm/ItemForm';

export default function ViewItem() {

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

  React.useEffect(() => {
    getItems()
  },[]);

  return (
    <ItemForm
      title={"View Item"}
      button_title="Exit"
      setDisable={true}
      item={item}
      setItem={setItem}
      resetForm={() => navigate('/ItemsReport')}
    />
  )
}
