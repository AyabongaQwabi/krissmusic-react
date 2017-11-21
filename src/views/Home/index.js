import React, { Component } from 'react';
import MegaButton from '../atoms/button';
import MusicControl from '../MusicControl';


class Home extends Component {
  render(){
    return (
     <div className='row dark'>
      <div className='col-md-12 col-xs-12 dark'>
        <div className='app-name'>
          <svg viewBox="0 0 960 300">
             <symbol id="s-text">
               <text textAnchor="middle" x="50%" y="80%">KRISS MUSIC</text>
             </symbol>

             <g class = "g-ants">
               <use xlinkHref="#s-text" className="text-copy"></use>
               <use xlinkHref="#s-text" className="text-copy"></use>
               <use xlinkHref="#s-text" className="text-copy"></use>
               <use xlinkHref="#s-text" className="text-copy"></use>
               <use xlinkHref="#s-text" className="text-copy"></use>
             </g>
          </svg>
        </div>
        <h3> About that local</h3>
        <MegaButton > Upload </MegaButton>
        <br/>
      </div>
        <MusicControl />
      </div>
    )
  }
}

export default Home;
