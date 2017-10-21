import * as types from './types';

export  const setNowPlaying = (track) => {
  console.log('setttinng now playing to')
  console.log(track)
  const type = types.SET_NOW_PLAYING;
  const payload = track;
  return {
    type,
    payload,
  };
};
