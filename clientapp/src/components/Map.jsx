import React from 'react';
import { BingMap } from '../utilities/mapUtilities';
/*setState
Map props:
mapInfo:
cards:
*/
export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.loadMapScenario = this.loadMapScenario.bind(this);
        this.state = {mapInfo: this.props.mapInfo, cardInfo: this.props.cardInfo };       
    }

    componentDidMount(){
        window.onload = this.loadMapScenario;
    }

    componentDidUpdate(prevProps, prevState){
      if (prevProps.cardInfo !== this.props.cardInfo) {
        this.loadMapScenario();
      }
    }

    render() {
        return (
            <div id="CovidBingMap" style={{width: '100%', height: '100%'}}></div>
        )
    }

    
    loadMapScenario() {
        console.log('mapInfo:',this.props.mapInfo);
        console.log('cards:',this.props.cardInfo); //? []
        if(BingMap.getMap()==null){
          BingMap.init(); //One time here only
          const mapCenter = BingMap.getCenter();
          this.props.onMapInit(mapCenter);
        }        
        //Get List of counties
        //https://public.opendatasoft.com/explore/dataset/us-zip-code-latitude-and-longitude/table/
        const cards = this.props.cardInfo;
        //Loop:
        // BingMap.drawThePinByAddress('20 west st new york ny 10004');
        // BingMap.drawThePinByAddress('641 ave of america New York NY 10011');
        if(cards && cards.length > 0){
          let lat = null;
          let lon = null;
          let address = null;
          cards.forEach((card) => {
              lat = card.area.location.latitude;
              lon = card.area.location.longitude;
              address = this.getAddress(card);
              if(address){
                BingMap.drawThePinByAddress(address, card.userMessage);
              } else {
                BingMap.drawThePinByGeocoords(lat,lon, card.userMessage);
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
          //clustering ?
          BingMap.showCluster();
          BingMap.showDrawingManager();
          //focus point
          BingMap.setView(window.Microsoft.Maps.MapTypeId.canvasLight, lat, lon, 15); 
        }
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