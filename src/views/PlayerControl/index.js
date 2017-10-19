import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Col, Glyphicon } from 'react-bootstrap';
import { IMAGE_SOURCE } from '../../config/constants';
import * as R from 'ramda';
import '../../styles/player.less';

class PlayerControl extends Component {
  constructor(){
    super();
    this.OnPlay = this.OnPlay.bind(this);
    this.OnNext = this.OnNext.bind(this);
    this.OnPrevious = this.OnPrevious.bind(this);
    this.state ={ playPauseGlyph: 'play', current:{} }
  }

  componentWillMount(){
    this.setState({
      current: this.props.current,
    })
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
    const { tracklist } = this.props;
    const { current } = this.state;
    const previousSongs = R.filter((song) => song.id < current.id , tracklist);
    const toPlay = !R.isEmpty(previousSongs) ? R.head(previousSongs) : current;
    this.setState({
      current: toPlay,
    })
  }

  OnNext(){
    const { tracklist } = this.props;
    const { current } = this.state;
    const nextSongs = R.filter((song) => song.id > current.id , tracklist);
    const toPlay = !R.isEmpty(nextSongs) ? R.head(nextSongs) : current;
    this.setState({
      current: toPlay,
    })
  }

  render() {

    const { image, artist, title } = this.state.current;
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
        <Col xs={12} md={12}>
          <small>Now Playing </small><br />
          <small> {artist} - {title} </small>
        </Col>
      </div>
    )
  }
}

PlayerControl.propTypes = {
  current: PropTypes.shape({
    artist: PropTypes.string,
    title: PropTypes.string,
    song: PropTypes.string,
    image: PropTypes.string,
  }),
  tracklist: PropTypes.array.isRequired,
}

export default PlayerControl;
