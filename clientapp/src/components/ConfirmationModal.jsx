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
                        Are you sure you want to publish?
                    </div>
                    <div className="confirmation-modal-buttons">
                        <span className="confirmation-modal-yes" onClick={this.onYesConfirm}>Yes</span>
                        <hr className="confirmation-modal-separator" />
                        <span className="confirmation-modal-no" onClick={this.onNoConfirm}>No</span>
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