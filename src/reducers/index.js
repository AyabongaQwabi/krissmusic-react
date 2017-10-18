import { combineReducers } from 'redux-immutablejs';
import player from './player';
import upload from './upload';
import tracklist from './tracklist';
import routing from './routing';
import config from './config';

const RootReducer = combineReducers({
  player,
  upload,
  tracklist,
  routing,
  config,
})

export default RootReducer;
