const API = require("./controller");
const config = require("../config.json");

const defaultRadius = config.defaultRadius;
const defaultDuration = config.defaultDuration;

class TweetParser {
    parseTweet(tweet) {
        const data = tweet.data;
        const includes = tweet.includes;
        this.internalParse(data, includes);
    }

    internalParse(tweet, includes) {
        const location = this.getLocation(tweet, includes);
        if (location) {
            var _this = this;
            this.getUserMessage(tweet, location, function(userMessage){
                const psa = {
                    userMessage: JSON.stringify(userMessage),
                    area: _this.getAreaObject(location)
                };
                console.log("found valid message, publishing");
                API.putAreaReport(JSON.stringify(psa), function(result) {
                    console.log(result);
                });
            });
        } else {
            console.log("no location provided, not publishing");
        }
    }

    parseTweets(response) {
        // data is an array of tweet data
        const data = response.content.data;    
        // includes holds extensions, in this particular case, we're interested in place data
        const includes = response.content.includes;
        
        data.forEach((tweet) => {
            this.internalParse(tweet, includes);
        });
        return 'Done parsing';
    }

    getUserMessage(tweet, location, callback) {
        this.getAddress(location, function(placeData) {
            const userMessage = {
                type: "Vaccines",
                title: "Vacines available",
                description: tweet.text,
                street: placeData.street,
                city: placeData.city,
                state: placeData.state,
                zip: placeData.zip
            };
            callback(userMessage);
        });
    }

    getAreaObject(location) {
        let beginTime = Date.now();
        return {
            location,
            radiusMeters: defaultRadius,
            beginTime: beginTime,
            endTime: beginTime + defaultDuration
        };
    }

    getLocation(tweet, includes) {
        if (tweet.geo) {
            const placeId = tweet.geo.place_id;
            if (includes.places) {
                const place = this.findPlaceById(includes.places, placeId);
                if (place) {
                    return {
                        longitude: place.geo.bbox[0],
                        latitude: place.geo.bbox[1]
                    };
                }
            }
        }
        return null;
    }

    findPlaceById(places, id) {
        for (var i = 0; i < places.length; i++) {
            let place = places[i];
            if (place.id === id) {
                return place;
            }
        }
        return null;
    }

    getAddress(location, callback) {
        API.getAddressFromBing(location, (response) => {
            const address = response.content.resourceSets[0].resources[0].address;
            const placeData = {
                street: address.addressLine,
                city: address.locality,
                state: address.adminDistrict,
                zip: address.postalCode
            };
            callback(placeData);
        });
    }
}

module.exports = TweetParser;


