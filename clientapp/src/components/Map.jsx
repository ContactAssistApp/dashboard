import React from 'react';
import { BingMap } from '../utilities/mapUtilities';
/*
Map props:
mapInfo:
cards:
*/
export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.loadMapScenario = this.loadMapScenario.bind(this);
        this.state = {mapInfo: this.props.mapInfo, cardInfo: this.props.cardInfo};       
    }

    componentDidMount(){
        window.onload = this.loadMapScenario;
    }

    render() {
        return (
            <div id="CovidBingMap" style={{width: '100%', height: '900px'}}></div>
        )
    }

    
    loadMapScenario() {
        console.log('mapInfo:',this.props.mapInfo);
        console.log('cards:',this.props.cardInfo); //? []
        //Get List of counties
        //https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/table/

        //TODO: load list of card
        const cards = [
            {
              "userMessage": "{\"type\":\"Testing\",\"title\":\"Free testing center\",\"street\":\"462 First Avenue\",\"city\":\"New York\",\"state\":\"NY\",\"zip\":10016,\"description\":\"Come get tested at the local church.\"}",
              "area": {
                "location": {
                  "latitude": 42.7569,
                  "longitude": -73.9828
                },
                "radiusMeters": 100,
                "beginTime": 1592267271900,
                "endTime": 1592267371900
              }
            },
            {
              "userMessage": "{\"type\":\"Testing\",\"title\":\"Free testing center\",\"street\":\"462 First Avenue\",\"city\":\"New York\",\"state\":\"NY\",\"zip\":10016,\"description\":\"Come get tested at the local church.\"}",
              "area": {
                "location": {
                  "latitude": 42.7569,
                  "longitude": -73.9828
                },
                "radiusMeters": 100,
                "beginTime": 1592267271900,
                "endTime": 1592267371900
              }
            },
            {
              "userMessage": "{\"type\":\"Free food\",\"title\":\"Pizza\",\"street\":\"462 First Avenue\",\"city\":\"New York\",\"state\":\"NY\",\"zip\":\"10016\",\"description\":\"We will be giving free pizza to all our front-line workers to say thank you\"}",
              "area": {
                "location": {
                  "latitude": 40.738944,
                  "longitude": -73.975361
                },
                "radiusMeters": 100,
                "beginTime": 1592179200000,
                "endTime": 1592265600000
              }
            },
            {
              "userMessage": "Monitor symptoms for one week.",
              "area": {
                "location": {
                  "latitude": 40.12345,
                  "longitude": -74.12345
                },
                "radiusMeters": 100,
                "beginTime": 1592416988000,
                "endTime": 1592533800000
              }
            },
            {
              "userMessage": "{\"type\":\"Testing\",\"title\":\"Demo\",\"street\":\"20 West St\",\"city\":\"New York\",\"state\":\"NY\",\"zip\":\"10004\",\"description\":\"This is a demo\"}",
              "area": {
                "location": {
                  "latitude": 40.706154,
                  "longitude": -74.015351
                },
                "radiusMeters": 100,
                "beginTime": 1592265600000,
                "endTime": 1592352000000
              }
            },
            {
              "userMessage": "{\"type\":\"Testing\",\"title\":\"Free Tests\",\"street\":\"641 Ave of America\",\"city\":\"New York\",\"state\":\"New York\",\"zip\":\"10004\",\"description\":\"Come and get a free test at MSR NYC.\"}",
              "area": {
                "location": {
                  "latitude": 40.740913,
                  "longitude": -73.994723
                },
                "radiusMeters": 100,
                "beginTime": 1592352000000,
                "endTime": 1592438400000
              }
            },
            {"userMessage":"{\"type\":\"Food\",\"title\":\"Time Square\",\"street\":\"1 Time Square\",\"city\":\"New York\",\"state\":\"NY\",\"zip\":\"10036\",\"description\":\"Come to get free food at 1 Times Sq, New York, NY 10036.\"}",
            "area":{
              "location":{
                "latitude":40.75659053812887,
                "longitude":-73.98630345813636
              },
              "radiusMeters":100,
              "beginTime":1592352000000,
              "endTime":1592611200000
            }
          }
        ];
        BingMap.init(); //One time here only.
        //Loop:
        // BingMap.drawThePinByAddress('20 west st new york ny 10004');
        // BingMap.drawThePinByAddress('641 ave of america New York NY 10011');
        let lat = null;
        let lon = null;
        let address = null;
        cards.map((card) => {
            lat = card.area.location.latitude;
            lon = card.area.location.longitude;
            address = this.getAddress(card);
            if(address){
              BingMap.drawThePinByAddress(address);
            } else {
              BingMap.drawThePinByGeocoords(lat,lon);
            }            
            //BingMap.drawThePinByAddress(JSON.parse(card.userMessage).zip) //test zipcode 
            //BingMap.drawThePinByGeocoords(card.area.location.latitude, card.area.location.longitude)
            //TODO: Cleanup test utilities
            // BingMap.reverseGeocoordsFromZip(JSON.parse(card.userMessage).zip, function(e){
            //     console.log('Find Geocoords from Zipcode:',e);
            // })
            // BingMap.reverseGeocoordsFromAddress(this.getAddress(JSON.parse(card.userMessage).street,
            // JSON.parse(card.userMessage).city,
            // JSON.parse(card.userMessage).state,
            // JSON.parse(card.userMessage).zip), function(e){
            //     console.log('Find Geocoords from Address:',e);
            // })
            // BingMap.reverseAddress(card.area.location.latitude, card.area.location.longitude.lon, function(e){
            //     console.log('Find address from Geocoords:',e);
            // })
        });  
        //focus point
        BingMap.setView(lat, lon,5); 
    }

    getAddress(card){
      try{
          let parsedInfo = JSON.parse(card.userMessage);
          if(parsedInfo.street && parsedInfo.city && parsedInfo.state && parsedInfo.zip){
            //address
            console.log("Address:", [parsedInfo.street,parsedInfo.city,parsedInfo.state,parsedInfo.zip].join(' '));
            return [parsedInfo.street,parsedInfo.city,parsedInfo.state,parsedInfo.zip].join(' ');
          }else{ //zip
            return null;
          }   
        } catch(e) {
            console.log("JSON.parse error:", card.userMessage);
            return null;
        }
    }
}