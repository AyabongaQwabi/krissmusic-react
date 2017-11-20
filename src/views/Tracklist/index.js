import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as R from'ramda';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../../styles/tracklist.less';

class Tracklist extends Component {
  render() {
    const { tracks, onTrackSelection } = this.props;
    return(
      <div className='tracklist-container'>
        <ListGroup className='tracklist'>
          {R.map((track) =>
            <ListGroupItem header={track.title} key={track.id} id={track.id} onClick={onTrackSelection(track.id)}>
             {track.artist}
            </ListGroupItem>
          , tracks)}
        </ListGroup>
      </div>
    )
  }
}

Tracklist.propTypes = {
  tracklist: PropTypes.array,
  onTrackSelection:PropTypes.func.isRequired,
}

export default Tracklist;
