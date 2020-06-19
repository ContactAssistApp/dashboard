import React from 'react';
import { Card } from './Card';
import { Map } from './Map';
import { CreatePSA } from './CreatePSA';
import { Slider } from './Slider';
import appIcon from '../images/appIcon.svg';
import { getAreaMatches } from '../Api/GetAreaMatches';
import pin from '../images/pin.svg';
import clock from '../images/clock.svg';
import calendar from '../images/calendar.svg';
import savedSettingsIcon from "../images/savedSettingsIcon.svg";

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showingForm: false, cards: []};
        this.showForm = this.showForm.bind(this);
        this.onFormCancel = this.onFormCancel.bind(this);
    }

    componentDidMount() {
        //hard-coding location for now
        let params = {
            lat: 42,
            lon: -73,
            precision: 4,
            lastTimestamp: 1592204400000
          };
          getAreaMatches(params).then(res => {
            this.setState({ cards: res.matches });
          });
    }

    render() {
        const defaultCardInfo = {
            type: "",
            title: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            startDate: "",
            endDate: "",
            description: ""
        };

        const defaultMapInfo = {
            zip: 10004,
            lat: 40.75597667,
            lon: -73.98700333,
            address: '1 Times Sq, New York, NY 10036'
        };

        let form = null;
        if (this.state.showingForm) {
            form = this.getForm();
        }

        return (

            <div className="landing-page-container flex-container">
                <div className="landing-page-leftpane">
                    <div className="user-profile landing-page-top">
                        User Profile
                     </div>   
                     <div className="landing-page-title">
                         COVID-19 PSA and Resource Hub
                     </div>
                     <div className="landing-page-updated">
                         Last Updated...
                     </div>
                     <div className="landing-page-location-container">
                         <input type="text" placeholder="Find location" className="landing-page-find-location" />
                    </div>
                    <div className="landing-page-filter-sort">
                        Filter and sort
                    </div>
                    <div className="landing-page-cards">
                        {this.state.cards.map((card) => {
                            return this.getCard(card);
                        })}
                    </div>
                </div>
                <div className="landing-page-right-pane">
                    <div className="landing-page-filters landing-page-top">
                        <img src={pin} className="tracer-form-pin" alt="pin icon"/>
                        <input type="text" placeholder="New York, NY 10011" />
                        <img src={clock} className="clock-icon" alt="clock icon" />
                        <input type="time" value="07:00" />
                        <span id="map-filter-times-separator">to</span>
                        <input type="time" value="07:00" />
                        <div className="all-day-switch">
                            <span>All Day</span>
                        </div>
                        <img src={calendar} className="map-filter-calendar-icon" alt="calendar icon" />
                        <input type="date" id="start-date" onChange={this.onStartDateChange}/>
                        <span id="map-filter-dates-separator">to</span>
                        <input type="date" id="end-date" onChange={this.onEndDateChange}/>
                        <Slider startingValue={2} label={"Maximum Radius"} unit={"miles"}/>
                        <span className="filter-save-text">Save Settings</span>
                        <img src={savedSettingsIcon} className="saved-settings-icon" alt="saved settings icon" />
                    </div>
                    <div className="landing-page-map">
                        <button className="create-psa-button" onClick={this.showForm}>Create New PSA</button>
                        {console.log('this.state.cards:', JSON.stringify(this.state.cards))}
                        <Map mapInfo={defaultMapInfo} cardInfo={this.state.cards}/>
                        <button className="download-button">
                            <img src={appIcon} />
                            Download CovidSafe
                        </button>
                        {form}
                    </div>
                </div>
            </div>
        )
    }

    getForm() {
        return (
            <div className="form-container">
                <CreatePSA onCancel={this.onFormCancel}/>
            </div>
        )
    }

    showForm() {
        this.setState({showingForm: true});
    }

    onFormCancel() {
        this.setState({showingForm: false});
    }

    getCard(cardInfo) {
        try {
            let parsedInfo = JSON.parse(cardInfo.userMessage);
            // convert the timestamps to readable dates
            let startDate = new Date(cardInfo.area.beginTime).toLocaleDateString();
            let endDate = new Date(cardInfo.area.endTime).toLocaleDateString();

            return <Card open={false} cardInfo={parsedInfo} startDate={startDate} endDate={endDate} />;
        } catch(e) {
            console.log("JSON.parse error");
            return null;
        }
    }
}