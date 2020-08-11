import React from 'react';
import './App.css';
import { LandingPage } from './components/LandingPage';
import { Footer } from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <div>
        <LandingPage />
        <Footer />
      </div>
    );
  }
  
}

export default App;
