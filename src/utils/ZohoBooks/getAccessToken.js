import {API} from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore';
import { Company } from '../../models';

export async function getAccessToken(Company){
    
    let request = {
        refresh_token: Company.zb_refresh_token,
        client_id: Company.zb_client_id,
        client_secret: Company.zb_client_secret
    }

    return fetch("https://5jy22n4xub.execute-api.ca-central-1.amazonaws.com/staging/accessToken",{
        method: "POST",
        body: JSON.stringify(request),
    }).then(response => response.json())
    .then(data => {
        return(data.access_token)
    });
}