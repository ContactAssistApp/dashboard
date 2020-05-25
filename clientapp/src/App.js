import React from 'react';
import logo from './logo.svg';
import './App.css';
import { apiBaseUrl } from "./config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: ""};
  }

  callAPI() {
    let url = apiBaseUrl + "/api/report?api-version=2020-05-05";
    fetch(url)
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }
  
  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
  
}

export default App;
