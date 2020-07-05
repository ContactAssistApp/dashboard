import React from 'react';
import { Card } from './Card';
import { Map } from './Map';
import { CreatePSA } from './CreatePSA';
import { getAreaMatches } from '../Api/GetAreaMatches';
import { BingMap } from '../utilities/mapUtilities';

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showingForm: false, cards: [], showingSignIn: false};
        this.showForm = this.showForm.bind(this);
        this.onFormCancel = this.onFormCancel.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
        this.onSignInClick = this.onSignInClick.bind(this);
        this.searchingZip = false;
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

        let signInForm = null;
        if (this.state.showingSignIn) {
            signInForm = this.getSignInForm();
        }

        let createPsaButton = this.getCreatePsaButton();

        return (

            <div className="landing-page-container flex-container">
                <div className="landing-page-leftpane">
                    <div className="user-profile landing-page-top">
                        <button className="signin-button" onClick={this.onSignInClick}>Pro Tracer Sign in</button>
                     </div>   
                     <div className="landing-page-title">
                        Resource Hub
                     </div>
                     <div className="landing-page-updated">
                         Last Updated...
                     </div>
                     <div className="landing-page-location-container">
                         <input type="text" placeholder="Find location" className="landing-page-find-location" onChange={this.onZipChange}/>
                    </div>
                    <div className="landing-page-cards">
                        {this.state.cards && this.state.cards.map((card) => {
                            return this.getCard(card);
                        })}
                    </div>
                </div>
                <div className="landing-page-right-pane">
                    <div className="landing-page-filters landing-page-top">
                    </div>
                    <div className="landing-page-map">
                        {createPsaButton}
                        <Map mapInfo={defaultMapInfo} cardInfo={this.state.cards}/>
                        {form}
                        {signInForm}
                    </div>
                </div>
            </div>
        )
    }

    getForm() {
        if (process.env.REACT_APP_MODE === 'admin') {
            return (
                <div className="form-container">
                    <CreatePSA onCancel={this.onFormCancel}/>
                </div>
            )
        }
        else {
            return null;
        }
    }

    getCreatePsaButton() {
        if (process.env.REACT_APP_MODE === 'admin') {
            return (
                <button className="create-psa-button" onClick={this.showForm}>Create New Announcement</button>
            )
        }
        else {
            return null;
        }
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

    onZipChange(ev) {
        let newZip = ev.target.value;
        // rudimentary zip validation so were not constantly spamming the service
        if (newZip.length >= 5 && !this.searchingZip) {
            this.searchingZip = true;
            let self = this;
            BingMap.reverseGeocoordsFromZip(newZip, (result) => {
                let params = {
                    lat: Math.floor(result.latitude),
                    lon: Math.floor(result.longitude),
                    precision: 4,
                    lastTimestamp: 1592204400000
                  };
                getAreaMatches(params).then(res => {
                    this.setState({ cards: res.matches });  
                }).finally(() => {
                    self.searchingZip = false;
                });
            });
        }
    }

    onSignInClick() {
        this.setState({ showingSignIn: true });
    }

    getSignInForm() {
        return (
            <div className="signIn-Form">
                <div className="signIn-title">
                    Pro Tracer Sign in
                </div>
                <input type="text" className="signIn-Field" id="username-field" placeholder="example@email.com" />
                <input type="password" className="signIn-Field" placeholder="password" />
                <span className="signIn-Link">I forgot my password</span>
                <div className="signIn-buttons">
                    <span className="signIn-cancel-button">Cancel</span>
                    <span className="signIn-continue-button">Continue</span>
                </div>
            </div>
        );
    }
}