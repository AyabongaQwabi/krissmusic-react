import { fromJS } from 'immutable';
import { SET_NOW_PLAYING } from '../actions/types';

import createActionHandler from './createActionHandler';

const initialState = fromJS({});

const actionHandlers = {};

const setTrack= (state, action) =>
  state.set('nowPlaying',fromJS(action.payload));

actionHandlers[SET_NOW_PLAYING] = setTrack;

const handle = createActionHandler(actionHandlers);

export default (state = initialState, action) => handle(state, action);
