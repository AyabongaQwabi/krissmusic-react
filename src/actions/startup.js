import * as types from './types';
import appConfig from '../config/appConfig'

const dummyTracks = [
  {
    id:1,
    track:'first.mp3',
    title:'Them teeth nigga',
    image:'demo.png',
    artist:'Aquafresh',
  },
  {
    id:2,
    track:'second.mp3',
    title:'Chpsticks',
    image:'demo2.png',
    artist:'Chineese Man Live'
  },
  {
    id:3,
    track:'second.mp3',
    title:'Kush Kush',
    image:'demo3.png',
    artist:'Cynic'
  },
  {
    id:4,
    track:'second.mp3',
    title:"Mayenzeke'enzekayo",
    image:'demo4.png',
    artist:'Dr Lee Hong'
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
