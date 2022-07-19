import fetch from "node-fetch";

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {

    let data = JSON.parse(event.body)

    let responseJson = {}

    let refresh_token = data.refresh_token
    let client_id = data.client_id
    let client_secret = data.client_secret

    let fetchUrl = `https://accounts.zoho.com/oauth/v2/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=refresh_token&refresh_token=${refresh_token}`

    let response = await fetch(fetchUrl,{
        method: "POST", 
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
