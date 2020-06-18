import React from 'react';
import checkmark from '../images/checkmark.svg';

/*
props:
show: boolean
dismissModal()
*/
export class SuccesModal extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener("mouseup", this.props.dismissModal);
    }

    componentWillUnmount() {
        window.removeEventListener("mouseup", this.props.dismissModal);
    }

    render() {
        if (this.props.show) {
            return (
                <div className="confirmation-modal-container">
                    <div className="published-text">
                        PSA Published!
                    </div>
                    <div className="published-checkmark">
                        <img src={checkmark} alt="check mark"/>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }
}