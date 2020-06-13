import React from 'react';

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

    
    loadMapScenario() {
        console.log('First this called');
        console.log(this.props.mapInfo)
        let map = null;
        map = new window.Microsoft.Maps.Map(document.getElementById('CovidBingMap'), { 
            //options
        });
        //focus point
        map.setView({
            mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
            center: new window.Microsoft.Maps.Location(this.state.mapInfo.lat, this.state.mapInfo.lon),
            zoom: 15
        });
    }

    getLat() {
        if (this.props.mapInfo.lat) {
            return this.props.mapInfo.lat
        } else {
            return 0;
        }
    }

    getLon() {
        if (this.props.mapInfo.lon) {
            return this.props.mapInfo.lon
        } else {
            return 0;
        }
    }
}