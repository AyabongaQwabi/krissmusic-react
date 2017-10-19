import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import PlayerControl from '../PlayerControl';
import Tracklist from '../Tracklist';
import '../../styles/musicControl.less';

class MusicControl extends Component {
  render(){

    const { tracklist } = this.props;
    const getCurrentSong = () => R.head(tracklist.toJS());
    const currentSong = getCurrentSong();
    const currentlyPlaying = !R.isNil(currentSong);

    return(
      <div>
       <Row>
        <Col xs={12} mdOffset={1} md={10} className='music-control'>
          <Col xs={12} md={12} className="panel panel-default dark">
            <div className="panel-body">
             {currentlyPlaying && <PlayerControl current={currentSong} tracklist={tracklist.toJS()}/>}
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
