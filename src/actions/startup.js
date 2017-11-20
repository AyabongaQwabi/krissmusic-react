import * as types from './types';
import appConfig from '../config/appConfig'
import { setNowPlaying } from './player.js';
import * as R from'ramda';

import tracks from '../config/tracks.json';

const dummyTracks = tracks

const setUpConfigs = (config) => {
  const type = types.SETUP_CONFIGURATION
  const payload = config;
  return {
    type,
    payload,
  };
};

const loadTracklist = (tracks) => {
  const type = types.INITIATE_TRACK_LIST
  const payload = tracks;
  return {
    type,
    payload,
  };
};

const startUpActions = (dispatch) => {
  dispatch(setUpConfigs(appConfig));
  dispatch(loadTracklist(dummyTracks));
  dispatch(setNowPlaying(R.head(dummyTracks)));
}

export  const startup = () => {
  const type = types.STARTUP;
  const payload = startUpActions;
  return {
    type,
    payload,
  };
};
