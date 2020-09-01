import React from 'react';

/*
props:
startingValue: int,
label: string,
onChange: (newRadius) => void
*/
export class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentValue: this.props.startingValue };
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div className="slider-container">
                <p>{this.props.label}: <input id="radius-input" type="number" min={this.props.min} max={this.props.max} value={this.state.currentValue} onChange={this.onChange}></input> {this.props.unit}</p>
                <input id="radius-slider" type="range" min={this.props.min} max={this.props.max} value={this.state.currentValue} onChange={this.onChange} />
            </div>
        );
    }

    onChange(ev) {
        let newValue = ev.target.value;
        this.setState({currentValue: newValue});
        this.props.onChange(parseInt(newValue));
    }
}