import React from 'react';

/*
props:
show: bool whether or not to be visible
onNoConfirm()
onYesConfirm()
*/

export class ConfirmationModal extends React.Component {
    constructor(props) {
        super(props);
        this.onNoConfirm = this.onNoConfirm.bind(this);
        this.onYesConfirm = this.onYesConfirm.bind(this);
    }

    render() {
        if (this.props.show) {
            return (
                <div className="confirmation-modal-container">
                    <div className="confirmation-modal-text">
                        Are you sure you want to publish this announcement?
                    </div>
                    <div className="confimation-modal-subtext">
                        This action cannot be undone.
                    </div>
                    <div className="confirmation-card">
                        {this.props.children}
                    </div>
                    <div className="confirmation-modal-buttons">
                        <button className="confirmation-modal-no" onClick={this.onNoConfirm}>Cancel</button>
                        <button className="confirmation-modal-yes" onClick={this.onYesConfirm}>Publish</button>
                    </div>
                </div>
            );
        }
        else {
            return null;
        }
    }

    onNoConfirm() {
        this.props.onNoConfirm();
    }

    onYesConfirm() {
        this.props.onYesConfirm();
    }
}