import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class PlayerControl extends Component {
  render() {
    const { image ,song } = this.props;
    return(
      <div>
        <img src={image} alt='' />
      </div>
    )
  }
}

PlayerControl.propTypes = {
  image:PropTypes.string.isRequired,
  song:PropTypes.string.isRequired,
}

export default PlayerControl;
