import React from 'react';
import appIcon from '../images/appIcon.svg';

/*
MobilePreview props:
title: string,
description: string
*/

export class MobilePreview extends React.Component{
    render() {
        return (
            <div className="mobile-preview">
                <div className="mobile-preview-header">
                    <img src={appIcon} className="mobile-preview-icon" alt="app icon" />
                    <span className="mobile-preview-appname">COMMONCIRCLE</span>
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
        if (this.props.title) {
            return this.props.title;
        } else {
            return "Title";
        }
    }

    getDescription() {
        if (this.props.description) {
            let cutOffDescription = this.props.description.slice(0, 30);
            return cutOffDescription + "...";
        } else {
            // cut off the description after certain number of characters
            return "Description...";
        }
    }
}