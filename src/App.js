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
       <link href="https://fonts.googleapis.com/css?family=Didact+Gothic|Poiret+One|Carter+One|Montserrat" rel="stylesheet"/>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div className="App-header">
          {children}
       </div>
      </div>
    );
  }
}

export default App;
