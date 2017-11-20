import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as R from'ramda';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import '../../styles/tracklist.less';

var groupsOf = R.curry(function group(n, list) {
    return R.isEmpty(list) ? [] : R.prepend(R.take(n, list), group(n, R.drop(n, list)));
});

class Tracklist extends Component {
  render() {
    const { tracks, onTrackSelection } = this.props;

    const bundledTracks = groupsOf(4,tracks);
    console.log('loading tracklist')
    console.log(bundledTracks)

    const toListGroupItems = (tracks) =>
     R.map((track) =>
         <ListGroupItem header={track.title} key={track.id} id={track.id} onClick={onTrackSelection(track.id)}>
          {track.artist}
         </ListGroupItem>
    ,tracks)

    const tracklist =
     R.map((tracks) => {
       const listGroupTracks = toListGroupItems(tracks)
       return (
         <ListGroup className='tracklist col-md-4 col-xs-12'>
           {listGroupTracks }
        </ListGroup>
      )
     }, bundledTracks)

    return(
      <div className='tracklist-container'>

          {tracklist}

      </div>
    )
  }
}

Tracklist.propTypes = {
  tracklist: PropTypes.array,
  onTrackSelection:PropTypes.func.isRequired,
}

export default Tracklist;
