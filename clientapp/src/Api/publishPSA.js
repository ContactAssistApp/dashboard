import { apiBaseUrl } from "../config";

/*
requestBody
*/
export function publishPSA(requestBody) {
    let url = `${apiBaseUrl}/api/report`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }
    return fetch(url, options)
                .then(res => res.json())
                .then(res => res);
}