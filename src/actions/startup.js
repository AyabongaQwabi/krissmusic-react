import * as types from './types';
import appConfig from '../config/appConfig'
import { setNowPlaying } from './player.js';
import * as R from'ramda';
import request from 'axios';

import tracks from '../config/tracks.json';

const dummyTracks = tracks

const getSongWithId = (songId, tracks) => R.head(tracks.filter((track) => track.id === songId));
const generateRandomNumberInRange =(range) => Math.floor(Math.random() * range);
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
  request.get('http://www.krissmusic.tk:3000/songlist/?raw=true').then((response)=>{
    const songs = response.data;
    const mapIndexed =  R.addIndex(R.map)

    const correctlyIndexedSongs = mapIndexed((song, index) =>{
      song['id'] = index;
      return song;
    },songs)
    const cleanSongs = correctlyIndexedSongs.map((song) => {
      const unclusteredSong = R.omit(['play_count','download_count', 'flame_count' ],song)
      const trackedSong = R.dissoc('src', R.assoc('track',song.src, unclusteredSong));
      const titledSong = R.dissoc('name', R.assoc('title',song.name, trackedSong))
      const webbedSong = R.assoc('web', true, titledSong)
      return webbedSong
    })
    const randomSongId = generateRandomNumberInRange(R.last(cleanSongs).id);
    const randomSong = getSongWithId(randomSongId, cleanSongs);

    dispatch(setUpConfigs(appConfig));
    dispatch(loadTracklist(cleanSongs));
    dispatch(setNowPlaying(randomSong));
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
