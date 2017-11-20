import * as types from './types';
import appConfig from '../config/appConfig'
import { setNowPlaying } from './player.js';
import * as R from'ramda';
import request from 'axios';

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
  request.get('http://www.krissmusic.tk/songlist/?raw=true').then((response)=>{
    const songs = response.data;
    const cleanSongs = songs.map((song) => {
      const unclusteredSong = R.omit(['play_count','download_count','flame_count' ],song)
      const trackedSong = R.dissoc('src',R.assoc('track',song.src, unclusteredSong));
      const titledSong = R.dissoc('name',R.assoc('title',song.name, trackedSong))
      const webbedSong = R.assoc('web',true,titledSong)
      return webbedSong
    })
    dispatch(setUpConfigs(appConfig));
    dispatch(loadTracklist(cleanSongs));
    dispatch(setNowPlaying(R.head(cleanSongs)));
  })
  .catch((err) =>{
    console.log(err)
    dispatch(setUpConfigs(appConfig));
    dispatch(loadTracklist(dummyTracks));
    dispatch(setNowPlaying(R.head(dummyTracks)));
  })

}

export  const startup = () => {
  const type = types.STARTUP;
  const payload = startUpActions;
  return {
    type,
    payload,
  };
};
