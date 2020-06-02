import React from 'react';
import { Card } from './Card';
import { CreatePSA } from './CreatePSA';

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
}