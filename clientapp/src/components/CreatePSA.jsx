import React from 'react';
import { MobilePreview } from './MobilePreview';
import { Card } from './Card';
import { TracerForm } from './TracerForm';
import { PsaFields } from '../models/PsaFields';

export class CreatePSA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type: "", title: "", street: "", city: "", state: "", zip: "", description: "", startDate: "", endDate: ""};
        this.tracerFormCallback = this.tracerFormCallback.bind(this);
    }

    render() {
        const cardInfo = {
            type: this.state.type,
            title: this.state.title,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            description: this.state.description
        };

        return (
            <div className="create-psa-container">
                <div className="create-psa-header">
                    Create New PSA
                </div>
                <div className="row">
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
                            <Card open={true} cardInfo={cardInfo} />
                        </div>
                    </div>
                    <div className="create-psa-middle-pane">
                        <TracerForm changeCallback={this.tracerFormCallback} />
                    </div>
                </div>
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
        }
    }
}