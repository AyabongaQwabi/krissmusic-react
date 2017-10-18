import * as types from './types';
import appConfig from '../config/appConfig'

const dummyTracks = [
  {
    id:1,
    track:'first.mp3',
    title:'first',
    image:'first.jpg',
    artist:'First',
  },
  {
    id:2,
    track:'second.mp3',
    title:'second',
    image:'second.jpg',
    artist:'Second'
  }
]

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
}

export  const startup = () => {
  const type = types.STARTUP;
  const payload = startUpActions;
  return {
    type,
    payload,
  };
};
