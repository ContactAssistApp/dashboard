import React from 'react';
import { FacebookShareButton, FacebookIcon, 
         TwitterShareButton, TwitterIcon,
         PinterestShareButton, PinterestIcon,
         EmailShareButton, EmailIcon } from 'react-share'

export class ShareForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let shareUrl = window.location.href + "?id=" + this.props.id + "&timestamp=" + this.props.timeStamp;
        
        return (
            <div className="share-button">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={25} round={true} />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={25} round={true} />
                </TwitterShareButton>
                <PinterestShareButton url={shareUrl}>
                    <PinterestIcon size={25} round={true} />
                </PinterestShareButton>
                <EmailShareButton url={shareUrl}>
                    <EmailIcon size={25} round={true} />
                </EmailShareButton>
            </div>
        )
    }
}