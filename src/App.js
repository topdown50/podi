import React from 'react'
import './App.css';
import AppRouter from './Routes/AppRouter';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { IdopProvider } from './context/IdopProvider';
import { DataStore, syncExpression } from '@aws-amplify/datastore';
import { User } from './models';


import { Item } from './models';
import { PurchaseOrder } from './models';
import { SaleOrder } from './models';
import { PurchaseOrderItems } from './models';
import { SaleOrderItem } from './models';
import { addDays } from './utils/CustomFunctions/customFunctions';

function App({user,signOut}) {

  const [amplifyUser,setAmplifyUser] = React.useState({})
  
  const [poID, setPoID] = React.useState('')
  const [soID, setSoID] = React.useState('')


  DataStore.configure({
    syncExpressions: [
        syncExpression(PurchaseOrder, purchaseO => purchaseO.po_date('gt',addDays(new Date(),-10).toISOString().slice(0, 10))),
        syncExpression(SaleOrder, saleO => saleO.invoice_date('gt',addDays(new Date(),-10).toISOString().slice(0, 10))),
        syncExpression(SaleOrderItem,async () => {
          console.log(soID)
          return Item => Item.saleorderID('eq', soID)
        }),
        syncExpression(PurchaseOrderItems, () => {
          return Item => Item.purchaseorderID('eq', poID);
        })
    ]
  });

  React.useEffect(() => {    

    async function fetchData() {
      let userModel = (await DataStore.query(User)).filter(currentUser => currentUser.email === user.attributes.email)
      userModel = JSON.stringify(userModel, null, 2)
      userModel = JSON.parse(userModel)
      setAmplifyUser(userModel[0])
    }

    fetchData()
    const subscription = DataStore.observe(User).subscribe(() => fetchData())
    return () => subscription.unsubscribe()
    
  },[])

  

  return (
    <IdopProvider user={user} signOut={signOut} amplifyUser={amplifyUser} user_group={user.signInUserSession.accessToken.payload['cognito:groups'][0]} setPoID={setPoID} setSoID={setSoID}>
      <AppRouter/>
    </IdopProvider>
    
  );
}

export default withAuthenticator(App);
