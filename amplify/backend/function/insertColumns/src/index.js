import fetch from "node-fetch";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {

    let data = JSON.parse(event.body)

    let responseJson = {}

    let resource_id = data.resource_id
    let worksheet_name = data.worksheet_name
    let worksheet_id = data.worksheet_id
    let column_names = data.column_names
    let after_column_name = data.after_column_name
    let access_token = data.access_token

    let header_data = {
        'Authorization': `Zoho-oauthtoken ${access_token}`
    }

    let bodyData = {
        method: 'records.columns.insert',
        worksheet_name: worksheet_name,
        insert_column_after: after_column_name,
        column_names: column_names
    }

    let response = await fetch(`https://sheet.zoho.com/api/v2/${resource_id}`,{
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: header_data
    })

    responseJson = await response.json()
    
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify(responseJson),
    };
};
