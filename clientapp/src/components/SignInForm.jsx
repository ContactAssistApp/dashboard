import React from 'react';
import { checkAuth } from '../Api/CheckAuth';

/*
props:
onCancel: function
onSuccess: function
*/
export class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", hasError: false};
        this.onCancel = this.onCancel.bind(this);
        this.checkCredentials = this.checkCredentials.bind(this);
        this.onUserNameChange = this.onUserNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    render() {
        let inputClasses = this.state.hasError ? "signIn-Field error-Field" : "signIn-Field";
        return (
            <div className="signIn-Form">
                <div className="signIn-title">
                    Pro Tracer Sign in
                </div>
                <input type="text" value={this.state.username} onChange={this.onUserNameChange} className={inputClasses} id="username-field" placeholder="example@email.com" />
                <input type="password" value={this.state.password} onChange={this.onPasswordChange} className={inputClasses} id="password-field" placeholder="password" />
                <span className="signIn-Link">I forgot my password</span>
                <div className="signIn-buttons">
                    <span className="signIn-cancel-button" onClick={this.onCancel}>Cancel</span>
                    <span className="signIn-continue-button" onClick={this.checkCredentials}>Continue</span>
                </div>
            </div>
        );
    }

    onCancel() {
        this.props.onCancel();
    }

    checkCredentials() {
        // call endpoint to check auth
        checkAuth(this.state.username, this.state.password)
            .then(status => {
                if (status === 200) {
                    this.props.onSuccess();
                } else {
                    this.setState({hasError: true});
                }
            });
    }

    onUserNameChange(ev) {
        const newUserName = ev.target.value;
        this.setState({username: newUserName});
    }

    onPasswordChange(ev) {
        const newPassword = ev.target.value;
        this.setState({password: newPassword});
    }
}