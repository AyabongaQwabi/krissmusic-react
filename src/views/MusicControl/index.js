import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { getImage, getSong} from '../../helpers/song';
import PlayerControl from '../PlayerControl';
import Tracklist from '../Tracklist';
import './index.css';

class MusicControl extends Component {
  render(){
    const { tracklist } = this.props;
    const currentSong = R.head(tracklist);
    const image = (currentSong!==undefined) ?  getImage(currentSong.id) :'demo.jpg';
    const song = (currentSong!==undefined) ? getSong(currentSong.id) : 'demo.mp3' ;

    return(
      <div>
       <Row>
        <Col xs={12} md={8} className='col-centered'>
          <Col xs={12} md={12} className="panel panel-default dark">
            <div className="panel-body">
             <PlayerControl image={image} song={song} />
             <Tracklist tracks={tracklist.toJS()}/>
            </div>
          </Col>
        </Col>
       </Row>
      </div>)
  }
}

MusicControl.propTypes = {
  tracklist: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  tracklist : state.getIn(['tracklist','songs']),
})


export default connect(
  mapStateToProps
)(MusicControl);
