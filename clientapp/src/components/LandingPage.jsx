import React from 'react';
import { Card } from './Card';
import { CreatePSA } from './CreatePSA';
import appIcon from '../images/appIcon.svg';
import { getAreaMatches } from '../Api/GetAreaMatches';

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
            lat: 42.7569,
            lon: -73.9828,
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
                        Filters
                    </div>
                    <div className="landing-page-map">
                        <button className="create-psa-button" onClick={this.showForm}>Create New PSA</button>
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
            let startDate = new Date(cardInfo.areas[0].beginTime).toLocaleDateString();
            let endDate = new Date(cardInfo.areas[0].endTime).toLocaleDateString();

            return <Card open={false} cardInfo={parsedInfo} startDate={startDate} endDate={endDate} />;
        } catch(e) {
            console.log("JSON.parse error");
            return null;
        }
    }
}