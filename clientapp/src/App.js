import React from 'react';
import logo from './logo.svg';
import './App.css';
import { apiBaseUrl } from "./config";
import { TracerForm } from './components/TracerForm';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  callAPI() {
    let url = apiBaseUrl + "/api/report?api-version=2020-05-05";
    fetch(url)
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Scroll down to see sample component
          </p>
        </header>
        <div className="sample-component">
          <TracerForm />
        </div>
      </div>
    );
  }
  
}

export default App;
