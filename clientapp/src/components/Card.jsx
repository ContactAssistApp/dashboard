import React from 'react';
import warning from '../images/warning.svg';
import chevron from '../images/chevron.svg';
import calendar from '../images/calendar.svg';

export class Card extends React.Component{
    constructor(props) {
        super(props);
        this.getHeaderStyles = this.getHeaderStyles.bind(this);
        this.getCardType = this.getCardType.bind(this);
    }

    render() {
        return (
            <div className="card-outline">
                <div className="card-header" style={this.getHeaderStyles()}>
                    <img src={warning} className="card-header-logo" alt="header-logo"/>
                    <span className="card-header-text">{this.getCardType()}</span>
                    <img src={chevron} className="card-header-chevron" alt="chevron"></img>
                </div>
                <div className="card-body">
                    <div className="card-location">
                        {this.getCardLocation()}
                    </div>
                    <div className="card-address">
                        {this.getStreetAddress()}
                        <br />
                        {this.getCityStateZip()}
                    </div>
                    <div className="card-dates">
                        {this.getCardDates()}
                    </div>
                </div>
                <hr className="card-separator" />
                <div className="card-description">
                    {this.getCardDescription()}
                </div>
                <hr className="card-separator" />
                <div className="card-footer">
                    <img src={calendar} className="card-calendar-icon"></img>
                    <span className="action-link">Add to calendar</span>
                    <button className="share-button">Share</button>
                </div>
            </div>
        )
    }

    // TO-DO: change color based on type of card
    getHeaderStyles() {
        return {
            backgroundColor: "#FCEF50"
        };
    }

    // TO-DO: change type based on type of card
    getCardType() {
        return "Decontamination";
    }

    // TO-DO: read location from actual PSA
    getCardLocation() {
        return "The Morgan Library and Museum";
    }

    getStreetAddress() {
        return "40th Ave";
    }

    getCityStateZip() {
        return "New York, NY 10011";
    }

    getCardDates() {
        const startDate = "April 30, 2020";
        const endDate = "May 3, 2020";
        const dates = `${startDate} to ${endDate}`;
        return dates;
    }

    getCardDescription() {
        return "Pleases refrain from entering playground Z until May 3rd because it needs to undergo decontamination";
    }
}