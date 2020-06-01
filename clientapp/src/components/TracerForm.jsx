import React from 'react';
import pin from '../images/pin.svg';

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
    }

    render() {
        let sampleDescription = "Please refrain from entering playground Z until April 6th because it needs ot undergo decontamination.";
        return (
            <div className="tracer-form">
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
                </div>
                <div className="tracer-form-dates">
                    <input type="date" id="start-date"/>
                    <span id="tracer-form-dates-separator">to</span>
                    <input type="date" id="end-date"/>
                </div>
                <div className="tracer-form-description">
                    <div>
                        <textarea value={this.state.description} onChange={this.onDescriptionChange} placeholder={sampleDescription} className="tracer-form-textbox" />
                    </div>
                </div>
                <div className="tracer-form-buttons">
                    <button className="cancel-button">Cancel</button>
                    <button className="publish-button">Publish</button>
                </div>
            </div>
        )
    }

    onTypeChange(ev) {
        this.setState({ type: ev.target.value});
    }

    onTitleChange(ev) {
        this.setState({ title: ev.target.value });
    }

    onStreetChange(ev) {
        this.setState({ street: ev.target.value });
    }

    onCityChange(ev) {
        this.setState({ city: ev.target.value });
    }

    onStateChange(ev) {
        this.setState({ state: ev.target.value });
    }

    onZipChange(ev) {
        this.setState({ zip: ev.target.value });
    }

    onDescriptionChange(ev) {
        this.setState({ description: ev.target.value });
    }
}