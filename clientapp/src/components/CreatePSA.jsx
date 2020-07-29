import React from 'react';
import { MobilePreview } from './MobilePreview';
import { Card } from './Card';
import { TracerForm } from './TracerForm';
import { PsaFields } from '../models/PsaFields';
import { ConfirmationModal } from './ConfirmationModal';
import { SuccesModal } from './SuccessModal';
import { PublishPsaRequest } from '../Api/PublishPsaRequest';
import { publishPSA } from '../Api/publishPSA';

/*
Props:
onCancel()
*/

/*
State:
formStage: 1 (form), 2 (confirmation), 3 (success)
*/

export class CreatePSA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {formStage: 1, type: "", title: "", street: "", city: "", state: "", zip: "", description: "", startDate: "", endDate: ""};
        this.tracerFormCallback = this.tracerFormCallback.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.getFormStyles = this.getFormStyles.bind(this);
        this.onPublish = this.onPublish.bind(this);
        this.onNoConfirm = this.onNoConfirm.bind(this);
        this.onYesConfirm = this.onYesConfirm.bind(this);
    }

    render() {

        if (this.state.formStage === 3) {
            return <SuccesModal show={this.state.formStage === 3} dismissModal={this.onCancel} />;
        }
        
        const cardInfo = {
            type: this.state.type,
            title: this.state.title,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            description: this.state.description
        };

        return (
            <div>
                <div className={this.getFormStyles()}>
                    <div className="create-psa-header">
                        Create New Announcement
                        <div className="tracer-form-buttons">
                            <button className="cancel-button" onClick={this.onCancel}>Cancel</button>
                            <button className="publish-button" onClick={this.onPublish}>Publish</button>
                        </div>
                    </div>
                    <div className="flex-container">
                        <div className="create-psa-left-pane">
                            <div className="create-psa-preview">
                                Preview Public Service Announcement
                        </div>
                            <div className="create-psa-mobile-preview">
                                <div className="create-psa-preview-label">
                                    Mobile Notification Preview
                            </div>
                                <MobilePreview title={this.state.title} description={this.state.description} />
                            </div>
                            <div className="create-psa-card-preview">
                                <div className="create-psa-preview-label">
                                    Dashboard Preview
                                </div>
                                <Card open={true} cardInfo={cardInfo} startDate={this.state.startDate} endDate={this.state.endDate}/>
                            </div>
                        </div>
                        <div className="create-psa-middle-pane">
                            <TracerForm changeCallback={this.tracerFormCallback} onCancel={this.onCancel} onPublish={this.onPublish}/>
                        </div>
                    </div>
                </div>
                <ConfirmationModal show={this.state.formStage === 2} onNoConfirm={this.onNoConfirm} onYesConfirm={this.onYesConfirm}>
                    <Card open={true} cardInfo={cardInfo} startDate={this.state.startDate} endDate={this.state.endDate}/>
                </ConfirmationModal>
            </div>
        );
    }

    tracerFormCallback(fieldType, fieldValue) {
        switch(fieldType) {
            case PsaFields.TYPE:
                this.setState({ type: fieldValue });
                break;
            case PsaFields.TITLE:
                this.setState({ title: fieldValue });
                break;
            case PsaFields.STREET:
                this.setState({ street: fieldValue });
                break;
            case PsaFields.CITY:
                this.setState({ city: fieldValue });
                break;
            case PsaFields.STATE:
                this.setState({ state: fieldValue });
                break;
            case PsaFields.ZIP:
                this.setState({ zip: fieldValue });
                break;
            case PsaFields.DESCRIPTION:
                this.setState({ description: fieldValue });
                break;
            case PsaFields.START_DATE:
                this.setState({ startDate: fieldValue });
                break;
            case PsaFields.END_DATE:
                this.setState({ endDate: fieldValue });
                break;
            default:
                break;
        }
    }

    onCancel() {
        this.props.onCancel();
    }

    onPublish() {
        let form = document.getElementById("tracer-form");
        if (form.reportValidity()) {
            this.setState({formStage: 2});
        }
    }

    onNoConfirm() {
        this.setState({formStage: 1});
    }

    onYesConfirm() {
        // publish PSA to backend
        let publishRequest = new PublishPsaRequest(this.state);
        publishRequest.getBody((body) => {
            // to-do show error if publish did not succeed
            publishPSA(body).then(res => {
                if (res.content.validationFailures) {
                    this.setState({formStage: 1});
                }
                else {
                   this.setState({formStage: 3}); 
                }
            });
        },
        // error callbck
        () => {
            // if we reach here, the geocoding from address failed
            this.setState({formStage: 1});
        });
    }

    getFormStyles() {
        let classes = "create-psa-container"
        if (this.state.formStage !== 1) {
            classes += " hidden";
        }
        return classes;
    }
}