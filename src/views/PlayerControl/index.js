import React, { Component } from 'react';
import { Row, Col, Glyphicon } from 'react-bootstrap';
import { IMAGE_SOURCE, TRACK_SOURCE, WEB_SOURCE } from '../../config/constants';
import { connect } from 'react-redux';
import { setNowPlaying } from '../../actions/player.js';
import * as R from 'ramda';
import '../../styles/player.less';
import ReactPlayer from 'react-player';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import moment from 'moment'
class PlayerControl extends Component {
  constructor(){
    super();
    this.togglePlayState = this.togglePlayState.bind(this);
    this.OnNext = this.OnNext.bind(this);
    this.OnPrevious = this.OnPrevious.bind(this);
    this.state ={
      playPauseGlyph: 'play',
      muteStateGlyph:'volume-up',
      loopStateGlyph:'repeat',
      playstate: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,

    }
  }

  togglePlayState(){
    const { playPauseGlyph, playstate } = this.state;
    const isPlaying = (playPauseGlyph === 'pause')
    const updatedGlyph = isPlaying ? 'play' : 'pause';
    this.setState({
      playPauseGlyph : updatedGlyph,
      playstate: !playstate
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
  onSeekMouseDown = e => {
    console.log('seeking mouse down')
    this.setState({ seeking: true })
  }
  onSeekChange = value => {
    console.log('seeking to --> '+value/100)
    console.log('max duration --> '+this.state.duration)
    this.setState({ played: parseFloat(value/100) })
    this.player.seekTo(parseFloat(value/100))
  }
  onSeekMouseUp = value => {
    this.setState({ seeking: false })
    console.log('seeking mouse up to --> '+value)
    this.player.seekTo(parseFloat(value))
  }
  setVolume = val => {
    this.setState({ volume: parseFloat(val/100) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted ,muteStateGlyph: this.state.muted ? 'volume-up' :'volume-off'})
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop, loopStateGlyph: this.state.loop ? 'refresh' : 'repeat' })
  }
  ref = player => {
    this.player = player
  }
  onProgress = state => {
      this.setState(state)
  }
  render() {

    const { image, artist, title, web} = this.props.current.toJS();
    const imageSize = {height:"200px",width:"200px"};
    const imageUrl = web ? WEB_SOURCE.concat(image) : IMAGE_SOURCE.concat(image);
    const trackUrl = web ? WEB_SOURCE.concat(this.props.currentSong.get('track')) : TRACK_SOURCE.concat(this.props.currentSong.get('track'))
    const { volume, muted, loop, played, duration, playbackRate } = this.state

    return(
      <div className='player-container'>
        <div className='player'>
          <Row>
            <Col md={12}>
              <img src={imageUrl} alt={artist} style={imageSize} />
            </Col>
          </Row>
          <Row>
            <Col xs={2} md={2} mdOffset={2} className='control text-left'>
              <Glyphicon glyph="backward" className='ctrl-btn backward' onClick={this.OnPrevious} />
            </Col>
            <Col xs={8} md={4} className='play-pause'>
              <Glyphicon glyph={this.state.playPauseGlyph} className='control' onClick={this.togglePlayState} />
            </Col>
            <Col xs={2} md={2} className='control text-right'>
              <Glyphicon glyph="forward" className='ctrl-btn forward' onClick={this.OnNext} />
            </Col>
          </Row>
        </div>
        <Col xs={12} md={12} className="detail">
           <div>
             <ReactPlayer
               ref={this.ref}
               className='react-player'
               width='100%'
               height='100%'
               url={trackUrl}
               playing={this.state.playstate}
               loop={loop}
               playbackRate={playbackRate}
               volume={volume}
               muted={muted}
               onReady={() => console.log('onReady')}
               onStart={() => console.log('onStart')}
               onPlay={this.onPlay}
               onPause={this.onPause}
               onBuffer={() => console.log('onBuffer')}
               onSeek={e => console.log('onSeek', e)}
               onEnded={() => this.setState({ playing: loop })}
               onError={e => console.log('onError', e)}
               onProgress={this.onProgress}
               onDuration={duration => this.setState({ duration })}
             />
           </div>
           <div className='slider orientation-reversed'>
             <div className='row slider-group'>
              <div className='col-md-2 slider-vertical'>
                <Slider
                  min={0}
                  max={100}
                  value={Math.round(volume*100)}
                  orientation='horizontal'
                  onChange={this.setVolume}
                />
                <div className='row'>
                  <div className='mini-control col-md-4 col-xs-4'>
                    <div className='value'>{Math.round(volume*100)}</div>
                  </div>
                  <div className='mini-control col-md-4 col-xs-4'>
                    <Glyphicon glyph={this.state.muteStateGlyph} className='control' onClick={this.toggleMuted} />
                  </div>
                  <div className='mini-control col-md-4 col-xs-4'>
                    <Glyphicon glyph={this.state.loopStateGlyph} className='control' onClick={this.toggleLoop} />
                  </div>
                </div>
              </div>
              <div className='col-md-8 slider-horizontal'>
                <Slider
                  min={0}
                  max={100}
                  value={Math.round(played*100)}
                  orientation='horizontal'
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
             </div>
             <div className='col-md-2 song-notifier '>
                <div className='playing'>
                 {moment.utc(played*duration*1000).format('mm:ss')}
                </div>
                <div className='duration'>
                 {moment.utc(duration*1000).format('mm:ss')}
                </div>
              </div>
            </div>
           </div>
          <small><b>{title}</b></small><br />
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
