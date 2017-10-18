import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="App">
        <div className="App-header">
          {children}
       </div>
      </div>
    );
  }
}

export default App;
