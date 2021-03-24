import { apiBaseUrl } from "../config";

/*
params: {
    twitterId
}
*/
export function getUserMentionsTweets(params) {
    let url = `${apiBaseUrl}/api/usermentionstweets?twitterId=${params.twitterId}`;
    return fetch(url)
            .then(res => res.json())
            .then(res => res);
} 