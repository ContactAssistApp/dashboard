import { BingMap } from '../utilities/mapUtilities';

/*
params {type: "", title: "", street: "", city: "", state: "", zip: "", description: "", startDate: "", endDate: ""}
*/

export class PublishPsaRequest {
    constructor(params) {
       this.params = params;
    }

    getBody(cb) {
        let userMessage = this.getUserMessage(this.params);
        let radius = 100;
        let beginTime = this.convertDateStringToTimestamp(this.params.startDate);
        let endTime = this.convertDateStringToTimestamp(this.params.endDate);
        this.convertToLocation(this.params, (locationResult) => {
            this.body = {
                userMessage: JSON.stringify(userMessage),
                area: {
                    location: locationResult,
                    radiusMeters: radius,
                    beginTime: beginTime,
                    endTime: endTime
                }
            };
            cb(this.body);
        });
    }

    getUserMessage(params) {
        let userMessage = {
            type: params.type,
            title: params.title,
            street: params.street,
            city: params.city,
            state: params.state,
            zip: params.zip,
            description: params.description
        };

        return userMessage;
    }

    convertDateStringToTimestamp(dateString) {
        let date = new Date(dateString);
        return date.getTime();
    }

    convertToLocation(params, cb) {
        let location = {
            latitude: 0,
            longitude: 0
        };
        let address = `${params.street} ${params.city}, ${params.state} ${params.zip}`;
        BingMap.reverseGeocoordsFromAddress(address, (result) => {
            location.latitude = result.latitude;
            location.longitude = result.longitude;
            cb(location);
        });
    }
}