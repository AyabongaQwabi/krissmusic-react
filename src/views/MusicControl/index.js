import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import PlayerControl from '../PlayerControl';
import Tracklist from '../Tracklist';
import { setNowPlaying } from '../../actions/player.js';
import '../../styles/musicControl.less';

class MusicControl extends Component {
  constructor(){
    super();
    this.selectTrack = this.selectTrack.bind(this);
  }

  selectTrack(id, e){
    const { tracklist, setNowPlaying } = this.props;
    const selectedTrack = R.filter((track) => track.get('id') === id, tracklist);
    setNowPlaying(R.head(selectedTrack.toJS()));
  }

  render(){

    const { tracklist, currentSong } = this.props;
    const currentlyPlaying = !R.isNil(currentSong);

    return(
      <div>
       <Row>
        <Col xs={12} mdOffset={1} md={10} className='music-control'>
          <Col xs={12} md={12} className="panel panel-default dark">
            <div className="panel-body">
             {currentlyPlaying && <PlayerControl current={currentSong} tracklist={tracklist.toJS()}/>}
             <Tracklist tracks={tracklist.toJS()} onTrackSelection={R.curry(this.selectTrack)}/>
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
  currentSong: state.getIn(['player','nowPlaying'])
})

const mapDispatchToProps = (dispatch) => ({
  setNowPlaying:(t) => dispatch(setNowPlaying(t)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicControl);
