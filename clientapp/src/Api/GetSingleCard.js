import { apiBaseUrl } from "../config";

/*
requestBody
*/
export function getSingleCard(requestBody) {
    let url = `${apiBaseUrl}/api/message`;
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