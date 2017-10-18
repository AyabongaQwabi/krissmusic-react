import React, { Component } from 'react';
import MegaButton from '../atoms/button';
import MusicControl from '../MusicControl';


class Home extends Component {
  render(){
    return (
      <div>
        <div>
        <MegaButton> Upload </MegaButton>
        <h2>KRISS MUSIC</h2>
        </div>
        <MusicControl />
      </div>
    )
  }
}

export default Home;
