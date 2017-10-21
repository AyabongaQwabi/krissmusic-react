import React, { Component } from 'react';
import logo from './logo.svg';
import './App.less';
import LogRocket from 'logrocket';
LogRocket.init('8scu27/kriss');

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
