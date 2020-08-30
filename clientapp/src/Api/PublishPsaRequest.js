import { BingMap } from '../utilities/mapUtilities';

/*
params {type: "", title: "", street: "", city: "", state: "", zip: "", description: "", startDate: "", endDate: "", radius: number}
*/

export class PublishPsaRequest {
    constructor(params) {
       this.params = params;
    }

    getBody(cb, errorCb) {
        let userMessage = this.getUserMessage(this.params);
        let radius = this.params.radius;
        let beginTime = this.convertDateStringToTimestamp(this.params.startDate + " " + this.params.startTime);
        let endTime = this.convertDateStringToTimestamp(this.params.endDate + " " + this.params.endTime);
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
        },
        // error callback
        () => {
            errorCb();
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

    convertToLocation(params, cb, errorCb) {
        let location = {
            latitude: 0,
            longitude: 0
        };
        let address = `${params.street} ${params.city}, ${params.state} ${params.zip}`;
        BingMap.reverseGeocoordsFromAddress(address, (result) => {
            location.latitude = result.latitude;
            location.longitude = result.longitude;
            cb(location);
            },
            (options) => {
                errorCb();
            });
    }
}