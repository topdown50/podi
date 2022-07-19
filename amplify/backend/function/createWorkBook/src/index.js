import fetch from "node-fetch";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 export const handler = async (event) => {

    let data = JSON.parse(event.body)

    let responseJson = {}

    let access_token = data.access_token
    let workbookName = data.workbookName

    let header_data = {
        'Authorization': `Zoho-oauthtoken ${access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    let response = await fetch(`https://sheet.zoho.com/api/v2/create?method=workbook.create&workbook_name=${workbookName}`,{
        method: "POST",
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
