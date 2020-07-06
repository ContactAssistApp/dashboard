import { apiBaseUrl } from "../config";

export function checkAuth(name, pass) {
    let url = `${apiBaseUrl}/auth`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user: {name, pass}})
    };
    return fetch(url, options)
                .then(res => res.status);
}