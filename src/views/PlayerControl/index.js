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
import Coverflow from 'react-coverflow';
import { withGetScreen } from 'react-getscreen';
import MegaButton from '../atoms/button';



const generateWhatsappUrl =';'
class PlayerControl extends Component {
  constructor(){
    super();
    this.togglePlayState = this.togglePlayState.bind(this);
    this.PlayNext = this.PlayNext.bind(this);
    this.PlayPrevious = this.PlayPrevious.bind(this);
    this.state ={
      playPauseGlyph: 'play',
      muteStateGlyph:'volume-up',
      loopStateGlyph:'repeat',
      playstate: false,
      volume: 0.5,
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
  PlayPrevious(){
    const { tracklist, current, setNowPlaying } = this.props;
    const previousSongs = R.filter((song) => song.id < current.get('id'), tracklist.toJS());
    const toPlay = !R.isEmpty(previousSongs) ? R.last(previousSongs) : current;
    setNowPlaying(toPlay);
  }

  PlayNext(){
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
      const currentTime = this.player.getCurrentTime();
      const overallTime = this.player.getDuration();
      if(currentTime === overallTime){
        this.PlayNext();
      }
  }
  render() {
    const { image, artist, title, web, id} = this.props.current.toJS();
    const { tracklist, setNowPlaying } = this.props;
    const imageSize = {height:"200px",width:"200px"};
    const imageUrl = web ? WEB_SOURCE.concat(image) : IMAGE_SOURCE.concat(image);
    const trackUrl = web ? WEB_SOURCE.concat(this.props.currentSong.get('track')) : TRACK_SOURCE.concat(this.props.currentSong.get('track'))
    const { volume, muted, loop, played, duration, playbackRate } = this.state;
    return(
      <div className='player-container'>
        <div className='player'>
         <Row>
            <Col md={6} xs={6} className='text-right'>
              <MegaButton>
                <Glyphicon glyph="cloud-upload" className='social-buttons' />
                &nbsp;
                UPLOAD
              </MegaButton>
            </Col>
            <Col md={6} xs={6} className='text-left'>
              <MegaButton>
                <Glyphicon glyph="share-alt" className='social-buttons' />
                &nbsp;
                <a href='https://www.krissmusic.tk' style={{color:'#fff',textDecoration:"none"}}>
                  OLD SITE
                </a>
              </MegaButton>
            </Col>
          </Row> 
          <Row>
          <div className="col-md-12">
            {this.props.isDesktop() && <Coverflow
                width="100%" height="350"
                displayQuantityOfSide={3}
                navigation={false}
                enableScroll={true}
                clickable={true}
                active={id}
                >
                {R.map((track) => {
                  const imgSource = web ? WEB_SOURCE.concat(track.image) : IMAGE_SOURCE.concat(track.image);
                  return <img src={imgSource} alt={track.artist} data-action={()=> setNowPlaying(track)} />
                }, tracklist.toJS())}
              </Coverflow>}
              {
                (this.props.isTablet() || this.props.isMobile()) &&
                <Col md={12}>
                  <img src={imageUrl} alt={artist} style={imageSize} />
                </Col>
               }
           </div>
          </Row>

          <Row >
            <Col xs={2} md={2} mdOffset={2} className='control text-left'>
              <Glyphicon glyph="backward" className='ctrl-btn backward' onClick={this.PlayPrevious} />
            </Col>
            <Col xs={8} md={4} className='play-pause'>
              <Glyphicon glyph={this.state.playPauseGlyph} className='control' onClick={this.togglePlayState} />
            </Col>
            <Col xs={2} md={2} className='control text-right'>
              <Glyphicon glyph="forward" className='ctrl-btn forward' onClick={this.PlayNext} />
            </Col>
          </Row>
          <Row className='social-settings'>
            <Col xs={3} md={2} mdOffset={2}>
              <Glyphicon glyph="cloud-download" className='social-buttons' />
            </Col>
            <Col xs={3} md={2} >
              <Glyphicon glyph="thumbs-up" className='social-buttons'  />
            </Col>
            <Col xs={3} md={2} >
             {/* generateWhatsappUrl(trackUrl) */}
              <a href='' className="social-buttons" data-action="share/whatsapp/share" aria-label="Left Align">
                <span className="" aria-hidden="true">
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>
                </span>
              </a>
            </Col>
            <Col xs={3} md={2} >
             {/* generateWhatsappUrl(trackUrl) */}
              <a href='' className="social-buttons" data-action="share/whatsapp/share" aria-label="Left Align">
                <span className="" aria-hidden="true">
                  <i className="fa fa-facebook-square" aria-hidden="true"></i>
                </span>
              </a>
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
const options = {mobileLimit:480, tabletLimit: 768}
export default withGetScreen(connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerControl), options);
