import React from 'react';
import { BingMap } from '../utilities/mapUtilities';
/*
Map props:
mapInfo:
*/
export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.loadMapScenario = this.loadMapScenario.bind(this);
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
        console.log('First this called',this.props.mapInfo);
        //Get List of Cards
        //https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/table/
        const cards = [
            {
                type: "",
                title: "",
                street: "",
                city: "",
                state: "",
                zip: this.props.mapInfo.zip,
                startDate: "",
                endDate: "",
                description: "",
                lat: this.props.mapInfo.lat,
                lon: this.props.mapInfo.lon,
                address: this.props.mapInfo.address
            }
        ]
        let map = BingMap.createMap();
        //Loop:
        var mapInfo = cards[0];
       
        //focus point
        map.setView({
            mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            center: new window.Microsoft.Maps.Location(mapInfo.lat, mapInfo.lon),
            zoom: 15
        });
        
        //Draw the pin on map by Zipcode/Address/Geocoords
        //BingMap.drawThePinByAddress(map,mapInfo.zip) //test zipcode
        //TODO: Loop the list of cards
        BingMap.drawThePinByAddress(map,mapInfo.address)

        //// TEST - TODO: Cleanup
        BingMap.reverseGeocoordsFromZip(map, mapInfo.zip, function(e){
            console.log('Find Geocoords from Zipcode:',e);
        })
        BingMap.reverseGeocoordsFromAddress(map, mapInfo.address, function(e){
            console.log('Find Geocoords from Address:',e);
        })
        BingMap.reverseAddress(map, mapInfo.lat, mapInfo.lon, function(e){
            console.log('Find address from Geocoords:',e);
        })
       // BingMap.drawThePinByGeocoords(map,mapInfo.lat,mapInfo.lon)
        
    }
}