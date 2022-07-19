import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';
import { User } from '../../models';

export async function purchaseOrderVal(user,purchaseOrder){

    if(purchaseOrder.flag_complete){
        purchaseOrder.status = 'Ordered'        
    }
    // ---------------------- Increment the Purchasing Count ----------------------
    try{
        //Get Users
        let userModels = await DataStore.query(User);
        userModels = JSON.stringify(userModels, null, 2)
        userModels = JSON.parse(userModels)
        const currentUser = userModels.filter((userI) => userI.email === user.attributes.email)
        //Get Companies
        let models = await DataStore.query(Company);
        models = JSON.stringify(models, null, 2)
        models = JSON.parse(models)
        const currentCompany = models.filter(company => company.id === currentUser[0].companyID)
        //Edit company
        let older_item = await DataStore.query(Company,currentCompany[0].id);
        await DataStore.save(Company.copyOf(older_item, company => {
            company.purchasing_count += 1
        }));
    }catch(e) {
        console.log(e)
    }
}