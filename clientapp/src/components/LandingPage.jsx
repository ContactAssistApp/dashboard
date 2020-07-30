import React from 'react';
import { Card } from './Card';
import { Map } from './Map';
import { CreatePSA } from './CreatePSA';
import { getAreaMatches } from '../Api/GetAreaMatches';
import { BingMap } from '../utilities/mapUtilities';
import { SignInForm } from './SignInForm';
import { isTracerView } from '../utilities/userRole';
import newAppIcon from '../images/newAppIcon.svg';

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showingForm: false, cards: [], showingSignIn: false, signedIn: false};
        this.showForm = this.showForm.bind(this);
        this.onFormCancel = this.onFormCancel.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
        this.onSignInClick = this.onSignInClick.bind(this);
        this.onCancelSignIn = this.onCancelSignIn.bind(this);
        this.onSuccessSignIn = this.onSuccessSignIn.bind(this);
        this.searchingZip = false;
    }

    render() {
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

        let signInButton = null;
        if (isTracerView() && !this.state.signedIn) {
            signInButton =  <button className="signin-button" onClick={this.onSignInClick}>Sign in</button>;
        }

        let signInForm = null;
        if (this.state.showingSignIn) {
            signInForm = <SignInForm onCancel={this.onCancelSignIn} onSuccess={this.onSuccessSignIn} />;
        }

        let createPsaButton = this.getCreatePsaButton();

        return (

            <div className="landing-page-container flex-container">
                <div className="landing-page-leftpane">
                    <div className="user-profile landing-page-top">
                        <div className="app-header">
                            <img src={newAppIcon} alt={"app icon"} id="app-header-image"/>
                            <span id="app-header-title">CommonCircle News</span>
                        </div>
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
                    {signInButton}
                    {createPsaButton}
                    </div>
                    <div className="landing-page-map">
                        <Map mapInfo={defaultMapInfo} cardInfo={this.state.cards}/>
                        {form}
                        {signInForm}
                    </div>
                </div>
            </div>
        )
    }

    getForm() {
        if (isTracerView() && this.state.signedIn) {
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
        if (isTracerView() && this.state.signedIn) {
            return (
                <button className="create-psa-button" onClick={this.showForm}>Create Announcement</button>
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
            let messageId = cardInfo.messageId;
            let messageTimestamp = cardInfo.messageTimestamp;
            // convert the timestamps to readable dates
            let startDate = new Date(cardInfo.area.beginTime).toLocaleString();
            let endDate = new Date(cardInfo.area.endTime).toLocaleString();

            return <Card open={false} cardInfo={parsedInfo} startDate={new Date(startDate).toLocaleDateString()} endDate={new Date(endDate).toLocaleDateString()} startTime={new Date(startDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} endTime={new Date(endDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} messageId={messageId} messageTimestamp={messageTimestamp}/>;
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

    onCancelSignIn() {
        this.setState({ showingSignIn: false });
    }

    onSuccessSignIn() {
        this.setState({ showingSignIn: false, signedIn: true});
    }
}