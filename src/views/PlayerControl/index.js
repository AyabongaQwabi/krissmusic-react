import React, { Component } from 'react';
import { Col, Glyphicon } from 'react-bootstrap';
import { IMAGE_SOURCE } from '../../config/constants';
import { connect } from 'react-redux';
import { setNowPlaying } from '../../actions/player.js';
import * as R from 'ramda';
import '../../styles/player.less';

class PlayerControl extends Component {
  constructor(){
    super();
    this.OnPlay = this.OnPlay.bind(this);
    this.OnNext = this.OnNext.bind(this);
    this.OnPrevious = this.OnPrevious.bind(this);
    this.state ={ playPauseGlyph: 'play' }
  }


  OnPlay(){
    const { playPauseGlyph } = this.state;
    const isPlaying = (playPauseGlyph === 'pause')
    const updatedGlyph = isPlaying ? 'play' : 'pause';
    this.setState({
      playPauseGlyph : updatedGlyph,
    });
  }

  OnPrevious(){
    const { tracklist, current, setNowPlaying } = this.props;
    const previousSongs = R.filter((song) => song.id < current.get('id'), tracklist.toJS());
    const toPlay = !R.isEmpty(previousSongs) ? R.last(previousSongs) : current;
    setNowPlaying(toPlay);
  }

  OnNext(){
    const { tracklist, current, setNowPlaying } = this.props;
    const nextSongs = R.filter((song) => song.id > current.get('id') , tracklist.toJS());
    const toPlay = !R.isEmpty(nextSongs) ? R.head(nextSongs) : current;
    setNowPlaying(toPlay);
  }

  render() {

    const { image, artist, title } = this.props.current.toJS();
    const imageSize = {height:"100px",width:"100px"};
    const imageUrl = IMAGE_SOURCE.concat(image);

    return(
      <div>
        <div style={{height:'100px'}}>
          <Col xs={2} md={2} mdOffset={2} className='player-control text-left'>
            <Glyphicon glyph="backward" className='ctrl-btn backward' onClick={this.OnPrevious} />
          </Col>
          <Col xs={8} md={4} className='play-pause'>
            <img src={imageUrl} alt={artist} style={imageSize} />
            <Glyphicon glyph={this.state.playPauseGlyph} className='control' onClick={this.OnPlay} />
          </Col>
          <Col xs={2} md={2} className='player-control text-right'>
            <Glyphicon glyph="forward" className='ctrl-btn forward' onClick={this.OnNext} />
          </Col>
        </div>
        <Col xs={12} md={12} className="Detail">
          <small>{title}</small><br />
          <small> {artist}</small>
        </Col>
      </div>
    )
  }
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
)(PlayerControl);
