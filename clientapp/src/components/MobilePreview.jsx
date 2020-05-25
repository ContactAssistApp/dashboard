import React from 'react';
import appIcon from '../images/appIcon.svg';

/*
MobilePreview props:
type: PSAType,
description: string
*/

export class MobilePreview extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mobile-preview">
                <div className="mobile-preview-header">
                    <img src={appIcon} className="mobile-preview-icon" alt="app icon" />
                    <span className="mobile-preview-appname">COVIDSAFE</span>
                    <span className="mobile-preview-time">Just now</span>
                </div>
                <div className="mobile-preview-body">
                    <p className="mobile-preview-title">{this.getTitle()}</p>
                    <p className="mobile-preview-description">{this.getDescription()}</p>
                </div>
            </div>
        )
    }

    getTitle() {
        return "Decontamination (Today)";
    }

    getDescription() {
        // cut off the description after certain number of characters
        return "Please refrain from enterin The Morgan Library...";
    }
}