import React from 'react';
import warning from '../images/warning.svg';
import chevron from '../images/chevron.svg';
import calendar from '../images/calendar.svg';
import AddToCalendarHOC from 'react-add-to-calendar-hoc';
import moment from 'moment';

/*
Card props:
open: boolean - whether card should be expanded or collapsed
cardInfo: CardInfo - info for the card - equivalent to the userMessage
startDate: string,
endDate: string
*/

const AddToCalendarDropdown = AddToCalendarHOC(Button, CalendarModal);

class Button extends React.Component{
    render() {
        return (
            <span className="action-link" onClick = {this.props.onClick}>Add to calendar</span>
        );
    }
}

class CalendarModal extends React.Component{
    render() {
        return (
            <div className="card-calendar-dropdown">{this.props.children}</div>
        );
    }
}

export class Card extends React.Component{
    constructor(props) {
        super(props);
        this.getHeaderStyles = this.getHeaderStyles.bind(this);
        this.getCardType = this.getCardType.bind(this);
        this.collapseCard = this.collapseCard.bind(this);
        this.expandCard = this.expandCard.bind(this);
        this.state = {open: this.props.open, cardInfo: this.props.cardInfo};
    }   

    render() {
        let card;
        if (this.state.open) {
            card = this.getOpenCard();
        } else {
            card = this.getClosedCard();
        }

        return card;
    }

    getOpenCard() {
        const startDateTime = moment(this.props.startDate);
        const endDateTime = moment(this.props.endDate);
        const duration = moment.duration(endDateTime.diff(startDateTime)).asHours();
        return (
            <div className="card-outline">
                <div className="card-header" style={this.getHeaderStyles()}>
                    <img src={warning} className="card-header-logo" alt="header-logo"/>
                    <span className="card-header-text">{this.getCardType()}</span>
                    <img src={chevron} className="card-header-chevron-open" alt="chevron" onClick={this.collapseCard}></img>
                </div>
                <div className="card-body">
                    <div className="card-title">
                        {this.getCardTitle()}
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
                    <img src={calendar} className="card-calendar-icon" alt="calendar"></img>
                    <AddToCalendarDropdown 
                        className = "card-calendar"
                        event = {
                            {
                                description: this.getCardDescription(),
                                duration: duration,
                                title: this.getCardTitle(),
                                location: `${this.getStreetAddress()}, ${this.getCityStateZip()}`,
                                endDatetime: endDateTime.format('YYYYMMDDTHHmmss'),
                                startDatetime: startDateTime.format('YYYYMMDDTHHmmss'),
                                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                            }
                        }
                    />
                    <button className="share-button">Share</button>
                </div>
            </div>
        )
    }

    getClosedCard() {
        return (
            <div className="card-outline">
                <div className="card-header" style={this.getHeaderStyles()}>
                    <img src={warning} className="card-header-logo" alt="header-logo"/>
                    <span className="card-header-text">{this.getCardType()}</span>
                    <img src={chevron} className="card-header-chevron-closed" alt="chevron" onClick={this.expandCard}></img>
                </div>
                <div className="card-body">
                    <div className="card-title">
                        {this.getCardTitle()}
                    </div>
                    <div className="card-dates">
                        {this.getCardDates()}
                    </div>
                </div>
            </div>
        )
    }
    collapseCard() {
        this.setState({open: false});
    }

    expandCard() {
        this.setState({open: true});
    }

    // TO-DO: change color based on type of card (look in this.props.cardInfo)
    getHeaderStyles() {
        return {
            backgroundColor: "#FCEF50"
        };
    }

    // TO-DO: change type based on type of card (look in this.props.cardInfo)
    getCardType() {
        if (this.props.cardInfo.type) {
            return this.props.cardInfo.type
        } else {
            return "PSA Type";
        }
    }

    // TO-DO: read title from actual PSA (look in this.props.cardInfo)
    getCardTitle() {
        if (this.props.cardInfo.title) {
            return this.props.cardInfo.title;
        } else {
            return "Title";
        }
    }

    // TO-DO; read from actual PSA (look in this.props.cardInfo)
    getStreetAddress() {
        if (this.props.cardInfo.street) {
            return this.props.cardInfo.street;
        } else {
            return "Street"
        }
    }

    // TO-DO; read from actual PSA (look in this.props.cardInfo)
    getCityStateZip() {
        let city = "city";
        let state = "state";
        let zip = "zip";
        if (this.props.cardInfo.city) {
            city = this.props.cardInfo.city;
        } 
        if (this.props.cardInfo.state) {
            state = this.props.cardInfo.state;
        }
        if (this.props.cardInfo.zip) {
            zip = this.props.cardInfo.zip;
        }

        return `${city}, ${state} ${zip}`;
    }

    // TO-DO; read from actual PSA (look in this.props.cardInfo)
    getCardDates() {
        let startDate = "start date";
        let endDate = "end date";
        if (this.props.startDate) {
            startDate = this.props.startDate;
        }
        if (this.props.endDate) {
            endDate = this.props.endDate;
        }
        const dates = `${startDate} to ${endDate}`;
        return dates;
    }

    // TO-DO; read from actual PSA (look in this.props.cardInfo)
    getCardDescription() {
        if (this.props.cardInfo.description) {
            return this.props.cardInfo.description;
        } else {
            return "Description";
        }
    }
}