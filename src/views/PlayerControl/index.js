import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Col, Glyphicon } from 'react-bootstrap';
import '../../styles/player.less';

class PlayerControl extends Component {
  render() {
    const { image } = this.props;
    const imageSize = {height:"100px",width:"100px"}
    return(
      <div>
        <Col xs={2} md={2} mdOffset={2} className='player-control text-left'>
            <Glyphicon glyph="backward" className='ctrl-btn backward'/>
        </Col>
        <Col xs={8} md={4} className=''>
          <img src={image} alt='' style={imageSize} />
        </Col>
        <Col xs={2} md={2} className='player-control text-right'>
            <Glyphicon glyph="forward" className='ctrl-btn forward'/>
        </Col>
      </div>
    )
  }
}

PlayerControl.propTypes = {
  image:PropTypes.string.isRequired,
  song:PropTypes.string.isRequired,
}

export default PlayerControl;
