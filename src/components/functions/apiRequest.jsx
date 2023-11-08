const urlEndPoint = "https://fvdwdl1hmg.execute-api.us-east-1.amazonaws.com/beta/FCNA_Handler"

export default async function fetchData (requestType, requestData) {
    
    const response = await fetch(
        urlEndPoint, {
            method: requestType,
            mode: 'cors',
            body: JSON.stringify(requestData)
        }
    )

    const res_promise = await response.json()
    return res_promise
}