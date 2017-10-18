import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import * as R from'ramda';

class Tracklist extends Component {
  render() {
    const { tracks } = this.props;
    return(
      <div>
        <table className="table dark">
          <thead>
            <tr>
              <th className='text-center'>Artist</th>
              <th className='text-center'>Track</th>
            </tr>
          </thead>
          <tbody>
            {
              R.map((track) => {
                return (
                  <tr key={track.id}>
                    <td>{track.artist}</td>
                    <td>{track.title}</td>
                  </tr>
                )
              },tracks)
            }
          </tbody>
        </table>
      </div>
    )
  }
}

Tracklist.propTypes = {
  tracklist: PropTypes.array
}

export default Tracklist;
