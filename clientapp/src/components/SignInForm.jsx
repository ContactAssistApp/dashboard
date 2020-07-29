import React from 'react';
import { checkAuth } from '../Api/CheckAuth';
import newAppIcon from '../images/newAppIcon.svg';

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
        this.enterKeyListener = this.enterKeyListener.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.enterKeyListener);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.enterKeyListener);
    }

    render() {
        let inputClasses = this.state.hasError ? "signIn-Field error-Field" : "signIn-Field";
        return (
            <div className="signIn-Form">
                <div>
                    <img src={newAppIcon} alt={"app icon"} id="app-header-image"/>
                    <span id="app-header-title">CommonCircle News</span>
                </div>
                <div className="signIn-Message">
                    Please sign in with your credentials
                </div>
                <input type="text" value={this.state.username} onChange={this.onUserNameChange} className={inputClasses} id="username-field" placeholder="example@email.com" autoFocus/>
                <input type="password" value={this.state.password} onChange={this.onPasswordChange} className={inputClasses} id="password-field" placeholder="password" />
                <div className="signIn-options">
                    <input type="checkbox" id="keep-signed-in" name="keep-signed-in"/>
                    <label for="keep-signed-in">Keep me signed in</label>
                    <span id="forgot-password">I forgot my password</span>
                </div>
                
                <div className="signIn-buttons">
                    <button className="signIn-continue-button" onClick={this.checkCredentials} tabIndex={0}>Sign in</button>
                    <button className="signIn-cancel-button" onClick={this.onCancel} tabIndex={0}>Cancel</button>
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

    enterKeyListener(ev) {
        if (ev.key === "Enter") {
            this.checkCredentials();
        }
    }
}