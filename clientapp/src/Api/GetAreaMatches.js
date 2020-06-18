import { apiBaseUrl } from "../config";

/*
params: {
    lat,
    lon,
    precision?,
    lastTimestamp?
}
*/
export function getAreaMatches(params) {
    let url = `${apiBaseUrl}/api/areaMatches?lat=${params.lat}&lon=${params.lon}&precision=${params.precision}&lastTimestamp=${params.lastTimestamp}`;
    return fetch(url)
            .then(res => res.json())
            .then(res => res);
}