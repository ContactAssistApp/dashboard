import React from 'react';
import { BingMap } from '../utilities/mapUtilities';
/*
Map props:
mapInfo:
*/
export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mapInfo: this.props.mapInfo};        
    }

    componentDidMount(){
        window.onload = this.loadMapScenario;
    }

    render() {
        return (
            <div id="CovidBingMap" style={{width: '100%', height: '700px'}}></div>
        )
    }

    
    loadMapScenario(mapInfo) {
        console.log('First this called');
        //Get List of Cards
        //https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/table/
        const cards = [
            {
                type: "",
                title: "",
                street: "",
                city: "",
                state: "",
                zip: "",
                startDate: "",
                endDate: "",
                description: "",
                lat: 40.75597667,
                lon: -73.98700333,
                address: '1 Times Sq, New York, NY 10036'
            }
        ]
        //Loop:
        var mapInfo = cards[0];
        
        let map = null;
        map = new window.Microsoft.Maps.Map(document.getElementById('CovidBingMap'), { 
            //options
        });
        //focus point
        map.setView({
            mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            center: new window.Microsoft.Maps.Location(mapInfo.lat, mapInfo.lon),
            zoom: 15
        });
        
         //Make a request to reverse geocode the center of the map.
         //BingMap.reverseGeocode(defaultMapInfo.address)
         window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var requestOptions = {
                bounds: map.getBounds(),
                where: mapInfo.address,
                callback: function (answer, userData) {
                    console.log('answer geo coords:', answer.results[0].location)
                    map.setView({ bounds: answer.results[0].bestView });
                    map.entities.push(new window.Microsoft.Maps.Pushpin(answer.results[0].location));
                }
            };
            searchManager.geocode(requestOptions);
        });

        //Make a request to reverse address the geocoords.
        //BingMap.reverseGeoaddress(defaultMapInfo.lat,defaultMapInfo.lon)
        window.Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            var searchManager = new window.Microsoft.Maps.Search.SearchManager(map);
            var reverseGeocodeRequestOptions = {
                location: new window.Microsoft.Maps.Location(mapInfo.lat,mapInfo.lon),
                callback: function (answer, userData) {
                    map.setView({ bounds: answer.bestView });
                    map.entities.push(new window.Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location));
                    console.log('answer geo address:',  answer.address.formattedAddress)
                }
            };
            searchManager.reverseGeocode(reverseGeocodeRequestOptions);
        });
        
    }
}