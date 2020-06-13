import React from 'react';
import { Card } from './Card';
import { Map } from './Map';
import { CreatePSA } from './CreatePSA';
import appIcon from '../images/appIcon.svg';

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showingForm: false};
        this.showForm = this.showForm.bind(this);
        this.onFormCancel = this.onFormCancel.bind(this);
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
            lat: 35.027222,
            lon: -111.0225
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
                        <Card open={false} cardInfo={defaultCardInfo}/>
                        <Card open={false} cardInfo={defaultCardInfo}/>
                        <Card open={false} cardInfo={defaultCardInfo}/>
                    </div>
                </div>
                <div className="landing-page-right-pane">
                    <div className="landing-page-filters landing-page-top">
                        Filters
                    </div>
                    <div className="landing-page-map">
                        <button className="create-psa-button" onClick={this.showForm}>Create New PSA</button>
                        <button className="download-button">
                            <img src={appIcon} />
                            Download CovidSafe
                        </button>
                        {form}
                        <Map mapInfo={defaultMapInfo} />
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
}