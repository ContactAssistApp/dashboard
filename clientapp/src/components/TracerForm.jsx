import React from 'react';
import pin from '../images/pin.svg';
import { PsaFields } from '../models/PsaFields';
import { Slider } from './Slider';

/*
Props:
tracerFormCallback(fieldType, fieldValue)
onCancel()
onPublish()
*/

export class TracerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: "", title: "", street: "", city: "", state: "", zip: "", description: ""};
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onStreetChange = this.onStreetChange.bind(this);
        this.onCityChange = this.onCityChange.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onZipChange = this.onZipChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onStartDateChange = this.onStartDateChange.bind(this);
        this.onEndDateChange = this.onEndDateChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onPublish = this.onPublish.bind(this);
    }

    componentDidMount() {
        let tracerForm = document.getElementById("tracer-form");
        tracerForm.onsubmit = (ev) =>
        {
            ev.preventDefault();
        }
    }

    render() {
        let sampleDescription = "Please refrain from entering playground Z until April 6th because it needs to undergo decontamination.";
        return (
            <form id="tracer-form">
                <div>
                    <input type="text" value={this.state.type} onChange={this.onTypeChange} placeholder="PSA Type" className="tracer-form-type-select" required/>
                </div>
                <div>
                    <input type="text" value={this.state.title} onChange={this.onTitleChange} placeholder="Title" className="tracer-form-title" required/>
                </div>
                <div className="tracer-form-address">
                    <div className="tracer-form-address-street">
                        <img src={pin} className="tracer-form-pin" alt="pin icon"/>
                        <input type="text" value={this.state.street} onChange={this.onStreetChange} placeholder="Street" required/>
                    </div>
                    <input type="text" value={this.state.city} onChange={this.onCityChange} placeholder="City" className="city" required/>
                    <input type="text" value={this.state.state} onChange={this.onStateChange} placeholder="State" className="state" required/>
                    <input type="text" value={this.state.zip} onChange={this.onZipChange} placeholder="Zip" className="zip" required/>
                    <Slider startingValue={10} label={"Radius"} unit={"miles"} min={0} max={100} />
                </div>
                <div className="tracer-form-dates">
                    <input type="date" id="start-date" onChange={this.onStartDateChange} required/>
                    <span id="tracer-form-dates-separator">to</span>
                    <input type="date" id="end-date" onChange={this.onEndDateChange} required/>
                </div>
                <div className="tracer-form-description">
                    <div>
                        <textarea value={this.state.description} onChange={this.onDescriptionChange} placeholder={sampleDescription} className="tracer-form-textbox" required />
                    </div>
                </div>
            </form>
        )
    }

    onTypeChange(ev) {
        const newType = ev.target.value;
        this.setState({ type: newType});
        this.props.changeCallback(PsaFields.TYPE, newType);
    }

    onTitleChange(ev) {
        const newTitle = ev.target.value;
        this.setState({ title: newTitle });
        this.props.changeCallback(PsaFields.TITLE, newTitle);
    }

    onStreetChange(ev) {
        const newStreet = ev.target.value;
        this.setState({ street: newStreet });
        this.props.changeCallback(PsaFields.STREET, newStreet);
    }

    onCityChange(ev) {
        const newCity = ev.target.value;
        this.setState({ city: newCity });
        this.props.changeCallback(PsaFields.CITY, newCity);
    }

    onStateChange(ev) {
        const newState = ev.target.value;
        this.setState({ state: newState });
        this.props.changeCallback(PsaFields.STATE, newState);
    }

    onZipChange(ev) {
        const newZip = ev.target.value;
        this.setState({ zip: newZip });
        this.props.changeCallback(PsaFields.ZIP, newZip);
    }

    onDescriptionChange(ev) {
        const newDescription = ev.target.value;
        this.setState({ description: newDescription });
        this.props.changeCallback(PsaFields.DESCRIPTION, newDescription);
    }

    onStartDateChange(ev) {
        const newStartDate = ev.target.value;
        this.props.changeCallback(PsaFields.START_DATE, newStartDate);
    }

    onEndDateChange(ev) {
        const newEndDate = ev.target.value;
        this.props.changeCallback(PsaFields.END_DATE, newEndDate);
    }

    onCancel() {
        this.props.onCancel();
    }

    onPublish() {
        // check for validation errors
        let form = document.getElementById("tracer-form");
        if (form.reportValidity()) {
            this.props.onPublish();
        }
    }
}